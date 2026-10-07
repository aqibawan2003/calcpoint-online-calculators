import type { ToolContent } from "./types";

export const homeContent: ToolContent = {
  title: "Free Online Calculator – Standard and Scientific",
  description:
    "Use a free online calculator with a scientific mode, memory keys, history and keyboard support. Fast on any phone or computer, with no sign-up needed.",
  h1: "Free Online Calculator",
  lead: "A fast calculator for everyday sums and scientific work. Type with the keys on screen or on your keyboard, and see the answer update as you go.",
  whatItDoes: [
    "This calculator handles the arithmetic most people need every day: adding a bill, working out a discount, splitting costs or checking homework. It follows the normal order of operations, so multiplication and division happen before addition and subtraction, and anything inside brackets is worked out first. The answer appears under your expression while you type, which means you can spot a slip before you press equals.",
    "Open the Scientific panel above the keypad when you need more. It adds sine, cosine and tangent with their inverses, logarithms, square roots, powers, factorials, pi and e. A Deg and Rad switch lets you choose whether angles are read in degrees or radians. The memory keys store a number while you work on something else, and a small M badge on the display tells you when memory holds a value.",
    "Every calculation you complete is saved in the history list on your own device. Tap an entry to load it back into the display and edit it. Nothing is uploaded, and there is no account to create. The calculator runs entirely in your browser, so it keeps working quickly even on a slow connection.",
  ],
  steps: [
    "Type a number with the on-screen keys or your keyboard. Use the decimal point for fractions.",
    "Choose an operator: add, subtract, multiply or divide. Press it again to swap it for a different one.",
    "Keep typing the rest of your expression. Use the bracket keys to group parts that should be calculated first.",
    "Check the live answer under the expression. Press equals, or Enter on your keyboard, to confirm it and save it to history.",
    "Press an operator straight after equals to carry on from the result, or press a digit to start a new calculation.",
    "Use C to clear the current entry, AC to clear everything including memory, and the backspace key to remove the last character.",
  ],
  formulaIntro: [
    "The calculator reads your expression the way a person reading a maths textbook would. Brackets come first, then powers, then multiplication and division from left to right, and finally addition and subtraction from left to right. That is why 2 + 3 × 4 gives 14 and not 20. Writing a number directly next to a bracket, as in 2(3 + 4), is treated as multiplication.",
    "Percentages follow the convention people expect on a handheld calculator. When a percentage follows a plus or minus, it is taken as a share of the number before it. When it is used on its own or with multiplication, it simply means that number divided by 100.",
  ],
  examples: [
    { title: "Adding a percentage", body: "Type 200 + 10 % and the result is 220, because 10 percent of 200 is 20. Type 200 - 10 % to get 180." },
    { title: "Rounding noise", body: "Computers store decimals in binary, so a plain sum like 0.1 + 0.2 can come out as 0.30000000000000004 in many programs. This calculator trims that noise and shows 0.3." },
    { title: "Brackets", body: "Type 12 / (2 + 4) and the result is 2. Without the brackets, 12 / 2 + 4 would be 10." },
  ],
  mistakes: [
    "Forgetting brackets around a sum that sits under a division. The calculator follows precedence, so 12 / 2 + 4 and 12 / (2 + 4) are different questions.",
    "Typing a percentage and expecting it to act on the wrong number. Remember that 50 + 10 % adds ten percent of 50, which is 5.",
    "Dividing by zero. The calculator will show a short message instead of a result, because the answer is undefined.",
    "Mixing up degrees and radians in the scientific panel. If sin(90) does not give 1, check that the angle mode reads Deg.",
    "Pressing AC when you only meant to clear the current entry. AC also empties memory, while C leaves it alone.",
  ],
  about:
    "This tool is made for general everyday use. It uses standard double-precision arithmetic and shows up to twelve significant digits, so it is not meant for work where legal, medical or engineering accuracy is critical. Always double-check results that carry real consequences.",
  faq: [
    { q: "Is this calculator free to use?", a: "Yes. There is nothing to install, no account to create and no limit on how many calculations you do." },
    { q: "Does it follow the order of operations?", a: "Yes. Brackets are done first, then powers, then multiplication and division, then addition and subtraction. Operators of the same level are worked out from left to right." },
    { q: "How do I use the percent key?", a: "Type the number, then an operator, then the percentage. For example 200 + 10 % gives 220. Used alone, 50 % gives 0.5." },
    { q: "Can I type with my keyboard?", a: "Yes. Digits, the four operators, brackets, the decimal point, Enter for equals, Backspace to delete and Escape to clear all work. Open the Shortcuts button for the full list." },
    { q: "Where is my history stored?", a: "In your own browser, on your device only. It holds your last 20 calculations. You can clear it at any time with the Clear all button." },
    { q: "Why does the result sometimes show e+ and a number?", a: "Very large or very small results are shown in scientific notation. For example 1.5e+20 means 1.5 followed by 20 zeros." },
    { q: "What do the memory keys do?", a: "MS stores the current value, M+ and M- add to or subtract from it, MR puts it back into the display and MC erases it." },
    { q: "Does the calculator work offline?", a: "Once the page has loaded it keeps working without a connection, because all the maths runs in your browser. You need a connection to open other pages." },
  ],
};
