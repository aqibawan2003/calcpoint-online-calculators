import type { ToolContent } from "./types";

export const percentageContent: ToolContent = {
  title: "Percentage Calculator – Increase, Decrease, Percent Of",
  description:
    "Free percentage calculator: find X% of a number, what percent one number is of another, percentage increase, decrease and difference, with the working shown.",
  h1: "Percentage Calculator",
  lead: "Pick the question you are asking, enter two numbers, and get the answer with the formula written out so you can check the working.",
  whatItDoes: [
    "Percentages show up in shopping, pay rises, exam marks, interest rates and business reports, yet the same word can mean several different questions. This page separates them into five clear tabs so you do not have to remember which formula applies. Each tab asks for two numbers, gives the result straight away and prints the calculation underneath.",
    "Use the first tab when you know the percentage and want the amount, such as 15 percent of 240. Use the second when you have two amounts and want to know how big one is compared with the other, such as scoring 42 out of 60. The Increase and Decrease tabs compare an old value with a new one and report the change as a percentage. The Difference tab compares two numbers when neither one is the obvious starting point.",
    "Everything is calculated in your browser as you type. Negative numbers are accepted where they make sense, and the calculator explains the problem whenever a division by zero would make the answer meaningless.",
  ],
  steps: [
    "Choose the tab that matches your question. If you are unsure, read the labels on the two input boxes, which change with each tab.",
    "Type the first number. For the X% of Y tab, this is the percentage without the percent sign.",
    "Type the second number.",
    "Read the headline result. The line beneath it shows the formula with your numbers filled in.",
    "Change either number to try another case. The answer updates immediately, and no button press is needed.",
  ],
  formulaIntro: [
    "Percent means per hundred, so every percentage problem is a fraction multiplied or divided by 100. To find a percentage of a number, divide the percentage by 100 and multiply: amount = (X ÷ 100) × Y. To find what percentage one number is of another, divide the part by the whole and multiply by 100: percent = (X ÷ Y) × 100.",
    "Percentage change compares a new value with the original one: change = ((new − old) ÷ old) × 100. A positive result is an increase and a negative result is a decrease. Notice that the original value is always the base, which is why a rise from 50 to 75 is 50 percent but a fall from 75 back to 50 is only 33.3 percent.",
    "Percentage difference is a different idea. It is used when two numbers are peers, such as the prices of two similar products. The formula divides the absolute gap by the average of the two numbers: difference = |a − b| ÷ ((a + b) ÷ 2) × 100. The result is the same whichever number you enter first.",
  ],
  examples: [
    { title: "A discount", body: "A jacket costs 80 and is 25 percent off. On the X% of Y tab, enter 25 and 80 to get 20, so you save 20 and pay 60." },
    { title: "An exam mark", body: "You scored 42 out of 60. On the second tab, enter 42 and 60. The result is 70 percent." },
    { title: "A price rise", body: "Rent goes from 900 to 990. On the Increase tab, enter 900 and 990. The change is 10 percent." },
    { title: "Comparing two quotes", body: "Two quotes are 120 and 150. On the Difference tab the result is about 22.2 percent, because the gap of 30 is measured against the average of 135." },
  ],
  mistakes: [
    "Using the wrong base. A 20 percent rise followed by a 20 percent fall does not bring you back to the start, because the second percentage is taken from a larger number.",
    "Adding percentages that apply to different bases. Two successive discounts of 10 percent and 20 percent do not equal 30 percent off. The combined discount is 28 percent.",
    "Confusing percentage points with percent. If an interest rate moves from 4 percent to 5 percent, it rose by one percentage point, which is a 25 percent increase in the rate.",
    "Entering the percentage with its sign or as a decimal. On the first tab, type 15 for 15 percent, not 0.15.",
    "Treating a change from zero as a percentage. When the starting value is zero, a percentage change is undefined, and the calculator tells you so.",
    "Rounding too early. Keep the full figures until the final step, then round once.",
  ],
  about:
    "This calculator is designed for everyday use in school, shopping and basic business tasks. Results are shown with up to six decimals in the working line and four decimals in the headline. For tax, financial or legal decisions, confirm figures with a qualified professional.",
  faq: [
    { q: "How do I calculate a percentage increase?", a: "Subtract the old value from the new value, divide by the old value, then multiply by 100. For example, going from 50 to 65 is (65 − 50) ÷ 50 × 100, which is 30 percent." },
    { q: "How do I find what percent one number is of another?", a: "Divide the first number by the second and multiply by 100. For example, 18 is 18 ÷ 72 × 100, which is 25 percent of 72." },
    { q: "How do I calculate percentage decrease?", a: "Subtract the new value from the old value, divide by the old value and multiply by 100. A drop from 200 to 150 is 25 percent." },
    { q: "What is the difference between percentage change and percentage difference?", a: "Change measures movement from an original value to a new one. Difference compares two values without treating either as the original, using their average as the base." },
    { q: "How do I add a percentage to a number?", a: "Multiply the number by 1 plus the percentage as a decimal. To add 15 percent to 200, multiply by 1.15 to get 230. The Increase tab can confirm the result." },
    { q: "How do I take a percentage off a price?", a: "Multiply the price by 1 minus the percentage as a decimal. For 20 percent off 50, multiply by 0.8 to get 40." },
    { q: "Why is a 50 percent rise followed by a 50 percent fall not back to zero change?", a: "The fall is taken from the higher figure. Starting at 100, a 50 percent rise gives 150, and a 50 percent fall from 150 gives 75." },
    { q: "Can I use negative numbers?", a: "Yes, on all five tabs. Percent change uses the absolute value of the starting number as its base so the sign of the result shows the direction." },
    { q: "How many decimals does the calculator show?", a: "The working line shows up to six decimals and the headline result up to four. Trailing zeros are removed." },
  ],
};
