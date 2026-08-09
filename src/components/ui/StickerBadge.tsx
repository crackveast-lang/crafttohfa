import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

const TONES = {
  peach: "bg-peach",
  shell: "bg-shell",
  rose: "bg-rose",
  cream: "bg-cream",
  terracotta: "bg-terracotta text-white border-ink",
} as const;

/**
 * The little rotated pill with a hard offset shadow — "Bestseller", "New",
 * "Made by hand". The resting tilt is static, so it survives
 * prefers-reduced-motion untouched.
 *
 * `reveal` makes it land like a sticker actually being pressed on: it arrives
 * small and crooked, overshoots, then settles. That overshoot is what sells
 * these as physically applied stickers rather than printed labels.
 *
 * Note the division of labour between the two rotations, because it is what
 * lets the entrance and the hover coexist. The resting tilt is the individual
 * `rotate` property, which is what `hover:rotate-0` straightens. The entrance
 * animates `transform`, ending at identity. They compose instead of fighting,
 * and neither ever overwrites the other.
 *
 * The tilt goes through a custom property rather than `style={{ rotate }}`
 * because an inline style outranks every class: with the rotation set inline,
 * `hover:rotate-0` was silently dead and these have never actually
 * straightened on hover. Handing the value to a utility puts both rotations in
 * the same cascade layer, where the hover variant wins on source order.
 */
export function StickerBadge({
  children,
  className,
  tone = "peach",
  rotate = -3,
  size = "md",
  reveal = false,
  delay,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONES;
  rotate?: number;
  size?: "sm" | "md";
  /** Press itself on when it scrolls into view. */
  reveal?: boolean;
  /** Milliseconds to hold before it lands. */
  delay?: number;
}) {
  return (
    <span
      data-reveal={reveal ? "sticker" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink font-bold uppercase tracking-wide text-ink",
        "rotate-[var(--tilt)] shadow-sticker-sm transition-transform duration-200 ease-bounce hover:rotate-0",
        size === "sm" ? "px-2.5 py-0.5 text-[0.65rem]" : "px-3 py-1 text-xs",
        TONES[tone],
        className,
      )}
      style={
        {
          "--tilt": `${rotate}deg`,
          animationDelay: delay ? `${delay}ms` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
