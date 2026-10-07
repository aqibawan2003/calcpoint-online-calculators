"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown, ChevronUp, History, Keyboard } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyButton } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { ScientificPanel } from "./ScientificPanel";
import { currentValue, initialState, keyFromEvent, press, type CalcState, type HistoryEntry } from "@/lib/calculatorState";
import { formatNumber, toPlainString } from "@/lib/calculatorLogic";
import { readJson, writeJson } from "@/lib/useLocalStorage";
import { tools } from "@/lib/tools";

const HistoryPanel = dynamic(() => import("./HistoryPanel"), {
  ssr: false,
  loading: () => <div className="min-h-24" aria-hidden="true" />,
});

const HISTORY_KEY = "calcpoint-history-v1";
const MAX_HISTORY = 20;

interface CalculatorProps {
  /** Start with the scientific panel open (used on /scientific-calculator). */
  defaultScientific?: boolean;
}

export function Calculator({ defaultScientific = false }: CalculatorProps) {
  const [state, setState] = useState<CalcState>(initialState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [scientific, setScientific] = useState(defaultScientific);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const stateRef = useRef(state);
  const idRef = useRef(Date.now());

  // Load saved history once on the client.
  useEffect(() => {
    setHistory(readJson<HistoryEntry[]>(HISTORY_KEY, []).slice(0, MAX_HISTORY));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeJson(HISTORY_KEY, history);
  }, [history, loaded]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const onKey = useCallback((key: string) => {
    const outcome = press(stateRef.current, key);
    stateRef.current = outcome.state;
    setState(outcome.state);
    const entry = outcome.entry;
    if (entry) {
      idRef.current += 1;
      const id = idRef.current;
      setHistory((h) => [{ ...entry, id }, ...h].slice(0, MAX_HISTORY));
    }
  }, []);

  // Physical keyboard support. Ignored while typing in other fields or pressing a focused button.
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable) return;
        if ((e.key === "Enter" || e.key === " ") && tag === "BUTTON") return;
      }
      const key = keyFromEvent(e);
      if (!key) return;
      e.preventDefault();
      onKey(key);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);

  async function copyResult() {
    const v = currentValue(stateRef.current);
    if (v === null) return;
    try {
      await navigator.clipboard.writeText(toPlainString(v));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked (for example on insecure origins): do nothing */
    }
  }

  function reuse(entry: HistoryEntry) {
    // Load the original expression back (convert display symbols to engine symbols).
    const expr = entry.expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/√/g, "sqrt").replace(/π/g, "pi");
    const next: CalcState = { ...stateRef.current, expr, lastExpr: null, result: null, justEvaluated: false, error: null };
    stateRef.current = next;
    setState(next);
    setSheetOpen(false);
  }

  const clearHistory = useCallback(() => setHistory([]), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
      <section aria-label="Calculator" className="card p-4 sm:p-5">
        <Display state={state} copied={copied} onCopy={copyResult} />

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setScientific((v) => !v)}
            aria-expanded={scientific}
            aria-controls="scientific-panel"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm font-semibold"
          >
            {scientific ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
            Scientific
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShortcutsOpen((v) => !v)}
              aria-expanded={shortcutsOpen}
              aria-controls="shortcuts-popover"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm font-semibold"
            >
              <Keyboard className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Shortcuts</span>
              <span className="sm:hidden">Keys</span>
            </button>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm font-semibold lg:hidden"
            >
              <History className="h-4 w-4" aria-hidden="true" />
              History
            </button>
          </div>
        </div>

        {shortcutsOpen && (
          <div id="shortcuts-popover" role="region" aria-label="Keyboard shortcuts" className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3 text-sm">
            <p className="font-semibold">Keyboard shortcuts</p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              <li>
                <kbd className="font-mono">0-9 . + - * /</kbd> type numbers and operators
              </li>
              <li>
                <kbd className="font-mono">Enter</kbd> or <kbd className="font-mono">=</kbd> equals
              </li>
              <li>
                <kbd className="font-mono">Backspace</kbd> delete last key
              </li>
              <li>
                <kbd className="font-mono">Esc</kbd> clear
              </li>
              <li>
                <kbd className="font-mono">( )</kbd> parentheses
              </li>
              <li>
                <kbd className="font-mono">^ % !</kbd> power, percent, factorial
              </li>
            </ul>
          </div>
        )}

        {scientific && (
          <div id="scientific-panel" className="mt-2">
            <ScientificPanel angle={state.angle} onKey={onKey} />
          </div>
        )}

        <div className="mt-2 grid grid-cols-5 gap-1.5" role="group" aria-label="Memory">
          <KeyButton variant="mem" className="key-small" label="MC" ariaLabel="Memory clear" onPress={() => onKey("MC")} />
          <KeyButton variant="mem" className="key-small" label="MR" ariaLabel="Memory recall" onPress={() => onKey("MR")} />
          <KeyButton variant="mem" className="key-small" label="M+" ariaLabel="Memory add" onPress={() => onKey("M+")} />
          <KeyButton variant="mem" className="key-small" label="M−" ariaLabel="Memory subtract" onPress={() => onKey("M-")} />
          <KeyButton variant="mem" className="key-small" label="MS" ariaLabel="Memory store" onPress={() => onKey("MS")} />
        </div>
        <p className="sr-only" aria-live="polite">
          {state.memory !== null ? `Memory holds ${formatNumber(state.memory)}` : "Memory is empty"}
        </p>

        <div className="mt-2">
          <Keypad onKey={onKey} />
        </div>
      </section>

      <aside className="hidden space-y-6 lg:block" aria-label="History and tools">
        <div className="card p-5">
          <HistoryPanel entries={history} onReuse={reuse} onClear={clearHistory} />
        </div>
        <nav aria-label="More calculators" className="card p-5">
          <h2 className="font-display text-lg font-bold">More tools</h2>
          <ul className="mt-3 grid gap-1">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={t.path} className="flex min-h-11 items-center rounded-xl px-3 font-medium hover:bg-[var(--surface-2)]">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <Sheet open={sheetOpen} onClose={closeSheet} title="History">
        <HistoryPanel entries={history} onReuse={reuse} onClear={clearHistory} />
      </Sheet>
    </div>
  );
}
