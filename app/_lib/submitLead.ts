export type LeadForm = "founders" | "careers";

/** Sends a form submission via /api/lead. Throws if it wasn't delivered. */
export async function submitLead(form: LeadForm, fields: Record<string, string>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ form, fields }),
  });
  const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !data?.ok) throw new Error("Submission failed");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
