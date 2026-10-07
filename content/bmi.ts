import type { ToolContent } from "./types";

export const bmiContent: ToolContent = {
  title: "BMI Calculator – Metric and Imperial, Free and Fast",
  description:
    "Work out your body mass index in kg and cm or lb, ft and in. See your category on a simple scale, plus a note on what BMI can and cannot tell you.",
  h1: "BMI Calculator",
  lead: "Enter your weight and height in metric or imperial units to see your body mass index and where it falls on the standard adult categories.",
  whatItDoes: [
    "Body mass index, usually shortened to BMI, is a single number that relates weight to height. Doctors and public health agencies use it as a quick screening tool because it needs only two measurements and is easy to compare across large groups of people. This calculator accepts metric values in kilograms and centimeters or imperial values in pounds, feet and inches, and it switches between them with one tap.",
    "After you enter both measurements, you see your BMI rounded to one decimal place, the matching category and a small scale that marks where your result sits. Inputs are checked as you type. Impossible values, such as a height of three centimeters, are flagged with a short message rather than producing a misleading number.",
    "BMI is a starting point, not a verdict. It cannot tell muscle from fat, it does not consider age or sex, and it says nothing about where body fat is carried. Treat the result as one piece of information to discuss with a health professional if you have concerns.",
  ],
  steps: [
    "Choose Metric or Imperial using the tabs at the top of the tool.",
    "In metric mode, enter your weight in kilograms and your height in centimeters.",
    "In imperial mode, enter your weight in pounds, your height in whole feet and the remaining inches. The inches box can stay empty if you are exactly a whole number of feet tall.",
    "Read your BMI and category below the form. The scale shows your position between the four ranges.",
    "Adjust any value to see how the result changes. Nothing is stored or sent anywhere.",
  ],
  formulaIntro: [
    "In metric units the formula is BMI = weight in kilograms ÷ (height in meters × height in meters). Because the tool asks for centimeters, it divides your height by 100 first. In imperial units the formula is BMI = 703 × weight in pounds ÷ (height in inches × height in inches), where height in inches is feet times 12 plus the extra inches.",
    "The adult categories used by the World Health Organization and many national health services are: below 18.5 is underweight, 18.5 to 24.9 is normal weight, 25.0 to 29.9 is overweight, and 30.0 or above is obese. These thresholds apply to adults aged 20 and over. Children and teenagers are assessed with growth charts that compare BMI against others of the same age and sex, so this tool is not suitable for them.",
  ],
  examples: [
    { title: "Metric example", body: "A person who weighs 70 kg and is 175 cm tall has a height of 1.75 m. BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625, which is about 22.9. That falls in the normal weight range." },
    { title: "Imperial example", body: "A person who weighs 154 lb and is 5 ft 9 in tall has a height of 69 inches. BMI = 703 × 154 ÷ (69 × 69) = 108,262 ÷ 4,761, which is about 22.7, also in the normal range." },
    { title: "Same BMI, different people", body: "An athlete with a lot of muscle and a person with little muscle can have the same BMI. This is why BMI alone cannot describe fitness or health." },
  ],
  mistakes: [
    "Entering height in meters in the centimeters box, or feet and inches in the wrong boxes. Check the unit label beside each field.",
    "Mixing systems, for example kilograms with feet. Use one system at a time.",
    "Reading BMI as a measure of body fat. It is only a ratio of weight to height.",
    "Using adult categories for a child or teenager. Pediatric BMI is interpreted with age and sex specific charts.",
    "Relying on BMI during pregnancy. It is not meant for use at that time.",
    "Treating a result near a boundary as a sharp line. A BMI of 24.9 and 25.0 are practically the same.",
  ],
  about:
    "This tool provides a general screening number and is not medical advice. It does not diagnose any condition. Talk to a doctor or registered dietitian for guidance on weight and health that takes your whole situation into account.",
  faq: [
    { q: "What is a healthy BMI?", a: "For most adults, a BMI from 18.5 to 24.9 is classed as the normal weight range. Health depends on many other factors as well, so the number is only a rough guide." },
    { q: "How is BMI calculated?", a: "Divide weight in kilograms by height in meters squared. In imperial units, multiply weight in pounds by 703 and divide by height in inches squared." },
    { q: "Is BMI accurate for athletes?", a: "Often not. Muscle weighs more than fat, so a muscular person can have a high BMI without carrying excess body fat." },
    { q: "Does BMI work the same for men and women?", a: "The standard adult formula and categories are the same for both. Body composition differs between the sexes, so a professional may look at other measures too." },
    { q: "Can I use this BMI calculator for children?", a: "No. For people under 20, BMI is compared against growth charts for their age and sex, which this tool does not include." },
    { q: "What does underweight mean?", a: "A BMI below 18.5 is classed as underweight. It can have many causes, and a doctor can help work out whether it matters for you." },
    { q: "Why does the calculator reject some values?", a: "To prevent nonsense results, it accepts weights from 2 to 500 kg and heights from 50 to 275 cm, with matching limits in imperial units." },
    { q: "Are my details saved?", a: "No. The numbers stay in your browser and are never sent to a server." },
    { q: "What other measures complement BMI?", a: "Waist circumference, waist-to-hip ratio, blood pressure, blood tests and a conversation with your doctor all add useful context." },
  ],
};
