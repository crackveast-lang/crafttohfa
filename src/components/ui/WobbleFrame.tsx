import { cn } from "@/lib/cn";

/**
 * A hand-drawn border that stretches to fit whatever box it's dropped into.
 *
 * The trick is vector-effect="non-scaling-stroke". The viewBox is a square
 * that gets squashed to any aspect ratio by preserveAspectRatio="none" — which
 * would normally smear the stroke into a fat blur on one axis. non-scaling-stroke
 * keeps it a crisp 2px at every size, so ONE component decorates square cards,
 * tall product photos and wide bands alike.
 *
 * `seed` picks one of three baked wobbles so neighbouring cards aren't clones.
 */
const PATHS = [
  "M4.2 9.8C4.6 5.4 6.1 4.3 10.4 4.1 33 3 66.8 3.2 89.9 4.3c4.3.2 5.6 1.7 5.9 6 .8 25.8.7 53.9 0 79.5-.1 4.4-1.4 5.8-5.8 6.1C67 97 33.6 96.9 10.2 95.9c-4.3-.2-5.7-1.6-5.9-6C3.5 64 3.4 35.6 4.2 9.8Z",
  "M5 10.5C5.2 5.9 6.5 4.6 11 4.4 34 3.2 67.5 3.4 89 4.5c4.6.2 5.9 1.5 6.1 6.1.9 26 1 53.2.2 79.1-.2 4.5-1.6 5.8-6.1 6C66 96.8 32.9 96.7 10.7 95.7c-4.5-.2-5.7-1.5-5.9-6C4 64 3.9 36.3 5 10.5Z",
  "M4.6 11C5 6.2 6.2 5 10.8 4.7 34.4 3.3 66 3.5 89.4 4.6c4.5.2 5.7 1.4 6 5.9 1 25.4 1 54.3.2 79.8-.2 4.4-1.5 5.6-5.9 5.9-23.6 1.3-56 1.2-79.4.1-4.4-.2-5.7-1.5-6-5.9C3.4 64.7 3.5 36.6 4.6 11Z",
];

export function WobbleFrame({
  className,
  seed = 0,
  strokeWidth = 2,
  dashed = false,
}: {
  className?: string;
  seed?: number;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <path
        d={PATHS[Math.abs(seed) % PATHS.length]}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "7 6" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
