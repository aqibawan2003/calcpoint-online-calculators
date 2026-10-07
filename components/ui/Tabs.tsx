"use client";

import { useRef } from "react";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  idPrefix: string;
}

/** Accessible tab list with arrow-key navigation. Panels are rendered by the caller. */
export function Tabs({ tabs, active, onChange, label, idPrefix }: TabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      onChange(tabs[next].id);
      refs.current[next]?.focus();
    }
  }

  return (
    <div role="tablist" aria-label={label} className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((t, i) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-semibold transition-colors ${
              selected
                ? "bg-[var(--accent)] text-white dark:text-slate-950"
                : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border)]"
            }`}
            style={{ touchAction: "manipulation" }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
