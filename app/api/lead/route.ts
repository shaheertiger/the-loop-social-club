import { formDelivery } from "../../_lib/site";
import { EMAIL_RE, type LeadForm } from "../../_lib/submitLead";

// Each form's email subject and the fields it may send.
const FORMS: Record<LeadForm, { subject: string; fields: string[] }> = {
  founders: {
    subject: "New Founders List signup — Loop Social",
    fields: ["list", "name", "email", "phone", "interests"],
  },
  careers: {
    subject: "New job interest — Loop Social",
    fields: ["list", "name", "email", "phone", "roles", "about"],
  },
};

const MAX_FIELD_LENGTH = 2000;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    form?: string;
    fields?: Record<string, unknown>;
  } | null;

  const config = body?.form ? FORMS[body.form as LeadForm] : undefined;
  if (!config || !body?.fields || typeof body.fields !== "object") {
    return Response.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const key of config.fields) {
    const value = body.fields[key];
    if (typeof value === "string") fields[key] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }
  if (!fields.name || !EMAIL_RE.test(fields.email ?? "")) {
    return Response.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
  }

  try {
    const res = await fetch(formDelivery.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: formDelivery.activatedOrigin,
        Referer: `${formDelivery.activatedOrigin}/`,
      },
      body: JSON.stringify({ ...fields, _subject: config.subject, _template: "table" }),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (!res.ok || String(data?.success) !== "true") {
      console.error("FormSubmit rejected submission", res.status, data?.message);
      return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("FormSubmit request failed", error);
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
