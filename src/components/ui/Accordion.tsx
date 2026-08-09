import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Native <details>/<summary>. Zero JavaScript, and keyboard + screen-reader
 * behaviour is correct for free — which a hand-rolled React accordion almost
 * never is. The only custom bit is the rotating chevron.
 *
 * The open/close height animation is NOT here. It lives in globals.css on
 * `::details-content`, which is the one hook that can animate a native
 * <details> without JavaScript — so this stays a server component and keeps
 * working with scripting off. Browsers that don't support it fall back to the
 * instant snap, i.e. to exactly what this did before.
 */
export function Accordion({
  question,
  children,
  className,
  defaultOpen = false,
  name,
}: {
  question: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  /** Shared name makes a group behave as an exclusive accordion. */
  name?: string;
}) {
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn(
        "group rounded-card border border-ink/12 bg-cream px-5 transition-colors open:bg-blush/60 md:px-6",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 py-5",
          "font-display text-lg font-semibold [&::-webkit-details-marker]:hidden",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender",
          // Closed rows were completely inert to the pointer — in a stack of
          // four, three of them gave no feedback at all.
          "transition-colors hover:text-plum",
        )}
      >
        {question}
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink/70",
            // 280ms on the bounce curve rather than a flat 200ms: the chevron
            // should feel weighted, not flicked.
            "transition-[transform,border-color] duration-[280ms] ease-bounce group-open:rotate-180",
            "group-hover:border-ink",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="pb-5 text-body leading-relaxed text-ink/80 md:max-w-[62ch]">
        {children}
      </div>
    </details>
  );
}
