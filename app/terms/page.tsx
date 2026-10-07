import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: `Terms of Use – ${siteConfig.name}`,
  description:
    `The terms for using ${siteConfig.name} calculators: acceptable use, accuracy limits, intellectual property, third-party ads and links, and limits on our liability.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="October 6, 2026">
      <p>By using {siteConfig.name} you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Use of the site</h2>
      <p>
        You may use the calculators for personal or business purposes free of charge. Do not attempt to disrupt the site, overload it with automated traffic, probe it for
        vulnerabilities without permission or copy it in bulk with scrapers.
      </p>
      <h2>Accuracy of results</h2>
      <p>
        We work to make the calculators correct, but we do not guarantee that results are free of error or suitable for any particular purpose. Results are estimates for general
        information. Please verify anything important before relying on it. See also our <a href="/disclaimer">Disclaimer</a>.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The text, design and code of this site belong to its author unless stated otherwise. You may link to any page. You may not republish the written content as your own.
      </p>
      <h2>Advertising and affiliate links</h2>
      <p>
        The site may display advertisements and affiliate links. Ads are labeled. We do not control the content of advertisers or third-party sites and are not responsible for them.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, we are not liable for any loss or damage arising from your use of the site or reliance on its results, including financial, medical or
        legal decisions.
      </p>
      <h2>Changes and availability</h2>
      <p>We may change, suspend or remove any part of the site at any time, and we may update these terms. Continued use after a change means you accept the new terms.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
