import { describe, expect, it } from "vitest";
import { initialState, keyFromEvent, press, type CalcState } from "./calculatorState";

function run(keys: string[], start: CalcState = initialState) {
  let s = start;
  const entries: { expr: string; result: string }[] = [];
  for (const k of keys) {
    const o = press(s, k);
    s = o.state;
    if (o.entry) entries.push(o.entry);
  }
  return { s, entries };
}

describe("keypad state", () => {
  it("builds and evaluates 12+7=", () => {
    const { s, entries } = run(["1", "2", "+", "7", "="]);
    expect(s.result).toBe(19);
    expect(entries[0]).toEqual({ expr: "12+7", result: "19" });
  });
  it("0.1+0.2 gives 0.3", () => expect(run(["0", ".", "1", "+", "0", ".", "2", "="]).s.result).toBe(0.3));
  it("ignores a second decimal point", () => expect(run(["1", ".", "2", ".", "3"]).s.expr).toBe("1.23"));
  it("avoids leading double zero", () => expect(run(["0", "0", "5"]).s.expr).toBe("5"));
  it("continues from a result with an operator", () => expect(run(["2", "+", "3", "=", "*", "4", "="]).s.result).toBe(20));
  it("starts fresh when a digit follows equals", () => expect(run(["2", "+", "3", "=", "9"]).s.expr).toBe("9"));
  it("replaces a repeated operator", () => expect(run(["5", "+", "*", "3", "="]).s.result).toBe(15));
  it("allows a negative number after multiply", () => expect(run(["5", "*", "-", "3", "="]).s.result).toBe(-15));
  it("reports divide by zero without crashing", () => expect(run(["5", "/", "0", "="]).s.error).toMatch(/zero/i));
  it("clears the error on the next digit", () => expect(run(["5", "/", "0", "=", "7"]).s.error).toBeNull());
  it("percent works as people expect", () => expect(run(["2", "0", "0", "+", "1", "0", "%", "="]).s.result).toBe(220));
  it("scientific function with auto-close", () => expect(run(["sin", "9", "0", "="]).s.result).toBe(1));
  it("backspace removes a whole function token", () => expect(run(["sin", "back"]).s.expr).toBe(""));
  it("e constant after a digit does not become exponent", () => {
    expect(run(["2", "e", "="]).s.result).toBeCloseTo(2 * Math.E, 8);
  });
  it("pi key and square", () => expect(run(["pi", "sq", "="]).s.result).toBeCloseTo(Math.PI ** 2, 8));
  it("reciprocal wraps the expression", () => expect(run(["4", "inv", "="]).s.result).toBe(0.25));
  it("plus/minus toggles the last number", () => expect(run(["5", "neg", "+", "2", "="]).s.result).toBe(-3));
  it("deg/rad toggle changes results", () => {
    const rad = run(["angle", "pi", "/", "2", "=", "sin", "="]);
    expect(rad.s.angle).toBe("rad");
  });
  it("memory add, recall and clear", () => {
    const a = run(["5", "M+", "C", "MR", "+", "1", "="]);
    expect(a.s.result).toBe(6);
    const b = run(["5", "M+", "MC"]);
    expect(b.s.memory).toBeNull();
  });
  it("memory subtract", () => expect(run(["9", "MS", "C", "4", "M-"]).s.memory).toBe(5));
  it("AC clears memory, C keeps it", () => {
    expect(run(["5", "MS", "C"]).s.memory).toBe(5);
    expect(run(["5", "MS", "AC"]).s.memory).toBeNull();
  });
  it("closing parenthesis only when one is open", () => expect(run(["1", ")"]).s.expr).toBe("1"));
  it("factorial key", () => expect(run(["5", "!", "="]).s.result).toBe(120));
  it("does not add a history entry for a lone number", () => expect(run(["5", "="]).entries).toHaveLength(0));
});

describe("keyboard mapping", () => {
  const ev = (key: string) => ({ key, ctrlKey: false, metaKey: false, altKey: false });
  it("maps digits and Enter", () => {
    expect(keyFromEvent(ev("7"))).toBe("7");
    expect(keyFromEvent(ev("Enter"))).toBe("=");
    expect(keyFromEvent(ev("Backspace"))).toBe("back");
    expect(keyFromEvent(ev("Escape"))).toBe("C");
  });
  it("ignores shortcuts with modifiers", () => expect(keyFromEvent({ key: "c", ctrlKey: true, metaKey: false, altKey: false })).toBeNull());
  it("maps x to multiply", () => expect(keyFromEvent(ev("x"))).toBe("*"));
});
