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

const DELIVERY_TIMEOUT = 15_000;

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
  console.log(`[lead] ${form} ${JSON.stringify(fields)}`);

  const errors: string[] = [];
  const deliveries = [
    ["Resend", deliverWithResend],
    ["FormSubmit", deliverWithFormSubmit],
  ] as const;
  for (const [name, deliver] of deliveries) {
    try {
      if (await deliver(subject, fields)) return Response.json({ ok: true });
    } catch (err) {
      errors.push(`${name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.error(`[lead] delivery failed for ${fields.email}: ${errors.join("; ") || "no delivery method configured"}`);
  return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
}

/** Emails the submission through Resend. Returns false when Resend isn't configured. */
async function deliverWithResend(subject: string, fields: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "Loop Social <onboarding@resend.dev>",
      to: [process.env.LEAD_TO_EMAIL ?? site.email],
      reply_to: fields.email,
      subject,
      text: Object.entries(fields)
        .map(([key, value]) => `${label(key)}: ${value}`)
        .join("\n"),
      html: `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${Object.entries(fields)
        .map(
          ([key, value]) =>
            `<tr><th align="left" style="border:1px solid #ddd;background:#f4f4f4">${escapeHtml(label(key))}</th><td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table>`,
    }),
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Resend answered ${res.status}: ${data?.message ?? "no message"}`);
  }
  return true;
}

/** Posts the submission to FormSubmit from the server. */
async function deliverWithFormSubmit(subject: string, fields: Record<string, string>) {
  const res = await fetch(site.signupEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT),
  });
  const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (!res.ok || String(data?.success) !== "true") {
    throw new Error(`FormSubmit answered ${res.status}: ${data?.message ?? "no message"}`);
  }
  return true;
}

const label = (key: string) => key.replace(/_/g, " ");

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
