import {
  autoCloseParens,
  evaluate,
  formatNumber,
  roundClean,
  toPlainString,
  toggleSign,
  type AngleMode,
} from "./calculatorLogic";

export interface CalcState {
  expr: string;
  /** Expression that produced the current result (shown above it after "="). */
  lastExpr: string | null;
  result: number | null;
  justEvaluated: boolean;
  error: string | null;
  angle: AngleMode;
  memory: number | null;
}

export interface HistoryEntry {
  expr: string;
  result: string;
  id: number;
}

export const initialState: CalcState = {
  expr: "",
  lastExpr: null,
  result: null,
  justEvaluated: false,
  error: null,
  angle: "deg",
  memory: null,
};

const FUNC_KEYS = ["sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "abs"];
const NUMBER_SEGMENT = /(\d+\.?\d*(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?)$/i;
const ENDS_WITH_VALUE = /([\d.)%!]|pi|e)$/;

export interface PressOutcome {
  state: CalcState;
  entry?: { expr: string; result: string };
}

/** Display form of an expression: nicer symbols, nothing else changes. */
export function prettify(expr: string): string {
  return expr.replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−").replace(/sqrt/g, "√").replace(/pi/g, "π");
}

/** Group the integer part of a plain typed number: 1234.5 -> 1,234.5 */
export function prettyTypedNumber(s: string): string {
  const m = /^(-?)(\d*)(\.\d*)?$/.exec(s);
  if (!m) return prettify(s);
  const grouped = m[2].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${m[1]}${grouped || (m[3] ? "0" : "")}${m[3] ?? ""}`;
}

export function isPlainNumber(expr: string): boolean {
  return /^-?(\d+\.?\d*|\.\d+)?(e[+-]?\d+)?$/i.test(expr);
}

/** Current numeric value of the expression, or null when it cannot be evaluated yet. */
export function currentValue(s: CalcState): number | null {
  if (s.justEvaluated && s.result !== null) return s.result;
  if (!s.expr) return null;
  const r = evaluate(autoCloseParens(s.expr), s.angle);
  return r.ok ? r.value : null;
}

function startFresh(s: CalcState): CalcState {
  return { ...s, expr: "", lastExpr: null, result: null, justEvaluated: false, error: null };
}

/** Base for the next key: after "=" or an error the old expression is gone. */
function resetIfDone(s: CalcState): CalcState {
  return s.justEvaluated || s.error ? startFresh(s) : s;
}

function plainResult(s: CalcState): string {
  return s.result !== null ? toPlainString(s.result) : "";
}

function insertValue(s: CalcState, text: string): CalcState {
  const base = resetIfDone(s);
  const needsTimes = ENDS_WITH_VALUE.test(base.expr);
  return { ...base, expr: base.expr + (needsTimes ? "*" : "") + text };
}

export function press(state: CalcState, key: string): PressOutcome {
  const s = state;

  // digits
  if (/^[0-9]$/.test(key)) {
    const base = resetIfDone(s);
    const seg = NUMBER_SEGMENT.exec(base.expr)?.[0] ?? "";
    if (seg === "0") return { state: { ...base, expr: base.expr.slice(0, -1) + key } };
    return { state: { ...base, expr: base.expr + key } };
  }

  if (key === ".") {
    const base = resetIfDone(s);
    const seg = NUMBER_SEGMENT.exec(base.expr)?.[0] ?? "";
    if (seg && (seg.includes(".") || /e/i.test(seg))) return { state: base };
    return { state: { ...base, expr: base.expr + (seg ? "." : "0.") } };
  }

  if (["+", "-", "*", "/", "^"].includes(key)) {
    let base = s;
    if (s.error) base = { ...s, error: null };
    if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null, error: null };
    const expr = base.expr;
    if (expr === "") return key === "-" ? { state: { ...base, expr: "-" } } : { state: base };
    if (expr.endsWith("(") && key !== "-") return { state: base };
    if (key === "-" && /[*/^]$/.test(expr)) return { state: { ...base, expr: expr + "-" } };
    const stripped = expr.replace(/[+\-*/^]+$/, "");
    if (stripped === "" && key !== "-") return { state: base };
    if (stripped.endsWith("(") && key !== "-") return { state: base };
    return { state: { ...base, expr: stripped + key } };
  }

  switch (key) {
    case "%": {
      let base = s;
      if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null };
      if (!/[\d)%]$/.test(base.expr)) return { state: base };
      return { state: { ...base, expr: base.expr + "%", error: null } };
    }
    case "(":
      return { state: { ...resetIfDone(s), expr: resetIfDone(s).expr + "(" } };
    case ")": {
      const open = (s.expr.match(/\(/g) ?? []).length;
      const close = (s.expr.match(/\)/g) ?? []).length;
      if (s.justEvaluated || s.error || open <= close || !/[\d)%!]$|pi$|e$/.test(s.expr)) return { state: s };
      return { state: { ...s, expr: s.expr + ")" } };
    }
    case "pi":
      return { state: insertValue(s, "pi") };
    case "e":
      return { state: insertValue(s, "e") };
    case "!": {
      let base = s;
      if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null };
      if (!/[\d)]$/.test(base.expr)) return { state: base };
      return { state: { ...base, expr: base.expr + "!", error: null } };
    }
    case "sq": {
      let base = s;
      if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null };
      if (!/[\d)]$|pi$|e$/.test(base.expr)) return { state: base };
      return { state: { ...base, expr: base.expr + "^2", error: null } };
    }
    case "inv": {
      if (s.justEvaluated) return { state: { ...startFresh(s), expr: `1/(${plainResult(s)})` } };
      if (s.error || !s.expr) return { state: { ...startFresh(s), expr: "1/(" } };
      return { state: { ...s, expr: `1/(${autoCloseParens(s.expr)})` } };
    }
    case "neg": {
      let base = s;
      if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null };
      if (s.error) base = startFresh(s);
      if (base.expr === "") return { state: { ...base, expr: "(-" } };
      return { state: { ...base, expr: toggleSign(base.expr) } };
    }
    case "back": {
      let base = s;
      if (s.justEvaluated) base = { ...s, expr: plainResult(s), justEvaluated: false, lastExpr: null, result: null };
      base = { ...base, error: null };
      const fn = /(?:asin|acos|atan|sin|cos|tan|log|ln|sqrt|abs)\($/.exec(base.expr);
      if (fn) return { state: { ...base, expr: base.expr.slice(0, -fn[0].length) } };
      if (/pi$/.test(base.expr)) return { state: { ...base, expr: base.expr.slice(0, -2) } };
      return { state: { ...base, expr: base.expr.slice(0, -1) } };
    }
    case "C":
      return { state: startFresh(s) };
    case "AC":
      return { state: { ...startFresh(s), memory: null } };
    case "angle":
      return { state: { ...s, angle: s.angle === "deg" ? "rad" : "deg" } };
    case "MC":
      return { state: { ...s, memory: null } };
    case "MR":
      return s.memory === null ? { state: s } : { state: insertValue(s, toPlainString(s.memory)) };
    case "MS": {
      const v = currentValue(s);
      return v === null ? { state: s } : { state: { ...s, memory: v } };
    }
    case "M+":
    case "M-": {
      const v = currentValue(s);
      if (v === null) return { state: s };
      const next = roundClean((s.memory ?? 0) + (key === "M+" ? v : -v));
      return { state: { ...s, memory: next } };
    }
    case "=": {
      if (!s.expr || s.justEvaluated) return { state: s };
      const closed = autoCloseParens(s.expr);
      const r = evaluate(closed, s.angle);
      if (!r.ok) return { state: { ...s, error: r.error } };
      const next: CalcState = {
        ...s,
        expr: toPlainString(r.value),
        lastExpr: closed,
        result: r.value,
        justEvaluated: true,
        error: null,
      };
      const trivial = isPlainNumber(closed);
      return { state: next, entry: trivial ? undefined : { expr: prettify(closed), result: formatNumber(r.value) } };
    }
    default:
      if (FUNC_KEYS.includes(key)) {
        if (s.justEvaluated) return { state: { ...startFresh(s), expr: `${key}(${plainResult(s)})` } };
        const base = resetIfDone(s);
        return { state: { ...base, expr: `${base.expr}${key}(` } };
      }
      return { state };
  }
}

/** Map a physical keyboard key to a keypad key, or null if unused. */
export function keyFromEvent(e: { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean }): string | null {
  if (e.ctrlKey || e.metaKey || e.altKey) return null;
  const k = e.key;
  if (/^[0-9]$/.test(k)) return k;
  switch (k) {
    case ".":
    case ",":
      return ".";
    case "+":
    case "-":
    case "*":
    case "/":
    case "^":
    case "(":
    case ")":
    case "%":
    case "!":
      return k;
    case "x":
    case "X":
      return "*";
    case "Enter":
    case "=":
      return "=";
    case "Backspace":
      return "back";
    case "Escape":
    case "Delete":
      return "C";
    default:
      return null;
  }
}
