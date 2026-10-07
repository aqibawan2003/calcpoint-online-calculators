import type { ToolContent } from "./types";

export const unitContent: ToolContent = {
  title: "Unit Converter Online – Length, Weight, Temperature",
  description:
    "Convert length, weight, temperature, area, volume and speed in one free tool. Swap units instantly, search the unit list and see results to six decimal places.",
  h1: "Unit Converter Online",
  lead: "Six measurement types, dozens of units and instant results. Choose a category, pick two units and type a value.",
  whatItDoes: [
    "People meet different measurement systems all the time. A recipe uses cups while the oven is set in degrees Celsius, a plane ticket quotes kilograms while a bathroom scale reads pounds, and a house listing gives square feet while a land record uses acres or hectares. This converter keeps all of those conversions in one place and gives you a result as soon as you stop typing.",
    "The tool covers length, weight, temperature, area, volume and speed. Each category has the common metric, US customary and imperial units you are likely to need, such as kilometers, miles, stones, acres, liters, US gallons, kilometers per hour and knots. A swap button flips the two units, and a search box narrows long lists so you can find a unit by typing part of its name.",
    "Results show up to six decimal places with trailing zeros removed, and very large or very small answers switch to scientific notation. Inputs are checked, so a negative length or a temperature below absolute zero produces a clear message instead of nonsense.",
  ],
  steps: [
    "Pick a category using the tabs: length, weight, temperature, area, volume or speed.",
    "Type the value you want to convert in the Value box.",
    "Choose the unit you are converting from and the unit you want. If you have a long list, type in the search box to filter it.",
    "Read the result under the form. Use the swap button to reverse the direction.",
    "Change the value or either unit to run another conversion. The result updates immediately.",
  ],
  formulaIntro: [
    "Most conversions use a simple factor. Every unit in a category is defined relative to a base unit, such as the meter for length. To convert, the tool multiplies your value by the factor of the starting unit to reach the base, then divides by the factor of the target unit. For example, one mile is exactly 1,609.344 meters and one foot is exactly 0.3048 meters, so 1 mile equals 1,609.344 ÷ 0.3048, or 5,280 feet.",
    "Temperature is different because the scales do not share a zero point. The tool first converts to Celsius and then to the target scale. Fahrenheit to Celsius is (°F − 32) × 5 ÷ 9. Celsius to Fahrenheit is °C × 9 ÷ 5 + 32. Kelvin is Celsius plus 273.15. Absolute zero is 0 K, which is −273.15 °C or about −459.67 °F, and no real temperature can be lower.",
  ],
  examples: [
    { title: "Length", body: "A 10 kilometer run is about 6.213712 miles. Marathon distance, 42.195 km, is about 26.2188 miles." },
    { title: "Weight", body: "A 70 kg person weighs about 154.3236 pounds, or about 11.02 stone." },
    { title: "Temperature", body: "Normal room temperature of 21 °C converts to 69.8 °F. Water boils at 100 °C, which is 212 °F or 373.15 K." },
    { title: "Volume", body: "One US gallon is 3.785412 liters. An imperial gallon is larger, at 4.54609 liters, which is why fuel economy figures differ between countries." },
  ],
  mistakes: [
    "Confusing US and imperial units. A US pint is 473 milliliters, but a UK pint is about 568. The tool lists US gallon and imperial gallon separately for this reason.",
    "Mixing up weight and mass. Everyday scales show mass in kilograms or pounds, and the converter treats them that way.",
    "Using a negative length, area or volume. These quantities cannot be negative, so the tool asks for zero or a positive value.",
    "Entering a temperature below absolute zero. The tool reports the problem rather than returning a number.",
    "Forgetting that area units are squared. One square kilometer is a million square meters, not a thousand.",
    "Rounding before converting again. For a chain of conversions, keep the full value and round at the end.",
  ],
  about:
    "Conversion factors are based on international definitions where they exist, such as the international foot, the avoirdupois pound and the US customary gallon. Results are intended for general use. For scientific, engineering or trade work, check the standard that applies to you.",
  faq: [
    { q: "How many decimal places does the converter show?", a: "Up to six, with trailing zeros removed. Very small or very large results appear in scientific notation, for example 1.5e+20." },
    { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9, divide by 5 and add 32. So 25 °C is 25 × 9 ÷ 5 + 32, which is 77 °F." },
    { q: "How many feet are in a mile?", a: "There are 5,280 feet in a mile. The converter uses exact definitions, so 1 mile is exactly 5,280 feet." },
    { q: "What is the difference between a US gallon and an imperial gallon?", a: "A US gallon is about 3.785 liters and an imperial gallon is about 4.546 liters, so the imperial one is roughly 20 percent larger." },
    { q: "How do I convert kilometers per hour to miles per hour?", a: "Divide by 1.609344. For example, 100 km/h is about 62.14 mph." },
    { q: "Can I convert negative temperatures?", a: "Yes. Temperature accepts negative numbers as long as they stay above absolute zero, which is −273.15 °C." },
    { q: "Why is a stone included in the weight list?", a: "The stone is still used in the United Kingdom and Ireland for body weight. One stone equals 14 pounds, or about 6.35 kilograms." },
    { q: "What is a nautical mile?", a: "A nautical mile is exactly 1,852 meters and is used in sea and air navigation. A knot is one nautical mile per hour." },
    { q: "How do I find a unit quickly?", a: "Type part of its name or symbol in the search box. The lists above narrow to matching units while keeping your current selections." },
  ],
};
