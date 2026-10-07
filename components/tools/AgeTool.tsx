"use client";

import { useState } from "react";
import { Field, ResultBox } from "@/components/ui/Field";
import { computeAge, fmt, parseISODate, type YMD } from "@/lib/toolLogic";

function todayLocal(): YMD {
  const d = new Date();
  return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
}

function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

export function AgeTool() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");

  const birth = dob ? parseISODate(dob) : null;
  const compare = asOf ? parseISODate(asOf) : null;
  const dobErr = dob && !birth ? "Enter a valid date of birth" : null;
  const asOfErr = asOf && !compare ? "Enter a valid date" : null;
  const today = todayLocal();
  const outcome = birth ? computeAge(birth, compare ?? today) : null;
  const maxDob = `${today.y}-${pad(today.m)}-${pad(today.d)}`;

  return (
    <div className="card p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth" type="date" value={dob} onChange={setDob} error={dobErr} max={maxDob} min="1900-01-01" />
        <Field label="Age at date (optional)" type="date" value={asOf} onChange={setAsOf} error={asOfErr} hint="Leave empty to use today" />
      </div>
      <ResultBox>
        {outcome === null ? (
          <p className="text-sm text-[var(--muted)]">Choose a date of birth to see the exact age.</p>
        ) : outcome.ok ? (
          <>
            <p className="font-display text-3xl font-bold">
              {outcome.value.years} years, {outcome.value.months} months, {outcome.value.days} days
            </p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[var(--muted)]">Total days lived</dt>
                <dd className="font-semibold">{fmt(outcome.value.totalDays, 0)}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">Next birthday</dt>
                <dd className="font-semibold">
                  {outcome.value.daysToBirthday === 0 ? "Today" : `In ${fmt(outcome.value.daysToBirthday, 0)} days`} ({outcome.value.birthdayWeekday})
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="font-medium text-rose-700 dark:text-rose-300">{outcome.error}</p>
        )}
      </ResultBox>
    </div>
  );
}
