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
 * The mark is `md` and the bar is min-h-20, both a deliberate step up from the
 * old sm/min-h-16: the logo IS the brand here and it was reading as a footnote
 * beside the nav. That does spend the height budget this bar used to protect —
 * header plus announcement strip is now ~118px on a 390px phone rather than
 * ~88px — so the hero headline starts a little lower on a small screen. The
 * condensed state absorbs it back the moment the page scrolls.
 *
 * Nav is `lg:` rather than `md:`. With five items and the larger mark, the row
 * overflowed at 768px; below lg the MobileNav sheet carries the same links,
 * which is the same trade every breakpoint in this file already makes.
 */
export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <Container>
        <div className="site-header-bar flex min-h-20 items-center justify-between gap-4">
          <Wordmark size="md" tagline />

          {/* Nav type steps up from 0.95rem to 1.05rem, with roomier padding
              and full-strength ink. At 0.95rem/85% it was set smaller and
              lighter than the body copy underneath it, which made the primary
              navigation the quietest text on the page. The row still fits at
              lg: five items at this size come to ~470px of the ~1136px bar. */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-12 items-center rounded-full px-4 text-[1.05rem] font-semibold text-ink transition-colors hover:bg-ink/6 hover:text-plum"
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
              /* md, not sm: the order button should not be the smallest
                 control in a bar whose nav just grew. */
              size="md"
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
