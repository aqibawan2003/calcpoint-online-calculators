import { TipTool } from "@/components/tools/TipTool";
import { tipContent } from "@/content/tip";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: tipContent.title,
  description: tipContent.description,
  path: "/tip-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="tip-calculator" content={tipContent}>
      <TipTool />
    </ToolPage>
  );
}
