import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CraftImage } from "@/components/media/CraftImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WashiTape } from "@/components/ui/WashiTape";
import { FinalCta } from "@/components/home/FinalCta";
import { Heart, Leaf, PaintBrush, Sparkle } from "@/components/doodles";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our story",
  description:
    "CraftTohfa started with one mother's wish for more moments of making, and became a little brand built for creating, gifting and remembering.",
  path: "/about",
});

const PROMISES = [
  {
    Icon: Heart,
    title: "Made by us, not for us",
    body: "Every crochet piece is worked by hand in our home. Nothing is drop-shipped or rebadged.",
  },
  {
    Icon: PaintBrush,
    title: "Complete kits",
    body: "Enough paint to finish, a practice sheet, and instructions written for a child to follow.",
  },
  {
    Icon: Sparkle,
    title: "Honest timelines",
    body: "If your date isn't achievable we say so before you pay, not after.",
  },
  {
    Icon: Leaf,
    title: "Packed with care",
    body: "Minimal plastic, recycled filler, and a card left blank so you can write it yourself.",
  },
];

const WORKSHOP = [
  "Yarn and crochet hooks laid out on a work table",
  "A rakhi half-finished, mid-stitch",
  "Finished orders packed into boxes ready to post",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="It started with a little idea—and a lot of heart."
        intro="One mother's wish to create more meaningful moments became a little brand made for creating, gifting and remembering."
      />

      {/* ── Three acts ── */}
      <Section tone="cream" width="narrow">
        <div className="flex flex-col gap-14">
          <Act
            number="01"
            title="The little realisation"
            lead="I wanted more moments of making."
            body={[
              "As a mother, I noticed how easily screens could fill a child's free time. I wanted to create something that felt just as easy to reach for—something that could turn an ordinary afternoon into a little moment of creating, exploring and having fun together.",
              "It didn't have to be perfect. It just had to be something we could make with our hands.",
            ]}
          />
          <Act
            number="02"
            title="From an idea to a little box"
            lead="So I started making what I wished I could find."
            body={[
              "Simple craft activities with everything needed in one place—easy to open, easy to start, and exciting enough to make little hands want to try.",
              "And as I kept creating, I realised I wanted to do more than make craft kits. I wanted to create handmade gifts with a personal touch—little things that could be made, gifted and remembered.",
            ]}
          />
          <Act
            number="03"
            title="And then came Craft Tohfa"
            body={[
              "The word “Tohfa” means gift, and we truly believe that every craft is a gift—not just to receive, but to create, cherish, and remember.",
              "Each order is handmade with patience, packed with care, and sent with the hope that it brings happiness to your home, just as creating it brought happiness to ours.",
            ]}
          />
        </div>

        {/* The sign-off. Handwriting for the line that carries the brand
            promise, then the two quiet lines that actually close the letter. */}
        <div className="mt-16 border-t border-ink/12 pt-10 text-center">
          <p
            data-reveal="ink"
            className="mx-auto max-w-[24ch] font-hand text-3xl leading-tight text-plum md:text-4xl"
          >
            Welcome to CraftTohfa — where every craft becomes a memory, and
            every memory is a Tohfa. ❤️
          </p>
          <p
            data-reveal="rise"
            style={{ animationDelay: "220ms" }}
            className="mx-auto mt-8 max-w-[40ch] text-body leading-relaxed text-ink/75"
          >
            A small idea became something I wanted to share.
          </p>
          <p
            data-reveal="rise"
            style={{ animationDelay: "320ms" }}
            className="mx-auto mt-4 max-w-[34ch] text-body leading-relaxed text-ink/75"
          >
            From our hands to yours, with a little creativity and a lot of
            heart. 🤍
          </p>
        </div>
      </Section>

      {/* ── Making strip ── */}
      <Section tone="blush">
        <SectionHeading
          eyebrow="Where it happens"
          title="No factory, no warehouse"
          intro="Just a work table, a lot of yarn, and a system that has slowly stopped being chaos."
        />

        <ul className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          {WORKSHOP.map((alt, i) => (
            <li key={alt} className="relative pt-4">
              <div
                className="overflow-hidden rounded-card border-2 border-ink/80 bg-cream shadow-soft"
                style={{ rotate: `${i === 1 ? 1.4 : i === 0 ? -1.6 : 0.9}deg` }}
              >
                <WashiTape
                  className="left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
                  tone={i % 2 === 0 ? "peach" : "sage"}
                  rotate={i % 2 === 0 ? -4 : 5}
                />
                <CraftImage
                  src={`/images/about/workshop-${i + 1}.jpg`}
                  alt={alt}
                  ratio="landscape"
                  sizes="(max-width: 768px) 90vw, 360px"
                  showPlaceholderLabel={false}
                  seedKey={`workshop-${i}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Promises ── */}
      <Section tone="cream">
        <SectionHeading eyebrow="Our promise" title="What you can count on" />
        <ul className="mt-12 grid gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3">
              <Icon aria-hidden="true" className="size-8 text-lavender" />
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="max-w-[32ch] text-[0.92rem] leading-relaxed text-ink/70">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── What we don't do ── */}
      <Section tone="plum" width="narrow">
        <SectionHeading
          eyebrow="Just as important"
          title="And what we don't do"
          tone="onDark"
          align="center"
        />
        <ul className="mx-auto mt-12 flex max-w-[46ch] flex-col gap-4">
          {[
            "We don't mass-produce. If a batch sells out, it sells out.",
            "We don't fill kits with plastic that gets thrown away by Friday.",
            "We don't take an order we can't deliver on time just to take it.",
            "We don't use photos of products we haven't actually made.",
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-white/90"
            >
              <span aria-hidden="true" className="mt-0.5 text-peach">
                ✕
              </span>
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}

function Act({
  number,
  title,
  lead,
  body,
}: {
  number: string;
  title: string;
  /** The one emphasised line under the heading. Optional — act 03 has none. */
  lead?: string;
  body: string[];
}) {
  return (
    <article className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
      {/* Lavender rather than sage: at text-5xl this clears the 3:1 large-text
          bar on ivory (3.41), and it is the only place on this page the brand
          colour appears at a size where it is allowed to. */}
      <p
        aria-hidden="true"
        className="font-display text-4xl font-semibold text-lavender md:text-5xl"
      >
        {number}
      </p>
      <div>
        <h2 className="text-h3">{title}</h2>
        {lead ? (
          <p className="mt-4 max-w-[46ch] font-display text-lg font-semibold leading-snug text-ink">
            {lead}
          </p>
        ) : null}
        {body.map((p) => (
          <p
            key={p}
            className="mt-4 max-w-[58ch] text-body leading-relaxed text-ink/80"
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
