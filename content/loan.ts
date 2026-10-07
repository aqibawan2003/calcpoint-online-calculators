import type { ToolContent } from "./types";

export const loanContent: ToolContent = {
  title: "Loan EMI Calculator – Monthly Payment and Interest",
  description:
    "Calculate your monthly loan payment (EMI), total interest and total repayment from amount, annual rate and tenure, with a principal versus interest chart.",
  h1: "Loan EMI Calculator",
  lead: "Enter the loan amount, the yearly interest rate and the tenure to see what you will pay each month and how much of the total is interest.",
  whatItDoes: [
    "An EMI, short for equated monthly installment, is the fixed amount you repay each month on a loan. It covers both the interest and a slice of the original amount borrowed. Home loans, car loans and personal loans are very often structured this way, which makes the monthly cost predictable.",
    "This calculator works out the EMI from three inputs: the loan amount, the annual interest rate and the length of the loan, which you can enter in years or months. It then shows the monthly payment, the total interest you will pay over the whole term and the total amount repaid. A simple donut chart splits the total between principal and interest, so you can see at a glance how much the borrowing costs.",
    "Use it to compare offers, to see how a longer tenure lowers the monthly payment but raises the total interest, or to check whether a repayment fits your budget before you apply. Amounts are shown without a currency symbol so they suit any currency.",
  ],
  steps: [
    "Enter the loan amount, which is the principal you plan to borrow.",
    "Enter the annual interest rate as a percentage, for example 9.5.",
    "Enter the tenure and choose whether it is in years or months. Tenure must be a whole number of months between 1 and 600.",
    "Read the monthly payment at the top of the result box, followed by the principal, total interest and total payment.",
    "Try a different tenure or rate to compare offers side by side.",
  ],
  formulaIntro: [
    "The standard reducing-balance EMI formula is EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1). Here P is the principal, r is the monthly interest rate, found by dividing the annual rate by 12 and by 100, and n is the number of monthly payments. When the interest rate is zero, the formula simplifies to the principal divided by n.",
    "Total payment is the EMI multiplied by the number of months, and total interest is the total payment minus the principal. In the early months, most of each payment goes toward interest. Over time the interest share shrinks and the principal share grows, because interest is charged only on the balance that remains.",
    "Real loans may add processing fees, insurance, a variable rate or a different compounding schedule. Lenders may also round payments. For these reasons, the lender's own schedule is the final authority on what you owe.",
  ],
  examples: [
    { title: "A simple loan", body: "Borrowing 100,000 at 12 percent a year for 12 months gives a monthly rate of 1 percent. The EMI is about 8,884.88, the total payment about 106,618.55 and the total interest about 6,618.55." },
    { title: "Longer tenure", body: "The same 100,000 at 12 percent over 24 months lowers the EMI to about 4,707.35, but the total interest rises to about 12,976.40. A longer term eases the monthly burden and increases the overall cost." },
    { title: "Interest-free", body: "A 1,200 loan at zero percent over 12 months costs exactly 100 a month and no interest." },
  ],
  mistakes: [
    "Entering the monthly rate instead of the annual rate. The calculator expects the yearly figure and converts it.",
    "Comparing loans only by monthly payment. A lower payment over a longer term can cost much more overall.",
    "Ignoring fees. Processing charges, insurance and early repayment penalties are not included here.",
    "Assuming a fixed result on a variable-rate loan. If the rate changes, so will your EMI.",
    "Mixing up years and months in the tenure box. Check the unit toggle before reading the result.",
    "Borrowing the maximum you qualify for. Your budget, not the lender's limit, should set the amount.",
  ],
  about:
    "This calculator provides estimates for general planning and does not constitute financial advice or a loan offer. Your lender's quotation will be the final figure. Consider speaking to a qualified financial adviser before you borrow.",
  faq: [
    { q: "What does EMI stand for?", a: "EMI means equated monthly installment, the fixed monthly payment that repays a loan over a set period." },
    { q: "How is EMI calculated?", a: "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the principal, r the monthly rate and n the number of months." },
    { q: "Does a longer tenure reduce my total cost?", a: "No. A longer tenure lowers the monthly payment but increases total interest, because you owe money for more months." },
    { q: "Is the interest rate flat or reducing balance?", a: "This tool uses the reducing balance method, where interest is charged on the outstanding amount. Flat-rate loans are priced differently and usually cost more per unit of stated rate." },
    { q: "Can I enter the tenure in years?", a: "Yes. Use the Years or Months toggle. The tenure must work out to a whole number of months, from 1 to 600." },
    { q: "Why is the total interest so large on long loans?", a: "Interest builds on the remaining balance for many months. On a long loan, the interest paid over time can come close to the amount borrowed." },
    { q: "Does the tool include processing fees or insurance?", a: "No. Those depend on the lender and are not part of the basic EMI formula." },
    { q: "Can I use a zero percent rate?", a: "Yes. The principal is then simply divided by the number of months." },
    { q: "What does the chart show?", a: "It splits the total repayment into the share that repays the principal and the share that is interest." },
  ],
};
