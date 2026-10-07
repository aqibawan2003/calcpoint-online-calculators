export interface ToolInfo {
  slug: string;
  path: string;
  name: string;
  short: string;
  related: string[];
}

export const tools: ToolInfo[] = [
  {
    slug: "standard-calculator",
    path: "/standard-calculator",
    name: "Standard Calculator",
    short: "Everyday arithmetic with memory, history and keyboard support.",
    related: ["scientific-calculator", "percentage-calculator", "unit-converter", "loan-emi-calculator"],
  },
  {
    slug: "scientific-calculator",
    path: "/scientific-calculator",
    name: "Scientific Calculator",
    short: "Trig, logs, powers, factorials and memory keys.",
    related: ["percentage-calculator", "unit-converter", "loan-emi-calculator", "tip-calculator"],
  },
  {
    slug: "percentage-calculator",
    path: "/percentage-calculator",
    name: "Percentage Calculator",
    short: "Percent of, percent change, increase and decrease.",
    related: ["tip-calculator", "loan-emi-calculator", "scientific-calculator", "unit-converter"],
  },
  {
    slug: "bmi-calculator",
    path: "/bmi-calculator",
    name: "BMI Calculator",
    short: "Body mass index in metric or imperial units.",
    related: ["unit-converter", "age-calculator", "percentage-calculator", "scientific-calculator"],
  },
  {
    slug: "unit-converter",
    path: "/unit-converter",
    name: "Unit Converter",
    short: "Length, weight, temperature, area, volume and speed.",
    related: ["currency-converter", "scientific-calculator", "bmi-calculator", "percentage-calculator"],
  },
  {
    slug: "currency-converter",
    path: "/currency-converter",
    name: "Currency Converter",
    short: "Quick estimates between common currencies.",
    related: ["unit-converter", "percentage-calculator", "loan-emi-calculator", "tip-calculator"],
  },
  {
    slug: "age-calculator",
    path: "/age-calculator",
    name: "Age Calculator",
    short: "Exact age and days until your next birthday.",
    related: ["bmi-calculator", "scientific-calculator", "percentage-calculator", "unit-converter"],
  },
  {
    slug: "loan-emi-calculator",
    path: "/loan-emi-calculator",
    name: "Loan EMI Calculator",
    short: "Monthly payment, total interest and total cost.",
    related: ["percentage-calculator", "currency-converter", "tip-calculator", "scientific-calculator"],
  },
  {
    slug: "tip-calculator",
    path: "/tip-calculator",
    name: "Tip Calculator",
    short: "Tip and per-person split for any bill.",
    related: ["percentage-calculator", "currency-converter", "loan-emi-calculator", "unit-converter"],
  },
];

export function getTool(slug: string): ToolInfo {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool: ${slug}`);
  return t;
}

export const legalPages = [
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Use" },
  { path: "/disclaimer", name: "Disclaimer" },
];
