import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Base surface. Radius, hairline border, warm shadow, and the hover lift.
 * `interactive` adds the lift — omit it for static content cards.
 *
 * Defaults to WHITE, and that default is doing real work. White is the ~20%
 * in the palette ratio and it exists almost entirely as cards: a card the
 * same ivory as the page behind it has to rely on its shadow to exist at all,
 * whereas white on ivory separates cleanly without needing a heavier border.
 * Reach for a tinted tone only when a card sits ON white.
 */
export function Card({
  children,
  className,
  interactive = false,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "cream" | "blush" | "peach" | "white";
}) {
  return (
    <div
      className={cn(
        "relative rounded-card border border-ink/10 shadow-soft",
        tone === "cream" && "bg-cream",
        tone === "blush" && "bg-blush",
        tone === "peach" && "bg-peach",
        tone === "white" && "bg-white",
        interactive &&
          "transition-all duration-200 ease-bounce hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
