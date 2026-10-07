import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/seo";

/** FAQ shown in full on screen, with matching FAQPage markup (same text). */
export function FaqSection({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-heading" className="prose-calc">
      <h2 id="faq-heading">Frequently asked questions</h2>
      {faq.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
      <JsonLd data={faqSchema(faq)} />
    </section>
  );
}
