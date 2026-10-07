"use client";

import { useState } from "react";
import { Field, ResultBox } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { computeEmi, fmtMoney, parseNumber } from "@/lib/toolLogic";

type TenureUnit = "months" | "years";

/** Plain SVG donut: principal versus interest. */
function Donut({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  const r = 52;
  const c = 2 * Math.PI * r;
  const principalLen = total > 0 ? (principal / total) * c : c;
  const pct = total > 0 ? Math.round((principal / total) * 100) : 100;
  return (
    <figure className="flex flex-wrap items-center gap-5">
      <svg viewBox="0 0 140 140" width="140" height="140" role="img" aria-label={`Principal is ${pct} percent of total payment and interest is ${100 - pct} percent.`}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#f59e0b" strokeWidth="22" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth="22"
          strokeDasharray={`${principalLen} ${c - principalLen}`}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <figcaption className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-[#2563eb]" aria-hidden="true" />
          Principal: <strong>{pct}%</strong>
        </p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-[#f59e0b]" aria-hidden="true" />
          Interest: <strong>{100 - pct}%</strong>
        </p>
      </figcaption>
    </figure>
  );
}

export function EmiTool() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [unit, setUnit] = useState<TenureUnit>("years");

  const p = parseNumber(amount);
  const rt = parseNumber(rate);
  const t = parseNumber(tenure);
  const months = t === null ? null : unit === "years" ? t * 12 : t;

  const amountErr = amount.trim() === "" ? null : p === null || p <= 0 || p > 1e12 ? "Enter an amount above 0 and up to 1 trillion" : null;
  const rateErr = rate.trim() === "" ? null : rt === null || rt > 100 ? "Enter a rate from 0 to 100" : null;
  const tenureErr =
    tenure.trim() === ""
      ? null
      : months === null || months < 1 || months > 600 || !Number.isInteger(months)
        ? unit === "years"
          ? "Enter whole months worth of time: 1 month to 50 years"
          : "Enter a whole number of months from 1 to 600"
        : null;

  const valid = p !== null && p > 0 && p <= 1e12 && rt !== null && rt <= 100 && months !== null && months >= 1 && months <= 600 && Number.isInteger(months);
  const res = valid ? computeEmi(p, rt, months) : null;

  return (
    <div className="card p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Loan amount" value={amount} onChange={setAmount} error={amountErr} placeholder="500000" />
        <Field label="Annual interest rate" value={rate} onChange={setRate} error={rateErr} suffix="%" placeholder="9.5" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={`Loan tenure (${unit})`} value={tenure} onChange={setTenure} error={tenureErr} inputMode="decimal" placeholder={unit === "years" ? "5" : "60"} />
        <div>
          <p className="mb-1.5 text-sm font-semibold">Tenure unit</p>
          <Tabs
            tabs={[
              { id: "years", label: "Years" },
              { id: "months", label: "Months" },
            ]}
            active={unit}
            onChange={(id) => setUnit(id as TenureUnit)}
            label="Tenure unit"
            idPrefix="emi"
          />
        </div>
      </div>
      <div id="emi-panel">
        <ResultBox>
          {res === null || p === null ? (
            <p className="text-sm text-[var(--muted)]">Enter the loan amount, rate and tenure to see the monthly payment.</p>
          ) : (
            <>
              <p className="text-sm text-[var(--muted)]">Monthly payment (EMI)</p>
              <p className="font-display text-4xl font-bold">{fmtMoney(res.emi)}</p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-[var(--muted)]">Principal</dt>
                  <dd className="font-semibold">{fmtMoney(p)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Total interest</dt>
                  <dd className="font-semibold">{fmtMoney(res.totalInterest)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Total payment</dt>
                  <dd className="font-semibold">{fmtMoney(res.totalPayment)}</dd>
                </div>
              </dl>
              <div className="mt-5">
                <Donut principal={p} interest={Math.max(0, res.totalInterest)} />
              </div>
            </>
          )}
        </ResultBox>
      </div>
    </div>
  );
}
