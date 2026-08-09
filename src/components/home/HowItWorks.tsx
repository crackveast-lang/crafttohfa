import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ArrowCurve } from "@/components/doodles";
import { siteConfig } from "@/site.config";

const STEPS = [
  {
    n: "1",
    title: "Find something you like",
    body: "Browse the rakhis, kits, keepsakes and combo boxes. Every page tells you exactly what you get and who it suits.",
  },
  {
    n: "2",
    title: "Tap the WhatsApp button",
    body: "Your chat opens with the product and price already written out. Send it — that's the whole order.",
  },
  {
    n: "3",
    title: "We make it and post it",
    body: "We confirm the total, you pay by UPI, and we pack it by hand. Dispatched in 2–3 working days.",
  },
];

/**
 * The section that makes a cart-less site read as deliberate rather than
 * broken. Placed early, right after the first product exposure, because that
 * is exactly when a visitor starts looking for the "Add to cart" button.
 */
export function HowItWorks() {
  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow="No cart, no checkout"
        title="Ordering is just a message"
        intro="Almost everything here is made to order, and most orders come with a question. A two-minute chat sorts that out far better than a checkout form."
        align="center"
        underline
      />

      {/* This section is a narrative — three sentences in order — so it runs
          as a CHAIN rather than a stagger: step 1 lands, then the arrow
          pointing away from it draws itself, then step 2 lands, then the
          second arrow, then step 3. About 1.6s end to end.

          The arrows drawing BETWEEN the steps they connect is the single most
          on-brand moment available on this page, and it is exactly what a
          hand-drawn doodle is for. They used to just sit there.

          The rhythm is 380ms per beat rather than the site's usual 80ms
          stagger, because with only three items each one is a beat in a story
          rather than a row in a list. */}
      <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, i) => (
          <li key={step.n} className="relative flex flex-col items-center text-center">
            <span
              aria-hidden="true"
              data-reveal="pop"
              style={{ animationDelay: `${i * 380}ms` }}
              className="grid size-16 place-items-center rounded-full border-2 border-ink bg-peach font-display text-2xl font-semibold shadow-sticker"
            >
              {step.n}
            </span>

            <h3
              data-reveal="rise"
              style={{ animationDelay: `${i * 380 + 90}ms` }}
              className="mt-6 text-h3"
            >
              {step.title}
            </h3>
            <p
              data-reveal="rise"
              style={{ animationDelay: `${i * 380 + 150}ms` }}
              className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink/75"
            >
              {step.body}
            </p>

            {i < STEPS.length - 1 ? (
              <ArrowCurve
                aria-hidden="true"
                data-reveal="draw"
                style={{ animationDelay: `${i * 380 + 260}ms` }}
                className="absolute -right-6 top-6 hidden h-8 w-16 text-sage [animation-duration:0.55s] md:block"
              />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-col items-center gap-3">
        {/* One ring outward, once. WhatsApp is the entire conversion path on
            this site and this section exists to explain that, so it earns a
            single tell — but a looping pulse on a green button is a banner ad. */}
        <div data-reveal="rise" className="pulse-once rounded-full text-plum">
          <WhatsAppButton ctx={{ kind: "general" }} size="lg">
            Start a conversation
          </WhatsAppButton>
        </div>
        <p
          data-reveal="rise"
          style={{ animationDelay: "120ms" }}
          className="text-sm text-ink/60"
        >
          {siteConfig.whatsapp.responseTime}
        </p>
      </div>
    </Section>
  );
}
