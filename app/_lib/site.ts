// Contact details and links shared across pages.
export const site = {
  email: "play@theloopsocial.ca",
  // Leave empty to hide the link until the real profile URL is known.
  instagramUrl: "",
  tiktokUrl: "",
};

// Server-only: where form submissions are delivered. The /api/lead route
// forwards to FormSubmit, which activates each recipient per site address,
// so requests always identify as the address that has been activated.
export const formDelivery = {
  endpoint: "https://formsubmit.co/ajax/play@theloopsocial.ca",
  activatedOrigin: "https://the-loop-social-club.vercel.app",
};
