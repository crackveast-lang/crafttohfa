import Link from "next/link";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/site.config";

/**
 * Sticky, translucent, hairline-bordered. Kept deliberately short: this bar
 * plus the announcement strip is everything standing between the top of the
 * page and the hero headline on a 390×844 phone, so height here is a budget.
 *
 * It condenses once the page has scrolled: the tagline folds away, the bar
 * shortens, the background goes more opaque, and a scroll-progress hairline
 * appears along the bottom edge. All of that lives in globals.css keyed off
 * `data-scrolled` on <html>, so this stays a server component — the flag is
 * set by MotionController, and the progress line is a pure-CSS scroll timeline
 * with no JavaScript at all.
 *
 * The mark is `sm` rather than `md` precisely so the tagline can sit under it:
 * a 36px logo + tagline comes to about the same height the 48px logo used to
 * occupy on its own, so adding the line cost the layout nothing. Measured, at
 * 390/768/1280, before and after.
 */
export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <Container>
        <div className="site-header-bar flex min-h-16 items-center justify-between gap-4">
          <Wordmark size="sm" tagline />

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
