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
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          color: "#f4d348",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        T
      </div>
    ),
    size,
  );
}
