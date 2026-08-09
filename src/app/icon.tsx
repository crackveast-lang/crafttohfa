import { ImageResponse } from "next/og";

/**
 * Generated favicon — a "CT" monogram, terracotta on cream.
 * Replace later by dropping an `icon.png` into this folder and deleting this
 * file. Note: ImageResponse supports flexbox only, never `display: grid`.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B85230",
          color: "#FFF7F0",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 8,
        }}
      >
        CT
      </div>
    ),
    { ...size },
  );
}
