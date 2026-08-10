/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  THE one file to edit for day-to-day changes.                        │
 * │  WhatsApp number, festival dates, shipping rates, socials, stats.    │
 * │  Nothing below is duplicated anywhere else in the codebase.          │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const siteConfig = {
  name: "CraftTohfa",
  tagline: "Where every craft becomes a memory, and every memory is a Tohfa.",
  /* The line that sits under the logo, exactly as it is printed on your card.
     तोहफा is Devanagari and needs the devanagari subset loaded in fonts.ts —
     see the note there before changing either one. */
  taglineShort: "Every craft is a तोहफा",
  description:
    "Hand-crocheted rakhis from ₹50, DIY painting kits, crochet keepsakes and rakhi combo boxes — made in small batches by hand, and designed to pull kids away from screens.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://crafttohfa.com",

  whatsapp: {
    /* Format: country code + number, digits only.
       No '+', no spaces, no dashes.  India = 91 followed by 10 digits.
       e.g. +91 98765 43210  →  '919876543210'
       12 digits total — count them if you ever change this, because a number
       one digit short fails silently: the link opens WhatsApp perfectly well
       and simply never reaches your account. */
    number: "919243520880",
    /* How the number is shown to humans (footer, contact page). */
    display: "+91 92435 20880",
    greeting: "Hi CraftTohfa! 👋",
    sign: "Could you please share availability and delivery details?",
    /* Shown next to CTAs so people know what to expect. */
    responseTime: "We usually reply within a few hours",
  },

  /**
   * Festivals drive the countdown band, the announcement bar and every bit of
   * urgency copy. `getActiveFestival()` picks the next one still in the future
   * and returns null when there is none — so all of it auto-hides after the
   * date rather than counting down into negative numbers.
   *
   * To set up next year: change these two dates. That is the entire job.
   * Dates are IST (+05:30). `note` supports a {orderBy} token.
   */
  festivals: [
    {
      name: "Raksha Bandhan",
      date: "2026-08-28T00:00:00+05:30",
      orderByDate: "2026-08-20T23:59:59+05:30",
      note: "Order by {orderBy} so your rakhis reach in time.",
    },
    {
      name: "Diwali",
      date: "2026-11-08T00:00:00+05:30",
      orderByDate: "2026-10-30T23:59:59+05:30",
      note: "Order by {orderBy} for Diwali delivery.",
    },
  ],

  shipping: {
    freeAbove: 999,
    flatRate: 79,
    dispatchCopy: "Handmade to order — dispatched in 2–3 working days.",
    deliveryCopy: "Delivered across India in 3–6 working days.",
    codAvailable: false,
  },

  social: {
    /* @craftohfa — one 't', not "crafttohfa". Matches the QR card printed in
       your product photos.
       The link you sent had ?igsh=…&utm_source=qr on the end; those are
       tracking parameters Instagram adds when you share from a QR code, and
       they are stripped here. They would follow every visitor from the site,
       tag them as QR-code traffic in your Instagram insights, and make the
       canonical URL wrong in the sitemap and OG tags. */
    instagram: "https://www.instagram.com/craftohfa",
    instagramHandle: "@craftohfa",
    facebook: "https://facebook.com/craftohfa",
    email: "anjaligupta0927@gmail.com",
  },

  /* ⚠️ PLACEHOLDER NUMBERS — replace with your real figures before launch.
     Claiming customer counts you cannot back up is a genuine legal risk in
     India (CCPA 2019 misleading-advertisement rules), not just a bad look.
     If you would rather not publish numbers at all, set these to null and the
     trust strip hides itself. */
  trust: {
    familiesServed: "500+" as string | null,
    citiesShipped: "60+" as string | null,
    avgRating: 4.9 as number | null,
  },

  nav: [
    { href: "/shop", label: "Shop" },
    { href: "/#whats-inside", label: "What's Inside" },
    { href: "/#customise", label: "Customise" },
    { href: "/about", label: "Our Story" },
    { href: "/faq", label: "FAQ" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
