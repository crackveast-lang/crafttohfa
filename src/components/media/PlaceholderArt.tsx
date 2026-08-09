import { cn } from "@/lib/cn";

/**
 * What you see wherever a real photo has not been added yet.
 *
 * The point is that this must read as a *designed illustrated tile*, not a
 * missing asset — so the site is genuinely presentable and screenshot-able
 * before a single photograph exists. Inline SVG, so it costs zero requests.
 *
 * Deterministic: the same seed always draws the same tile, which keeps the
 * server and client renders identical and stops the grid from reshuffling.
 */

const SCHEMES = [
  { from: "#F5E1E1", to: "#F3C7B5", blob: "#B8C7B0", motif: "#9B7BB5" },
  { from: "#FFF9F2", to: "#F5E1E1", blob: "#F3C7B5", motif: "#9B7BB5" },
  { from: "#F3C7B5", to: "#B8C7B0", blob: "#FFF9F2", motif: "#332D32" },
  { from: "#F5E1E1", to: "#FFF9F2", blob: "#9B7BB5", motif: "#9B7BB5" },
];

const MOTIFS = {
  "painting-kits":
    "M62 12l22 22-30 30-22-22 30-30Zm-32 34l22 22-8 10a16 16 0 0 1-22 0 16 16 0 0 1 0-22l8-10Zm-8 32c-4 6-10 8-16 8 2-6 4-12 10-16",
  rakhis:
    "M8 64c16-16 28-20 40-20m48 20c-16-16-28-20-40-20M48 44a18 18 0 1 0 0 .1Zm0 12a6 6 0 1 0 0 .1ZM48 12v10M30 18l4 7M66 18l-4 7M12 72c6 6 12 8 18 6m54-6c-6 6-12 8-18 6",
  combos:
    "M12 40h72v44H12zM8 26h80v14H8zM48 26v58M48 26c-8-2-18-6-18-13S40 8 48 26Zm0 0c8-2 18-6 18-13S56 8 48 26Z",
  // A crochet hook over a ball of yarn.
  crochet:
    "M34 74a22 22 0 1 0 0-.1ZM34 52a22 22 0 0 0-14 38m14-38c8 0 15 4 19 10M20 62c8-6 20-6 28 0M62 78c-8 0-16-4-20-10M70 14v34a12 12 0 0 1-24 0",
  generic:
    "M20 20h56v56H20zM20 56l16-16 12 12 12-12 16 16M36 36a5 5 0 1 0 0 .1Z",
} as const;

export type MotifKey = keyof typeof MOTIFS;

export function PlaceholderArt({
  label,
  seed = 0,
  motif = "generic",
  className,
  showLabel = true,
  showTag = true,
}: {
  label: string;
  seed?: number;
  motif?: MotifKey;
  className?: string;
  showLabel?: boolean;
  showTag?: boolean;
}) {
  const s = SCHEMES[Math.abs(seed) % SCHEMES.length];
  const uid = `ph${Math.abs(seed) % 100000}`;
  const rot = ((Math.abs(seed) >> 3) % 9) - 4;

  // Wrap to two lines so long product names stay readable in a card.
  const words = label.split(" ");
  const mid = Math.ceil(words.length / 2);
  const lines =
    words.length > 3
      ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
      : [label];

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} — photograph coming soon`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={s.from} />
          <stop offset="100%" stopColor={s.to} />
        </linearGradient>
        <filter id={`${uid}n`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </defs>

      <rect width="400" height="500" fill={`url(#${uid}g)`} />

      {/* Organic blobs, kept faint so the motif still reads */}
      <g fill={s.blob} opacity="0.16">
        <ellipse cx="90" cy="120" rx="150" ry="120" />
        <ellipse cx="330" cy="380" rx="130" ry="150" />
        <ellipse cx="260" cy="90" rx="80" ry="70" opacity="0.7" />
      </g>

      {/* Category motif, large and low-contrast */}
      <g
        transform={`translate(200 ${showLabel ? 215 : 250}) rotate(${rot}) scale(2.1) translate(-48 -48)`}
        fill="none"
        stroke={s.motif}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
      >
        <path d={MOTIFS[motif]} />
      </g>

      {showLabel
        ? lines.map((line, i) => (
            <text
              key={i}
              x="200"
              y={366 + i * 34}
              textAnchor="middle"
              fill="#332D32"
              fillOpacity="0.55"
              fontFamily="var(--font-caveat), cursive"
              fontSize="30"
            >
              {line}
            </text>
          ))
        : null}

      {showTag ? (
        <g transform="translate(200 442) rotate(-3)">
          <rect
            x="-84"
            y="-15"
            width="168"
            height="30"
            rx="4"
            fill="#FFF9F2"
            fillOpacity="0.85"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#332D32"
            fillOpacity="0.6"
            fontFamily="var(--font-jakarta), sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="1.6"
          >
            PHOTO COMING SOON
          </text>
        </g>
      ) : null}

      <rect
        width="400"
        height="500"
        filter={`url(#${uid}n)`}
        opacity="0.05"
        style={{ mixBlendMode: "multiply" }}
      />
    </svg>
  );
}
