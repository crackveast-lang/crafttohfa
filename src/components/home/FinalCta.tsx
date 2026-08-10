import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Confetti, Sparkle } from "@/components/doodles";
import { getActiveFestival, getOrderByCopy } from "@/lib/festival";
import { siteConfig } from "@/site.config";

/** Four motes, drifting up across the closing band on offset loops. */
const MOTES = [
  { left: "12%", delay: "0s", scale: 0.7 },
  { left: "34%", delay: "5s", scale: 1 },
  { left: "68%", delay: "2.5s", scale: 0.85 },
  { left: "86%", delay: "8s", scale: 0.6 },
];

export function FinalCta() {
  const festival = getActiveFestival();

  return (
    // The site's ONE gradient, and the last thing anyone sees — so it breathes.
    // Imperceptible frame to frame, unmistakable over ten seconds, and it
    // costs a single background-position with no layout or paint consequence.
    // The tints are alpha rather than solid, so `bg-cream` underneath is load
    // bearing — without it the transparent stops fall through to the body and
    // the band loses its own ground.
    <section className="gradient-drift relative overflow-hidden bg-cream bg-gradient-to-br from-sage/35 via-blush to-peach/70 py-20 text-ink md:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 block size-24 sway-slow md:size-32"
      >
        <Confetti data-reveal="draw" className="size-full text-ink/12" />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-8 block size-20 float-mid md:size-28"
      >
        <Sparkle
          data-reveal="draw"
          style={{ animationDelay: "200ms" }}
          className="size-full text-ink/12"
        />
      </span>

      {/* The one place on the site where drifting particles are warranted: a
          closing frame, on the only gradient, with nothing else competing.
          Four is the number — this reads as atmosphere below about six and as
          a screensaver above eight. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {MOTES.map((m) => (
          <span
            key={m.left}
            className="drift-up absolute bottom-8 block size-1.5 rounded-full bg-ink/20"
            style={{
              left: m.left,
              animationDelay: m.delay,
              scale: m.scale,
            }}
          />
        ))}
      </span>

      <Container className="relative text-center">
        <h2 data-reveal="rise" className="mx-auto max-w-[18ch] text-h2">
          Something worth making, and someone to make it with
        </h2>

        <p
          data-reveal="rise"
          style={{ animationDelay: "100ms" }}
          className="mx-auto mt-6 max-w-[46ch] text-body leading-relaxed text-ink/80"
        >
          {festival
            ? getOrderByCopy(festival)
            : "Tell us who it's for and we'll help you pick."}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div
            data-reveal="rise"
            style={{ animationDelay: "200ms" }}
            className="pulse-once rounded-full text-plum"
          >
            <WhatsAppButton ctx={{ kind: "general" }} size="lg">
              Order WhatsApp
            </WhatsAppButton>
          </div>
          <div data-reveal="rise" style={{ animationDelay: "300ms" }}>
            <Button href="/shop" variant="secondary" size="lg">
              Browse everything
            </Button>
          </div>
        </div>

        <p
          data-reveal="rise"
          style={{ animationDelay: "400ms" }}
          className="mt-6 text-sm text-ink/65"
        >
          {siteConfig.whatsapp.responseTime}
        </p>
      </Container>
    </section>
  );
}
