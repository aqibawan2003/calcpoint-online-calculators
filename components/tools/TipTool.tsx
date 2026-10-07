"use client";

import { useState } from "react";
import { Field, ResultBox } from "@/components/ui/Field";
import { computeTip, fmtMoney, parseNumber } from "@/lib/toolLogic";

const presets = [10, 15, 18, 20, 25];

export function TipTool() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("1");

  const b = parseNumber(bill);
  const tp = parseNumber(tip);
  const pp = parseNumber(people);

  const billErr = bill.trim() !== "" && (b === null || b > 1e9) ? "Enter a bill amount of 0 or more" : null;
  const tipErr = tip.trim() !== "" && (tp === null || tp > 100) ? "Enter a tip from 0 to 100" : null;
  const peopleErr = people.trim() !== "" && (pp === null || !Number.isInteger(pp) || pp < 1 || pp > 100) ? "Enter a whole number from 1 to 100" : null;

  const valid = b !== null && b <= 1e9 && tp !== null && tp <= 100 && pp !== null && Number.isInteger(pp) && pp >= 1 && pp <= 100;
  const res = valid ? computeTip(b, tp, pp) : null;

  return (
    <div className="card p-4 sm:p-6">
      <div className="space-y-4">
        <Field label="Bill amount" value={bill} onChange={setBill} error={billErr} placeholder="85.50" />
        <div>
          <Field label="Tip percentage" value={tip} onChange={setTip} error={tipErr} suffix="%" placeholder="15" />
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Common tip percentages">
            {presets.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setTip(String(x))}
                aria-pressed={tp === x}
                className={`min-h-11 min-w-14 rounded-xl px-3 text-sm font-semibold ${
                  tp === x ? "bg-[var(--accent)] text-white dark:text-slate-950" : "border border-[var(--border)] bg-[var(--surface-2)]"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                {x}%
              </button>
            ))}
          </div>
        </div>
        <Field label="Number of people" value={people} onChange={setPeople} error={peopleErr} inputMode="numeric" placeholder="1" />
      </div>
      <ResultBox>
        {res === null ? (
          <p className="text-sm text-[var(--muted)]">Enter the bill to see the tip and the split.</p>
        ) : (
          <>
            <p className="text-sm text-[var(--muted)]">Total per person</p>
            <p className="font-display text-4xl font-bold">{fmtMoney(res.perPerson)}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-[var(--muted)]">Tip amount</dt>
                <dd className="font-semibold">{fmtMoney(res.tip)}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Tip per person</dt>
                <dd className="font-semibold">{fmtMoney(res.tipPerPerson)}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Bill plus tip</dt>
                <dd className="font-semibold">{fmtMoney(res.total)}</dd>
              </div>
            </dl>
          </>
        )}
      </ResultBox>
    </div>
  );
}
