import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CraftImage } from "@/components/media/CraftImage";
import { Button } from "@/components/ui/Button";
import { InstagramGlyph } from "@/components/doodles";
import { siteConfig } from "@/site.config";

const TILES = [
  "A rakhi being crocheted, work in progress",
  "A finished painting kit drying on a windowsill",
  "Orders packed and ready for dispatch",
  "A child holding up a finished canvas",
  "Terracotta diyas mid-way through painting",
  "A gift hamper being tied with ribbon",
];

/**
 * Placeholder tiles now; drop real photos into public/images/social/ named
 * instagram-1.jpg … instagram-6.jpg and they appear with no code change.
 */
export function InstagramStrip() {
  return (
    <Section tone="cream">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Behind the scenes"
          title="Follow the making"
          intro={`Work in progress, packing days and finished pieces on ${siteConfig.social.instagramHandle}.`}
        />
        <Button
          href={siteConfig.social.instagram}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramGlyph className="size-5" />
          Follow us
        </Button>
      </div>

      {/* This section is a beat, not a paragraph, so the reveal is quick and
          percussive: left to right at 70ms. Alternating tiles then hold a very
          slow, phase-offset float, which is what stops six squares reading as
          a ruler-straight line rather than photos pinned slightly unevenly.
          (`float-fast` had been defined in globals.css and never used.) */}
      <ul className="rail-fade rail-fade-md scrollbar-none mt-12 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-6 md:px-0">
        {TILES.map((alt, i) => (
          <li
            key={alt}
            data-reveal="settle"
            style={{ animationDelay: `${i * 70}ms` }}
            className="w-[42%] shrink-0 snap-start [animation-duration:0.6s] sm:w-[28%] md:w-auto"
          >
            <span
              className={i % 2 === 0 ? "block float-tiny-a" : "block float-tiny-b"}
            >
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-ink/12 shadow-soft transition-transform duration-200 hover:-translate-y-1"
              >
                <CraftImage
                  src={`/images/social/instagram-${i + 1}.jpg`}
                  alt={alt}
                  ratio="square"
                  sizes="(max-width: 768px) 42vw, 180px"
                  showPlaceholderLabel={false}
                  seedKey={`ig-${i}`}
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                {/* Wipes up from the bottom rather than cross-fading, and the
                    glyph springs to size instead of appearing. Same cost. */}
                <span className="absolute inset-0 grid translate-y-full place-items-center bg-ink/40 text-cream transition-transform duration-[250ms] ease-settle group-hover:translate-y-0">
                  <InstagramGlyph className="size-7 scale-75 transition-transform duration-[250ms] ease-bounce group-hover:scale-100" />
                </span>
              </a>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
