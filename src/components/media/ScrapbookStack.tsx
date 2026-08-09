import { CraftImage } from "./CraftImage";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { WashiTape } from "@/components/ui/WashiTape";
import { Squiggle } from "@/components/doodles";
import { getFeaturedProducts } from "@/data/products";

/**
 * The hero collage: three product cards overlapped at slight angles with tape
 * at the corners. Max three rotated elements in view — past that it starts to
 * read as clutter rather than craft.
 */
export function ScrapbookStack() {
  const [a, b, c] = getFeaturedProducts(3);
  if (!a) return null;

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
      {/* Soft colour wash behind the stack */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-blob bg-peach/45 blur-2xl"
      />

      <div className="relative pb-10 pt-6">
        {/* Back left */}
        {b ? (
          <div
            className="absolute -left-2 top-0 w-[46%] rotate-[-7deg] overflow-hidden rounded-frame border-2 border-ink/85 bg-cream shadow-soft sm:-left-6"
            aria-hidden="true"
          >
            <CraftImage
              src={b.images[0]?.src ?? ""}
              alt={b.images[0]?.alt ?? b.name}
              motif={b.category}
              seedKey={b.slug}
              ratio="square"
              sizes="(max-width: 1024px) 40vw, 200px"
              showPlaceholderLabel={false}
            />
          </div>
        ) : null}

        {/* Back right */}
        {c ? (
          <div
            className="absolute -right-2 bottom-0 w-[42%] rotate-[6deg] overflow-hidden rounded-frame border-2 border-ink/85 bg-cream shadow-soft sm:-right-6"
            aria-hidden="true"
          >
            <CraftImage
              src={c.images[0]?.src ?? ""}
              alt={c.images[0]?.alt ?? c.name}
              motif={c.category}
              seedKey={c.slug}
              ratio="square"
              sizes="(max-width: 1024px) 36vw, 190px"
              showPlaceholderLabel={false}
            />
          </div>
        ) : null}

        {/* Front hero card */}
        <div className="relative mx-auto w-[72%] rotate-[-2deg] overflow-hidden rounded-frame border-2 border-ink bg-cream shadow-lift">
          <WashiTape
            className="left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
            tone="blush"
            rotate={-5}
          />
          <CraftImage
            src={a.images[0]?.src ?? ""}
            alt={a.images[0]?.alt ?? a.name}
            motif={a.category}
            seedKey={a.slug}
            ratio="square"
            sizes="(max-width: 1024px) 60vw, 330px"
            eager
          />
        </div>

        <StickerBadge
          tone="cream"
          rotate={-8}
          className="absolute -bottom-2 left-0 z-10 sm:left-4"
        >
          Made by hand ✋
        </StickerBadge>

        <Squiggle
          aria-hidden="true"
          className="absolute -right-1 top-2 h-5 w-20 text-sage"
        />
      </div>
    </div>
  );
}
