import { UnitTool } from "@/components/tools/UnitTool";
import { unitContent } from "@/content/unit";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: unitContent.title,
  description: unitContent.description,
  path: "/unit-converter",
});

export default function Page() {
  return (
    <ToolPage slug="unit-converter" content={unitContent}>
      <UnitTool />
    </ToolPage>
  );
}
