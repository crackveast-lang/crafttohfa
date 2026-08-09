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
    "CraftTohfa began at a kitchen table with a crochet hook and a wish to pull children away from screens. Here's how it started, and what we promise.",
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
        title="It started with a crochet hook and a stubborn idea"
        intro="Some of the most beautiful ideas are born from the smallest moments. This one arrived at a kitchen table."
      />

      {/* ── Three acts ── */}
      <Section tone="cream" width="narrow">
        <div className="flex flex-col gap-14">
          <Act
            number="01"
            title="The screens"
            body={[
              "As a mother, I watched how quickly screens were replacing imagination — and how rare those small moments of making something together had quietly become.",
              "Not through anyone's fault. There was simply always something easier to hand, and craft always seemed to need more preparation than an ordinary Tuesday evening allowed.",
            ]}
          />
          <Act
            number="02"
            title="The first kit"
            body={[
              "So I started making the thing I wished existed: a box you could open and simply begin. Everything measured out, the outline already sketched, nothing missing halfway through.",
              "A few handmade creations became a dream — to build something where every gift carried a little love, creativity and a personal touch.",
            ]}
          />
          <Act
            number="03"
            title="What Tohfa means"
            body={[
              "The word tohfa means gift. We believe every craft is one — not only to receive, but to create, to cherish, and to remember.",
              "Each order is made with patience, packed with care, and sent with the hope that it brings some happiness into your home, just as making it brought happiness into ours.",
            ]}
          />
        </div>

        <p className="mt-16 border-t border-ink/12 pt-10 text-center font-hand text-3xl text-ink/75">
          thank you for being part of our journey
        </p>
      </Section>

      {/* ── Making strip ── */}
      <Section tone="shell">
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
                  tone={i % 2 === 0 ? "peach" : "rose"}
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
              <Icon aria-hidden="true" className="size-8 text-terracotta" />
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="max-w-[32ch] text-[0.92rem] leading-relaxed text-ink/70">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── What we don't do ── */}
      <Section tone="terracotta" width="narrow">
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
  body,
}: {
  number: string;
  title: string;
  body: string[];
}) {
  return (
    <article className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
      <p
        aria-hidden="true"
        className="font-display text-4xl font-semibold text-rose md:text-5xl"
      >
        {number}
      </p>
      <div>
        <h2 className="text-h3">{title}</h2>
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
