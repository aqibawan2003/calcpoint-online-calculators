/** Single place to rename the site or change author details. */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "CalcPoint",
  tagline: "Free online calculators that load fast and work everywhere",
  url: resolveSiteUrl(),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "aqibawan0102@gmail.com",
  author: {
    name: "Aqib Ejaz",
    url: "https://aqibawan2003.vercel.app",
  },
  /** Used for sitemap lastModified. Update when you change page content. */
  contentUpdated: "2026-10-06",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
  vercelAnalytics: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true",
  /** Search engine ownership verification codes (meta tag method). */
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || "",
} as const;
