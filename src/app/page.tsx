import { Hero } from "@/components/home/Hero";
import { CountdownBand } from "@/components/home/CountdownBand";
import { WhatsInside } from "@/components/home/WhatsInside";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ValueProps } from "@/components/home/ValueProps";
import { FounderStrip } from "@/components/home/FounderStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { BulkOrders } from "@/components/home/BulkOrders";
import { InstagramStrip } from "@/components/home/InstagramStrip";
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
      <HowItWorks />
      <ValueProps />
      <FounderStrip />
      <Testimonials />
      <BulkOrders />
      <InstagramStrip />
      <FaqTeaser />
      <FinalCta />

      <JsonLd data={faqJsonLd(getTopFaqs())} />
    </>
  );
}
