import { describe, expect, it } from "vitest";
import { convert, convertCurrency, formatConverted } from "./conversions";
import {
  bmiCategory, bmiFromImperial, bmiFromMetric, computeAge, computeEmi, computeTip, parseISODate, parseNumber,
  percentChange, percentDifference, percentOf, whatPercent,
} from "./toolLogic";

describe("parseNumber", () => {
  it("parses plain numbers", () => expect(parseNumber("12.5")).toBe(12.5));
  it("accepts commas", () => expect(parseNumber("1,200")).toBe(1200));
  it("rejects negatives by default", () => expect(parseNumber("-5")).toBeNull());
  it("allows negatives when asked", () => expect(parseNumber("-5", true)).toBe(-5));
  it("rejects text", () => expect(parseNumber("abc")).toBeNull());
  it("rejects empty", () => expect(parseNumber("  ")).toBeNull());
  it("rejects Infinity text", () => expect(parseNumber("Infinity")).toBeNull());
});

describe("percentage", () => {
  it("20% of 150 = 30", () => expect(percentOf(20, 150)).toEqual({ ok: true, value: 30 }));
  it("30 is 20% of 150", () => expect(whatPercent(30, 150)).toEqual({ ok: true, value: 20 }));
  it("whole of zero is an error", () => expect(whatPercent(3, 0).ok).toBe(false));
  it("increase from 50 to 75 = 50%", () => expect(percentChange(50, 75)).toEqual({ ok: true, value: 50 }));
  it("decrease from 80 to 60 = -25%", () => expect(percentChange(80, 60)).toEqual({ ok: true, value: -25 }));
  it("change from zero is an error", () => expect(percentChange(0, 5).ok).toBe(false));
  it("difference between 50 and 150 = 100%", () => expect(percentDifference(50, 150)).toEqual({ ok: true, value: 100 }));
  it("difference of zeros is an error", () => expect(percentDifference(0, 0).ok).toBe(false));
});

describe("bmi", () => {
  it("metric 70kg 175cm ~ 22.86", () => expect(bmiFromMetric(70, 175)).toBeCloseTo(22.857, 2));
  it("imperial 154lb 5ft9in ~ 22.7", () => expect(bmiFromImperial(154, 5, 9)).toBeCloseTo(22.74, 1));
  it("categories", () => {
    expect(bmiCategory(17)).toBe("Underweight");
    expect(bmiCategory(18.5)).toBe("Normal weight");
    expect(bmiCategory(25)).toBe("Overweight");
    expect(bmiCategory(30)).toBe("Obese");
  });
});

describe("emi", () => {
  it("100000 at 12% for 12 months", () => {
    const r = computeEmi(100000, 12, 12);
    expect(r.emi).toBeCloseTo(8884.88, 1);
    expect(r.totalInterest).toBeCloseTo(r.totalPayment - 100000, 6);
  });
  it("zero interest divides evenly", () => expect(computeEmi(1200, 0, 12).emi).toBe(100));
});

describe("tip", () => {
  it("splits a bill", () => {
    const r = computeTip(100, 20, 4);
    expect(r.tip).toBe(20);
    expect(r.total).toBe(120);
    expect(r.perPerson).toBe(30);
  });
});

describe("age", () => {
  it("computes years months days", () => {
    const r = computeAge({ y: 2000, m: 1, d: 15 }, { y: 2024, m: 3, d: 10 });
    expect(r.ok && [r.value.years, r.value.months, r.value.days]).toEqual([24, 1, 24]);
  });
  it("handles month-end birth days without negative days", () => {
    const r = computeAge({ y: 2001, m: 1, d: 31 }, { y: 2023, m: 3, d: 1 });
    expect(r.ok && [r.value.years, r.value.months, r.value.days]).toEqual([22, 1, 1]);
  });
  it("31 March to 1 May is 1 month 1 day", () => {
    const r = computeAge({ y: 2000, m: 3, d: 31 }, { y: 2024, m: 5, d: 1 });
    expect(r.ok && [r.value.years, r.value.months, r.value.days]).toEqual([24, 1, 1]);
  });
  it("same day gives zeros", () => {
    const r = computeAge({ y: 2000, m: 6, d: 10 }, { y: 2000, m: 6, d: 10 });
    expect(r.ok && [r.value.years, r.value.months, r.value.days, r.value.totalDays]).toEqual([0, 0, 0, 0]);
  });
  it("rejects future birth date", () => expect(computeAge({ y: 2030, m: 1, d: 1 }, { y: 2024, m: 1, d: 1 }).ok).toBe(false));
  it("days to birthday when today is the birthday is 0", () => {
    const r = computeAge({ y: 2000, m: 5, d: 5 }, { y: 2024, m: 5, d: 5 });
    expect(r.ok && r.value.daysToBirthday).toBe(0);
  });
  it("handles leap day birthdays", () => {
    const r = computeAge({ y: 2000, m: 2, d: 29 }, { y: 2023, m: 2, d: 1 });
    expect(r.ok && r.value.daysToBirthday).toBe(27);
  });
  it("parses ISO dates and rejects bad ones", () => {
    expect(parseISODate("2024-02-29")).toEqual({ y: 2024, m: 2, d: 29 });
    expect(parseISODate("2023-02-29")).toBeNull();
  });
});

describe("unit conversion", () => {
  it("1 km = 1000 m", () => expect(convert("length", 1, "km", "m")).toEqual({ ok: true, value: 1000 }));
  it("1 mile ~ 1.609344 km", () => {
    const r = convert("length", 1, "mi", "km");
    expect(r.ok && r.value).toBeCloseTo(1.609344, 6);
  });
  it("100 C = 212 F", () => {
    const r = convert("temperature", 100, "C", "F");
    expect(r.ok && r.value).toBeCloseTo(212, 8);
  });
  it("below absolute zero is an error", () => expect(convert("temperature", -300, "C", "K").ok).toBe(false));
  it("negative length is an error", () => expect(convert("length", -1, "m", "km").ok).toBe(false));
  it("formats up to 6 decimals", () => expect(formatConverted(1.23456789)).toBe("1.234568"));
  it("trims trailing zeros", () => expect(formatConverted(2.5)).toBe("2.5"));
});

describe("currency", () => {
  it("same currency returns the same amount", () => {
    const r = convertCurrency(10, "USD", "USD");
    expect(r.ok && r.value).toBe(10);
  });
  it("rejects unknown codes", () => expect(convertCurrency(10, "USD", "XXX").ok).toBe(false));
});
