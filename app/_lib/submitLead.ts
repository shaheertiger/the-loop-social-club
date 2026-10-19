import { LEAD_FORMS, type LeadForm } from "./leadForms";
import { formBridge, site } from "./site";

export { EMAIL_RE } from "./leadForms";

export type LeadRequest = { type: "lead"; id: string; subject: string; fields: Record<string, string> };
export type LeadResult = { type: "lead-result"; id: string; ok: boolean };

const BRIDGE_LOAD_TIMEOUT = 15_000;
const SUBMIT_TIMEOUT = 25_000;
const FETCH_TIMEOUT = 15_000;
const API_TIMEOUT = 20_000;

/** Posts a submission to the site's own /api/lead route. Throws if it wasn't delivered. */
async function deliverToApi(form: LeadForm, fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form, fields }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      throw new Error(`/api/lead rejected the submission (${res.status}): ${data?.error ?? "no message"}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

/** Posts a submission to FormSubmit from the current page. Throws if it wasn't delivered. */
export async function deliverToFormSubmit(subject: string, fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(site.signupEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (!res.ok || String(data?.success) !== "true") {
      throw new Error(`FormSubmit rejected the submission (${res.status}): ${data?.message ?? "no message"}`);
    }
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
      reject(new Error("Bridge did not load"));
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
 * Sends a form submission to the signup inbox. Throws if it wasn't delivered.
 *
 * Tries, in order:
 *   1. The site's own /api/lead route (same origin, so no CORS, no per-domain
 *      activation and no third-party bot checks in the browser). It emails the
 *      lead from the server; see app/api/lead/route.ts.
 *   2. FormSubmit straight from this page.
 *   3. FormSubmit through the bridge iframe on the activated vercel.app address.
 */
export async function submitLead(form: LeadForm, fields: Record<string, string>) {
  const subject = LEAD_FORMS[form].subject;

  try {
    return await deliverToApi(form, fields);
  } catch (err) {
    console.warn("Server form submission failed, trying FormSubmit directly.", err);
  }

  // On the activated address itself there is nothing to bridge.
  if (window.location.origin === formBridge.origin) {
    return deliverToFormSubmit(subject, fields);
  }

  // Start loading the bridge now so the fallback is quick if it's needed.
  const bridge = loadBridge();
  bridge.catch(() => {});

  try {
    return await deliverToFormSubmit(subject, fields);
  } catch (err) {
    console.warn("Direct form submission failed, trying the bridge.", err);
  }

  try {
    await submitViaBridge(await bridge, subject, fields);
  } catch (err) {
    console.error("Bridge form submission failed.", err);
    throw err;
  }
}

/** Builds a mailto: link holding the submission, for when delivery fails. */
export function leadMailto(form: LeadForm, fields: Record<string, string>) {
  const subject = LEAD_FORMS[form].subject;
  const body = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Sends a submission through the bridge iframe and waits for its reply. */
function submitViaBridge(target: Window, subject: string, fields: Record<string, string>) {
  const id = crypto.randomUUID();

  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error("Submission timed out"));
    }, SUBMIT_TIMEOUT);

    function onMessage(event: MessageEvent<LeadResult>) {
      if (event.origin !== formBridge.origin) return;
      if (event.data?.type !== "lead-result" || event.data.id !== id) return;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      if (event.data.ok) resolve();
      else reject(new Error("Submission failed"));
    }

    window.addEventListener("message", onMessage);
    const message: LeadRequest = { type: "lead", id, subject, fields };
    target.postMessage(message, formBridge.origin);
  });
}
