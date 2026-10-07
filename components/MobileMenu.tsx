"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tools } from "@/lib/tools";

/** Hamburger menu shown below the lg breakpoint. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="All calculators" className="absolute inset-x-0 top-full border-b border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
          <ul className="mx-auto grid max-w-6xl gap-1 sm:grid-cols-2">
            <li>
              <Link href="/" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 font-medium hover:bg-[var(--surface-2)]">
                Calculator
              </Link>
            </li>
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={t.path} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 font-medium hover:bg-[var(--surface-2)]">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 font-medium hover:bg-[var(--surface-2)]">
                Guides
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
