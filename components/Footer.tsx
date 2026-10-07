import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CookieSettingsButton } from "./ads/CookieSettingsButton";
import { siteConfig } from "@/lib/siteConfig";
import { legalPages, tools } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="mt-16">
      {/* Rainbow accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />

      {/* Brand strip */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 px-4 py-10">
        <div className="mx-auto max-w-6xl flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-display text-xl font-bold select-none">
                C
              </span>
              <span className="font-display text-xl font-bold text-white">{siteConfig.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
              {siteConfig.tagline}. Every calculation runs entirely in your browser — nothing is ever sent to a server.
            </p>
          </div>
          <a
            href={siteConfig.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Portfolio
          </a>
        </div>
      </div>

      {/* Links section */}
      <div className="bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Calculators */}
          <nav aria-label="Calculators">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-5 w-1 rounded-full bg-blue-500" />
              <p className="font-display font-bold text-[var(--text)]">Calculators</p>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/"
                  className="flex min-h-9 items-center gap-1.5 hover:text-[var(--accent-text)] transition-colors"
                >
                  Standard
                </Link>
              </li>
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.path}
                    className="flex min-h-9 items-center gap-1.5 hover:text-[var(--accent-text)] transition-colors"
                  >
                    {t.name.replace(" Calculator", "").replace(" Converter", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-5 w-1 rounded-full bg-violet-500" />
              <p className="font-display font-bold text-[var(--text)]">Resources</p>
            </div>
            <ul className="text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/guides"
                  className="flex min-h-9 items-center hover:text-[var(--accent-text)] transition-colors"
                >
                  Guides
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-5 w-1 rounded-full bg-emerald-500" />
              <p className="font-display font-bold text-[var(--text)]">Legal</p>
            </div>
            <ul className="text-sm text-[var(--muted)]">
              {legalPages.map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="flex min-h-9 items-center hover:text-[var(--accent-text)] transition-colors"
                  >
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

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] bg-[var(--surface-2)]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-[var(--muted)]">
            <span>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-[var(--text)]">{siteConfig.name}</span>. Results are for general use only.
            </span>
            <span>
              Made with{" "}
              <span className="text-rose-500" aria-hidden="true">&#9829;</span>{" "}
              by{" "}
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent-text)] underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {siteConfig.author.name}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
