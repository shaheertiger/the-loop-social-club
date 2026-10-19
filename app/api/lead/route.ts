import { site } from "../../_lib/site";
import { EMAIL_RE, LEAD_FORMS, cleanLeadFields, isLeadForm } from "../../_lib/leadForms";

// Receives the site's form submissions and emails them to the signup inbox.
//
// Delivery, in order:
//   1. Resend (https://resend.com), when RESEND_API_KEY is set. Reliable from
//      Vercel's servers; see the README for the three-minute setup.
//   2. FormSubmit, the same endpoint the browser uses. Its bot protection
//      usually blocks server requests, so this is a best effort only.
// Every submission is also written to the server log first, so a lead is never
// lost even if both deliveries fail.
//
// The reply tells the browser whether it may try another path: `retryable` is
// true only when nothing was sent. A timeout after the request went out is
// not retryable, since the email may already be on its way; the browser then
// treats the lead as delivered rather than send it again.

const DELIVERY_TIMEOUT = 20_000;
const DUPLICATE_WINDOW = 10 * 60_000;

/** Nothing was sent; the browser may try another delivery path. */
class NotDelivered extends Error {}

// Identical submissions seen recently by this server instance (a double click,
// or a retry after a slow reply). Best effort: serverless instances don't
// share it, but it catches the common case.
const recent = new Map<string, number>();

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    form?: unknown;
    fields?: Record<string, unknown>;
  } | null;

  if (!body || !isLeadForm(body.form) || !body.fields || typeof body.fields !== "object") {
    return Response.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  // Bots fill the hidden honeypot field; quietly pretend it worked.
  if (typeof body.fields._honey === "string" && body.fields._honey) {
    return Response.json({ ok: true });
  }

  const form = body.form;
  const fields = cleanLeadFields(form, body.fields);
  if (!fields.name || !EMAIL_RE.test(fields.email ?? "")) {
    return Response.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
  }

  const subject = LEAD_FORMS[form].subject;
  const key = `${form}:${JSON.stringify(fields)}`;
  const now = Date.now();
  for (const [k, seen] of recent) if (now - seen > DUPLICATE_WINDOW) recent.delete(k);
  if (recent.has(key)) {
    console.log(`[lead] duplicate of a recent submission from ${fields.email}, not re-sent`);
    return Response.json({ ok: true });
  }
  recent.set(key, now);
  console.log(`[lead] ${form} ${JSON.stringify(fields)}`);

  const errors: string[] = [];
  let maybeSent = false;
  const deliveries = [
    ["Resend", deliverWithResend],
    ["FormSubmit", deliverWithFormSubmit],
  ] as const;
  for (const [name, deliver] of deliveries) {
    try {
      if (await deliver(subject, fields)) return Response.json({ ok: true });
    } catch (err) {
      errors.push(`${name}: ${err instanceof Error ? err.message : String(err)}`);
      if (!(err instanceof NotDelivered)) {
        // The request went out; stop here rather than risk a second email.
        maybeSent = true;
        break;
      }
    }
  }

  if (!maybeSent) recent.delete(key);
  console.error(`[lead] delivery ${maybeSent ? "outcome unknown" : "failed"} for ${fields.email}: ${errors.join("; ") || "no delivery method configured"}`);
  return Response.json({ ok: false, retryable: !maybeSent, error: "Delivery failed" }, { status: 502 });
}

/** Emails the submission through Resend. Returns false when Resend isn't configured. */
async function deliverWithResend(subject: string, fields: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const rows = Object.entries(fields);
  const payload = {
    from: process.env.LEAD_FROM_EMAIL ?? "Loop Social <onboarding@resend.dev>",
    to: [process.env.LEAD_TO_EMAIL ?? site.email],
    reply_to: fields.email,
    subject,
    text: rows.map(([key, value]) => `${label(key)}: ${value}`).join("\n"),
    html:
      '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' +
      rows
        .map(
          ([key, value]) =>
            `<tr><th align="left" style="border:1px solid #ddd;background:#f4f4f4">${escapeHtml(label(key))}</th>` +
            `<td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
        )
        .join("") +
      "</table>",
  };

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT),
    });
  } catch (err) {
    throw wrapFetchError("Resend", err);
  }
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    const message = `Resend answered ${res.status}: ${data?.message ?? "no message"}`;
    // A 4xx (bad key, bad address) sent nothing; a 5xx may have.
    if (res.status < 500) throw new NotDelivered(message);
    throw new Error(message);
  }
  return true;
}

/** Posts the submission to FormSubmit from the server. */
async function deliverWithFormSubmit(subject: string, fields: Record<string, string>) {
  let res: Response;
  try {
    res = await fetch(site.signupEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT),
    });
  } catch (err) {
    throw wrapFetchError("FormSubmit", err);
  }
  const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (String(data?.success) === "true") return true;
  const message = `FormSubmit answered ${res.status}: ${data?.message ?? "no message"}`;
  // An explicit "false", or Cloudflare's 403 challenge, sent nothing.
  if (String(data?.success) === "false" || res.status === 403 || res.status === 429) throw new NotDelivered(message);
  throw new Error(message);
}

/** A connection failure sent nothing; a timeout after connecting may have. */
function wrapFetchError(service: string, err: unknown) {
  const timedOut = err instanceof Error && err.name === "TimeoutError";
  const message = `${service} request failed: ${err instanceof Error ? err.message : String(err)}`;
  return timedOut ? new Error(message) : new NotDelivered(message);
}

const label = (key: string) => key.replace(/_/g, " ");

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
