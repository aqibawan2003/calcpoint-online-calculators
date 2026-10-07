import { Calculator } from "@/components/calculator/Calculator";
import { scientificContent } from "@/content/scientific";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: scientificContent.title,
  description: scientificContent.description,
  path: "/scientific-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="scientific-calculator" content={scientificContent}>
      <Calculator defaultScientific />
    </ToolPage>
  );
}
