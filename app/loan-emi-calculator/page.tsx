import { EmiTool } from "@/components/tools/EmiTool";
import { loanContent } from "@/content/loan";
import { affiliateLinks } from "@/content/affiliates";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: loanContent.title,
  description: loanContent.description,
  path: "/loan-emi-calculator",
});

export default function Page() {
  return (
    <ToolPage slug="loan-emi-calculator" content={loanContent} affiliates={affiliateLinks.loan}>
      <EmiTool />
    </ToolPage>
  );
}
