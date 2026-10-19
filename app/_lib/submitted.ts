"use client";

import { useSyncExternalStore } from "react";
import type { LeadForm } from "./leadForms";

// Remembers in this browser that a form was already sent, so the visitor sees
// a confirmation instead of the form and can't send it twice. Stored in
// localStorage, with a cookie as a backup for browsers that clear one of them.

const KEY = (form: LeadForm) => `loop-submitted-${form}`;
const MAX_AGE = 60 * 60 * 24 * 365; // one year, in seconds
const listeners = new Set<() => void>();

export function markSubmitted(form: LeadForm) {
  try {
    localStorage.setItem(KEY(form), new Date().toISOString());
  } catch {}
  try {
    document.cookie = `${KEY(form)}=1; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
  } catch {}
  listeners.forEach((notify) => notify());
}

function hasSubmitted(form: LeadForm) {
  try {
    if (localStorage.getItem(KEY(form))) return true;
  } catch {}
  try {
    return document.cookie.split("; ").some((c) => c.startsWith(`${KEY(form)}=`));
  } catch {
    return false;
  }
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

/** Whether this browser already sent the form. False during server rendering. */
export function useAlreadySubmitted(form: LeadForm) {
  return useSyncExternalStore(
    subscribe,
    () => hasSubmitted(form),
    () => false,
  );
}
