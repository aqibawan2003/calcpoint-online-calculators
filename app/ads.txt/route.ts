import { siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-static";

/**
 * Serves /ads.txt for Google AdSense, built from NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * (ca-pub-123 becomes pub-123). Returns 404 until the id is configured.
 */
export function GET() {
  const id = siteConfig.adsenseClientId.replace(/^ca-/, "");
  if (!id) return new Response("Not found", { status: 404 });
  return new Response(`google.com, ${id}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
