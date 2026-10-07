import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTool } from "@/lib/tools";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="font-display text-2xl font-bold">
        Related calculators
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {slugs.map((s) => {
          const t = getTool(s);
          return (
            <li key={s}>
              <Link href={t.path} className="card flex h-full items-start justify-between gap-3 p-4 transition-colors hover:bg-[var(--surface-2)]">
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-[var(--muted)]">{t.short}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-text)]" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
