import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: `Contact ${siteConfig.name} – Report a Bug or Suggest a Tool`,
  description:
    `Contact the ${siteConfig.name} team to report a wrong result, ask a question about a calculator, suggest a new tool or raise a privacy request. We read every message.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage title="Contact" path="/contact" updated="October 6, 2026">
      <p>We read every message. The quickest way to reach us is by email.</p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
      </p>
      <p>Please allow a few working days for a reply.</p>
      <h2>What to include when you report a problem</h2>
      <ul>
        <li>The page you were on, for example the percentage calculator.</li>
        <li>The exact numbers or expression you entered.</li>
        <li>The result you got and the result you expected.</li>
        <li>Your device and browser, if the problem looks like a display issue.</li>
      </ul>
      <h2>Other requests</h2>
      <p>
        You can also write to us to suggest a new calculator, ask about advertising or partnerships, or make a privacy request as described in the{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <p>
        We do not provide personal financial, medical or legal advice. For those questions, speak with a qualified professional.
      </p>
    </LegalPage>
  );
}
