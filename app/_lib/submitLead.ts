import { LEAD_FORMS, type LeadForm } from "./leadForms";
import { formBridge, site } from "./site";

export { EMAIL_RE } from "./leadForms";

export type LeadRequest = { type: "lead"; id: string; subject: string; fields: Record<string, string> };
export type LeadResult = { type: "lead-result"; id: string; ok: boolean; rejected: boolean };

const BRIDGE_LOAD_TIMEOUT = 15_000;
const SUBMIT_TIMEOUT = 45_000;
const FETCH_TIMEOUT = 30_000;
const API_TIMEOUT = 40_000;

/**
 * A delivery attempt that definitely sent nothing, so another path may safely
 * try. Any other error is ambiguous: the request went out and the email may
 * already be on its way, so retrying would send it twice.
 */
export class LeadRejected extends Error {}

/** Whether a fetch error means the request never left the browser. */
const neverSent = (err: unknown) => err instanceof TypeError;

/** Posts a submission to the site's own /api/lead route. */
async function deliverToApi(form: LeadForm, fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT);
  try {
    let res: Response;
    try {
      res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form, fields }),
        signal: controller.signal,
      });
    } catch (err) {
      if (neverSent(err)) throw new LeadRejected("Could not reach /api/lead");
      throw err;
    }
    const data = (await res.json().catch(() => null)) as { ok?: boolean; retryable?: boolean; error?: string } | null;
    if (res.ok && data?.ok) return;
    const message = `/api/lead rejected the submission (${res.status}): ${data?.error ?? "no message"}`;
    if (res.status === 400 || data?.retryable) throw new LeadRejected(message);
    throw new Error(message);
  } finally {
    clearTimeout(timer);
  }
}

/** Posts a submission to FormSubmit from the current page. */
export async function deliverToFormSubmit(subject: string, fields: Record<string, string>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    let res: Response;
    try {
      res = await fetch(site.signupEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, _subject: subject, _template: "table" }),
        signal: controller.signal,
      });
    } catch (err) {
      if (neverSent(err)) throw new LeadRejected("Could not reach FormSubmit");
      throw err;
    }
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (String(data?.success) === "true") return;
    const message = `FormSubmit rejected the submission (${res.status}): ${data?.message ?? "no message"}`;
    // An explicit "false" (e.g. "needs activation") sent nothing. Anything else
    // (a Cloudflare page, an empty body) may still have been delivered.
    if (String(data?.success) === "false" || res.status === 403 || res.status === 429) throw new LeadRejected(message);
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
 * Sends a form submission to the signup inbox, exactly once.
 *
 * Tries, in order, moving on only when the previous path definitely sent
 * nothing (LeadRejected):
 *   1. The site's own /api/lead route (same origin, so no CORS, no per-domain
 *      activation and no third-party bot checks in the browser). It logs the
 *      lead and emails it from the server; see app/api/lead/route.ts.
 *   2. FormSubmit straight from this page.
 *   3. FormSubmit through the bridge iframe on the activated vercel.app address.
 *
 * Resolves when a path delivered, or when a path's outcome is unknown (the
 * request went out but the reply was unreadable or timed out). Retrying in
 * that case sends duplicate emails, and the lead is already in the server log.
 * Throws LeadRejected only when every path definitely failed.
 */
export async function submitLead(form: LeadForm, fields: Record<string, string>) {
  const subject = LEAD_FORMS[form].subject;

  const attempts: Array<[string, () => Promise<void>]> = [["/api/lead", () => deliverToApi(form, fields)]];
  if (window.location.origin === formBridge.origin) {
    // On the activated address itself there is nothing to bridge.
    attempts.push(["FormSubmit", () => deliverToFormSubmit(subject, fields)]);
  } else {
    attempts.push(
      ["FormSubmit", () => deliverToFormSubmit(subject, fields)],
      ["bridge", async () => submitViaBridge(await loadBridge(), subject, fields)],
    );
  }

  let lastError: unknown;
  for (const [name, attempt] of attempts) {
    try {
      return await attempt();
    } catch (err) {
      lastError = err;
      if (!(err instanceof LeadRejected)) {
        console.warn(`${name}: outcome unknown, assuming delivered to avoid a duplicate.`, err);
        return;
      }
      console.warn(`${name} did not accept the submission.`, err);
    }
  }
  throw lastError;
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
      reject(new Error("Bridge submission timed out"));
    }, SUBMIT_TIMEOUT);

    function onMessage(event: MessageEvent<LeadResult>) {
      if (event.origin !== formBridge.origin) return;
      if (event.data?.type !== "lead-result" || event.data.id !== id) return;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      if (event.data.ok) resolve();
      else if (event.data.rejected) reject(new LeadRejected("Bridge submission rejected"));
      else reject(new Error("Bridge submission outcome unknown"));
    }

    window.addEventListener("message", onMessage);
    const message: LeadRequest = { type: "lead", id, subject, fields };
    target.postMessage(message, formBridge.origin);
  });
}
