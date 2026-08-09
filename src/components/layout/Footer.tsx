import Link from "next/link";
import { Container } from "./Container";
import { Wordmark } from "./Wordmark";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/doodles";
import { Divider } from "@/components/ui/Divider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatINR } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { activeCategories } from "@/data/categories";

const SWATCHES = [
  "bg-cream",
  "bg-shell",
  "bg-peach",
  "bg-rose",
  "bg-terracotta",
  "bg-ink",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-shell text-ink">
      <Divider variant="scallop" className="absolute -top-px left-0 w-full text-shell" />

      <Container className="pt-20 pb-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-[34ch] text-sm leading-relaxed text-ink/75">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={buildWhatsAppUrl({ kind: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message CraftTohfa on WhatsApp"
                data-wa-kind="general"
                className="grid size-11 place-items-center rounded-full border-2 border-ink/70 transition-colors hover:bg-terracotta hover:border-terracotta hover:text-white"
              >
                <WhatsAppGlyph className="size-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`CraftTohfa on Instagram, ${siteConfig.social.instagramHandle}`}
                className="grid size-11 place-items-center rounded-full border-2 border-ink/70 transition-colors hover:bg-terracotta hover:border-terracotta hover:text-white"
              >
                <InstagramGlyph className="size-5" />
              </a>
            </div>
          </div>

          {/* Category links rather than four arbitrary products: with 26 items
              across four categories, "the first four in the array" is no
              longer a meaningful shortlist. */}
          <FooterColumn title="Shop">
            <FooterLink href="/shop">Everything</FooterLink>
            {activeCategories.map((c) => (
              <FooterLink key={c.slug} href={`/shop?c=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="CraftTohfa">
            <FooterLink href="/about">Our story</FooterLink>
            <FooterLink href="/faq">FAQs</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/policies">Shipping &amp; returns</FooterLink>
          </FooterColumn>

          <FooterColumn title="Ordering">
            <li className="text-sm leading-relaxed text-ink/75">
              Every order is placed over WhatsApp — no cart, no checkout forms.
            </li>
            <li className="text-sm leading-relaxed text-ink/75">
              Free shipping above {formatINR(siteConfig.shipping.freeAbove)}.
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="text-sm font-semibold underline decoration-rose decoration-2 underline-offset-4 hover:text-terracotta-deep"
              >
                {siteConfig.social.email}
              </a>
            </li>
            <li className="text-sm font-semibold">
              {siteConfig.whatsapp.display}
            </li>
          </FooterColumn>
        </div>

        {/* Palette strip — the brand colours as a designed flourish */}
        <div
          aria-hidden="true"
          className="mt-14 flex h-2.5 overflow-hidden rounded-full border border-ink/15"
        >
          {SWATCHES.map((s) => (
            <span key={s} className={`${s} flex-1`} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-ink/60 sm:flex-row">
          <p>
            © {year} {siteConfig.name} · Handmade in India
          </p>
          <p className="font-hand text-base text-ink/70">
            made slowly, on purpose
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-eyebrow uppercase text-ink/60">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm font-medium text-ink/80 transition-colors hover:text-terracotta-deep"
      >
        {children}
      </Link>
    </li>
  );
}
