import { Calculator } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/lib/siteConfig";

const desktopLinks = [
  { href: "/scientific-calculator", label: "Scientific" },
  { href: "/percentage-calculator", label: "Percentage" },
  { href: "/bmi-calculator", label: "BMI" },
  { href: "/unit-converter", label: "Units" },
  { href: "/currency-converter", label: "Currency" },
  { href: "/age-calculator", label: "Age" },
  { href: "/loan-emi-calculator", label: "Loan EMI" },
  { href: "/tip-calculator", label: "Tip" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  return (
    <header className="relative z-30 border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-display text-lg font-bold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-white dark:text-slate-950">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {desktopLinks.map((l) => (
            <Link key={l.href} href={l.href} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium hover:bg-[var(--surface-2)]">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
