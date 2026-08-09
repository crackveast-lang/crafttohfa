import { cn } from "@/lib/cn";

/**
 * Torn-paper / wave / scallop transitions between coloured sections.
 *
 * Fill it with the colour of the section it is transitioning INTO, and place
 * it at the boundary. `flip` mirrors it vertically for bottom edges.
 */
const PATHS = {
  torn: "M0 26c62-9 118 6 180 10 71 5 128-14 198-13 62 1 113 17 176 17 66 0 122-19 189-19 71 0 130 20 200 19 68-1 121-18 190-16 65 2 113 16 176 15 55-1 97-11 131-16V40H0V26Z",
  wave: "M0 20c120 0 180 16 300 16s180-16 300-16 180 16 300 16 180-16 300-16 180 16 240 16V40H0V20Z",
  scallop:
    "M0 40c30 0 30-22 60-22s30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22 30-22 60-22 30 22 60 22V40H0Z",
} as const;

export function Divider({
  variant = "torn",
  className,
  flip = false,
  reveal = false,
  delay,
}: {
  variant?: keyof typeof PATHS;
  className?: string;
  flip?: boolean;
  /** Tear itself across the page as the section below it arrives. */
  reveal?: boolean;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      data-reveal={reveal ? "wipe" : undefined}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        "block h-[26px] w-full md:h-10",
        flip && "-scale-y-100",
        className,
      )}
    >
      <path d={PATHS[variant]} fill="currentColor" />
    </svg>
  );
}
