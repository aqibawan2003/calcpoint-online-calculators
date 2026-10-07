/** Pure logic for the non-keypad tools. */

/** Parse user text into a number. Returns null for empty or invalid text. */
export function parseNumber(text: string, allowNegative = false): number | null {
  const t = text.trim().replace(/,/g, "");
  if (t === "") return null;
  const re = allowNegative ? /^-?(\d+\.?\d*|\.\d+)$/ : /^(\d+\.?\d*|\.\d+)$/;
  if (!re.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function fmt(n: number, maxDecimals = 2): string {
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
}

export function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ---------- Percentage ---------- */

export type PercentResult = { ok: true; value: number } | { ok: false; error: string };

export const percentOf = (pct: number, of: number): PercentResult => ({ ok: true, value: (pct / 100) * of });

export function whatPercent(part: number, whole: number): PercentResult {
  if (whole === 0) return { ok: false, error: "The second number cannot be zero" };
  return { ok: true, value: (part / whole) * 100 };
}

/** Signed percent change from an old value to a new value. */
export function percentChange(from: number, to: number): PercentResult {
  if (from === 0) return { ok: false, error: "The starting value cannot be zero" };
  return { ok: true, value: ((to - from) / Math.abs(from)) * 100 };
}

/** Symmetric percentage difference: |a - b| / average * 100. */
export function percentDifference(a: number, b: number): PercentResult {
  const avg = (Math.abs(a) + Math.abs(b)) / 2;
  if (avg === 0) return { ok: false, error: "Both numbers cannot be zero" };
  return { ok: true, value: (Math.abs(a - b) / avg) * 100 };
}

/* ---------- BMI ---------- */

export type BmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export function bmiFromMetric(kg: number, cm: number): number {
  const m = cm / 100;
  return kg / (m * m);
}

export function bmiFromImperial(lb: number, feet: number, inches: number): number {
  const totalIn = feet * 12 + inches;
  return (703 * lb) / (totalIn * totalIn);
}

export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

/* ---------- Loan EMI ---------- */

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

export function computeEmi(principal: number, annualRatePct: number, months: number): EmiResult {
  const r = annualRatePct / 12 / 100;
  let emi: number;
  if (r === 0) emi = principal / months;
  else {
    const pow = Math.pow(1 + r, months);
    emi = (principal * r * pow) / (pow - 1);
  }
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}

/* ---------- Tip ---------- */

export interface TipResult {
  tip: number;
  total: number;
  perPerson: number;
  tipPerPerson: number;
}

export function computeTip(bill: number, tipPct: number, people: number): TipResult {
  const tip = (bill * tipPct) / 100;
  const total = bill + tip;
  return { tip, total, perPerson: total / people, tipPerPerson: tip / people };
}

/* ---------- Age ---------- */

export interface YMD {
  y: number;
  m: number; // 1-12
  d: number;
}

export function parseISODate(s: string): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const check = new Date(Date.UTC(y, mo - 1, d));
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  return { y, m: mo, d };
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const utcDays = (p: YMD) => Date.UTC(p.y, p.m - 1, p.d) / 86_400_000;

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  daysToBirthday: number;
  birthdayWeekday: string;
}

export type AgeOutcome = { ok: true; value: AgeResult } | { ok: false; error: string };

export function computeAge(birth: YMD, asOf: YMD): AgeOutcome {
  if (utcDays(birth) > utcDays(asOf)) return { ok: false, error: "The birth date is after the comparison date" };
  if (birth.y < 1900) return { ok: false, error: "Enter a birth year of 1900 or later" };

  // Count whole months from the birth date, clamping to month end (31 Jan + 1 month = 28/29 Feb),
  // then count the leftover days from that anchor date.
  const anchorFor = (months: number): YMD => {
    const idx = birth.y * 12 + (birth.m - 1) + months;
    const y = Math.floor(idx / 12);
    const m = (idx % 12) + 1;
    return { y, m, d: Math.min(birth.d, daysInMonth(y, m)) };
  };
  let totalMonths = (asOf.y - birth.y) * 12 + (asOf.m - birth.m);
  if (utcDays(anchorFor(totalMonths)) > utcDays(asOf)) totalMonths -= 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = utcDays(asOf) - utcDays(anchorFor(totalMonths));

  const bdayIn = (year: number): YMD => {
    // Feb 29 birthdays are observed on Feb 28 in non-leap years
    if (birth.m === 2 && birth.d === 29 && !isLeap(year)) return { y: year, m: 2, d: 28 };
    return { y: year, m: birth.m, d: birth.d };
  };
  let next = bdayIn(asOf.y);
  if (utcDays(next) < utcDays(asOf)) next = bdayIn(asOf.y + 1);

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    ok: true,
    value: {
      years,
      months,
      days,
      totalDays: utcDays(asOf) - utcDays(birth),
      daysToBirthday: utcDays(next) - utcDays(asOf),
      birthdayWeekday: weekdays[new Date(Date.UTC(next.y, next.m - 1, next.d)).getUTCDay()],
    },
  };
}
