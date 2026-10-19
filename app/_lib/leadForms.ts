// The site's forms: the email subject each one sends and the fields it may carry.
// Shared by the browser (submitLead.ts) and the server route (app/api/lead).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LEAD_FORMS = {
  founders: {
    subject: "New Founders List signup — Loop Social",
    fields: [
      "list",
      "name",
      "first_name",
      "last_name",
      "email",
      "phone",
      "postal_code",
      "interests",
      "pickleball_level",
      "consent",
    ],
  },
  careers: {
    subject: "New job interest — Loop Social",
    fields: ["list", "name", "email", "phone", "roles", "about"],
  },
} as const;

export type LeadForm = keyof typeof LEAD_FORMS;

export const MAX_FIELD_LENGTH = 2000;

export function isLeadForm(value: unknown): value is LeadForm {
  return typeof value === "string" && value in LEAD_FORMS;
}

/** Keeps only the form's known fields, trimmed and capped in length. */
export function cleanLeadFields(form: LeadForm, raw: Record<string, unknown>) {
  const fields: Record<string, string> = {};
  for (const key of LEAD_FORMS[form].fields) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) fields[key] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }
  return fields;
}
