import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Mobile snap rail. Deliberately not a JS carousel: native momentum scrolling,
 * keyboard-scrollable, works without JS, and costs 0 KB.
 *
 * The negative margin + matching padding lets cards bleed to the screen edge
 * while still starting flush with the Container gutter.
 *
 * The right edge fades out while it is a rail, so "there is more here" is read
 * rather than guessed. The mask is dropped at the breakpoint, because once
 * this is a grid there is nothing further along to hint at — and a permanent
 * fade would just look like a broken gradient on the last card.
 */
export function ScrollRow({
  children,
  className,
  breakpoint = "md",
}: {
  children: ReactNode;
  className?: string;
  /** Above this width the rail becomes a normal grid via `railGrid` classes. */
  breakpoint?: "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "rail-fade scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0",
        breakpoint === "md" && "rail-fade-md md:grid md:snap-none md:overflow-visible",
        breakpoint === "lg" && "rail-fade-lg lg:grid lg:snap-none lg:overflow-visible",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Apply to each direct child of a ScrollRow. */
export const railItem =
  "w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto md:shrink";
