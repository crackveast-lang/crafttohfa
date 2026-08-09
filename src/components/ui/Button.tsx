import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "sticker" | "onDark";
type Size = "sm" | "md" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  // whitespace-nowrap: a label must never wrap to two lines inside a pill.
  // If it doesn't fit, shorten the label at that breakpoint instead.
  "whitespace-nowrap text-center leading-none " +
  "transition-all duration-200 ease-bounce select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lavender " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  /* PLUM, not lavender, and this is not a style preference.
     White on lavender is 3.56:1 — below AA at any size, and this variant is
     every primary call to action on the site. On plum it is 7.10:1.
     It is also where most of the palette's ~5% plum budget is meant to go:
     buttons are exactly the "small area, maximum weight" job it exists for. */
  primary:
    "bg-plum text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  secondary:
    "border-2 border-ink/85 bg-transparent text-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:bg-ink/6",
  // The scrapbook one: hard offset shadow, slight tilt that straightens on hover.
  sticker:
    "border-2 border-ink bg-peach text-ink shadow-sticker -rotate-2 hover:rotate-0 hover:-translate-y-0.5",
  onDark:
    "bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
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
