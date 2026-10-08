import { site } from "./site";

/** Sends a form submission to the signup inbox. Throws if it wasn't delivered. */
export async function submitLead(subject: string, fields: Record<string, string>) {
  const res = await fetch(site.signupEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
  });
  const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
  if (!res.ok || String(data?.success) === "false") throw new Error("Submission failed");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
