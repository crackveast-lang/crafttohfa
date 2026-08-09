import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { getTopFaqs } from "@/data/faqs";

export function FaqTeaser() {
  const faqs = getTopFaqs();

  return (
    <Section tone="shell" width="narrow">
      <SectionHeading
        eyebrow="Before you ask"
        title="The four we get most"
        align="center"
      />

      {/* The open/close height animation lives in globals.css on
          ::details-content — see Accordion.tsx. This is just the entrance. */}
      <div className="mt-12 flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <div
            key={faq.id}
            data-reveal="rise-sm"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <Accordion
              question={faq.question}
              name="home-faq"
              defaultOpen={i === 0}
            >
              {faq.answer}
            </Accordion>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center">
        <Link
          href="/faq"
          data-reveal="rise"
          style={{ animationDelay: "300ms" }}
          className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-rose decoration-2 underline-offset-8 hover:text-terracotta-deep"
        >
          Read all the questions
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </p>
    </Section>
  );
}
