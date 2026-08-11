import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "@/components/doodles";
import { cn } from "@/lib/cn";
import { resolvePhoto } from "@/lib/images";
import { siteConfig } from "@/site.config";

/**
 * Two crops of the same artwork, because a header and a splash screen want
 * different shapes.
 *
 * `logo.png` is the horizontal wordmark: roughly 3.8:1, so at a 48px header it
 * renders ~182px wide and stays legible.
 * `logo-lockup.png` adds the gift box and confetti above it. At 1.9:1 the same
 * 48px of height would leave it only ~92px wide with the words squeezed into
 * the bottom half — unreadable. It is only used where there is vertical room
 * to spend, which is the preloader.
 */
/**
 * `tag` is the tagline's type size at each mark size. It is deliberately not
 * derived from `logo` — the tagline is ~4x wider than it is tall, so scaling
 * the two together makes it outrun the mark badly at lg.
 */
const SIZES = {
  sm: {
    text: "text-xl",
    logo: "h-8 md:h-9",
    art: "wordmark",
    tag: "mt-0.5 text-[0.66rem] md:text-[0.7rem]",
  },
  md: {
    text: "text-2xl md:text-[1.7rem]",
    logo: "h-10 md:h-12",
    art: "wordmark",
    tag: "mt-1 text-[0.75rem] md:text-[0.8rem]",
  },
  lg: {
    text: "text-3xl",
    logo: "h-20 md:h-24",
    art: "lockup",
    tag: "mt-1.5 text-[0.8rem] md:text-sm",
  },
  /* The splash. Deliberately the flat `wordmark` art rather than the lockup:
     the lockup already contains a gift box, and the preloader now draws its
     own box for the mark to rise out of — two boxes in one frame reads as a
     mistake. Sized between md and lg so it fills the box's width. */
  splash: {
    text: "text-3xl md:text-4xl",
    logo: "h-14 md:h-16",
    art: "wordmark",
    tag: "mt-1.5 text-[0.8rem] md:text-sm",
  },
} as const;

const ART = {
  wordmark: { src: "/images/brand/logo.png", width: 1000, height: 264 },
  lockup: { src: "/images/brand/logo-lockup.png", width: 900, height: 469 },
} as const;

/**
 * The brand mark.
 *
 * Uses the files in `public/images/brand/` the moment they exist, and falls
 * back to a text wordmark set in Fraunces until then — the same photo-or-
 * placeholder approach used for product images. See that folder's README.
 */
export function Wordmark({
  className,
  size = "md",
  onDark = false,
  /** Render the mark without wrapping it in a link to the homepage. */
  asLink = true,
  /**
   * Show "Every craft is a तोहफा" under the mark, as it is printed on the card.
   *
   * Opt-in rather than always-on because the header cannot afford it: that bar
   * has a hard budget (header + announcement bar under ~88px on a 390px phone,
   * so the hero headline is visible without scrolling) and it condenses on
   * scroll to min-h-14, which a second line would silently defeat. Turn it on
   * where the logo is presented AS the brand — the footer and the splash.
   */
  tagline = false,
}: {
  className?: string;
  size?: keyof typeof SIZES;
  onDark?: boolean;
  asLink?: boolean;
  tagline?: boolean;
}) {
  const s = SIZES[size];
  const art = ART[s.art];
  // Falls back to the wordmark if only that file has been supplied, so a
  // missing lockup degrades to a smaller mark rather than to no mark at all.
  const logo =
    resolvePhoto(art.src) ?? resolvePhoto(ART.wordmark.src);
  const dims = logo === art.src ? art : ART.wordmark;

  const inner = logo ? (
    <Image
      src={logo}
      // When the tagline is rendered beside it, the alt drops to the bare name
      // so the two aren't read out one after the other.
      alt={tagline ? siteConfig.name : `${siteConfig.name}, every craft is a tohfa`}
      width={dims.width}
      height={dims.height}
      priority={false}
      className={cn("w-auto object-contain", s.logo)}
    />
  ) : (
    <span
      className={cn(
        "group relative inline-flex shrink-0 items-baseline font-display font-semibold tracking-tight",
        s.text,
        onDark ? "text-white" : "text-ink",
      )}
    >
      <span className="relative">
        Craf
        <span className="relative">
          t
          <Sparkle
            aria-hidden="true"
            className={cn(
              "absolute -top-2 left-1/2 size-3 -translate-x-1/2 transition-transform duration-300 ease-bounce group-hover:rotate-90",
              onDark ? "text-peach" : "text-sage",
            )}
          />
        </span>
      </span>
      {/* The one word on the site that is allowed to be plum at any size: it
          is the brand mark, it renders as small as text-xl, and at 7.10:1 it
          is the only accent that clears AA there. */}
      <span className={onDark ? "text-peach" : "text-plum"}>Tohfa</span>
    </span>
  );

  /**
   * The printed tagline, set rather than cropped out of the logo artwork.
   *
   * Live text so it stays sharp at any size, recolours with the palette, and
   * can be read by search engines and screen readers — the card image you
   * supplied is only 383px wide, so a crop of it would be visibly soft next to
   * the 1000px wordmark above it.
   *
   * TIGHT tracking and Baloo at 700 to echo the hand-lettered card. The hearts
   * are the ornaments from the card, aria-hidden so the line is announced as
   * plain words.
   */
  const taglineLine = tagline ? (
    <span
      // `wordmark-tagline` is the hook globals.css uses to fold this away when
      // the header condenses on scroll. Harmless everywhere else.
      className={cn(
        "wordmark-tagline inline-flex items-center gap-1.5 whitespace-nowrap font-fun font-bold leading-none tracking-[0.01em]",
        s.tag,
        onDark ? "text-white/85" : "text-plum",
      )}
    >
      <span aria-hidden="true" className={onDark ? "text-peach" : "text-sage"}>
        ❤
      </span>
      {siteConfig.taglineShort}
      <span aria-hidden="true" className={onDark ? "text-peach" : "text-sage"}>
        ❤
      </span>
    </span>
  ) : null;

  // A tagline turns the mark into a two-row stack; without one it stays a
  // single inline row, so the header's layout is untouched by any of this.
  const stack = taglineLine ? (
    <span className="inline-flex flex-col items-center">
      {inner}
      {taglineLine}
    </span>
  ) : (
    inner
  );

  if (!asLink) {
    return <span className={cn("inline-flex items-center", className)}>{stack}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      // py-2 gives the logo a 44px+ tap target without disturbing the
      // baseline alignment of the two halves of the wordmark.
      className={cn("group inline-flex shrink-0 items-center py-2", className)}
    >
      {stack}
    </Link>
  );
}
