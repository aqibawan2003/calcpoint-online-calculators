"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type KeyVariant = "digit" | "op" | "eq" | "clear" | "sci" | "mem" | "aux";

interface KeyButtonProps {
  variant: KeyVariant;
  label: ReactNode;
  ariaLabel?: string;
  onPress: () => void;
  className?: string;
  main?: boolean;
  pressed?: boolean;
}

/** A calculator key: color by group, quick press feedback, always labelled. */
export function KeyButton({ variant, label, ariaLabel, onPress, className = "", main = false, pressed }: KeyButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={pressed}
      onClick={onPress}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.1 }}
      className={`key key-${variant} ${main ? "key-main" : ""} ${className}`}
    >
      {label}
    </motion.button>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/** General button used outside the keypad. */
export function Button({ children, onClick, variant = "secondary", type = "button", className = "", ariaLabel, disabled }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-white dark:text-slate-950 hover:opacity-90"
      : "bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border)]";
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:opacity-50 ${styles} ${className}`}
      style={{ touchAction: "manipulation" }}
    >
      {children}
    </button>
  );
}
