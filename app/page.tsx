import { Calculator } from "@/components/calculator/Calculator";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { ToolArticle } from "@/components/ToolPage";
import { homeContent } from "@/content/home";
import { buildMetadata, webApplicationSchema, websiteSchemas } from "@/lib/seo";

export const metadata = buildMetadata({ title: homeContent.title, description: homeContent.description, path: "/" });

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">{homeContent.h1}</h1>
      <p className="mt-2 max-w-3xl text-lg text-[var(--muted)]">{homeContent.lead}</p>
      <div className="mt-6">
        <Calculator />
      </div>
      <AdSlot placement="below" className="mt-8" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <ToolArticle content={homeContent} inlineAd={<AdSlot placement="inline" className="my-6" />} />
          <FaqSection faq={homeContent.faq} />
          <RelatedTools slugs={["scientific-calculator", "percentage-calculator", "unit-converter", "loan-emi-calculator"]} />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <AdSlot placement="sidebar" />
          </div>
        </div>
      </div>
      <JsonLd data={[...websiteSchemas(), webApplicationSchema({ name: "Online Calculator", path: "/", description: homeContent.description })]} />
    </div>
  );
}
