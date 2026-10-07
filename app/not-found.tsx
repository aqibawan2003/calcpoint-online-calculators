import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: { absolute: "Page not found" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-[var(--muted)]">The page you tried to open does not exist or has moved. These calculators are a good place to start:</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        <li>
          <Link href="/" className="card flex min-h-12 items-center px-4 font-semibold hover:bg-[var(--surface-2)]">
            Standard calculator
          </Link>
        </li>
        {tools.map((t) => (
          <li key={t.slug}>
            <Link href={t.path} className="card flex min-h-12 items-center px-4 font-semibold hover:bg-[var(--surface-2)]">
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
