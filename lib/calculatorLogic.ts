/**
 * Calculation engine. Pure functions only. No eval(), no new Function().
 * Pipeline: tokenize -> insert implicit multiplication -> recursive descent parse -> evaluate.
 */

export type AngleMode = "deg" | "rad";

export class CalcError extends Error {}

type Token =
  | { t: "num"; v: number }
  | { t: "op"; v: "+" | "-" | "*" | "/" | "^" }
  | { t: "pct" }
  | { t: "fact" }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "fn"; v: string }
  | { t: "const"; v: number };

const FUNCTIONS = new Set([
  "sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "abs",
]);

function tokenize(input: string): Token[] {
  const s = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi")
    .replace(/\s+/g, "");
  const out: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      let dots = 0;
      while (j < s.length && /[0-9.]/.test(s[j])) {
        if (s[j] === ".") dots++;
        j++;
      }
      // scientific notation like 1e+21 or 2.5e-7
      if (s[j] === "e" && /[+-]?\d/.test(s.slice(j + 1, j + 3)) && !/^e[a-z]/.test(s.slice(j, j + 2))) {
        let k = j + 1;
        if (s[k] === "+" || s[k] === "-") k++;
        if (/\d/.test(s[k] ?? "")) {
          while (k < s.length && /\d/.test(s[k])) k++;
          j = k;
        }
      }
      const raw = s.slice(i, j);
      if (dots > 1 || raw === ".") throw new CalcError("Invalid number");
      const v = Number(raw);
      if (!Number.isFinite(v)) throw new CalcError("Invalid number");
      out.push({ t: "num", v });
      i = j;
    } else if ("+-*/^".includes(c)) {
      out.push({ t: "op", v: c as "+" | "-" | "*" | "/" | "^" });
      i++;
    } else if (c === "%") {
      out.push({ t: "pct" });
      i++;
    } else if (c === "!") {
      out.push({ t: "fact" });
      i++;
    } else if (c === "(") {
      out.push({ t: "lp" });
      i++;
    } else if (c === ")") {
      out.push({ t: "rp" });
      i++;
    } else if (c === "|") {
      throw new CalcError("Use abs( ) for absolute value");
    } else if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j])) j++;
      const word = s.slice(i, j).toLowerCase();
      if (word === "pi") out.push({ t: "const", v: Math.PI });
      else if (word === "e") out.push({ t: "const", v: Math.E });
      else if (FUNCTIONS.has(word)) out.push({ t: "fn", v: word });
      else throw new CalcError("Unknown function");
      i = j;
    } else {
      throw new CalcError("Invalid character");
    }
  }
  return out;
}

/** Insert "*" where multiplication is implied: 2(3), (1)(2), 2pi, )3, 3sin(x), pi2 */
function addImplicitMultiplication(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const cur = tokens[i];
    const prev = out[out.length - 1];
    if (prev) {
      const prevEndsValue =
        prev.t === "num" || prev.t === "const" || prev.t === "rp" || prev.t === "pct" || prev.t === "fact";
      const curStartsValue = cur.t === "num" || cur.t === "const" || cur.t === "lp" || cur.t === "fn";
      if (prevEndsValue && curStartsValue) out.push({ t: "op", v: "*" });
    }
    out.push(cur);
  }
  return out;
}

interface Ctx {
  angle: AngleMode;
}

/** A value plus a flag so "200 + 10%" can treat the 10% relative to 200. */
interface Val {
  v: number;
  pct: boolean;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new CalcError("Factorial needs a whole number, 0 or more");
  if (n > 170) throw new CalcError("Result too large");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function applyFn(name: string, x: number, ctx: Ctx): number {
  const toRad = (d: number) => (ctx.angle === "deg" ? (d * Math.PI) / 180 : d);
  const fromRad = (r: number) => (ctx.angle === "deg" ? (r * 180) / Math.PI : r);
  switch (name) {
    case "sin": {
      const r = Math.sin(toRad(x));
      return cleanTrig(r);
    }
    case "cos": {
      const r = Math.cos(toRad(x));
      return cleanTrig(r);
    }
    case "tan": {
      // exact odd multiples of 90 degrees are undefined
      if (ctx.angle === "deg" && Math.abs(((x % 180) + 180) % 180) === 90) throw new CalcError("Undefined");
      const r = Math.tan(toRad(x));
      if (Math.abs(r) > 1e15) throw new CalcError("Undefined");
      return cleanTrig(r);
    }
    case "asin":
      if (x < -1 || x > 1) throw new CalcError("Input must be between -1 and 1");
      return fromRad(Math.asin(x));
    case "acos":
      if (x < -1 || x > 1) throw new CalcError("Input must be between -1 and 1");
      return fromRad(Math.acos(x));
    case "atan":
      return fromRad(Math.atan(x));
    case "log":
      if (x <= 0) throw new CalcError("Log needs a positive number");
      return Math.log10(x);
    case "ln":
      if (x <= 0) throw new CalcError("Ln needs a positive number");
      return Math.log(x);
    case "sqrt":
      if (x < 0) throw new CalcError("Square root of a negative number");
      return Math.sqrt(x);
    case "abs":
      return Math.abs(x);
    default:
      throw new CalcError("Unknown function");
  }
}

/** Remove tiny float residue such as sin(180deg) = 1.2e-16 */
function cleanTrig(r: number): number {
  return Math.abs(r) < 1e-12 ? 0 : r;
}

class Parser {
  private pos = 0;
  constructor(private tokens: Token[], private ctx: Ctx) {}

  parse(): number {
    if (this.tokens.length === 0) throw new CalcError("Empty expression");
    const val = this.expression();
    if (this.pos < this.tokens.length) {
      if (this.tokens[this.pos].t === "rp") throw new CalcError("Unexpected closing parenthesis");
      throw new CalcError("Invalid syntax");
    }
    return this.resolve(val);
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private resolve(val: Val): number {
    return val.pct ? val.v / 100 : val.v;
  }

  // expression := term (('+'|'-') term)*
  private expression(): Val {
    let left = this.term();
    for (;;) {
      const tk = this.peek();
      if (tk && tk.t === "op" && (tk.v === "+" || tk.v === "-")) {
        this.pos++;
        const right = this.term();
        // "200 + 10%" means 200 + 10% of 200
        const rv = right.pct ? (this.resolve(left) * right.v) / 100 : right.v;
        const lv = this.resolve(left);
        left = { v: tk.v === "+" ? lv + rv : lv - rv, pct: false };
      } else break;
    }
    return left;
  }

  // term := power (('*'|'/') power)*
  private term(): Val {
    let left = this.power();
    for (;;) {
      const tk = this.peek();
      if (tk && tk.t === "op" && (tk.v === "*" || tk.v === "/")) {
        this.pos++;
        const right = this.power();
        const lv = this.resolve(left);
        const rv = this.resolve(right);
        if (tk.v === "/") {
          if (rv === 0) throw new CalcError("Cannot divide by zero");
          left = { v: lv / rv, pct: false };
        } else {
          left = { v: lv * rv, pct: false };
        }
      } else break;
    }
    return left;
  }

  // power := unary ('^' power)?   (right associative)
  private power(): Val {
    const base = this.unary();
    const tk = this.peek();
    if (tk && tk.t === "op" && tk.v === "^") {
      this.pos++;
      const exp = this.power();
      const b = this.resolve(base);
      const e = this.resolve(exp);
      if (b === 0 && e < 0) throw new CalcError("Cannot divide by zero");
      const r = Math.pow(b, e);
      if (Number.isNaN(r)) throw new CalcError("Result is not a real number");
      if (!Number.isFinite(r)) throw new CalcError("Result too large");
      return { v: r, pct: false };
    }
    return base;
  }

  // unary := ('-'|'+') unary | postfix
  private unary(): Val {
    const tk = this.peek();
    if (tk && tk.t === "op" && (tk.v === "-" || tk.v === "+")) {
      this.pos++;
      // unary minus binds looser than ^ so -2^2 = -4
      const inner = this.unaryOperand();
      return tk.v === "-" ? { v: -inner.v, pct: inner.pct } : inner;
    }
    return this.postfix();
  }

  private unaryOperand(): Val {
    const tk = this.peek();
    if (tk && tk.t === "op" && (tk.v === "-" || tk.v === "+")) return this.unary();
    const base = this.postfix();
    const nx = this.peek();
    if (nx && nx.t === "op" && nx.v === "^") {
      this.pos++;
      const exp = this.power();
      const b = this.resolve(base);
      const e = this.resolve(exp);
      if (b === 0 && e < 0) throw new CalcError("Cannot divide by zero");
      const r = Math.pow(b, e);
      if (Number.isNaN(r)) throw new CalcError("Result is not a real number");
      if (!Number.isFinite(r)) throw new CalcError("Result too large");
      return { v: r, pct: false };
    }
    return base;
  }

  // postfix := primary ('!' | '%')*
  private postfix(): Val {
    let val = this.primary();
    for (;;) {
      const tk = this.peek();
      if (tk && tk.t === "fact") {
        this.pos++;
        val = { v: factorial(this.resolve(val)), pct: false };
      } else if (tk && tk.t === "pct") {
        this.pos++;
        val = { v: this.resolve(val), pct: true };
      } else break;
    }
    return val;
  }

  private primary(): Val {
    const tk = this.peek();
    if (!tk) throw new CalcError("Incomplete expression");
    if (tk.t === "num") {
      this.pos++;
      return { v: tk.v, pct: false };
    }
    if (tk.t === "const") {
      this.pos++;
      return { v: tk.v, pct: false };
    }
    if (tk.t === "lp") {
      this.pos++;
      const inner = this.expression();
      const close = this.peek();
      if (!close || close.t !== "rp") throw new CalcError("Missing closing parenthesis");
      this.pos++;
      return inner;
    }
    if (tk.t === "fn") {
      this.pos++;
      const open = this.peek();
      if (!open || open.t !== "lp") throw new CalcError("Function needs parentheses");
      this.pos++;
      const arg = this.expression();
      const close = this.peek();
      if (!close || close.t !== "rp") throw new CalcError("Missing closing parenthesis");
      this.pos++;
      return { v: applyFn(tk.v, this.resolve(arg), this.ctx), pct: false };
    }
    if (tk.t === "rp") throw new CalcError("Unexpected closing parenthesis");
    throw new CalcError("Invalid syntax");
  }
}

/** Drop float noise: 0.1+0.2 -> 0.3. Keeps 12 significant digits. */
export function roundClean(n: number): number {
  if (n === 0) return 0;
  const r = Number(n.toPrecision(12));
  return Object.is(r, -0) ? 0 : r;
}

export type EvalResult = { ok: true; value: number } | { ok: false; error: string };

/** Add closing parentheses for any that are still open, so live preview works while typing. */
export function autoCloseParens(expr: string): string {
  let depth = 0;
  for (const c of expr) {
    if (c === "(") depth++;
    else if (c === ")") depth = Math.max(0, depth - 1);
  }
  return expr + ")".repeat(depth);
}

export function evaluate(expression: string, angle: AngleMode = "deg"): EvalResult {
  try {
    const tokens = addImplicitMultiplication(tokenize(expression));
    const raw = new Parser(tokens, { angle }).parse();
    if (Number.isNaN(raw)) return { ok: false, error: "Invalid calculation" };
    if (!Number.isFinite(raw)) return { ok: false, error: "Result too large" };
    return { ok: true, value: roundClean(raw) };
  } catch (e) {
    if (e instanceof CalcError) return { ok: false, error: e.message };
    return { ok: false, error: "Invalid calculation" };
  }
}

/** Format for display: thousands separators, scientific notation for extremes. */
export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e15 || abs < 1e-9) {
    const [m, e] = n.toExponential(9).split("e");
    const mant = m.replace(/\.?0+$/, "");
    return `${mant}e${e.startsWith("-") ? "-" : "+"}${e.replace(/^[+-]/, "")}`;
  }
  const rounded = roundClean(n);
  const str = String(rounded);
  if (str.includes("e")) return str;
  const [intPart, frac] = str.split(".");
  const neg = intPart.startsWith("-");
  const digits = neg ? intPart.slice(1) : intPart;
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${neg ? "-" : ""}${grouped}${frac ? "." + frac : ""}`;
}

/** Plain string used when a result is reused as the next input (no commas). */
export function toPlainString(n: number): string {
  const r = roundClean(n);
  const s = String(r);
  if (!s.includes("e")) return s;
  return r.toExponential().replace("e+", "e");
}

/** Toggle sign of the last number in the expression. */
export function toggleSign(expr: string): string {
  if (!expr) return "-";
  const m = expr.match(/(\(-)?(\d+\.?\d*(e[+-]?\d+)?|\.\d+)$/i);
  if (!m || m.index === undefined) return expr;
  const start = m.index;
  const num = m[2];
  if (m[1]) return expr.slice(0, start) + num;
  const before = expr.slice(0, start);
  if (before.endsWith("-") && (before.length === 1 || /[(+\-*/^×÷−]$/.test(before.slice(0, -1)))) {
    return before.slice(0, -1) + num;
  }
  return before + "(-" + num;
}
