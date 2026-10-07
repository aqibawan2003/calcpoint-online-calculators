import { describe, expect, it } from "vitest";
import { autoCloseParens, evaluate, formatNumber, roundClean, toPlainString, toggleSign } from "./calculatorLogic";

const ok = (expr: string, angle: "deg" | "rad" = "deg") => {
  const r = evaluate(expr, angle);
  if (!r.ok) throw new Error(`Expected success for "${expr}", got: ${r.error}`);
  return r.value;
};
const err = (expr: string) => {
  const r = evaluate(expr);
  if (r.ok) throw new Error(`Expected error for "${expr}", got: ${r.value}`);
  return r.error;
};

describe("basic arithmetic", () => {
  it("adds", () => expect(ok("2+3")).toBe(5));
  it("subtracts", () => expect(ok("10-4")).toBe(6));
  it("multiplies with x symbol", () => expect(ok("6×7")).toBe(42));
  it("divides with division symbol", () => expect(ok("20÷4")).toBe(5));
  it("handles decimals", () => expect(ok("1.5+2.25")).toBe(3.75));
  it("handles leading decimal point", () => expect(ok(".5+.5")).toBe(1));
  it("ignores spaces", () => expect(ok(" 1 + 2 ")).toBe(3));
});

describe("precedence and grouping", () => {
  it("multiplies before adding", () => expect(ok("2+3*4")).toBe(14));
  it("respects parentheses", () => expect(ok("(2+3)*4")).toBe(20));
  it("handles nested parentheses", () => expect(ok("((1+2)*(3+4))")).toBe(21));
  it("power is right associative", () => expect(ok("2^3^2")).toBe(512));
  it("unary minus binds looser than power", () => expect(ok("-2^2")).toBe(-4));
  it("allows negative exponent", () => expect(ok("2^-2")).toBe(0.25));
  it("handles double unary minus", () => expect(ok("--5")).toBe(5));
  it("subtracts a negative", () => expect(ok("5--3")).toBe(8));
  it("unary minus on parentheses", () => expect(ok("-(2+3)")).toBe(-5));
});

describe("implicit multiplication", () => {
  it("number before parenthesis", () => expect(ok("2(3+4)")).toBe(14));
  it("adjacent parentheses", () => expect(ok("(1+1)(2+2)")).toBe(8));
  it("number before constant", () => expect(ok("2π")).toBeCloseTo(6.283185307, 8));
  it("number before function", () => expect(ok("2sin(90)")).toBe(2));
  it("parenthesis before number", () => expect(ok("(2+3)4")).toBe(20));
});

describe("percentages", () => {
  it("200 + 10% = 220", () => expect(ok("200+10%")).toBe(220));
  it("200 - 10% = 180", () => expect(ok("200-10%")).toBe(180));
  it("50% alone = 0.5", () => expect(ok("50%")).toBe(0.5));
  it("200 * 10% = 20", () => expect(ok("200*10%")).toBe(20));
  it("50 + 50% = 75", () => expect(ok("50+50%")).toBe(75));
});

describe("floating point noise", () => {
  it("0.1 + 0.2 = 0.3", () => expect(ok("0.1+0.2")).toBe(0.3));
  it("0.3 - 0.1 = 0.2", () => expect(ok("0.3-0.1")).toBe(0.2));
  it("1.1 * 3 = 3.3", () => expect(ok("1.1*3")).toBe(3.3));
  it("roundClean removes residue", () => expect(roundClean(0.30000000000000004)).toBe(0.3));
});

describe("scientific functions", () => {
  it("sin 30 deg = 0.5", () => expect(ok("sin(30)")).toBeCloseTo(0.5, 10));
  it("cos 60 deg = 0.5", () => expect(ok("cos(60)")).toBeCloseTo(0.5, 10));
  it("sin(180) cleans to 0 in degrees", () => expect(ok("sin(180)")).toBe(0));
  it("sin(pi/2) in radians = 1", () => expect(ok("sin(π/2)", "rad")).toBe(1));
  it("asin(1) = 90 degrees", () => expect(ok("asin(1)")).toBeCloseTo(90, 10));
  it("atan(1) = 45 degrees", () => expect(ok("atan(1)")).toBeCloseTo(45, 10));
  it("log(1000) = 3", () => expect(ok("log(1000)")).toBe(3));
  it("ln(e) = 1", () => expect(ok("ln(e)")).toBe(1));
  it("sqrt(144) = 12", () => expect(ok("√(144)")).toBe(12));
  it("abs(-7) = 7", () => expect(ok("abs(-7)")).toBe(7));
  it("5! = 120", () => expect(ok("5!")).toBe(120));
  it("0! = 1", () => expect(ok("0!")).toBe(1));
  it("(2+1)! = 6", () => expect(ok("(2+1)!")).toBe(6));
  it("e constant", () => expect(ok("e")).toBeCloseTo(Math.E, 8));
});

describe("errors", () => {
  it("divide by zero", () => expect(err("5/0")).toMatch(/zero/i));
  it("0^-1", () => expect(err("0^-1")).toMatch(/zero/i));
  it("invalid syntax", () => expect(err("2++*3")).toBeTruthy());
  it("empty expression", () => expect(err("")).toBeTruthy());
  it("missing closing parenthesis", () => expect(err("(2+3")).toMatch(/parenthesis/i));
  it("unexpected closing parenthesis", () => expect(err("2+3)")).toMatch(/parenthesis/i));
  it("factorial of negative", () => expect(err("(-3)!")).toMatch(/factorial/i));
  it("factorial of fraction", () => expect(err("2.5!")).toMatch(/factorial/i));
  it("factorial too large", () => expect(err("171!")).toMatch(/large/i));
  it("log of zero", () => expect(err("log(0)")).toMatch(/positive/i));
  it("ln of negative", () => expect(err("ln(-1)")).toMatch(/positive/i));
  it("sqrt of negative", () => expect(err("√(-4)")).toMatch(/negative/i));
  it("asin out of range", () => expect(err("asin(2)")).toMatch(/between/i));
  it("tan(90) undefined", () => expect(err("tan(90)")).toMatch(/undefined/i));
  it("overflow", () => expect(err("10^400")).toMatch(/large/i));
  it("two decimal points", () => expect(err("1.2.3+1")).toMatch(/number/i));
  it("unknown word", () => expect(err("foo(2)")).toBeTruthy());
  it("rejects code-like input", () => expect(err("alert(1)")).toBeTruthy());
  it("rejects square brackets", () => expect(err("[1]")).toBeTruthy());
  it("negative base fractional power", () => expect(err("(-8)^0.5")).toMatch(/real/i));
});

describe("formatting", () => {
  it("adds thousands separators", () => expect(formatNumber(1234567.89)).toBe("1,234,567.89"));
  it("handles negatives", () => expect(formatNumber(-1234)).toBe("-1,234"));
  it("zero", () => expect(formatNumber(0)).toBe("0"));
  it("uses scientific notation for huge values", () => expect(formatNumber(1.5e20)).toBe("1.5e+20"));
  it("uses scientific notation for tiny values", () => expect(formatNumber(2e-12)).toBe("2e-12"));
  it("plain string has no commas", () => expect(toPlainString(1234567)).toBe("1234567"));
  it("plain string parses back for large values", () => {
    expect(ok(toPlainString(1.5e20) + "+0")).toBe(1.5e20);
  });
});

describe("helpers", () => {
  it("autoCloseParens closes open groups", () => expect(autoCloseParens("sin(2*(3")).toBe("sin(2*(3))"));
  it("autoCloseParens leaves balanced input", () => expect(autoCloseParens("(1)")).toBe("(1)"));
  it("toggleSign on a lone number", () => expect(toggleSign("5")).toBe("(-5"));
  it("toggleSign twice returns the number", () => expect(toggleSign(toggleSign("5"))).toBe("5"));
  it("toggleSign after an operator", () => expect(toggleSign("2+3")).toBe("2+(-3"));
  it("closed toggled expression evaluates", () => expect(ok(autoCloseParens(toggleSign("2+3")))).toBe(-1));
});
