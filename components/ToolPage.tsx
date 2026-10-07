import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { AffiliateBlock, type AffiliateLink } from "@/components/ads/AffiliateBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { ToolContent } from "@/content/types";
import { guideForTool } from "@/content/guides";
import { webApplicationSchema } from "@/lib/seo";
import { getTool } from "@/lib/tools";

interface ToolPageProps {
  slug: string;
  content: ToolContent;
  children: ReactNode;
  affiliates?: AffiliateLink[];
}

/** Shared layout: header crumbs, tool, ads, written content, FAQ, related tools. */
export function ToolPage({ slug, content, children, affiliates = [] }: ToolPageProps) {
  const tool = getTool(slug);
  const guide = guideForTool(slug);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: tool.name, path: tool.path },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{content.h1}</h1>
      <p className="mt-2 max-w-3xl text-lg text-[var(--muted)]">{content.lead}</p>
      <div className="mt-6">{children}</div>
      <AdSlot placement="below" className="mt-8" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <ToolArticle content={content} inlineAd={<AdSlot placement="inline" className="my-6" />} guideLink={guide ? { slug: guide.slug, title: guide.title } : undefined} />
          <AffiliateBlock links={affiliates} />
          <FaqSection faq={content.faq} />
          <RelatedTools slugs={tool.related} />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <AdSlot placement="sidebar" />
          </div>
        </div>
      </div>
      <JsonLd data={webApplicationSchema({ name: tool.name, path: tool.path, description: content.description })} />
    </div>
  );
}

/** The written content block, shared by every calculator page including the home page. */
export function ToolArticle({
  content,
  inlineAd,
  guideLink,
}: {
  content: ToolContent;
  inlineAd?: ReactNode;
  guideLink?: { slug: string; title: string };
}) {
  return (
    <article className="prose-calc">
      <h2>What this calculator does</h2>
      {content.whatItDoes.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      <h2>How to use it</h2>
      <ol>
        {content.steps.map((s) => (
          <li key={s.slice(0, 40)}>{s}</li>
        ))}
      </ol>
      {inlineAd}
      <h2>The formula and method</h2>
      {content.formulaIntro.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      <h3>Worked examples</h3>
      <ul>
        {content.examples.map((e) => (
          <li key={e.title}>
            <strong>{e.title}.</strong> {e.body}
          </li>
        ))}
      </ul>
      <h2>Common mistakes and edge cases</h2>
      <ul>
        {content.mistakes.map((m) => (
          <li key={m.slice(0, 40)}>{m}</li>
        ))}
      </ul>
      <h2>About this tool</h2>
      <p>{content.about}</p>
      {guideLink && (
        <p>
          Want a longer walkthrough? Read our guide: <Link href={`/guides/${guideLink.slug}`}>{guideLink.title}</Link>.
        </p>
      )}
    </article>
  );
}
