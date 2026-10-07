// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Calculator } from "./calculator/Calculator";
import { AgeTool } from "./tools/AgeTool";
import { EmiTool } from "./tools/EmiTool";
import { PercentageTool } from "./tools/PercentageTool";
import { TipTool } from "./tools/TipTool";
import { UnitTool } from "./tools/UnitTool";

beforeAll(() => {
  // jsdom has no matchMedia, which framer-motion's reduced-motion hook reads
  window.matchMedia =
    window.matchMedia ||
    ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }) as MediaQueryList);
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));
const tab = (name: string | RegExp) => fireEvent.click(screen.getByRole("tab", { name }));
const result = () => document.querySelector("[aria-live='polite'][aria-atomic='true']") as HTMLElement;

describe("Calculator component", () => {
  it("adds with the on-screen keys", () => {
    render(<Calculator />);
    ["7", "Add", "8", "Equals"].forEach(click);
    expect(result().textContent).toBe("15");
  });

  it("shows a live preview before pressing equals", () => {
    render(<Calculator />);
    ["2", "Multiply", "6"].forEach(click);
    expect(result().textContent).toBe("12");
  });

  it("shows 0.3 for 0.1 + 0.2", () => {
    render(<Calculator />);
    ["0", "Decimal point", "1", "Add", "0", "Decimal point", "2", "Equals"].forEach(click);
    expect(result().textContent).toBe("0.3");
  });

  it("shows a readable message for divide by zero", () => {
    render(<Calculator />);
    ["5", "Divide", "0", "Equals"].forEach(click);
    expect(result().textContent).toMatch(/divide by zero/i);
    expect(result().textContent).not.toMatch(/NaN|Infinity/);
  });

  it("supports keyboard input", () => {
    render(<Calculator />);
    for (const key of ["1", "2", "+", "3", "Enter"]) fireEvent.keyDown(window, { key });
    expect(result().textContent).toBe("15");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(result().textContent).toBe("0");
  });

  it("saves history to localStorage and lets you reuse an entry", () => {
    render(<Calculator />);
    ["9", "Multiply", "9", "Equals"].forEach(click);
    const saved = JSON.parse(window.localStorage.getItem("calcpoint-history-v1") ?? "[]");
    expect(saved[0]).toMatchObject({ expr: "9×9", result: "81" });
    // desktop history panel is rendered in the DOM (hidden by CSS on mobile)
    return screen.findAllByRole("button", { name: /Use 9×9 equals 81/ }).then((btns) => {
      click("Clear");
      fireEvent.click(btns[0]);
      expect(result().textContent).toBe("81");
    });
  });

  it("memory keys store and recall", () => {
    render(<Calculator />);
    ["5", "Memory store", "Clear", "Memory recall", "Add", "1", "Equals"].forEach(click);
    expect(result().textContent).toBe("6");
  });

  it("scientific panel computes sin(30) in degrees", () => {
    render(<Calculator defaultScientific />);
    ["Sine", "3", "0", "Equals"].forEach(click);
    expect(result().textContent).toBe("0.5");
  });

  it("every keypad key has an accessible name", () => {
    render(<Calculator defaultScientific />);
    const keypad = screen.getByRole("group", { name: "Calculator keypad" });
    within(keypad)
      .getAllByRole("button")
      .forEach((b) => expect((b.getAttribute("aria-label") ?? b.textContent ?? "").trim().length).toBeGreaterThan(0));
  });
});

describe("tools", () => {
  it("percentage tool: 20% of 150 = 30 and validates input", () => {
    render(<PercentageTool />);
    fireEvent.change(screen.getByLabelText("Percentage (X)"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Number (Y)"), { target: { value: "150" } });
    expect(screen.getByText(/20% of 150 is 30/)).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Number (Y)"), { target: { value: "abc" } });
    expect(screen.getByRole("alert").textContent).toMatch(/valid number/i);
  });

  it("percentage tool: divide by zero shows a message, never NaN", () => {
    render(<PercentageTool />);
    tab("X is what % of Y");
    fireEvent.change(screen.getByLabelText("Part (X)"), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText("Whole (Y)"), { target: { value: "0" } });
    expect(document.body.textContent).toMatch(/cannot be zero/i);
    expect(document.body.textContent).not.toMatch(/NaN|Infinity/);
  });

  it("tip tool: splits 100 + 20% between 4", () => {
    render(<TipTool />);
    fireEvent.change(screen.getByLabelText("Bill amount"), { target: { value: "100" } });
    click("20%");
    fireEvent.change(screen.getByLabelText("Number of people"), { target: { value: "4" } });
    expect(document.body.textContent).toContain("30.00");
  });

  it("tip tool: rejects zero people", () => {
    render(<TipTool />);
    fireEvent.change(screen.getByLabelText("Bill amount"), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText("Number of people"), { target: { value: "0" } });
    expect(screen.getByRole("alert").textContent).toMatch(/1 to 100/);
  });

  it("EMI tool shows the monthly payment", () => {
    render(<EmiTool />);
    fireEvent.change(screen.getByLabelText("Loan amount"), { target: { value: "100000" } });
    fireEvent.change(screen.getByLabelText("Annual interest rate"), { target: { value: "12" } });
    tab("Months");
    fireEvent.change(screen.getByLabelText(/Loan tenure/), { target: { value: "12" } });
    expect(document.body.textContent).toContain("8,884.88");
  });

  it("unit tool converts 1 km to meters via the first two units and swaps", () => {
    render(<UnitTool />);
    fireEvent.change(screen.getByLabelText("From"), { target: { value: "km" } });
    fireEvent.change(screen.getByLabelText("To"), { target: { value: "m" } });
    expect(document.body.textContent).toContain("1,000");
    click("Swap units");
    expect(document.body.textContent).toContain("0.001");
  });

  it("unit tool flags a temperature below absolute zero", () => {
    render(<UnitTool />);
    tab("Temperature");
    fireEvent.change(screen.getByLabelText("Value"), { target: { value: "-300" } });
    expect(document.body.textContent).toMatch(/below absolute zero/i);
  });

  it("age tool rejects a birth date in the future", () => {
    render(<AgeTool />);
    fireEvent.change(screen.getByLabelText("Date of birth"), { target: { value: "2999-01-01" } });
    expect(document.body.textContent).toMatch(/after the comparison date/i);
  });
});

describe("ads", () => {
  it("AdSlot renders nothing until AdSense ids are configured", async () => {
    const { AdSlot } = await import("./ads/AdSlot");
    const { container } = render(<AdSlot placement="below" />);
    expect(container.innerHTML).toBe("");
    vi.resetModules();
  });
});
