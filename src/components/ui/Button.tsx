import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "sticker"
  | "onDark"
  | "whatsapp";
type Size = "sm" | "md" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  // whitespace-nowrap: a label must never wrap to two lines inside a pill.
  // If it doesn't fit, shorten the label at that breakpoint instead.
  "whitespace-nowrap text-center leading-none " +
  "transition-all duration-200 ease-bounce select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-plum " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  /* INK, and this is not a style preference. This variant is every primary
     call to action on the site, so it has to hold white text: on ink that is
     13.44:1, and ink is the only colour in the palette that clears it. The
     accent trio are soft by design and top out under 2:1 against white.
     The colour on this page comes from the blush band it sits on and the
     peach `sticker` variant beside it — not from the primary button. */
  primary:
    "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  secondary:
    "border-2 border-ink/85 bg-transparent text-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:bg-ink/6",
  // The scrapbook one: hard offset shadow, slight tilt that straightens on hover.
  sticker:
    "border-2 border-ink bg-peach text-ink shadow-sticker -rotate-2 hover:rotate-0 hover:-translate-y-0.5",
  onDark:
    "bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  /* Controls that open WhatsApp. PEACH, not WhatsApp green.

     These buttons are the entire checkout on this site, so they appear on
     every product card, the buy box, the sticky bar, the header and the
     mobile menu — which meant a platform green was the single most repeated
     colour on a page whose whole palette is warm ivory, blush and peach. At
     that frequency it stopped reading as "this opens WhatsApp" and started
     reading as a third-party widget dropped onto the design.

     Recognition is carried by the GLYPH instead, which is the part people
     actually read: the mark is unmistakable at 16px and it costs the palette
     nothing. Peach with ink text is 8.74:1 — better than the green ever was
     with white on it (4.88:1) — and the ink border gives it the same weight
     as the primary button it usually sits beside. Hover deepens the fill
     rather than changing hue, so nothing flashes a new colour into the page. */
  whatsapp:
    "border-2 border-ink/85 bg-peach text-ink shadow-soft hover:-translate-y-0.5 hover:bg-peach/75 hover:shadow-lift active:translate-y-0",
};

const SIZES: Record<Size, string> = {
  // min-h-11 = 44px, the minimum comfortable tap target.
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-8 text-base md:text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  full?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
  };

/**
 * Every interactive surface on the site. Renders a real <a> when given an href
 * (internal hrefs go through next/link, external stay a plain anchor) so links
 * remain long-pressable and crawlable.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    full,
    ...rest
  } = props;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    full && "w-full",
    className,
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ComponentPropsWithoutRef<"a"> & {
      href: string;
    };
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
