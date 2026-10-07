"use client";

import { Trash2 } from "lucide-react";
import type { HistoryEntry } from "@/lib/calculatorState";

interface Props {
  entries: HistoryEntry[];
  onReuse: (entry: HistoryEntry) => void;
  onClear: () => void;
}

/** Loaded with next/dynamic so it stays out of the first bundle. */
export default function HistoryPanel({ entries, onReuse, onClear }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold">History</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={entries.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 text-sm font-semibold disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear all
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--muted)]">Your last 20 calculations will appear here. Tap one to use it again.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {entries.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => onReuse(h)}
                aria-label={`Use ${h.expr} equals ${h.result}`}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right hover:bg-[var(--surface-2)]"
              >
                <span className="block truncate text-sm text-[var(--muted)]">{h.expr}</span>
                <span className="block truncate font-display text-xl font-bold tabular-nums">= {h.result}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
