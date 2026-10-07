"use client";

import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Field, ResultBox, SelectField } from "@/components/ui/Field";
import { convertCurrency, currencies, formatConverted, getRates } from "@/lib/conversions";
import { parseNumber } from "@/lib/toolLogic";

export function CurrencyTool() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const options = currencies.map((c) => ({ value: c.code, label: `${c.code} - ${c.name}` }));

  const n = parseNumber(amount);
  const err = amount.trim() !== "" && n === null ? "Enter zero or a positive amount" : null;
  const res = n !== null ? convertCurrency(n, from, to) : null;
  const rates = getRates();
  const unitRate = (1 / rates[from]) * rates[to];

  return (
    <div className="card p-4 sm:p-6">
      <p role="note" className="mb-4 rounded-xl border border-amber-600 bg-amber-50 p-3 text-sm text-amber-950 dark:bg-amber-950 dark:text-amber-100">
        These are approximate sample rates, not live market rates. Do not use them for payments or trading. Check your bank or a live rate source before you transact.
      </p>
      <div className="space-y-4">
        <Field label="Amount" value={amount} onChange={setAmount} error={err} placeholder="100" />
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <SelectField label="From" value={from} onChange={setFrom} options={options} />
          <button
            type="button"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            aria-label="Swap currencies"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] sm:w-12"
          >
            <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <SelectField label="To" value={to} onChange={setTo} options={options} />
        </div>
      </div>
      <ResultBox>
        {res === null ? (
          <p className="text-sm text-[var(--muted)]">Enter an amount to convert.</p>
        ) : res.ok ? (
          <>
            <p className="text-sm text-[var(--muted)]">
              {amount} {from} is approximately
            </p>
            <p className="break-words font-display text-3xl font-bold">
              {formatConverted(Math.round(res.value * 100) / 100)} <span className="text-lg font-semibold text-[var(--muted)]">{to}</span>
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Sample rate: 1 {from} = {formatConverted(Number(unitRate.toPrecision(6)))} {to}
            </p>
          </>
        ) : (
          <p className="font-medium text-rose-700 dark:text-rose-300">{res.error}</p>
        )}
      </ResultBox>
    </div>
  );
}
