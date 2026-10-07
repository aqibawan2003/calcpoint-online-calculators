import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = buildMetadata({
  title: `About ${siteConfig.name} – Free, Fast Online Calculators`,
  description:
    `Learn why ${siteConfig.name} exists, how the calculators run in your browser, the standards we follow for clear, honest results and how to contact the builder.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage title="About" path="/about" updated="October 6, 2026">
      <p>
        {siteConfig.name} is a small collection of free online calculators built to be quick to open, easy to read and simple to trust. There is a standard and scientific calculator, a
        percentage tool, a BMI calculator, a unit converter, a currency estimator, an age calculator, a loan EMI calculator and a tip splitter.
      </p>
      <h2>Why this site exists</h2>
      <p>
        Many calculator sites are slow, crowded with pop-ups and vague about how they get their answers. We wanted the opposite: pages that load fast on an ordinary phone, show the
        formula behind every result and explain the method in plain language so you can check the work yourself.
      </p>
      <h2>How the calculators work</h2>
      <p>
        Every calculation runs in your own browser. The numbers you type are not sent to our servers. The scientific calculator uses a hand-written expression parser instead of
        executing your input as code, and a test suite covers the arithmetic rules, rounding and error cases. Where a tool depends on assumptions, such as the sample exchange rates in
        the currency converter, we label them clearly on the page.
      </p>
      <h2>Our standards</h2>
      <ul>
        <li>We write the explanations ourselves and avoid filler.</li>
        <li>We do not invent reviews, ratings or user numbers.</li>
        <li>We separate advertising from content and label ad areas.</li>
        <li>We tell you when a tool is only a rough guide, such as BMI or currency estimates.</li>
      </ul>
      <h2>Who builds it</h2>
      <p>
        {siteConfig.name} is designed and developed by{" "}
        <a href={siteConfig.author.url} target="_blank" rel="noopener">
          {siteConfig.author.name}
        </a>
        , a full-stack web developer. You can see more of the work on the portfolio site.
      </p>
      <h2>Feedback</h2>
      <p>
        Found a mistake or want a new calculator? Please get in touch from the <a href="/contact">contact page</a>. Reports of wrong results are taken seriously and fixed quickly.
      </p>
    </LegalPage>
  );
}
