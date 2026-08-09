import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#B85230",
          color: "#FFF7F0",
        }}
      >
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          CT
        </div>
        <div
          style={{
            fontSize: 15,
            letterSpacing: 3,
            opacity: 0.75,
            marginTop: 4,
          }}
        >
          HANDMADE
        </div>
      </div>
    ),
    { ...size },
  );
}
