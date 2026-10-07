import type { ToolContent } from "./types";

export const tipContent: ToolContent = {
  title: "Tip Calculator – Split the Bill Per Person",
  description:
    "Work out the tip and the total for any bill, then split it evenly between friends. Pick a quick percentage or type your own and see the cost per person.",
  h1: "Tip Calculator",
  lead: "Enter the bill, choose a tip percentage and say how many people are sharing. You get the tip, the total and the amount each person pays.",
  whatItDoes: [
    "Calculating a tip in your head is easy when the bill is round and awkward when it is not. This tool does the arithmetic for you, then splits the total evenly so nobody has to guess at the end of the meal. It is helpful for restaurants, cafes, taxis, salons and any service where a tip is customary.",
    "You can tap a preset of 10, 15, 18, 20 or 25 percent, or type any percentage you like from 0 to 100. The people field accepts a whole number from 1 to 100. The results show the tip amount, the tip per person, the bill plus tip, and the final total each person pays.",
    "Tipping customs differ from country to country. In some places a service charge is already added to the bill and a tip is optional, while in others a tip is expected as part of a worker's pay. Use the calculator as a convenience, and follow the custom of the place you are in.",
  ],
  steps: [
    "Type the bill amount. If your bill already includes a service charge, you may want to tip less or not at all.",
    "Choose a preset tip percentage, or type your own number in the tip field.",
    "Enter how many people are splitting the bill. Leave it at 1 if you are paying alone.",
    "Read the total per person in large type, with the tip amount and the bill plus tip beneath.",
    "Change the percentage or the number of people to see how the split changes.",
  ],
  formulaIntro: [
    "The tip is the bill multiplied by the tip percentage divided by 100. The total is the bill plus the tip. The amount each person pays is the total divided by the number of people. Written out: tip = bill × percent ÷ 100, total = bill + tip, per person = total ÷ people.",
    "A quick mental shortcut for 10 percent is to move the decimal point one place to the left. For 20 percent, double that number. For 15 percent, add half of the 10 percent figure to itself. The calculator is exact to the cent, but these shortcuts are handy when you do not have a phone out.",
    "Amounts are rounded to two decimal places for display. When a total does not divide evenly, one person may need to round up by a cent. Many groups simply round the per-person amount up to the nearest whole unit to keep things simple.",
  ],
  examples: [
    { title: "A dinner for four", body: "A bill of 100 with a 20 percent tip gives a tip of 20 and a total of 120. Split four ways, each person pays 30." },
    { title: "A solo lunch", body: "A bill of 20 with a 15 percent tip gives a tip of 3 and a total of 23." },
    { title: "Uneven total", body: "A bill of 85.50 at 18 percent gives a tip of 15.39 and a total of 100.89. Split three ways, each person pays 33.63." },
  ],
  mistakes: [
    "Tipping on a bill that already includes a service charge, which can mean paying twice for the same service.",
    "Calculating the tip on the total including tax when your local custom is to tip on the pre-tax amount.",
    "Splitting the tip evenly when the group ordered very different amounts. Agree beforehand if each person should pay for what they ordered.",
    "Entering the number of people as a decimal. The field takes whole numbers only.",
    "Typing the percent sign in the tip box. Type just the number, for example 15.",
  ],
  about:
    "This calculator is a general convenience tool. Tipping norms vary and are a personal choice, so no figure here is a rule. Results are rounded to two decimal places.",
  faq: [
    { q: "How do I calculate a 15 percent tip?", a: "Multiply the bill by 0.15. For example, a 60 bill gives a tip of 9. Select 15 percent in the tool and it does the rest." },
    { q: "How do I split a bill evenly?", a: "Add the tip to the bill and divide the total by the number of people. The tool shows this as the total per person." },
    { q: "Should I tip before or after tax?", a: "Customs differ. Many people tip on the pre-tax amount, while others tip on the total. Use whichever you prefer by entering that figure as the bill." },
    { q: "What is a typical tip percentage?", a: "It depends on the country and the type of service. Many places see tips from 10 to 20 percent, and some places do not expect one at all." },
    { q: "Is a service charge the same as a tip?", a: "A service charge is added by the business and may or may not go to staff. A tip is voluntary. If a charge is already included, you may not need to add more." },
    { q: "Can I enter a tip of zero?", a: "Yes. Type 0 in the tip field and the total will match the bill." },
    { q: "How many people can I split between?", a: "From 1 to 100, using whole numbers." },
    { q: "Is any of my information stored?", a: "No. Everything is calculated in your browser and nothing is saved or sent." },
  ],
};
