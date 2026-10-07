"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { KeyButton } from "@/components/ui/Button";

interface KeypadProps {
  onKey: (key: string) => void;
}

/** Standard keypad. Operators blue, equals green and double height, clear keys red. */
export function Keypad({ onKey }: KeypadProps) {
  const digit = (d: string) => <KeyButton key={d} variant="digit" main label={d} ariaLabel={d} onPress={() => onKey(d)} />;
  return (
    <div className="grid grid-cols-4 gap-2" role="group" aria-label="Calculator keypad">
      <KeyButton variant="clear" main label="AC" ariaLabel="All clear" onPress={() => onKey("AC")} />
      <KeyButton variant="clear" main label="C" ariaLabel="Clear" onPress={() => onKey("C")} />
      <KeyButton variant="clear" main label={<Delete className="h-6 w-6" aria-hidden="true" />} ariaLabel="Backspace" onPress={() => onKey("back")} />
      <KeyButton variant="op" main label={<Divide className="h-6 w-6" aria-hidden="true" />} ariaLabel="Divide" onPress={() => onKey("/")} />

      <KeyButton variant="aux" main label="(" ariaLabel="Open parenthesis" onPress={() => onKey("(")} />
      <KeyButton variant="aux" main label=")" ariaLabel="Close parenthesis" onPress={() => onKey(")")} />
      <KeyButton variant="aux" main label="%" ariaLabel="Percent" onPress={() => onKey("%")} />
      <KeyButton variant="op" main label={<Times className="h-6 w-6" aria-hidden="true" />} ariaLabel="Multiply" onPress={() => onKey("*")} />

      {digit("7")}
      {digit("8")}
      {digit("9")}
      <KeyButton variant="op" main label={<Minus className="h-6 w-6" aria-hidden="true" />} ariaLabel="Subtract" onPress={() => onKey("-")} />

      {digit("4")}
      {digit("5")}
      {digit("6")}
      <KeyButton variant="op" main label={<Plus className="h-6 w-6" aria-hidden="true" />} ariaLabel="Add" onPress={() => onKey("+")} />

      {digit("1")}
      {digit("2")}
      {digit("3")}
      <KeyButton variant="eq" main label="=" ariaLabel="Equals" className="row-span-2 !min-h-[128px] !text-3xl" onPress={() => onKey("=")} />

      <KeyButton variant="aux" main label="+/−" ariaLabel="Toggle sign" onPress={() => onKey("neg")} />
      {digit("0")}
      <KeyButton variant="digit" main label="." ariaLabel="Decimal point" onPress={() => onKey(".")} />
    </div>
  );
}
