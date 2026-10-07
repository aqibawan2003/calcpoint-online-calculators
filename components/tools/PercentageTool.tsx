"use client";

import { useState } from "react";
import { Field, ResultBox } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { fmt, parseNumber, percentChange, percentDifference, percentOf, whatPercent, type PercentResult } from "@/lib/toolLogic";

type Mode = "of" | "what" | "increase" | "decrease" | "difference";

const tabs = [
  { id: "of", label: "X% of Y" },
  { id: "what", label: "X is what % of Y" },
  { id: "increase", label: "Increase" },
  { id: "decrease", label: "Decrease" },
  { id: "difference", label: "Difference" },
];

interface ModeConfig {
  aLabel: string;
  bLabel: string;
  aSuffix?: string;
  describe: (r: number, a: number, b: number) => { headline: string; formula: string };
  compute: (a: number, b: number) => PercentResult;
}

const modes: Record<Mode, ModeConfig> = {
  of: {
    aLabel: "Percentage (X)",
    bLabel: "Number (Y)",
    aSuffix: "%",
    compute: (a, b) => percentOf(a, b),
    describe: (r, a, b) => ({ headline: `${fmt(a, 6)}% of ${fmt(b, 6)} is ${fmt(r, 6)}`, formula: `(${fmt(a, 6)} / 100) x ${fmt(b, 6)} = ${fmt(r, 6)}` }),
  },
  what: {
    aLabel: "Part (X)",
    bLabel: "Whole (Y)",
    compute: (a, b) => whatPercent(a, b),
    describe: (r, a, b) => ({ headline: `${fmt(a, 6)} is ${fmt(r, 4)}% of ${fmt(b, 6)}`, formula: `(${fmt(a, 6)} / ${fmt(b, 6)}) x 100 = ${fmt(r, 4)}%` }),
  },
  increase: {
    aLabel: "Starting value",
    bLabel: "New value",
    compute: (a, b) => percentChange(a, b),
    describe: (r, a, b) => ({
      headline: r >= 0 ? `Percentage increase: ${fmt(r, 4)}%` : `The value fell, so this is a decrease of ${fmt(Math.abs(r), 4)}%`,
      formula: `((${fmt(b, 6)} - ${fmt(a, 6)}) / ${fmt(a, 6)}) x 100 = ${fmt(r, 4)}%`,
    }),
  },
  decrease: {
    aLabel: "Starting value",
    bLabel: "New value",
    compute: (a, b) => percentChange(a, b),
    describe: (r, a, b) => ({
      headline: r <= 0 ? `Percentage decrease: ${fmt(Math.abs(r), 4)}%` : `The value rose, so this is an increase of ${fmt(r, 4)}%`,
      formula: `((${fmt(a, 6)} - ${fmt(b, 6)}) / ${fmt(a, 6)}) x 100 = ${fmt(-r, 4)}%`,
    }),
  },
  difference: {
    aLabel: "First number",
    bLabel: "Second number",
    compute: (a, b) => percentDifference(a, b),
    describe: (r, a, b) => ({
      headline: `Percentage difference: ${fmt(r, 4)}%`,
      formula: `|${fmt(a, 6)} - ${fmt(b, 6)}| / ((${fmt(a, 6)} + ${fmt(b, 6)}) / 2) x 100 = ${fmt(r, 4)}%`,
    }),
  },
};

export function PercentageTool() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const cfg = modes[mode];

  const na = parseNumber(a, true);
  const nb = parseNumber(b, true);
  const errA = a.trim() !== "" && na === null ? "Enter a valid number" : null;
  const errB = b.trim() !== "" && nb === null ? "Enter a valid number" : null;
  const result = na !== null && nb !== null ? cfg.compute(na, nb) : null;

  return (
    <div className="card p-4 sm:p-6">
      <Tabs tabs={tabs} active={mode} onChange={(id) => setMode(id as Mode)} label="Percentage calculation type" idPrefix="pct" />
      <div id="pct-panel" role="tabpanel" aria-labelledby={`pct-tab-${mode}`} className="mt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={cfg.aLabel} value={a} onChange={setA} error={errA} suffix={cfg.aSuffix} placeholder="0" />
          <Field label={cfg.bLabel} value={b} onChange={setB} error={errB} placeholder="0" />
        </div>
        <ResultBox>
          {result === null ? (
            <p className="text-sm text-[var(--muted)]">Enter both numbers to see the result.</p>
          ) : result.ok && na !== null && nb !== null ? (
            <>
              <p className="font-display text-2xl font-bold">{cfg.describe(result.value, na, nb).headline}</p>
              <p className="mt-2 break-words text-sm text-[var(--muted)]">{cfg.describe(result.value, na, nb).formula}</p>
            </>
          ) : (
            <p className="font-medium text-rose-700 dark:text-rose-300">{result.ok ? "" : result.error}</p>
          )}
        </ResultBox>
      </div>
    </div>
  );
}
