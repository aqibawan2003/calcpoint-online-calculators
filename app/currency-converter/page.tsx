import { CurrencyTool } from "@/components/tools/CurrencyTool";
import { currencyContent } from "@/content/currency";
import { ToolPage } from "@/components/ToolPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: currencyContent.title,
  description: currencyContent.description,
  path: "/currency-converter",
});

export default function Page() {
  return (
    <ToolPage slug="currency-converter" content={currencyContent}>
      <CurrencyTool />
    </ToolPage>
  );
}
