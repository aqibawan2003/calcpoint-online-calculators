/** Unit conversion data and helpers. Linear units store a factor to the category's base unit. */

export type CategoryId = "length" | "weight" | "temperature" | "area" | "volume" | "speed";

export interface Unit {
  id: string;
  label: string;
  /** Multiply by this to reach the base unit (ignored for temperature). */
  factor: number;
}

export interface Category {
  id: CategoryId;
  label: string;
  base: string;
  units: Unit[];
}

export const categories: Category[] = [
  {
    id: "length",
    label: "Length",
    base: "m",
    units: [
      { id: "m", label: "Meter (m)", factor: 1 },
      { id: "km", label: "Kilometer (km)", factor: 1000 },
      { id: "cm", label: "Centimeter (cm)", factor: 0.01 },
      { id: "mm", label: "Millimeter (mm)", factor: 0.001 },
      { id: "mi", label: "Mile (mi)", factor: 1609.344 },
      { id: "yd", label: "Yard (yd)", factor: 0.9144 },
      { id: "ft", label: "Foot (ft)", factor: 0.3048 },
      { id: "in", label: "Inch (in)", factor: 0.0254 },
      { id: "nmi", label: "Nautical mile (nmi)", factor: 1852 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    base: "kg",
    units: [
      { id: "kg", label: "Kilogram (kg)", factor: 1 },
      { id: "g", label: "Gram (g)", factor: 0.001 },
      { id: "mg", label: "Milligram (mg)", factor: 0.000001 },
      { id: "t", label: "Metric ton (t)", factor: 1000 },
      { id: "lb", label: "Pound (lb)", factor: 0.45359237 },
      { id: "oz", label: "Ounce (oz)", factor: 0.028349523125 },
      { id: "st", label: "Stone (st)", factor: 6.35029318 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    base: "C",
    units: [
      { id: "C", label: "Celsius (°C)", factor: 1 },
      { id: "F", label: "Fahrenheit (°F)", factor: 1 },
      { id: "K", label: "Kelvin (K)", factor: 1 },
    ],
  },
  {
    id: "area",
    label: "Area",
    base: "m2",
    units: [
      { id: "m2", label: "Square meter (m²)", factor: 1 },
      { id: "km2", label: "Square kilometer (km²)", factor: 1_000_000 },
      { id: "cm2", label: "Square centimeter (cm²)", factor: 0.0001 },
      { id: "ha", label: "Hectare (ha)", factor: 10_000 },
      { id: "ac", label: "Acre (ac)", factor: 4046.8564224 },
      { id: "ft2", label: "Square foot (ft²)", factor: 0.09290304 },
      { id: "in2", label: "Square inch (in²)", factor: 0.00064516 },
      { id: "yd2", label: "Square yard (yd²)", factor: 0.83612736 },
      { id: "mi2", label: "Square mile (mi²)", factor: 2_589_988.110336 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    base: "L",
    units: [
      { id: "L", label: "Liter (L)", factor: 1 },
      { id: "mL", label: "Milliliter (mL)", factor: 0.001 },
      { id: "m3", label: "Cubic meter (m³)", factor: 1000 },
      { id: "usgal", label: "US gallon", factor: 3.785411784 },
      { id: "usqt", label: "US quart", factor: 0.946352946 },
      { id: "uspt", label: "US pint", factor: 0.473176473 },
      { id: "uscup", label: "US cup", factor: 0.2365882365 },
      { id: "usfloz", label: "US fluid ounce", factor: 0.0295735295625 },
      { id: "tbsp", label: "Tablespoon (US)", factor: 0.01478676478125 },
      { id: "tsp", label: "Teaspoon (US)", factor: 0.00492892159375 },
      { id: "impgal", label: "Imperial gallon", factor: 4.54609 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    base: "mps",
    units: [
      { id: "mps", label: "Meters per second (m/s)", factor: 1 },
      { id: "kmh", label: "Kilometers per hour (km/h)", factor: 1 / 3.6 },
      { id: "mph", label: "Miles per hour (mph)", factor: 0.44704 },
      { id: "kn", label: "Knot (kn)", factor: 1852 / 3600 },
      { id: "fps", label: "Feet per second (ft/s)", factor: 0.3048 },
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  const c = categories.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}

function toCelsius(v: number, unit: string): number {
  if (unit === "F") return ((v - 32) * 5) / 9;
  if (unit === "K") return v - 273.15;
  return v;
}

function fromCelsius(c: number, unit: string): number {
  if (unit === "F") return (c * 9) / 5 + 32;
  if (unit === "K") return c + 273.15;
  return c;
}

export type ConvertResult = { ok: true; value: number } | { ok: false; error: string };

export function convert(categoryId: CategoryId, value: number, from: string, to: string): ConvertResult {
  if (!Number.isFinite(value)) return { ok: false, error: "Enter a valid number" };
  const cat = getCategory(categoryId);
  if (categoryId === "temperature") {
    const c = toCelsius(value, from);
    if (c < -273.15 - 1e-9) return { ok: false, error: "That is below absolute zero" };
    return { ok: true, value: fromCelsius(c, to) };
  }
  const f = cat.units.find((u) => u.id === from);
  const t = cat.units.find((u) => u.id === to);
  if (!f || !t) return { ok: false, error: "Choose both units" };
  if (value < 0) return { ok: false, error: "Enter zero or a positive number" };
  return { ok: true, value: (value * f.factor) / t.factor };
}

/** Up to 6 decimals, trailing zeros trimmed, scientific notation for extremes. */
export function formatConverted(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e15 || abs < 1e-6) return n.toExponential(6).replace(/\.?0+e/, "e");
  const fixed = n.toFixed(6).replace(/\.?0+$/, "");
  const [i, f] = fixed.split(".");
  const neg = i.startsWith("-");
  const digits = neg ? i.slice(1) : i;
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${neg ? "-" : ""}${grouped}${f ? "." + f : ""}`;
}

/**
 * Currency data. These are illustrative sample rates against 1 USD, NOT live.
 * To use live rates later, replace getRates() with a fetch to a rates API
 * (for example from a server route that caches the response) and keep the same shape.
 */
export interface Currency {
  code: string;
  name: string;
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "INR", name: "Indian Rupee" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CHF", name: "Swiss Franc" },
];

export function getRates(): Record<string, number> {
  return {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    PKR: 278,
    INR: 83.5,
    AED: 3.6725,
    SAR: 3.75,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 150,
    CNY: 7.2,
    CHF: 0.88,
  };
}

export function convertCurrency(amount: number, from: string, to: string, rates = getRates()): ConvertResult {
  if (!Number.isFinite(amount) || amount < 0) return { ok: false, error: "Enter zero or a positive amount" };
  const rf = rates[from];
  const rt = rates[to];
  if (!rf || !rt) return { ok: false, error: "Choose both currencies" };
  return { ok: true, value: (amount / rf) * rt };
}
