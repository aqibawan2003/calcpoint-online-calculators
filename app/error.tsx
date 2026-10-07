"use client";

import Link from "next/link";

/** Friendly fallback if something unexpected fails while rendering a page. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-[var(--muted)]">An unexpected error stopped this page from loading. Try again, or go back to the home page.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="min-h-11 rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white dark:text-slate-950">
          Try again
        </button>
        <Link href="/" className="flex min-h-11 items-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-5 text-sm font-semibold">
          Go to home page
        </Link>
      </div>
    </div>
  );
}
