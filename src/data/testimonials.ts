import type { Testimonial } from "@/types";

/**
 * ⚠️ EVERY REVIEW BELOW IS A PLACEHOLDER. These are written to show what the
 * section looks like, not to be published as if real.
 *
 * Replace them with genuine customer messages (a WhatsApp screenshot pasted as
 * text is fine) and set `isPlaceholder: false` on each one.
 *
 * Until every entry is marked false, the site deliberately emits NO review
 * structured data to Google — see src/lib/seo.ts. Publishing fabricated review
 * markup risks a Google manual action and falls foul of India's CCPA 2019
 * rules on misleading endorsements.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They tied the rakhi in the morning and were still painting the little idol at lunch. That's the first Raksha Bandhan nobody asked for the iPad.",
    name: "Priya S.",
    city: "Pune",
    rating: 5,
    purchased: "Kitty Rakhi & Paint Combo",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "Ordered on WhatsApp at 11pm and got a reply by morning with photos of the actual box. Reached Bangalore in four days.",
    name: "Anjali M.",
    city: "Bengaluru",
    rating: 5,
    purchased: "Butterfly & Rainbow Combo",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "My brother is nine and refuses anything with flowers on it. The crochet car rakhi was the first one he's worn all day without complaining.",
    name: "Sneha R.",
    city: "Delhi",
    rating: 5,
    purchased: "Little Car Rakhi & Puppy Combo",
    isPlaceholder: true,
  },
  {
    id: "t4",
    quote:
      "I live abroad and needed something sent home. They handled the whole thing over chat and sent a photo of the packed box before it shipped.",
    name: "Meera K.",
    city: "Ahmedabad",
    rating: 5,
    purchased: "Strawberry Bag Combo",
    isPlaceholder: true,
  },
  {
    id: "t5",
    quote:
      "The crochet work is far nicer than the photos suggest. The little bag has been carried to school every day since.",
    name: "Ritu D.",
    city: "Jaipur",
    rating: 5,
    purchased: "Strawberry Bag Combo",
    isPlaceholder: true,
  },
  {
    id: "t6",
    quote:
      "The painted starfish and shell are still on the shelf and my son shows them to every single person who visits.",
    name: "Kavita P.",
    city: "Nagpur",
    rating: 5,
    purchased: "Bunny Rakhi & Seashore Combo",
    isPlaceholder: true,
  },
];

/** True only when every review is genuine. Gates review structured data. */
export const testimonialsAreReal = testimonials.every((t) => !t.isPlaceholder);

export function getTestimonials(limit?: number): Testimonial[] {
  return limit ? testimonials.slice(0, limit) : testimonials;
}
