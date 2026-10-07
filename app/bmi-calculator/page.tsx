import { BMITool } from "@/components/tools/BMITool";
import { bmiContent } from "@/content/bmi";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: bmiContent.title,
  description: bmiContent.description,
  path: "/bmi-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="bmi-calculator" content={bmiContent}>
      <BMITool />
    </ToolPage>
  );
}
