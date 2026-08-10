import { siteConfig } from "@/site.config";
import type { Faq, FaqGroup } from "@/types";
import { formatINR } from "@/lib/format";

const { shipping } = siteConfig;

export const faqs: Faq[] = [
  // ── Orders ──
  {
    id: "how-to-order",
    group: "Orders",
    question: "How do I actually place an order?",
    answer:
      "Tap any 'Order WhatsApp' button and your WhatsApp opens with the product name and price already filled in. Send it, and we reply to confirm availability, the total including shipping, and how to pay. There is no cart to fight with — you're talking to a person from the first message.",
  },
  {
    id: "why-whatsapp",
    group: "Orders",
    question: "Why WhatsApp instead of a normal checkout?",
    answer:
      "Because almost everything here is made to order, and most orders come with a question — a colour change, a delivery date, whether it suits a particular age. Sorting that out in a two-minute chat works far better for both of us than a checkout form ever could.",
  },
  {
    id: "payment",
    group: "Orders",
    question: "How do I pay?",
    answer:
      "We share a UPI ID or a payment link on WhatsApp once your order is confirmed. Payment is taken before dispatch, since each piece is made for you." +
      (shipping.codAvailable ? "" : " We don't currently offer cash on delivery."),
  },
  {
    id: "customise",
    group: "Orders",
    question: "Can I change the colours or personalise something?",
    answer:
      "Often, yes. Colour swaps and name tags are usually possible if you ask before we start. Message us on WhatsApp with what you have in mind and we'll tell you honestly whether we can do it and what it would cost.",
  },
  {
    id: "cancel",
    group: "Orders",
    question: "Can I cancel or change my order?",
    answer:
      "Yes, as long as we haven't started making it — usually within a few hours of confirming. Once a piece is underway we can't cancel it, because it was made specifically for you.",
  },

  // ── Shipping ──
  {
    id: "delivery-time",
    group: "Shipping",
    question: "How long will it take to arrive?",
    answer: `${shipping.dispatchCopy} ${shipping.deliveryCopy} Metro cities are usually at the faster end of that range.`,
  },
  {
    id: "shipping-cost",
    group: "Shipping",
    question: "What does shipping cost?",
    answer: `Flat ${formatINR(shipping.flatRate)} anywhere in India, and free on orders above ${formatINR(shipping.freeAbove)}.`,
  },
  {
    id: "rakhi-deadline",
    group: "Shipping",
    question: "Will my rakhi reach in time for Raksha Bandhan?",
    answer:
      "If you order by the date shown in the banner at the top of the site, yes. After that we can often still manage it with express shipping — message us and we'll tell you straight whether it will make it rather than take the order and hope.",
  },
  {
    id: "international",
    group: "Shipping",
    question: "Do you ship outside India?",
    answer:
      "Not as a standard option, but we've done it before. Message us with the destination and we'll check the courier rate and get back to you.",
  },
  {
    id: "damaged",
    group: "Shipping",
    question: "What if it arrives damaged?",
    answer:
      "We pack every Craft Tohfa with care and love. Please record a short video while opening your package and share it with us — it helps us quickly assist you if your order arrives damaged or has any issue.",
  },

  // ── Products ──
  {
    id: "whats-in-the-box",
    group: "Products",
    question: "What's actually in a combo box?",
    answer:
      "Every combo box has the same five things: a hand-crocheted rakhi on a printed card, a crochet keepsake (a soft toy, keychain or little bag), a paint-your-own bhai–behen idol, a second plaster piece to paint that matches the theme, and acrylic paints with a brush. Plus a Happy Raksha Bandhan card, all packed in a gift box. You can also buy the rakhis and crochet keepsakes on their own.",
  },
  {
    id: "age-suitable",
    group: "Products",
    question: "Which combo box suits my child's age?",
    answer:
      "They're all designed for roughly 4–12 years, and each page lists its own range. The Butterfly & Rainbow and Bunny boxes suit the youngest; the Little Car box is the one brothers tend to prefer. If you're unsure, tell us the age on WhatsApp and we'll suggest one.",
  },
  {
    id: "safety",
    group: "Products",
    question: "Are the paints safe for children?",
    answer:
      "The acrylic paints are non-toxic. The plaster pieces are sturdy but can chip if dropped on a hard floor, and we'd suggest an adult nearby for children under six. Not suitable for under-threes — the beads and small pieces are a choking hazard.",
  },
  {
    id: "handmade-variation",
    group: "Products",
    question: "Will mine look exactly like the photo?",
    answer:
      "Very close, but not identical — every rakhi and toy is crocheted by hand, so small variations in the thread and finish are part of it. If a batch differs noticeably from the photos, we send you a picture before dispatch.",
  },
  {
    id: "reuse",
    group: "Products",
    question: "Is there enough paint to finish everything?",
    answer:
      "Yes, with a bit to spare — we'd rather send too much than have a project stop halfway. The plaster pieces take paint well and a second coat is usually plenty for full coverage.",
  },

  // ── Bulk ──
  {
    id: "bulk-orders",
    group: "Bulk orders",
    question: "Do you take bulk or school orders?",
    answer:
      "Yes — school workshops, birthday party favours, and corporate Raksha Bandhan gifting are a real part of what we do. Pricing improves from around 20 pieces. Message us with the quantity and the date you need it by.",
  },
  {
    id: "bulk-lead-time",
    group: "Bulk orders",
    question: "How much notice do you need for a bulk order?",
    answer:
      "Two to three weeks is comfortable for most quantities. Around Raksha Bandhan and Diwali, please give us as much notice as you can — those weeks fill up early.",
  },
  {
    id: "bulk-branding",
    group: "Bulk orders",
    question: "Can you add our school or company name?",
    answer:
      "Yes, we can add printed cards or tags with your name and message. Send us the artwork or just the wording on WhatsApp and we'll show you a mock-up first.",
  },
];

export const faqGroups: FaqGroup[] = [
  "Orders",
  "Shipping",
  "Products",
  "Bulk orders",
];

export function getFaqsByGroup(group: FaqGroup): Faq[] {
  return faqs.filter((f) => f.group === group);
}

/** The four shown on the homepage teaser. */
export function getTopFaqs(): Faq[] {
  const ids = ["how-to-order", "delivery-time", "rakhi-deadline", "age-suitable"];
  return ids
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f));
}
