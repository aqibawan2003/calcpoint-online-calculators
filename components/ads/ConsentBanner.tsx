"use client";

import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Cookie and ad consent banner. Shown to every visitor until they choose.
 * Ad and analytics scripts load only after "Accept".
 */
export function ConsentBanner() {
  const consent = useConsent();
  const adsOrAnalytics = Boolean(siteConfig.adsenseClientId || siteConfig.gaId);
  if (consent !== "unset" || !adsOrAnalytics) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl"
    >
      <p className="text-sm leading-6">
        We use cookies for advertising and to measure traffic. You can accept or reject them, and change your mind later from
        the footer. Details are in our{" "}
        <Link href="/privacy-policy" className="font-semibold underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="min-h-11 rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white dark:text-slate-950"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="min-h-11 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-5 text-sm font-semibold"
        >
          Reject
        </button>
      </div>
    </section>
  );
}
