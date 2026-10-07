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
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Calculator />
      <AdSlot placement="below" className="mt-6" />
      <JsonLd data={[...websiteSchemas(), webApplicationSchema({ name: "Online Calculator", path: "/", description: homeContent.description })]} />
    </div>
  );
}
