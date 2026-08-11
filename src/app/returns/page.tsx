import type { Metadata } from "next";
import Link from "next/link";
import { GiftBox, Sparkle, WhatsAppGlyph } from "@/components/doodles";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Return & refund policy",
  description:
    "CraftTohfa accepts returns on items that arrive damaged, defective or incorrect. Record an unboxing video, message us within 48 hours, and we'll arrange a replacement or refund.",
  path: "/returns",
});

/**
 * The three steps, in the order they actually happen. Numbered rather than
 * bulleted because the first one has to be done BEFORE the parcel is opened —
 * a list that doesn't make that sequence obvious costs people their claim.
 */
const STEPS = [
  {
    Icon: GiftBox,
    chip: "bg-blush",
    /* "draw" only works on a STROKED doodle carrying pathLength — the
       WhatsApp glyph is a filled shape, so it gets the sticker pop instead.
       Handing it "draw" would leave it visible but perfectly still, next to
       two icons that animate. */
    reveal: "draw",
    title: "Film the unboxing",
    body: "Please record a short video as you open your package. It is the single quickest way for us to see what happened, and it is what lets us raise a claim with the courier on your behalf.",
  },
  {
    Icon: WhatsAppGlyph,
    chip: "bg-sage",
    reveal: "sticker",
    title: "Message us within 48 hours",
    body: "Send us your order details along with the photos or video, on WhatsApp, within 48 hours of delivery. No forms, no ticket numbers, the same chat you ordered in.",
  },
  {
    Icon: Sparkle,
    chip: "bg-peach",
    reveal: "draw",
    title: "We replace or refund",
    body: "Once approved, we'll arrange a replacement or a refund, whichever applies. Refunds go back to the original payment method and usually appear within 5–7 working days.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Returns & refunds"
        title="Return & Refund Policy"
        intro={
          <>
            We lovingly pack every {siteConfig.name} with care. Because our
            products are handmade and specially curated, we accept returns only
            for items that arrive <strong>damaged, defective or incorrect</strong>.
          </>
        }
      />

      <Section tone="cream">
        <ol className="grid gap-6 md:grid-cols-3 md:gap-7">
          {STEPS.map(({ Icon, chip, reveal, title, body }, i) => (
            <li
              key={title}
              data-reveal="rise-sm"
              style={{ animationDelay: `${i * 70}ms` }}
              className="flex flex-col rounded-card border-2 border-ink/85 bg-white p-7 shadow-sticker-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-full ${chip}`}
                >
                  <Icon
                    aria-hidden="true"
                    data-reveal={reveal}
                    style={{ animationDelay: `${i * 70 + 120}ms` }}
                    className="size-6 text-ink"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="tabular font-display text-2xl font-semibold text-ink/25"
                >
                  0{i + 1}
                </span>
              </div>
              <h2 className="mt-5 text-h3">{title}</h2>
              <p className="mt-3 text-body leading-relaxed text-ink/75">{body}</p>
            </li>
          ))}
        </ol>

        {/* The exclusions have to be on this page and not only on /policies.
            Someone who lands here from a search for "refund" never sees the
            other page, and finding out about change-of-mind only after they
            have asked is the worst possible moment to learn it. */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-7">
          <div
            data-reveal="rise-sm"
            className="rounded-card border border-ink/12 bg-blush/60 p-7"
          >
            <h2 className="text-h3">What isn&apos;t covered</h2>
            <ul className="mt-5 ml-5 flex list-disc flex-col gap-3 text-body leading-relaxed text-ink/75">
              <li>
                <strong>Change of mind.</strong> Everything is handmade to
                order, so we don&apos;t accept general change-of-mind returns.
              </li>
              <li>
                <strong>Handmade variation.</strong> Small differences in
                thread, colour and finish between your piece and the photograph
                are inherent to handmade work, not a defect. If a batch differs
                noticeably, we send you a photo before dispatch.
              </li>
              <li>
                <strong>Claims after 48 hours.</strong> Couriers won&apos;t
                accept a damage claim beyond that window, so please open your
                parcel as soon as it arrives.
              </li>
            </ul>
          </div>

          <div
            data-reveal="rise-sm"
            style={{ animationDelay: "70ms" }}
            className="rounded-card border border-ink/12 bg-white p-7"
          >
            <h2 className="text-h3">Cancellations</h2>
            <p className="mt-5 text-body leading-relaxed text-ink/75">
              We can cancel and refund in full any time before we start making
              your order, usually a few hours after confirmation. Once work has
              begun we can&apos;t cancel it, because the piece was made
              specifically for you.
            </p>
            <p className="mt-4 text-body leading-relaxed text-ink/75">
              Shipping timelines, payment and product care live on the full
              policies page.
            </p>
            {/* Its own line rather than a link mid-sentence — `inline-flex
                min-h-11` keeps it reading as a text link while giving it a
                44px finger target instead of the 22px the type sets at. */}
            <Link
              href="/policies"
              className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-sage decoration-2 underline-offset-4 transition-colors hover:text-plum"
            >
              Shipping, payment &amp; care
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="blush" width="narrow" className="py-16 md:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <p
            data-reveal="ink"
            className="font-hand text-3xl leading-tight text-ink md:text-4xl"
          >
            Made with care, packed with love. <span aria-hidden="true">❤️</span>
          </p>
          <p className="max-w-[46ch] text-body text-ink/75">
            Something arrived that isn&apos;t right? Tell us, a real person
            reads it, and we&apos;d rather fix it than argue about it.
          </p>
          <WhatsAppButton
            ctx={{
              kind: "general",
              note: "Hi! Something in my order arrived damaged or incorrect. Here are the details:",
            }}
            size="lg"
          >
            Report an issue
          </WhatsAppButton>
          <p className="text-sm text-ink/60">
            {siteConfig.whatsapp.responseTime}.
          </p>
        </div>
      </Section>
    </>
  );
}
