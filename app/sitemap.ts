import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { siteConfig } from "@/lib/siteConfig";
import { legalPages, tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.contentUpdated);
  const base = siteConfig.url;
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    ...tools.map((t) => ({ url: `${base}${t.path}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${base}/guides`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
    ...guides.map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: new Date(g.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...legalPages.map((p) => ({
      url: `${base}${p.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: p.path === "/about" || p.path === "/contact" ? 0.5 : 0.3,
    })),
  ];
}
