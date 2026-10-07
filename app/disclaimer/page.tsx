import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: `Disclaimer – ${siteConfig.name}`,
  description:
    `Limits on using ${siteConfig.name} results: general information only, not financial, medical, legal or tax advice, and currency rates are samples, not live quotes.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer" updated="October 6, 2026">
      <p>The calculators and articles on this site are provided for general information and convenience only.</p>
      <h2>Not professional advice</h2>
      <p>
        Nothing on this site is financial, investment, tax, legal or medical advice. The loan calculator gives an estimate based on a standard formula and does not include fees,
        insurance or variable rates. The BMI calculator provides a screening number and is not a diagnosis. Speak to a qualified professional before you make important decisions.
      </p>
      <h2>Currency rates are samples</h2>
      <p>
        The currency converter uses fixed, approximate sample rates. They are not live, they are not a quote and they must not be used for payments, trading or contracts.
      </p>
      <h2>Accuracy</h2>
      <p>
        We test the calculators and fix errors when we find them, but we cannot guarantee that every result is free of mistakes. Computers have limits on precision, and results are
        rounded for display. Check important results independently.
      </p>
      <h2>External links</h2>
      <p>Links to other websites are provided for convenience. We do not endorse or control the content of linked sites.</p>
      <h2>Use at your own risk</h2>
      <p>You use the site and its results at your own risk. See the <a href="/terms">Terms of Use</a> for the full limits on our liability.</p>
    </LegalPage>
  );
}
