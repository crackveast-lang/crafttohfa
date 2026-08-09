import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

/** The card that appears when the site is shared on WhatsApp or Instagram. */

/**
 * This card is drawn from static config, never from the request — so it can be
 * rendered once at build time. Saying so explicitly is also what `output:
 * export` requires: a static export has no server to generate it on demand,
 * and without this the Pages build fails outright.
 */
export const dynamic = "force-static";

export const alt = `${siteConfig.name} — handmade DIY craft kits, rakhis and gift hampers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PALETTE = ["#FFF7F0", "#F7E6D6", "#F5CBB4", "#DBA48F", "#B85230", "#3D3D3D"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFF7F0",
          padding: 72,
        }}
      >
        {/* Soft blob */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -140,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#F5CBB4",
            opacity: 0.5,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#B85230",
              color: "#FFF7F0",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            CT
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#3D3D3D" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              color: "#3D3D3D",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Put the screens down. Make something instead.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#3D3D3D",
              opacity: 0.72,
              maxWidth: 780,
            }}
          >
            DIY painting kits · Handmade rakhis · Gift hampers
          </div>
        </div>

        <div style={{ display: "flex", height: 16, borderRadius: 999, overflow: "hidden" }}>
          {PALETTE.map((c) => (
            <div key={c} style={{ display: "flex", flex: 1, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
