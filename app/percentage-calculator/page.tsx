import { PercentageTool } from "@/components/tools/PercentageTool";
import { percentageContent } from "@/content/percentage";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: percentageContent.title,
  description: percentageContent.description,
  path: "/percentage-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="percentage-calculator" content={percentageContent}>
      <PercentageTool />
    </ToolPage>
  );
}
