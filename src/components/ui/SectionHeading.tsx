import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Underline } from "@/components/doodles";

/**
 * The eyebrow / heading / intro triple. Owns heading sizing and measure so
 * every section on the site lines up without re-deciding it each time.
 *
 * It also owns the entrance, for the same reason: one stagger defined here is
 * what stops fourteen sections inventing fourteen slightly different fades.
 * The rhythm is eyebrow → heading → intro at 80ms, and the hand-drawn
 * underline DRAWS ITSELF a beat after the heading has settled rather than
 * arriving with it. That last detail is the point of having a doodle at all.
 *
 * Reveals are on by default. Pass `reveal={false}` above the fold, where an
 * entrance tied to scrolling would never fire because the element is already
 * in view before the observer exists.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  underline = false,
  as: Tag = "h2",
  className,
  tone = "default",
  reveal = true,
  delay = 0,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Draw the hand-drawn underline beneath the heading. */
  underline?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "default" | "onDark";
  /** Stagger the triple in on scroll. */
  reveal?: boolean;
  /** Milliseconds to offset the whole stagger by. */
  delay?: number;
}) {
  const centered = align === "center";

  // Undefined rather than "rise" when reveals are off, so the attribute is
  // absent entirely and no animation is ever attached.
  const rise = reveal ? "rise" : undefined;
  const at = (ms: number) => (reveal ? { animationDelay: `${delay + ms}ms` } : undefined);

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          data-reveal={rise}
          style={at(0)}
          className={cn(
            "text-eyebrow uppercase",
            // Plain lavender at 12px fails AA on blush and peach, so the
            // eyebrow is bold and we lean
            // on ink/70 for the dark-on-light case.
            tone === "onDark" ? "text-white/85" : "text-plum",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag
        data-reveal={rise}
        style={at(80)}
        className={cn(
          "relative max-w-[20ch]",
          Tag === "h1" ? "text-display" : "text-h2",
          centered && "max-w-[24ch]",
          tone === "onDark" && "text-white",
        )}
      >
        {title}
        {underline ? (
          <Underline
            data-reveal={reveal ? "draw" : undefined}
            style={at(330)}
            className={cn(
              "absolute -bottom-3 h-3 w-[min(240px,60%)]",
              centered ? "left-1/2 -translate-x-1/2" : "left-0",
              tone === "onDark" ? "text-white/60" : "text-sage",
            )}
          />
        ) : null}
      </Tag>

      {intro ? (
        <p
          data-reveal={rise}
          style={at(150)}
          className={cn(
            "max-w-[52ch] text-body leading-relaxed",
            underline && "mt-3",
            tone === "onDark" ? "text-white/85" : "text-ink/75",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
