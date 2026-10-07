import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/components/seo/RichText";
import { getGuide, guides } from "@/content/guides";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const tool = getTool(g.toolSlug);
  const path = `/guides/${g.slug}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: g.title, path },
        ]}
      />
      <article className="prose-calc mt-4">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{g.title}</h1>
        <p className="!mt-3 text-sm !text-[var(--muted)]">
          Published <time dateTime={g.date}>{g.date}</time>
        </p>
        <p className="text-lg">{g.intro}</p>
        {g.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>
                <RichText text={p} />
              </p>
            ))}
          </section>
        ))}
        <h2>Try it yourself</h2>
        <p>
          Put the method into practice with our free <Link href={tool.path}>{tool.name}</Link>.
        </p>
      </article>
      <JsonLd data={articleSchema({ title: g.title, description: g.description, path, date: g.date })} />
    </div>
  );
}
