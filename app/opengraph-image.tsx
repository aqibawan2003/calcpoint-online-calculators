import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = `${siteConfig.name} - free online calculators`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b1120 0%, #1e3a8a 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, color: "#93c5fd", fontWeight: 600 }}>Free online calculators</div>
        <div style={{ fontSize: 112, fontWeight: 800, marginTop: 12 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 38, marginTop: 24, color: "#e2e8f0" }}>Scientific, percentage, BMI, units, loan EMI and more</div>
      </div>
    ),
    size,
  );
}
