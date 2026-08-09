import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Base surface. Radius, hairline border, warm shadow, and the hover lift.
 * `interactive` adds the lift — omit it for static content cards.
 */
export function Card({
  children,
  className,
  interactive = false,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "cream" | "shell" | "peach" | "white";
}) {
  return (
    <div
      className={cn(
        "relative rounded-card border border-ink/10 shadow-soft",
        tone === "cream" && "bg-cream",
        tone === "shell" && "bg-shell",
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
