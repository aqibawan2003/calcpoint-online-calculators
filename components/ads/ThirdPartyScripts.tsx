"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/siteConfig";

/** Loads Google AdSense and Google Analytics only after the visitor accepts. */
export function ThirdPartyScripts() {
  const consent = useConsent();
  if (consent !== "granted") return null;
  const { adsenseClientId, gaId } = siteConfig;

  return (
    <>
      {adsenseClientId && (
        <Script
          id="adsense-loader"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClientId)}`}
        />
      )}
      {gaId && (
        <>
          <Script id="ga-loader" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId.replace(/[^A-Za-z0-9-]/g, "")}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
