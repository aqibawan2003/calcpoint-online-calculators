import { AgeTool } from "@/components/tools/AgeTool";
import { ageContent } from "@/content/age";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: ageContent.title,
  description: ageContent.description,
  path: "/age-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="age-calculator" content={ageContent}>
      <AgeTool />
    </ToolPage>
  );
}
