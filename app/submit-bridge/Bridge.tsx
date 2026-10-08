"use client";

import { useEffect } from "react";
import { isAllowedParent } from "../_lib/site";
import { deliverToFormSubmit, type LeadRequest, type LeadResult } from "../_lib/submitLead";

/** Relays form submissions from an allowed parent page to FormSubmit. */
export function Bridge() {
  useEffect(() => {
    if (window.parent === window) return;

    async function onMessage(event: MessageEvent<LeadRequest>) {
      if (!isAllowedParent(event.origin) || event.data?.type !== "lead") return;
      const { id, subject, fields } = event.data;
      if (typeof id !== "string" || typeof subject !== "string" || !fields || typeof fields !== "object") return;

      let ok = true;
      try {
        await deliverToFormSubmit(subject, fields);
      } catch {
        ok = false;
      }
      const result: LeadResult = { type: "lead-result", id, ok };
      (event.source as Window | null)?.postMessage(result, event.origin);
    }

    window.addEventListener("message", onMessage);

    // Tell the page that embedded us that we are listening.
    let parentOrigin = "";
    try {
      parentOrigin = new URL(document.referrer).origin;
    } catch {}
    if (isAllowedParent(parentOrigin)) {
      window.parent.postMessage({ type: "bridge-ready" }, parentOrigin);
    }

    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
