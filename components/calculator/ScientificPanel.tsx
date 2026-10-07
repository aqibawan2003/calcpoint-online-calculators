"use client";

import { KeyButton } from "@/components/ui/Button";
import type { AngleMode } from "@/lib/calculatorLogic";

interface Props {
  angle: AngleMode;
  onKey: (key: string) => void;
}

/** Scientific keys in a 5-column grid. Indigo for functions, amber is reserved for memory. */
export function ScientificPanel({ angle, onKey }: Props) {
  const k = (key: string, label: string, aria: string) => (
    <KeyButton key={key} variant="sci" className="key-small" label={label} ariaLabel={aria} onPress={() => onKey(key)} />
  );
  return (
    <div className="grid grid-cols-5 gap-2" role="group" aria-label="Scientific functions">
      <KeyButton
        variant="sci"
        className="key-small"
        label={angle === "deg" ? "Deg" : "Rad"}
        ariaLabel={`Angle mode: ${angle === "deg" ? "degrees" : "radians"}. Press to switch.`}
        onPress={() => onKey("angle")}
      />
      {k("sin", "sin", "Sine")}
      {k("cos", "cos", "Cosine")}
      {k("tan", "tan", "Tangent")}
      {k("abs", "|x|", "Absolute value")}
      {k("asin", "sin⁻¹", "Inverse sine")}
      {k("acos", "cos⁻¹", "Inverse cosine")}
      {k("atan", "tan⁻¹", "Inverse tangent")}
      {k("log", "log", "Logarithm base 10")}
      {k("ln", "ln", "Natural logarithm")}
      {k("sqrt", "√", "Square root")}
      {k("sq", "x²", "Square")}
      {k("^", "xʸ", "Power")}
      {k("inv", "1/x", "Reciprocal")}
      {k("!", "n!", "Factorial")}
      {k("pi", "π", "Pi")}
      {k("e", "e", "Euler's number")}
    </div>
  );
}
