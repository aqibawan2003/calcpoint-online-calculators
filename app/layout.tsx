import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { ThirdPartyScripts } from "@/components/ads/ThirdPartyScripts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  robots: { index: true, follow: true },
  verification: {
    google: siteConfig.googleVerification || undefined,
    other: siteConfig.bingVerification ? { "msvalidate.01": siteConfig.bingVerification } : undefined,
  },
  // Lets Google AdSense verify site ownership without loading any ad script.
  other: siteConfig.adsenseClientId ? { "google-adsense-account": siteConfig.adsenseClientId } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

/** Runs before first paint so there is no flash of the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-xl focus:bg-[var(--accent)] focus:px-4 focus:py-3 focus:text-white dark:focus:text-slate-950"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ConsentBanner />
        <ThirdPartyScripts />
        {siteConfig.vercelAnalytics && <Analytics />}
      </body>
    </html>
  );
}
