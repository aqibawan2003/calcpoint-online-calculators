import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <article className="prose-calc mt-4">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="!mt-2 text-sm !text-[var(--muted)]">Last updated: {updated}</p>
        {children}
      </article>
    </div>
  );
}
