"use client";

import { useSyncExternalStore } from "react";

export type ConsentState = "granted" | "denied" | "unset";

const KEY = "calcpoint-consent";
const EVENT = "calcpoint-consent-change";

function read(): ConsentState {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Current consent choice. Server render and first client render both return "unset". */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "unset" as ConsentState);
}

export function setConsent(value: ConsentState): void {
  try {
    if (value === "unset") window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable: choice only lasts for this page view */
  }
  window.dispatchEvent(new Event(EVENT));
}
