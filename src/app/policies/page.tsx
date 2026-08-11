import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatINR } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Shipping, returns & policies",
  description:
    "How CraftTohfa orders are placed and paid for, delivery timelines across India, our returns and damages policy, and product care and safety notes.",
  path: "/policies",
});

const SECTIONS = [
  { id: "ordering", title: "How ordering works" },
  { id: "shipping", title: "Shipping & delivery" },
  { id: "returns", title: "Returns, damages & cancellations" },
  { id: "care", title: "Product care & safety" },
];

export default function PoliciesPage() {
  const { shipping } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="The fine print"
        title="How this all works, in plain words"
        intro="No hidden conditions and no fine print worth hiding. If anything here is unclear, ask us."
      />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav
            aria-label="Policy sections"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-eyebrow uppercase text-ink/55">On this page</h2>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-ink/20 px-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-cream lg:border-0 lg:px-0 lg:hover:bg-transparent lg:hover:text-plum"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex max-w-[62ch] flex-col gap-14">
            <Policy id="ordering" title="How ordering works">
              <p>
                CraftTohfa doesn&apos;t use a shopping cart. Every order is
                placed as a WhatsApp conversation, because nearly everything we
                sell is made after you order it.
              </p>
              <ol className="ml-5 list-decimal space-y-2">
                <li>
                  You tap an order button; WhatsApp opens with the product and
                  price already written out.
                </li>
                <li>
                  We reply to confirm availability, the total including
                  shipping, and the delivery estimate for your pin code.
                </li>
                <li>
                  We share a UPI ID or payment link. Payment is taken in full
                  before we start, since each piece is made for you.
                  {shipping.codAvailable
                    ? ""
                    : " We do not currently offer cash on delivery."}
                </li>
                <li>
                  We make it, pack it, and send you the tracking details.
                </li>
              </ol>
              <p>
                A WhatsApp confirmation from us is your order confirmation.
                Nothing is charged automatically and there is no subscription.
              </p>
            </Policy>

            <Policy id="shipping" title="Shipping & delivery">
              <ul className="ml-5 list-disc space-y-2">
                <li>{shipping.dispatchCopy}</li>
                <li>{shipping.deliveryCopy} Metro cities are usually faster.</li>
                <li>
                  Shipping is a flat {formatINR(shipping.flatRate)} anywhere in
                  India, and free on orders above{" "}
                  {formatINR(shipping.freeAbove)}.
                </li>
                <li>
                  Tracking details are sent over WhatsApp as soon as the parcel
                  is picked up.
                </li>
                <li>
                  Around Raksha Bandhan and Diwali couriers slow down. We
                  publish an order-by date at the top of the site and we
                  don&apos;t take orders we don&apos;t believe will arrive in
                  time.
                </li>
                <li>
                  International delivery isn&apos;t a standard option, but ask
                  us. We have done it and can quote the courier rate.
                </li>
              </ul>
            </Policy>

            <Policy id="returns" title="Returns, damages & cancellations">
              <p>
                <strong>Damaged or wrong item:</strong> please record a short
                video as you open the package. It is the quickest way for us
                to see what happened and sort it out. Send it to us on WhatsApp
                within 48 hours of delivery and we&apos;ll replace the item or
                refund you in full. No forms.
              </p>
              <p>
                <strong>Cancellations:</strong> we can cancel and refund in full
                any time before we start making your order, usually within a few hours
                after confirmation. Once work has begun we can&apos;t cancel,
                because the piece was made specifically for you.
              </p>
              <p>
                <strong>Change of mind:</strong> as everything is handmade to
                order, we don&apos;t accept general change-of-mind returns. If
                something genuinely isn&apos;t as described, tell us and
                we&apos;ll sort it out.
              </p>
              <p>
                <strong>Refunds</strong> are returned to the original payment
                method and typically take 5–7 working days to appear.
              </p>
              {/* Its own line rather than a link mid-sentence. `inline-flex
                  min-h-11` is the same trick the jump-nav above uses: it still
                  reads as a text link, but the hit area is a 44px finger
                  target instead of the 22px the type sets at. */}
              <p>
                <Link
                  href="/returns"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-sage decoration-2 underline-offset-4 transition-colors hover:text-plum"
                >
                  Read the full return &amp; refund policy
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
              <p>
                <strong>Handmade variation:</strong> small differences in
                thread, colour and finish between your piece and the photograph
                are inherent to handmade work and aren&apos;t treated as a
                defect. If a batch differs noticeably, we send you a photo
                before dispatch.
              </p>
            </Policy>

            <Policy id="care" title="Product care & safety">
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  The acrylic paints supplied in every hamper are non-toxic.
                  They are not washable once dry, so cover the table first.
                </li>
                <li>
                  Age guidance is on every product page. Adult supervision is
                  recommended for children under six.
                </li>
                <li>
                  The plaster pieces are sturdy but can chip if dropped on a
                  hard floor.
                </li>
                <li>
                  Crochet pieces: hand wash in cold water, dry flat, and
                  don&apos;t wring them out.
                </li>
                <li>
                  Painted pieces need about 24 hours to cure fully before being
                  handled a lot or displayed.
                </li>
                <li>
                  Not suitable for children under three, small parts present a
                  choking hazard.
                </li>
              </ul>
            </Policy>

            <div className="rounded-card border-2 border-ink/85 bg-blush p-7 shadow-sticker-sm">
              <h2 className="text-h3">Something not covered here?</h2>
              <p className="mt-3 text-body text-ink/80">
                Ask us directly, we&apos;d rather answer than have you guess.
              </p>
              <WhatsAppButton
                ctx={{
                  kind: "general",
                  note: "I had a question about your shipping or returns policy:",
                }}
                className="mt-6"
              >
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Policy({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-5 flex flex-col gap-4 text-body leading-relaxed text-ink/80">
        {children}
      </div>
    </section>
  );
}
