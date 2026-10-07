import Link from "next/link";
import { CookieSettingsButton } from "./ads/CookieSettingsButton";
import { siteConfig } from "@/lib/siteConfig";
import { legalPages, tools } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-white dark:bg-slate-950">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-display text-xl font-bold select-none shadow-lg">
                C
              </span>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm leading-6 text-[var(--muted)] max-w-xs">
              {siteConfig.tagline}. Every calculation runs entirely in your browser — nothing is ever sent to a server.
            </p>
          </div>

          {/* Calculators Column */}
          <nav aria-label="Calculators">
            <h4 className="font-display font-semibold text-[var(--text)] mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {tools.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.path}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t.name.replace(" Calculator", "").replace(" Converter", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Column */}
          <nav aria-label="Resources">
            <h4 className="font-display font-semibold text-[var(--text)] mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/guides"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal Column */}
          <nav aria-label="Legal">
            <h4 className="font-display font-semibold text-[var(--text)] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {legalPages.map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-2)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--muted)] md:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[var(--text)]">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p>
            Made with{" "}
            <span className="text-rose-500" aria-hidden="true">&#9829;</span>{" "}
            by{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              {siteConfig.author.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
