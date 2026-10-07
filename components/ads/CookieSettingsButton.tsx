"use client";

import { setConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/siteConfig";

/** Lets visitors reopen the consent banner. Hidden when no ads or analytics are configured. */
export function CookieSettingsButton() {
  if (!siteConfig.adsenseClientId && !siteConfig.gaId) return null;
  return (
    <button type="button" onClick={() => setConsent("unset")} className="flex min-h-11 items-center underline underline-offset-2">
      Cookie settings
    </button>
  );
}
