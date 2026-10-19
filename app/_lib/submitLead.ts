import { LEAD_FORMS, type LeadForm } from "./leadForms";
import { formBridge, site } from "./site";

export { EMAIL_RE } from "./leadForms";

export type LeadRequest = { type: "lead"; id: string; subject: string; fields: Record<string, string> };
export type LeadResult = { type: "lead-result"; id: string; ok: boolean; rejected: boolean };

const BRIDGE_LOAD_TIMEOUT = 15_000;
const SUBMIT_TIMEOUT = 45_000;
const FETCH_TIMEOUT = 30_000;

/**
 * FormSubmit definitely sent nothing (e.g. "This form needs Activation"), so
 * the bridge may safely try. Any other error is ambiguous: the request went
 * out and the email may be on its way, so retrying would send it twice.
 */
export class LeadRejected extends Error {}

/**
 * Posts a submission to FormSubmit from the current page.
 *
 * Sent as a plain form post (no CORS preflight) with keepalive, so it still
 * completes if the visitor leaves the page.
 */
export async function deliverToFormSubmit(subject: string, fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    let res: Response;
    try {
      res = await fetch(site.signupEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ ...fields, _subject: subject, _template: "table", _captcha: "false" }),
        signal: controller.signal,
        keepalive: true,
      });
    } catch (err) {
      // A TypeError means the request never got a connection.
      if (err instanceof TypeError) throw new LeadRejected("Could not reach FormSubmit");
      throw err;
    }
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (String(data?.success) === "true") return;
    const message = `FormSubmit rejected the submission (${res.status}): ${data?.message ?? "no message"}`;
    if (String(data?.success) === "false") throw new LeadRejected(message);
    throw new Error(message);
  } finally {
    clearTimeout(timer);
  }
}

let bridgeWindow: Promise<Window> | null = null;

/** Loads the hidden bridge iframe once and resolves when it reports ready. */
function loadBridge(): Promise<Window> {
  if (bridgeWindow) return bridgeWindow;
  bridgeWindow = new Promise<Window>((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.src = formBridge.origin + formBridge.path;
    iframe.title = "Form submission bridge";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";

    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      bridgeWindow = null;
      reject(new LeadRejected("Bridge did not load"));
    }, BRIDGE_LOAD_TIMEOUT);

    function onMessage(event: MessageEvent) {
      if (event.origin !== formBridge.origin || event.data?.type !== "bridge-ready") return;
      if (!iframe.contentWindow) return;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      resolve(iframe.contentWindow);
    }

    window.addEventListener("message", onMessage);
    document.body.appendChild(iframe);
  });
  return bridgeWindow;
}

/**
 * Sends a form submission to FormSubmit, exactly once.
 *
 * Posts straight from this page. Only if FormSubmit explicitly refuses it
 * (the domain isn't activated yet) does it go through the bridge iframe on the
 * activated vercel.app address instead. A slow or unreadable reply is never
 * retried, since FormSubmit may already have sent the email.
 */
export async function submitLead(form: LeadForm, fields: Record<string, string>) {
  const subject = LEAD_FORMS[form].subject;
  try {
    return await deliverToFormSubmit(subject, fields);
  } catch (err) {
    if (!(err instanceof LeadRejected) || window.location.origin === formBridge.origin) throw err;
    console.warn("FormSubmit refused the submission from this address, trying the bridge.", err);
  }
  await submitViaBridge(await loadBridge(), subject, fields);
}

/**
 * Sends a submission in the background. The forms show the thank-you page
 * straight away instead of making the visitor wait on FormSubmit.
 */
export function submitLeadInBackground(form: LeadForm, fields: Record<string, string>) {
  submitLead(form, fields).catch((err) => console.error("Form submission was not delivered.", err));
}

/** Where to send the visitor once they've submitted. */
export function thankYouUrl(form: LeadForm, name: string) {
  const query = new URLSearchParams({ form });
  if (name.trim()) query.set("name", name.trim());
  return `/thank-you?${query}`;
}

/** Sends a submission through the bridge iframe and waits for its reply. */
function submitViaBridge(target: Window, subject: string, fields: Record<string, string>) {
  const id = crypto.randomUUID();

  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error("Bridge submission timed out"));
    }, SUBMIT_TIMEOUT);

    function onMessage(event: MessageEvent<LeadResult>) {
      if (event.origin !== formBridge.origin) return;
      if (event.data?.type !== "lead-result" || event.data.id !== id) return;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      if (event.data.ok) resolve();
      else reject(new Error(event.data.rejected ? "Bridge submission rejected" : "Bridge submission outcome unknown"));
    }

    window.addEventListener("message", onMessage);
    const message: LeadRequest = { type: "lead", id, subject, fields };
    target.postMessage(message, formBridge.origin);
  });
}
