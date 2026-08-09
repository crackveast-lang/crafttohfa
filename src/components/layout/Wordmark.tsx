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
const SIZES = {
  sm: { text: "text-xl", logo: "h-8 md:h-9", art: "wordmark" },
  md: { text: "text-2xl md:text-[1.7rem]", logo: "h-10 md:h-12", art: "wordmark" },
  lg: { text: "text-3xl", logo: "h-20 md:h-24", art: "lockup" },
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
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  asLink?: boolean;
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
      alt={`${siteConfig.name} — every craft is a tohfa`}
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
              onDark ? "text-peach" : "text-rose",
            )}
          />
        </span>
      </span>
      <span className={onDark ? "text-peach" : "text-terracotta"}>Tohfa</span>
    </span>
  );

  if (!asLink) {
    return <span className={cn("inline-flex items-center", className)}>{inner}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      // py-2 gives the logo a 44px+ tap target without disturbing the
      // baseline alignment of the two halves of the wordmark.
      className={cn("group inline-flex shrink-0 items-center py-2", className)}
    >
      {inner}
    </Link>
  );
}
