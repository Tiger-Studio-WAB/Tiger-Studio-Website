import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e2034",
          color: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: "#131313",
            color: "#f4d348",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          T
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 32, marginTop: 20, color: "#cfd6de", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#f4d348" }}>{site.motto}</div>
      </div>
    ),
    size,
  );
}
