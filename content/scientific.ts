import type { ToolContent } from "./types";

export const scientificContent: ToolContent = {
  title: "Scientific Calculator Online – Free, With History",
  description:
    "A free scientific calculator online with trig, logs, powers, factorials, degree and radian modes, memory keys and a saved history. Works on phones and desktops.",
  h1: "Scientific Calculator Online",
  lead: "Trigonometry, logarithms, roots, powers and factorials in one clean keypad, with a degree and radian switch and a history of your last 20 results.",
  whatItDoes: [
    "A scientific calculator goes beyond the four basic operations. It lets students, engineers and curious people evaluate functions that appear in algebra, trigonometry, physics, chemistry and statistics. This one opens with the scientific panel already visible, so every function is one tap away.",
    "You get sine, cosine and tangent, plus their inverses written as sin⁻¹, cos⁻¹ and tan⁻¹. Logarithms come in two forms: log for base 10 and ln for the natural logarithm. The square root, square, reciprocal and general power keys cover most algebra problems, and the factorial key handles permutations and combinations. Pi and e are available as constants, and the absolute value key removes a minus sign.",
    "The display shows your expression above the result and updates the answer while you type. If you leave a bracket open, the preview closes it for you, so you can see a partial result without finishing the expression. Press equals to lock the answer in and add it to the history list.",
  ],
  steps: [
    "Check the angle mode at the top left of the scientific panel. Deg reads angles in degrees and Rad reads them in radians. Tap the key to switch.",
    "Press a function key such as sin, then type its input. The calculator opens a bracket for you, for example sin(.",
    "Close the bracket with the right-hand bracket key, or leave it open and let the preview close it for you.",
    "Combine functions with operators. For example sin(30) + log(100) is a valid expression.",
    "Press equals to confirm the result. It is saved to history, and you can tap it later to load the expression back.",
    "Use the memory keys to keep a value, such as a constant you reuse. MS stores it, MR recalls it and MC clears it.",
  ],
  formulaIntro: [
    "Trigonometric functions take an angle. If the mode is Deg, the calculator converts degrees to radians with radians = degrees × π ÷ 180 before calling the function. Inverse functions work the other way and return an angle in whichever mode is selected.",
    "The logarithm of x to base 10 answers the question: to what power must 10 be raised to get x? The natural logarithm asks the same about the number e, which is about 2.71828. Both are only defined for positive numbers. A factorial, written n!, multiplies every whole number from 1 up to n, and 0! is defined as 1.",
    "Powers are written with the xʸ key, which inserts the caret symbol. Powers are evaluated from right to left, so 2^3^2 means 2^(3^2), which is 512. A minus sign in front of a power applies after the power, so -2^2 equals -4.",
  ],
  examples: [
    { title: "Sine of 30 degrees", body: "With the mode on Deg, enter sin(30) and the result is 0.5. In Rad mode the same input gives about -0.988, because 30 is then read as 30 radians." },
    { title: "Compound expression", body: "Enter 2 × √(49) + 5! ÷ 4. The root is 7, the factorial is 120, so the result is 14 + 30 = 44." },
    { title: "Solving a right triangle", body: "If the opposite side is 5 and the hypotenuse is 13, the angle is asin(5 ÷ 13), which is about 22.62 degrees in Deg mode." },
  ],
  mistakes: [
    "Leaving the calculator in radians while working through a degrees problem. This is the most common reason a trigonometry answer looks wrong.",
    "Entering tan(90) and expecting a number. The tangent of 90 degrees is undefined, and the calculator says so instead of showing a huge value.",
    "Taking the log or ln of zero or a negative number. These are not defined for real numbers and return an error message.",
    "Using asin or acos with an input outside the range from -1 to 1. No real angle has a sine or cosine outside that range.",
    "Asking for the factorial of a negative number or a fraction. The factorial here is defined for whole numbers from 0 to 170.",
    "Forgetting that the square root of a negative number is not a real number. This calculator works with real numbers only.",
  ],
  about:
    "This scientific calculator uses a hand-written expression parser with standard double-precision arithmetic, and it never evaluates your input as code. Results are shown with up to twelve significant digits. It is intended for study and everyday use, not for safety-critical calculations.",
  faq: [
    { q: "How do I switch between degrees and radians?", a: "Tap the Deg or Rad key at the top left of the scientific panel. The small label above the display always shows which mode is active." },
    { q: "What is the difference between log and ln?", a: "The log key is the base 10 logarithm, so log(1000) is 3. The ln key is the natural logarithm with base e, so ln(e) is 1." },
    { q: "How do I calculate a power or an exponent?", a: "Type the base, press the xʸ key, then type the exponent. For a square, use the x² key. For a root, the √ key handles square roots, and a fractional power such as 27^(1/3) gives a cube root." },
    { q: "Why does sin(180) show 0 and not a tiny number?", a: "Computers produce tiny rounding errors for trigonometric values. The calculator cleans up residue below a trillionth so that exact answers such as 0 are shown as 0." },
    { q: "What is the largest factorial I can calculate?", a: "170!, which is about 7.26e+306. Larger factorials exceed the largest number a standard computer can store and return a too-large message." },
    { q: "Can I use pi and e in expressions?", a: "Yes. Press the π or e key. Writing a number next to a constant, as in 2π, multiplies them." },
    { q: "Does this calculator support complex numbers?", a: "No. It works with real numbers only, so the square root of a negative number returns an error." },
    { q: "Is my history shared with anyone?", a: "No. The last 20 calculations are stored in your own browser. Clear them with the Clear all button in the history panel." },
    { q: "Can I use it with my keyboard?", a: "Yes. Digits, operators, brackets, caret for power, percent, exclamation mark for factorial, Enter for equals, Backspace and Escape all work." },
  ],
};
