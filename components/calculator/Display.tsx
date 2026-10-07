import { Copy, Check } from "lucide-react";
import { formatNumber } from "@/lib/calculatorLogic";
import { isPlainNumber, prettify, prettyTypedNumber, currentValue, type CalcState } from "@/lib/calculatorState";
import { autoCloseParens, evaluate } from "@/lib/calculatorLogic";

interface DisplayProps {
  state: CalcState;
  copied: boolean;
  onCopy: () => void;
}

/** Large result line with the expression above it. The result is an aria-live region. */
export function Display({ state, copied, onCopy }: DisplayProps) {
  let top = "";
  let main = "0";
  let preview = false;

  if (state.error) {
    top = prettify(state.expr);
    main = state.error;
  } else if (state.justEvaluated && state.result !== null) {
    top = `${prettify(state.lastExpr ?? "")} =`;
    main = formatNumber(state.result);
  } else if (!state.expr) {
    main = "0";
  } else if (isPlainNumber(state.expr)) {
    main = prettyTypedNumber(state.expr);
  } else {
    top = prettify(state.expr);
    const r = evaluate(autoCloseParens(state.expr), state.angle);
    main = r.ok ? formatNumber(r.value) : "";
    preview = true;
  }

  const isError = Boolean(state.error);
  const size = main.length > 18 ? "text-lg" : main.length > 12 ? "text-xl" : main.length > 8 ? "text-2xl" : "text-3xl";
  const canCopy = !isError && currentValue(state) !== null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <div className="flex min-h-5 items-center justify-between gap-2">
        <span className="flex gap-2 text-xs font-semibold text-[var(--muted)]" aria-hidden="true">
          <span className="rounded-md border border-[var(--border)] px-1.5 py-0.5">{state.angle === "deg" ? "DEG" : "RAD"}</span>
          {state.memory !== null && <span className="rounded-md border border-amber-600 px-1.5 py-0.5 text-amber-800 dark:text-amber-300">M</span>}
        </span>
        <button
          type="button"
          onClick={onCopy}
          disabled={!canCopy}
          aria-label="Copy result"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-[var(--muted)] hover:bg-[var(--border)] disabled:opacity-40"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-1 h-5 overflow-x-auto whitespace-nowrap text-right font-display text-sm text-[var(--muted)]" aria-label="Expression" tabIndex={0}>
        {top}
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`mt-1 h-10 overflow-x-auto whitespace-nowrap text-right font-display font-bold leading-10 tabular-nums ${size} ${
          isError ? "text-rose-700 dark:text-rose-300 !text-xl" : preview ? "text-[var(--text)]" : "text-[var(--text)]"
        }`}
        tabIndex={0}
      >
        {main || "\u00A0"}
      </div>
    </div>
  );
}
