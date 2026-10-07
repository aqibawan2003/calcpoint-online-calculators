"use client";

import { ArrowLeftRight } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Field, ResultBox, SelectField } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { categories, convert, formatConverted, getCategory, type CategoryId } from "@/lib/conversions";
import { parseNumber } from "@/lib/toolLogic";

export function UnitTool() {
  const [catId, setCatId] = useState<CategoryId>("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const cat = getCategory(catId);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cat.units.filter((u) => !q || u.label.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.id === from || u.id === to);
  }, [cat, query, from, to]);
  const options = filtered.map((u) => ({ value: u.id, label: u.label }));

  function changeCategory(id: CategoryId) {
    const c = getCategory(id);
    setCatId(id);
    setFrom(c.units[0].id);
    setTo(c.units[1].id);
    setQuery("");
  }

  const allowNeg = catId === "temperature";
  const n = parseNumber(value, allowNeg);
  const err = value.trim() !== "" && n === null ? (allowNeg ? "Enter a valid number" : "Enter zero or a positive number") : null;
  const res = n !== null ? convert(catId, n, from, to) : null;
  const fromLabel = cat.units.find((u) => u.id === from)?.label ?? from;
  const toLabel = cat.units.find((u) => u.id === to)?.label ?? to;

  return (
    <div className="card p-4 sm:p-6">
      <Tabs
        tabs={categories.map((c) => ({ id: c.id, label: c.label }))}
        active={catId}
        onChange={(id) => changeCategory(id as CategoryId)}
        label="Measurement type"
        idPrefix="unit"
      />
      <div id="unit-panel" role="tabpanel" aria-labelledby={`unit-tab-${catId}`} className="mt-4 space-y-4">
        <div>
          <label htmlFor={searchId} className="mb-1.5 block text-sm font-semibold">
            Search units
          </label>
          <input id={searchId} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to filter, for example mile" className="input" />
        </div>
        <Field label="Value" value={value} onChange={setValue} error={err} placeholder="1" />
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <SelectField label="From" value={from} onChange={setFrom} options={options} />
          <button
            type="button"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            aria-label="Swap units"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] sm:w-12"
          >
            <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <SelectField label="To" value={to} onChange={setTo} options={options} />
        </div>
        <ResultBox>
          {res === null ? (
            <p className="text-sm text-[var(--muted)]">Enter a value to convert.</p>
          ) : res.ok ? (
            <>
              <p className="text-sm text-[var(--muted)]">
                {value} {fromLabel} equals
              </p>
              <p className="break-words font-display text-3xl font-bold">
                {formatConverted(res.value)} <span className="text-lg font-semibold text-[var(--muted)]">{toLabel}</span>
              </p>
            </>
          ) : (
            <p className="font-medium text-rose-700 dark:text-rose-300">{res.error}</p>
          )}
        </ResultBox>
      </div>
    </div>
  );
}
