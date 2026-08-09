import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Confetti, Sparkle } from "@/components/doodles";

const AUDIENCES = [
  { title: "Schools & workshops", detail: "Craft sessions for a full classroom" },
  { title: "Birthday parties", detail: "Return gifts children actually keep" },
  { title: "Corporate gifting", detail: "Raksha Bandhan and Diwali hampers" },
];

/** Real secondary revenue line — schools and corporate gifting. */
export function BulkOrders() {
  return (
    <Section tone="plum">
      {/* Dark bands read as flat cut-outs unless something in them has depth,
          so the doodles drift as the section scrolls. Two of the page's three
          scroll-linked effects are elsewhere; this is the third and last. */}
      <span
        aria-hidden="true"
        data-drift="20"
        className="drift pointer-events-none absolute -right-6 top-6 size-32"
      >
        <Confetti data-reveal="draw" className="size-full text-white/15" />
      </span>
      <span
        aria-hidden="true"
        data-drift="-14"
        className="drift pointer-events-none absolute -left-4 bottom-8 size-20"
      >
        <Sparkle
          data-reveal="draw"
          style={{ animationDelay: "200ms" }}
          className="size-full text-white/12"
        />
      </span>

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Bulk & bespoke"
            title="Ordering for twenty children, not two?"
            intro="We take on school workshops, party favours and corporate hampers. Pricing improves from around twenty pieces, and we'll tell you honestly whether your date is achievable before you commit."
            tone="onDark"
          />
          <div
            data-reveal="rise"
            style={{ animationDelay: "260ms" }}
            className="pulse-once mt-8 inline-block rounded-full text-white"
          >
            <WhatsAppButton ctx={{ kind: "bulk" }} variant="onDark" size="lg">
              Enquire about bulk orders
            </WhatsAppButton>
          </div>
        </div>

        {/* These panels were already paying for glassmorphism and never
            showing it: a backdrop-blur that is present from the first frame
            just looks like a slightly lighter box. Ramping the blur and the
            fill as each card rises is the whole effect — frosted panels
            condensing out of the dark, which is also the page's one change of
            light. */}
        <ul className="flex flex-col gap-3">
          {AUDIENCES.map((a, i) => (
            <li
              key={a.title}
              data-reveal="glass"
              style={{ animationDelay: `${i * 110}ms` }}
              className="group rounded-card border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-[1px] transition-[background-color,transform] duration-300 ease-bounce hover:-translate-y-[3px] hover:bg-white/[0.16]"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {a.title}
              </h3>
              {/* /90 not /80: the glass panel's white/10 fill lightens the
                  band underneath this text, and /80 lands at 4.44 — just
                  under AA. */}
              <p className="text-sm text-white/90">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
