// The site's forms and the email subject each one sends.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LEAD_FORMS = {
  founders: { subject: "New Founders List signup — Loop Social" },
  careers: { subject: "New job interest — Loop Social" },
} as const;

export type LeadForm = keyof typeof LEAD_FORMS;
