"use client";

import { useState } from "react";
import { Field, ResultBox } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { bmiCategory, bmiFromImperial, bmiFromMetric, fmt, parseNumber } from "@/lib/toolLogic";

type Units = "metric" | "imperial";

function check(text: string, min: number, max: number, unit: string): { value: number | null; error: string | null } {
  if (text.trim() === "") return { value: null, error: null };
  const n = parseNumber(text);
  if (n === null) return { value: null, error: "Enter a positive number" };
  if (n < min || n > max) return { value: null, error: `Enter a value between ${min} and ${max} ${unit}` };
  return { value: n, error: null };
}

/** Plain SVG scale showing where the result sits between 10 and 40. */
function Scale({ bmi }: { bmi: number }) {
  const clamped = Math.min(40, Math.max(10, bmi));
  const x = ((clamped - 10) / 30) * 300;
  return (
    <svg viewBox="0 0 300 54" role="img" aria-label={`BMI scale from 10 to 40. Your result is ${fmt(bmi, 1)}.`} className="mt-4 w-full max-w-md">
      <rect x="0" y="18" width="85" height="14" fill="#60a5fa" />
      <rect x="85" y="18" width="65" height="14" fill="#34d399" />
      <rect x="150" y="18" width="50" height="14" fill="#fbbf24" />
      <rect x="200" y="18" width="100" height="14" fill="#f87171" />
      <polygon points={`${x - 6},6 ${x + 6},6 ${x},17`} fill="currentColor" />
      <text x="42" y="46" fontSize="9" textAnchor="middle" fill="currentColor">Under</text>
      <text x="117" y="46" fontSize="9" textAnchor="middle" fill="currentColor">Normal</text>
      <text x="175" y="46" fontSize="9" textAnchor="middle" fill="currentColor">Over</text>
      <text x="250" y="46" fontSize="9" textAnchor="middle" fill="currentColor">Obese</text>
    </svg>
  );
}

export function BMITool() {
  const [units, setUnits] = useState<Units>("metric");
  const [kg, setKg] = useState("");
  const [cm, setCm] = useState("");
  const [lb, setLb] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");

  const metric = { w: check(kg, 2, 500, "kg"), h: check(cm, 50, 275, "cm") };
  const imp = { w: check(lb, 4, 1100, "lb"), h: check(ft, 1, 9, "ft"), i: inch.trim() === "" ? { value: 0, error: null } : check(inch, 0, 11.99, "in") };

  let bmi: number | null = null;
  if (units === "metric" && metric.w.value !== null && metric.h.value !== null) bmi = bmiFromMetric(metric.w.value, metric.h.value);
  if (units === "imperial" && imp.w.value !== null && imp.h.value !== null && imp.i.value !== null) bmi = bmiFromImperial(imp.w.value, imp.h.value, imp.i.value);

  const cat = bmi !== null ? bmiCategory(bmi) : null;

  return (
    <div className="card p-4 sm:p-6">
      <Tabs
        tabs={[
          { id: "metric", label: "Metric (kg, cm)" },
          { id: "imperial", label: "Imperial (lb, ft, in)" },
        ]}
        active={units}
        onChange={(id) => setUnits(id as Units)}
        label="Unit system"
        idPrefix="bmi"
      />
      <div id="bmi-panel" role="tabpanel" aria-labelledby={`bmi-tab-${units}`} className="mt-4">
        {units === "metric" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Weight" value={kg} onChange={setKg} error={metric.w.error} suffix="kg" placeholder="70" />
            <Field label="Height" value={cm} onChange={setCm} error={metric.h.error} suffix="cm" placeholder="175" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Weight" value={lb} onChange={setLb} error={imp.w.error} suffix="lb" placeholder="154" />
            <Field label="Height (feet)" value={ft} onChange={setFt} error={imp.h.error} suffix="ft" inputMode="numeric" placeholder="5" />
            <Field label="Height (inches)" value={inch} onChange={setInch} error={imp.i.error} suffix="in" placeholder="9" />
          </div>
        )}
        <ResultBox>
          {bmi === null || cat === null ? (
            <p className="text-sm text-[var(--muted)]">Enter your weight and height to see your BMI.</p>
          ) : (
            <>
              <p className="text-sm text-[var(--muted)]">Your BMI</p>
              <p className="font-display text-4xl font-bold">{fmt(bmi, 1)}</p>
              <p className="mt-1 text-lg font-semibold">Category: {cat}</p>
              <Scale bmi={bmi} />
            </>
          )}
          <p className="mt-3 text-sm text-[var(--muted)]">
            BMI is a screening number, not a diagnosis. It does not measure body fat or health on its own. Speak to a doctor for personal advice.
          </p>
        </ResultBox>
      </div>
    </div>
  );
}
