import Link from "next/link";
import { CookieSettingsButton } from "./ads/CookieSettingsButton";
import { siteConfig } from "@/lib/siteConfig";
import { legalPages, tools } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">{siteConfig.tagline}. All calculations run in your browser and are never sent to a server.</p>
        </div>
        <nav aria-label="Calculators">
          <p className="font-display font-bold">Calculators</p>
          <ul className="mt-2 grid grid-cols-1 text-sm">
            <li>
              <Link href="/" className="flex min-h-11 items-center underline-offset-2 hover:underline">
                Standard calculator
              </Link>
            </li>
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={t.path} className="flex min-h-11 items-center underline-offset-2 hover:underline">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal and company">
          <p className="font-display font-bold">Company</p>
          <ul className="mt-2 text-sm">
            <li>
              <Link href="/guides" className="flex min-h-11 items-center underline-offset-2 hover:underline">
                Guides
              </Link>
            </li>
            {legalPages.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="flex min-h-11 items-center underline-offset-2 hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--border)]">
        <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm text-[var(--muted)]">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Results are for general use only.
          </span>
          <span>
            Made by{" "}
            <a href={siteConfig.author.url} target="_blank" rel="noopener" className="font-semibold text-[var(--accent-text)] underline underline-offset-2">
              {siteConfig.author.name}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
