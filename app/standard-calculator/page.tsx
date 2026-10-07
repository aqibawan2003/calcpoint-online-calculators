import { Calculator } from "@/components/calculator/Calculator";
import { homeContent } from "@/content/home";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: homeContent.title,
  description: homeContent.description,
  path: "/standard-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="standard-calculator" content={homeContent}>
      <Calculator />
    </ToolPage>
  );
}
