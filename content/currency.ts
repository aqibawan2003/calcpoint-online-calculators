import type { ToolContent } from "./types";

export const currencyContent: ToolContent = {
  title: "Currency Converter Online – Approximate Sample Rates",
  description:
    "Quickly estimate amounts between 12 popular currencies using clearly labeled sample rates. Good for rough budgeting, not for payments or trading decisions.",
  h1: "Currency Converter Online",
  lead: "Estimate an amount in another currency in seconds. The rates on this page are fixed samples, so use the result for rough planning only.",
  whatItDoes: [
    "This converter turns an amount from one currency into another using a built-in table of sample rates. It covers twelve widely used currencies, including the US dollar, euro, British pound, Pakistani rupee, Indian rupee, UAE dirham, Saudi riyal, Canadian dollar, Australian dollar, Japanese yen, Chinese yuan and Swiss franc. A swap button reverses the direction so you can check the conversion both ways.",
    "Please read the label above the form. The rates here are illustrative and approximate. They are not pulled from a live market feed, and real exchange rates change every day, sometimes within minutes. The tool is useful for getting a feel for scale, such as whether a price abroad is in the right ballpark, but it should never be used to decide a payment, a trade or a contract.",
    "For actual transfers, check the rate your bank, card issuer or money transfer service quotes, and look closely at their fees. The difference between a mid-market rate and the rate you are offered can matter more than the headline number.",
  ],
  steps: [
    "Type the amount you want to convert. Use zero or a positive number.",
    "Pick the currency you hold in the From list.",
    "Pick the currency you want in the To list. Use the swap button to reverse the pair.",
    "Read the estimate and the sample rate shown underneath it.",
    "Before you act on the number, compare it with a live rate from your bank or a trusted rate provider.",
  ],
  formulaIntro: [
    "All rates in the table are expressed against one US dollar. To convert between two currencies, the tool first converts your amount into dollars by dividing by the rate of the starting currency, then multiplies by the rate of the target currency. In short: result = amount ÷ rate(from) × rate(to).",
    "This method is called a cross rate. Banks and money transfer services use the same idea, but they add a margin or a fee, so the amount you receive is usually a little lower than the pure calculation shows. The mid-market rate, which sits halfway between the buying and selling prices on the interbank market, is what many comparison sites quote.",
    "A site owner who wants live rates can replace the single getRates function in the project code with a call to a rates provider. Because every calculation goes through that function, nothing else in the tool has to change.",
  ],
  examples: [
    { title: "US dollars to euros", body: "With the sample rate of 0.92, 250 US dollars is about 230 euros." },
    { title: "Pounds to dollars", body: "Using the table, 1 pound equals 1 ÷ 0.79 dollars, so 100 pounds is about 126.58 dollars." },
    { title: "Travel budget", body: "If a hotel costs 120 dollars a night and the sample rate to the Japanese yen is 150, a night is about 18,000 yen. Real prices will differ with the live rate and any card fees." },
  ],
  mistakes: [
    "Treating sample rates as live. Always check a current rate before you pay, invest or sign anything.",
    "Ignoring fees and margins. A provider that advertises no fees may build a margin into the rate.",
    "Mixing up the direction. Converting dollars to euros and euros to dollars use different multipliers.",
    "Forgetting that rates move. The same amount can be worth noticeably more or less a week from now.",
    "Rounding too soon in a multi-step conversion. Convert once from your starting currency to your final one.",
  ],
  about:
    "The numbers on this page are fixed examples included for illustration. They are not financial data, they are not updated, and they are not a quote. Nothing here is financial advice.",
  faq: [
    { q: "Are these exchange rates live?", a: "No. They are fixed sample rates meant for rough estimates. For anything that involves real money, use a live rate from your bank or a trusted provider." },
    { q: "Why do banks give me a different rate?", a: "Banks and transfer services add a margin to the market rate and may charge fees on top. The rate you are offered is rarely the pure mid-market figure." },
    { q: "What is a cross rate?", a: "A cross rate is the exchange rate between two currencies calculated through a third one. This tool uses the US dollar as that third currency." },
    { q: "What is the mid-market rate?", a: "It is the midpoint between the prices at which banks buy and sell a currency to each other. It is often shown on comparison sites as the real rate." },
    { q: "Which currencies are included?", a: "US dollar, euro, British pound, Pakistani rupee, Indian rupee, UAE dirham, Saudi riyal, Canadian dollar, Australian dollar, Japanese yen, Chinese yuan and Swiss franc." },
    { q: "How can I get live rates for my own site?", a: "Replace the getRates function in the project's conversions file with a call to a rates provider, ideally through a server route that caches the response." },
    { q: "Can I convert a negative amount?", a: "No. The tool accepts zero or a positive amount, because a negative amount of money has no meaning for a simple conversion." },
    { q: "Is my amount stored anywhere?", a: "No. The calculation happens in your browser and nothing is sent to a server." },
  ],
};
