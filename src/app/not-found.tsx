import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PaintBrush, Squiggle } from "@/components/doodles";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <PaintBrush className="size-16 text-terracotta" aria-hidden="true" />

      <p className="mt-8 text-eyebrow uppercase text-terracotta-deep">Error 404</p>
      <h1 className="mt-3 max-w-[16ch] text-h2">
        This page went off to make something
      </h1>
      <Squiggle
        aria-hidden="true"
        className="mt-4 h-4 w-40 text-rose"
      />
      <p className="mt-5 max-w-[46ch] text-body text-ink/75">
        We couldn&apos;t find that page. It may have moved, or the link might have
        a typo in it.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/shop" size="lg">
          Browse the shop
        </Button>
        <WhatsAppButton ctx={{ kind: "general" }} variant="secondary" size="lg">
          Ask us on WhatsApp
        </WhatsAppButton>
      </div>
    </Container>
  );
}
