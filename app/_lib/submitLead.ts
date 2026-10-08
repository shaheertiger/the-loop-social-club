import { formBridge, site } from "./site";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadRequest = { type: "lead"; id: string; subject: string; fields: Record<string, string> };
export type LeadResult = { type: "lead-result"; id: string; ok: boolean };

const BRIDGE_LOAD_TIMEOUT = 15_000;
const SUBMIT_TIMEOUT = 25_000;

/** Posts a submission to FormSubmit from the current page. Throws if it wasn't delivered. */
export async function deliverToFormSubmit(subject: string, fields: Record<string, string>) {
  const res = await fetch(site.signupEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
  });
  const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
  if (!res.ok || String(data?.success) !== "true") throw new Error("Submission failed");
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

/** Sends a form submission to the signup inbox. Throws if it wasn't delivered. */
export async function submitLead(subject: string, fields: Record<string, string>) {
  // On the activated address itself there is nothing to bridge.
  if (window.location.origin === formBridge.origin) {
    return deliverToFormSubmit(subject, fields);
  }

  const target = await loadBridge();
  const id = crypto.randomUUID();

  await new Promise<void>((resolve, reject) => {
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
