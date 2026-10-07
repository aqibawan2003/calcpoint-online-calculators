import Link from "next/link";
import { Calculator } from "@/components/calculator/Calculator";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeContent } from "@/content/home";
import { buildMetadata, webApplicationSchema, websiteSchemas } from "@/lib/seo";

export const metadata = buildMetadata({
  title: homeContent.title,
  description: homeContent.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">{homeContent.h1}</h1>
      <p className="mt-2 max-w-3xl text-lg text-[var(--muted)]">{homeContent.lead}</p>
      <div className="mt-6">
        <Calculator />
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Not sure how to use it?{" "}
        <Link href="/standard-calculator" className="text-[var(--accent-text)] underline underline-offset-2 hover:opacity-80">
          Read the full guide
        </Link>
      </p>
      <AdSlot placement="below" className="mt-8" />
      <JsonLd data={[...websiteSchemas(), webApplicationSchema({ name: "Online Calculator", path: "/", description: homeContent.description })]} />
    </div>
  );
}
