export interface ToolContent {
  /** SEO title, under 60 characters. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  h1: string;
  lead: string;
  whatItDoes: string[];
  steps: string[];
  formulaIntro: string[];
  examples: { title: string; body: string }[];
  mistakes: string[];
  about: string;
  faq: { q: string; a: string }[];
}
