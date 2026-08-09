import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "./ProductGrid";
import { getRelatedProducts } from "@/data/products";

export function RelatedProducts({ slug }: { slug: string }) {
  const related = getRelatedProducts(slug, 4);
  if (related.length === 0) return null;

  return (
    <Section tone="blush">
      <SectionHeading
        eyebrow="You might also like"
        title="Others often paired with this"
      />
      <ProductGrid products={related} className="mt-10" />
    </Section>
  );
}
