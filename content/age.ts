import type { ToolContent } from "./types";

export const ageContent: ToolContent = {
  title: "Age Calculator – Exact Age in Years, Months and Days",
  description:
    "Find your exact age in years, months and days, the total days you have lived and how many days remain until your next birthday. Free, private and instant.",
  h1: "Age Calculator",
  lead: "Enter a date of birth to see an exact age, the total days lived and a countdown to the next birthday.",
  whatItDoes: [
    "An age in years is easy to state but hard to compare precisely. Forms often ask for exact age on a particular date, schools use cut-off dates, and many people simply want to know how many days they have been alive. This calculator gives all of that from a single date of birth.",
    "It reports your age as whole years, months and days, then adds the total number of days between your birth date and the comparison date. It also tells you how many days are left until your next birthday and which weekday that birthday falls on. By default the comparison date is today, but you can choose any other date to answer questions such as how old someone was at a past event or will be on a future one.",
    "All the work happens in your browser using calendar dates, so there is no time zone confusion and nothing is sent anywhere. Dates in the future or before the year 1900 are rejected with a clear message.",
  ],
  steps: [
    "Choose your date of birth using the date picker, or type it in the format your device shows.",
    "Leave the second date empty to use today, or pick another date to calculate your age on that day.",
    "Read your age in years, months and days in the result box.",
    "Check the total days lived and the countdown to your next birthday underneath.",
    "Change either date to run another comparison. The result updates straight away.",
  ],
  formulaIntro: [
    "The calculation counts how many whole months have passed since the birth date, then counts the leftover days. Twelve whole months make a year. When a month is shorter than the birth day, such as 31 January plus one month, the date is moved back to the last day of that month, so the count never produces a negative number of days.",
    "Total days are found by converting both dates to a count of days since a fixed starting point and subtracting. Because calendar months have different lengths and leap years add a day, the total is the only figure that does not depend on how months are counted.",
    "For the next birthday, the calculator builds the birthday date in the current year. If that date has already passed, it moves to the following year. People born on 29 February have their birthday shown on 28 February in years that are not leap years.",
  ],
  examples: [
    { title: "A standard case", body: "Born on 15 January 2000 and compared with 10 March 2024, the age is 24 years, 1 month and 24 days." },
    { title: "Borrowing days", body: "Born on 31 March and compared with 1 May in the same year, the day difference is negative, so a month is borrowed. The result is 1 month and 1 day." },
    { title: "Leap day birthday", body: "Born on 29 February 2000 and compared with 1 February 2023, the next birthday is shown as 28 February 2023, which is 27 days away." },
  ],
  mistakes: [
    "Entering the date in the wrong order. Use the date picker to avoid mixing day and month.",
    "Assuming every month has 30 days when counting by hand. Real months vary from 28 to 31 days.",
    "Forgetting leap years when estimating total days. A rough figure of years times 365 is always a little short.",
    "Using a future birth date. The tool needs a birth date on or before the comparison date.",
    "Expecting an age in hours or minutes. The calculator works with whole calendar days.",
  ],
  about:
    "Results use the Gregorian calendar and local calendar dates. Different countries and institutions have their own conventions for counting age, so check the rule that applies to any official form.",
  faq: [
    { q: "How do I calculate my exact age?", a: "Subtract your birth date from the current date in years, months and days, borrowing from the month or year when a part is negative. This calculator does it for you." },
    { q: "How many days old am I?", a: "The total days lived appears below your age. It counts every calendar day between your birth date and the comparison date." },
    { q: "Can I find my age on a past or future date?", a: "Yes. Fill in the optional Age at date box and the result will be for that date." },
    { q: "How are leap day birthdays handled?", a: "In years without a 29 February, the next birthday is shown as 28 February. Local law may treat it differently, for example as 1 March." },
    { q: "Why do I get different results from other calculators?", a: "Some tools count months as 30 days. This one uses real calendar months, which is generally considered more accurate." },
    { q: "Does the calculator work for dates before 1900?", a: "No. Birth years before 1900 are rejected to keep results reliable." },
    { q: "How is the next birthday countdown calculated?", a: "It counts calendar days from the comparison date to your birthday in the current year, or in the following year if it has already passed. If today is your birthday, it shows Today." },
    { q: "Is my birth date saved?", a: "No. It stays in your browser and is not stored or sent anywhere." },
  ],
};
