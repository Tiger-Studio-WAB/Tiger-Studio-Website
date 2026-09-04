import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#131313",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          borderRadius: 16,
        }}
      >
        <div style={{ width: 18, height: 3, background: "#53d0ab", borderRadius: 2 }} />
        <div style={{ width: 18, height: 3, background: "#16c1f1", borderRadius: 2 }} />
        <div style={{ width: 18, height: 3, background: "#948eff", borderRadius: 2 }} />
      </div>
    ),
    size,
  );
}
