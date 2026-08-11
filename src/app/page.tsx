import { Hero } from "@/components/home/Hero";
import { CountdownBand } from "@/components/home/CountdownBand";
import { WhatsInside } from "@/components/home/WhatsInside";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Customise } from "@/components/home/Customise";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ValueProps } from "@/components/home/ValueProps";
import { FounderStrip } from "@/components/home/FounderStrip";
import { BulkOrders } from "@/components/home/BulkOrders";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { ShareYourMoment } from "@/components/home/ShareYourMoment";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { getTopFaqs } from "@/data/faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <CountdownBand />
      <WhatsInside />
      <FeaturedProducts />
      {/* Straight after the products, while "can you put her name on it?" is
          still the question in front of someone. */}
      <Customise />
      <HowItWorks />
      <ValueProps />
      <FounderStrip />
      {/* No testimonials section here. The reviews it rendered were placeholder
          copy, and "In their words / What lands on the doormat" was removed on
          request. The component still exists and still runs on product pages
          under different headings; delete it there too if you want the reviews
          gone site-wide. */}
      <BulkOrders />
      <InstagramStrip />
      {/* Directly after the Instagram strip on purpose: "here is what we post"
          → "now post yours". Split up, the two read as two unrelated asks. */}
      <ShareYourMoment />
      <FaqTeaser />
      <FinalCta />

      <JsonLd data={faqJsonLd(getTopFaqs())} />
    </>
  );
}
