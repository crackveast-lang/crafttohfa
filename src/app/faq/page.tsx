import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { faqGroups, faqs, getFaqsByGroup } from "@/data/faqs";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Questions & answers",
  description:
    "How ordering over WhatsApp works, delivery timelines across India, rakhi deadlines, age guidance for kits, and bulk orders for schools.",
  path: "/faq",
});

function slug(group: string) {
  return group.toLowerCase().replace(/\s+/g, "-");
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        eyebrow="Help"
        title="Questions, answered properly"
        intro="If yours isn't here, message us — a real person reads it."
      />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <nav aria-label="Question topics" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-eyebrow uppercase text-ink/55">Jump to</h2>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((group) => (
                <li key={group}>
                  <a
                    href={`#${slug(group)}`}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-ink/20 px-4 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-cream lg:border-0 lg:px-0 lg:hover:bg-transparent lg:hover:text-plum"
                  >
                    {group}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-14">
            {faqGroups.map((group) => (
              <section key={group} id={slug(group)} className="scroll-mt-28">
                <h2 className="text-h3">{group}</h2>
                <div className="mt-6 flex flex-col gap-3">
                  {getFaqsByGroup(group).map((faq) => (
                    <Accordion key={faq.id} question={faq.question}>
                      {faq.answer}
                    </Accordion>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="blush" width="narrow" className="py-16 md:py-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-h3">Still not sure?</h2>
          <p className="max-w-[44ch] text-body text-ink/75">
            Send us the age of the child, the occasion, or just a photo of what
            you had in mind. We&apos;ll tell you honestly what suits.
          </p>
          <WhatsAppButton ctx={{ kind: "general" }} size="lg">
            Ask us anything
          </WhatsAppButton>
        </div>
      </Section>
    </>
  );
}
