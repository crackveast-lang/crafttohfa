import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { InstagramGlyph, WhatsAppGlyph, Sparkle } from "@/components/doodles";
import { BulkOrders } from "@/components/home/BulkOrders";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Contact us",
  description:
    "Message CraftTohfa on WhatsApp, email us, or find us on Instagram. Bulk and school enquiries welcome.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="There's a person at the other end"
        intro="Not a ticketing system, not a bot. Tell us what you're after and we'll help you work it out."
      />

      <Section tone="cream">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Primary: WhatsApp */}
          <Card tone="shell" className="flex flex-col gap-5 p-7 md:p-10">
            <span className="grid size-14 place-items-center rounded-full border-2 border-ink bg-cream text-terracotta shadow-sticker-sm">
              <WhatsAppGlyph className="size-7" />
            </span>

            <div>
              <h2 className="text-h3">WhatsApp — the fastest way</h2>
              <p className="mt-3 max-w-[46ch] text-body leading-relaxed text-ink/80">
                Every order on this site is placed over WhatsApp. It&apos;s also
                the best place for questions about sizes, ages, colours or
                delivery dates.
              </p>
            </div>

            <dl className="flex flex-col gap-1 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold">Number:</dt>
                <dd className="tabular">{siteConfig.whatsapp.display}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Typically replies:</dt>
                <dd>within a few hours, 10am–8pm IST</dd>
              </div>
            </dl>

            <WhatsAppButton
              ctx={{ kind: "general" }}
              size="lg"
              className="mt-1 self-start"
            >
              Open WhatsApp
            </WhatsAppButton>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-4 p-7">
              <h2 className="font-display text-lg font-semibold">Email</h2>
              <p className="text-[0.95rem] leading-relaxed text-ink/75">
                Better for anything long — invoices, artwork files, bulk
                specifications.
              </p>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="inline-flex min-h-11 items-center self-start font-semibold underline decoration-rose decoration-2 underline-offset-4 hover:text-terracotta-deep"
              >
                {siteConfig.social.email}
              </a>
            </Card>

            <Card tone="peach" className="flex flex-col gap-4 p-7">
              <h2 className="font-display text-lg font-semibold">Instagram</h2>
              <p className="text-[0.95rem] leading-relaxed text-ink/80">
                Work in progress, packing days, and what&apos;s currently in
                stock.
              </p>
              <Button
                href={siteConfig.social.instagram}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                <InstagramGlyph className="size-5" />
                {siteConfig.social.instagramHandle}
              </Button>
            </Card>

            <Card className="flex items-start gap-3 p-6">
              <Sparkle
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-terracotta"
              />
              <p className="text-sm leading-relaxed text-ink/75">
                We&apos;re a small team making things by hand — if we don&apos;t
                reply instantly, it&apos;s because someone is mid-stitch.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <BulkOrders />
    </>
  );
}
