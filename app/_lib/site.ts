// Contact details and links shared across pages.
export const site = {
  email: "play@theloopsocial.ca",
  // Leave empty to hide the link until the real profile URL is known.
  instagramUrl: "",
  tiktokUrl: "",
  // Where form submissions are delivered (FormSubmit AJAX endpoint).
  signupEndpoint: "https://formsubmit.co/ajax/play@theloopsocial.ca",
};

// FormSubmit activates a recipient separately for each site address, and its
// bot protection blocks requests from servers. So the forms submit from a hidden
// iframe on the one address FormSubmit has activated, whatever domain the page
// is on. See app/submit-bridge and submitLead.ts.
export const formBridge = {
  origin: process.env.NEXT_PUBLIC_FORM_BRIDGE_ORIGIN ?? "https://the-loop-social-club.vercel.app",
  path: "/submit-bridge",
};

const ALLOWED_PARENTS = [
  /^https:\/\/(www\.)?theloopsocial\.ca$/,
  /^https:\/\/the-loop-social-club(-[a-z0-9-]+)?\.vercel\.app$/,
];

/** Whether a page at this origin may use the bridge. */
export function isAllowedParent(origin: string) {
  return origin === formBridge.origin || ALLOWED_PARENTS.some((re) => re.test(origin));
}
