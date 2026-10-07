"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/siteConfig";

type Placement = "below" | "inline" | "sidebar";

/** Slot ids come from env vars so you never edit code after AdSense approval. */
const slotIds: Record<Placement, string> = {
  below: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW?.trim() || "",
  inline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE?.trim() || "",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR?.trim() || "",
};

const heights: Record<Placement, string> = {
  below: "min-h-[280px]",
  inline: "min-h-[280px]",
  sidebar: "min-h-[600px]",
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reserved-height ad container so ads never shift the layout.
 * Renders nothing until an AdSense client id and slot id are configured,
 * and nothing if the visitor rejected cookies.
 */
export function AdSlot({ placement, className = "" }: { placement: Placement; className?: string }) {
  const consent = useConsent();
  const pushed = useRef(false);
  const slot = slotIds[placement];
  const enabled = Boolean(siteConfig.adsenseClientId && slot);

  useEffect(() => {
    if (!enabled || consent !== "granted" || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad script blocked or not ready: leave the reserved space empty */
    }
  }, [enabled, consent]);

  if (!enabled || consent === "denied") return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`${heights[placement]} ${placement === "sidebar" ? "hidden lg:block" : ""} ${className}`}
    >
      <p className="mb-1 text-xs uppercase tracking-wide text-[var(--muted)]">Advertisement</p>
      {consent === "granted" && (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={siteConfig.adsenseClientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}
