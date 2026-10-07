"use client";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

/** Accessible switch. Text label is always visible so color is never the only signal. */
export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex min-h-11 items-center gap-3 rounded-xl px-2 text-sm font-semibold text-[var(--text)]"
      style={{ touchAction: "manipulation" }}
    >
      <span
        aria-hidden="true"
        className={`relative inline-block h-6 w-11 rounded-full transition-colors ${checked ? "bg-[var(--accent)]" : "bg-slate-400 dark:bg-slate-600"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </span>
      {label}
    </button>
  );
}
