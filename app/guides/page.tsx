import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calculator Guides – Percentages, Loans and Trig Explained",
  description:
    "Plain-English guides explaining percentages, loan EMIs, angle modes and more, with worked examples and links to the matching free calculators.",
  path: "/guides",
});

export default function GuidesIndex() {
  const sorted = [...guides].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Calculator Guides</h1>
      <p className="mt-2 max-w-2xl text-lg text-[var(--muted)]">Short explanations of the maths behind our tools, with worked examples you can check yourself.</p>
      <ul className="mt-8 space-y-4">
        {sorted.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="card block p-5 transition-colors hover:bg-[var(--surface-2)]">
              <h2 className="font-display text-xl font-bold">{g.title}</h2>
              <p className="mt-1 text-[var(--muted)]">{g.description}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                <time dateTime={g.date}>{g.date}</time>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
