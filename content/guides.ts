export interface GuideSection {
  heading: string;
  /** Paragraphs may contain links written as [text](/path). */
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Tool this guide supports, used for internal links back and forth. */
  toolSlug: string;
  intro: string;
  sections: GuideSection[];
}

/**
 * To publish a new guide, add an object here and redeploy. It appears on /guides,
 * in the sitemap and in the related links automatically.
 */
export const guides: Guide[] = [
  {
    slug: "how-to-calculate-percentage-increase-and-decrease",
    title: "How to Calculate Percentage Increase and Decrease",
    description:
      "Learn the simple formula for percentage increase and decrease, with worked examples, common mistakes and a free calculator to check your answers.",
    date: "2026-10-06",
    toolSlug: "percentage-calculator",
    intro:
      "Percentage change tells you how much a number has grown or shrunk compared with where it started. Once you know one formula, you can handle price rises, discounts, salary changes and exam score improvements.",
    sections: [
      {
        heading: "The formula",
        paragraphs: [
          "Subtract the old value from the new value, divide the result by the old value, then multiply by 100. If the answer is positive, the number increased. If it is negative, the number decreased.",
          "Written as a formula: percentage change = (new − old) ÷ old × 100. You can check any answer with the [percentage calculator](/percentage-calculator), which also prints the working.",
        ],
      },
      {
        heading: "A worked increase",
        paragraphs: [
          "Suppose a monthly subscription goes from 20 to 25. The change is 25 − 20 = 5. Divide by the old value: 5 ÷ 20 = 0.25. Multiply by 100 to get a 25 percent increase.",
        ],
      },
      {
        heading: "A worked decrease",
        paragraphs: [
          "A phone drops from 500 to 425 in a sale. The change is 425 − 500 = −75. Divide by the old value: −75 ÷ 500 = −0.15. The result, −15 percent, means the price fell by 15 percent.",
        ],
      },
      {
        heading: "Why the starting value matters",
        paragraphs: [
          "The old value is always the base, so a rise and a fall of the same size give different percentages. A price that goes from 100 to 150 has risen by 50 percent. Falling from 150 back to 100 is a drop of only 33.3 percent.",
          "This is also why a 20 percent increase followed by a 20 percent decrease leaves you slightly below where you started. If you want to compare two numbers without treating either as the original, use percentage difference instead, which is also on the percentage calculator.",
        ],
      },
      {
        heading: "Quick checks and common mistakes",
        paragraphs: [
          "A fast sanity check: if the new number is double the old one, the increase is 100 percent. If it is half, the decrease is 50 percent. Another habit worth building is to write down which number is the original before you start.",
          "The most common mistake is dividing by the new value instead of the old one. The second is mixing up percentage points with percent. If you also work with money, the [loan EMI calculator](/loan-emi-calculator) shows how small percentage differences in interest rates compound over time.",
        ],
      },
    ],
  },
  {
    slug: "how-loan-emi-works",
    title: "How Loan EMI Works and Why a Longer Tenure Costs More",
    description:
      "Understand how an equated monthly installment is calculated, how interest and principal change over time, and why stretching a loan raises total interest.",
    date: "2026-10-06",
    toolSlug: "loan-emi-calculator",
    intro:
      "Most home, car and personal loans are repaid with a fixed monthly payment called an EMI. The payment stays the same, but what it pays for changes every month.",
    sections: [
      {
        heading: "What an EMI contains",
        paragraphs: [
          "Each EMI has two parts. One part pays the interest that has built up on the remaining balance. The other part reduces the balance itself, which is called the principal. Early in the loan the balance is large, so most of the payment is interest. As the balance falls, the interest share shrinks and the principal share grows.",
        ],
      },
      {
        heading: "The formula behind the number",
        paragraphs: [
          "The monthly rate is the annual rate divided by 12. With principal P, monthly rate r and n months, the payment is P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1). You do not need to calculate it by hand, because the [loan EMI calculator](/loan-emi-calculator) does it instantly and also shows total interest.",
        ],
      },
      {
        heading: "Longer tenure, lower payment, higher cost",
        paragraphs: [
          "Take 100,000 borrowed at 12 percent a year. Over 12 months the EMI is about 8,885 and total interest about 6,619. Over 24 months the EMI falls to about 4,707, but total interest rises to about 12,976. The monthly payment is lower, yet the borrowing costs roughly twice as much overall.",
          "A longer tenure is not always a bad choice. It can keep a payment affordable. The point is to choose it knowingly rather than only comparing monthly figures.",
        ],
      },
      {
        heading: "Things the basic formula leaves out",
        paragraphs: [
          "Processing fees, insurance, taxes and early repayment charges are not part of the formula. Variable-rate loans can change the EMI when the rate moves. Always ask the lender for a full repayment schedule before signing.",
          "If you are comparing offers in different currencies or planning an overseas purchase, the [currency converter](/currency-converter) can give a rough sense of scale, though its sample rates are not live.",
        ],
      },
    ],
  },
  {
    slug: "degrees-vs-radians-calculator-mode",
    title: "Degrees vs Radians: Which Mode Should Your Calculator Use?",
    description:
      "Learn the difference between degrees and radians, when to use each on a scientific calculator, and how to fix the most common wrong trig answer.",
    date: "2026-10-06",
    toolSlug: "scientific-calculator",
    intro:
      "If sin(90) does not give you 1, your calculator is almost certainly in the wrong angle mode. Here is how to tell which mode you need.",
    sections: [
      {
        heading: "Two ways to measure an angle",
        paragraphs: [
          "Degrees split a full turn into 360 equal parts. Radians measure an angle by the length of arc it cuts on a circle of radius 1, so a full turn is 2π radians, about 6.283.",
          "The two are linked by a simple rule: 180 degrees equals π radians. To convert degrees to radians, multiply by π and divide by 180. To go the other way, multiply by 180 and divide by π.",
        ],
      },
      {
        heading: "Which one should you use?",
        paragraphs: [
          "Use degrees for everyday geometry, navigation, construction and most school problems that give angles such as 30°, 45° or 90°. Use radians for calculus, physics formulas with angular velocity, and anything where the problem mentions π or gives angles without a degree sign.",
          "When in doubt, look at the question. If the angle has a degree symbol, choose degrees. If it is written as a fraction of π, choose radians.",
        ],
      },
      {
        heading: "Spotting a wrong mode",
        paragraphs: [
          "In degree mode, sin(30) is 0.5 and cos(60) is 0.5. In radian mode, sin(30) is about −0.988, because 30 is read as 30 radians, which is several full turns around the circle. If a standard value looks strange, check the mode before you check your arithmetic.",
          "The [scientific calculator](/scientific-calculator) shows the active mode on the display and on the Deg or Rad key, so you can confirm it at a glance.",
        ],
      },
      {
        heading: "Inverse functions follow the mode too",
        paragraphs: [
          "The inverse functions, written sin⁻¹, cos⁻¹ and tan⁻¹, return an angle in whichever mode is active. In degree mode, asin(0.5) gives 30. In radian mode, it gives about 0.5236. If you need to convert between units afterwards, the [unit converter](/unit-converter) covers lengths, weights and more, and the same multiplication rule applies to angle conversion.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guideForTool(toolSlug: string): Guide | undefined {
  return guides.find((g) => g.toolSlug === toolSlug);
}
