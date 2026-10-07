import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: `Privacy Policy – ${siteConfig.name}`,
  description:
    `How ${siteConfig.name} handles data: calculations stay in your browser, what is stored on your device, how ad and analytics cookies work and how to control them.`,
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="October 6, 2026">
      <p>
        This policy explains what information {siteConfig.name} (&quot;we&quot;, &quot;our&quot;) handles when you use this website, and the choices you have.
      </p>
      <h2>Your calculations stay on your device</h2>
      <p>
        All calculations are performed in your browser. The numbers, dates and expressions you enter into our calculators are not transmitted to our servers and we do not
        store them.
      </p>
      <h2>Information stored in your browser</h2>
      <p>To make the site work, we save a few small items in your browser&apos;s local storage:</p>
      <ul>
        <li>Your calculator history, which holds up to your last 20 results.</li>
        <li>Your light or dark theme choice.</li>
        <li>Your cookie consent choice, if advertising or analytics are active.</li>
      </ul>
      <p>This data never leaves your device through our code. You can delete it by using the Clear all button in the history panel or by clearing your browser data.</p>
      <h2>Server logs and hosting</h2>
      <p>
        The site is hosted on Vercel. Like most hosts, the hosting provider may process technical data such as IP address, browser type and request time to deliver the site and
        protect it from abuse. We do not use this data to identify individual visitors.
      </p>
      <h2>Advertising and cookies</h2>
      <p>
        We may show ads served by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this and other websites. Google&apos;s
        use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the internet. You can learn more about how Google uses
        data at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a> and opt out of
        personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a>. You can also visit{" "}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a> to opt out of some third-party vendors&apos; use of cookies for personalized advertising.
      </p>
      <p>
        Where required by law, such as for visitors in the European Economic Area and the United Kingdom, advertising and analytics scripts are loaded only after you accept
        them in the cookie banner. You can change your choice at any time using the Cookie settings link in the footer.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use Google Analytics and Vercel Web Analytics to understand how many people visit and which pages are useful. These services may collect data such as pages viewed,
        approximate location and device type. Google Analytics is loaded only after consent.
      </p>
      <h2>Links to other websites</h2>
      <p>
        Some pages link to other sites, including our developer&apos;s portfolio and, from time to time, affiliate partners. Affiliate links are labeled. We are not responsible for the
        privacy practices of other websites.
      </p>
      <h2>Children</h2>
      <p>This site is a general audience tool and is not directed at children under 13. We do not knowingly collect personal information from children.</p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal data we hold about you, or to object to certain processing. Because we do not collect
        personal data through the calculators, there is usually nothing to retrieve, but you can contact us at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> with any request.
      </p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy as the site changes. The date at the top shows when it was last revised.</p>
    </LegalPage>
  );
}
