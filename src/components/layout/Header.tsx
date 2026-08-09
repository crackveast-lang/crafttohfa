import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/site.config";

/**
 * Sticky, translucent, hairline-bordered. Kept deliberately short — the header
 * and announcement bar together must stay under ~88px on mobile so the hero
 * headline is visible without scrolling on a 390×844 screen.
 *
 * It condenses once the page has scrolled: shorter bar, more opaque, a soft
 * shadow, and a scroll-progress hairline along the bottom edge. All of that
 * lives in globals.css keyed off `data-scrolled` on <html>, so this stays a
 * server component — the flag is set by MotionController, and the progress
 * line is a pure-CSS scroll timeline with no JavaScript at all.
 */
export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <Container>
        <div className="site-header-bar flex min-h-16 items-center justify-between gap-4">
          <Wordmark />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-semibold text-ink/85 transition-colors hover:bg-ink/6 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton
              ctx={{ kind: "general" }}
              size="sm"
              className="hidden sm:inline-flex"
            >
              WhatsApp us
            </WhatsAppButton>

            {/* Mobile keeps a persistent one-tap route to WhatsApp */}
            <WhatsAppButton
              ctx={{ kind: "general" }}
              size="sm"
              className="size-11 p-0 sm:hidden"
              showIcon
            >
              <span className="sr-only">Chat on WhatsApp</span>
            </WhatsAppButton>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
