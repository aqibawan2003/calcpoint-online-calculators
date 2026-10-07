"use client";

import { useId, type ReactNode } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  hint?: string;
  suffix?: string;
  inputMode?: "decimal" | "numeric" | "text";
  placeholder?: string;
  type?: "text" | "date";
  max?: string;
  min?: string;
}

/** Labelled text input with inline error text. Errors are linked with aria-describedby. */
export function Field({ label, value, onChange, error, hint, suffix, inputMode = "decimal", placeholder, type = "text", max, min }: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          inputMode={type === "text" ? inputMode : undefined}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          max={max}
          min={min}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errId : "", hint ? hintId : ""].filter(Boolean).join(" ") || undefined}
          className={`input ${suffix ? "pr-14" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-[var(--muted)]">{suffix}</span>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1 text-xs text-[var(--muted)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="mt-1 text-sm font-medium text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

export function SelectField({ label, value, onChange, options }: SelectProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResultBox({ children, live = true }: { children: ReactNode; live?: boolean }) {
  return (
    <div
      aria-live={live ? "polite" : undefined}
      className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
    >
      {children}
    </div>
  );
}
