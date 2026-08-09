import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CraftImage } from "@/components/media/CraftImage";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { Testimonials } from "@/components/home/Testimonials";
import { ShareYourMoment } from "@/components/home/ShareYourMoment";
import { FinalCta } from "@/components/home/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { WashiTape } from "@/components/ui/WashiTape";

import { allSlugs, getProduct } from "@/data/products";
import { categoryName } from "@/data/categories";
import { formatINR } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return buildMetadata({ title: "Product not found" });

  return buildMetadata({
    title: product.name,
    description: `${product.tagline}. ${product.description}`.slice(0, 160),
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const galleryImages = product.images;

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/product/${product.slug}` },
        ])}
      />

      <div className="border-b border-ink/10 bg-blush">
        <Container>
          <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink/60">
              <li>
                <Link href="/" className="hover:text-plum">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/shop" className="hover:text-plum">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/shop?c=${product.category}`}
                  className="hover:text-plum"
                >
                  {categoryName(product.category)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-ink">
                {product.name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <Section tone="cream" className="py-10 md:py-16" clip={false}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <WashiTape
              className="-top-3 left-8 z-10 md:left-14"
              tone="peach"
              rotate={-7}
            />
            <ProductGallery
              seed={product.slug.length}
              alts={galleryImages.map((img) => img.alt)}
              slides={galleryImages.map((img, i) => (
                <CraftImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  motif={product.category}
                  seedKey={`${product.slug}-${i}`}
                  ratio="square"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  eager={i === 0}
                />
              ))}
              thumbs={galleryImages.map((img, i) => (
                <CraftImage
                  key={`t-${img.src}`}
                  src={img.src}
                  alt=""
                  motif={product.category}
                  seedKey={`${product.slug}-${i}`}
                  ratio="square"
                  sizes="96px"
                  showPlaceholderLabel={false}
                  className="size-full"
                />
              ))}
            />
          </div>

          <ProductBuyBox product={product} />
        </div>
      </Section>

      <Section tone="cream" className="pt-0 pb-16 md:pb-24" width="narrow">
        <h2 className="sr-only">Product details</h2>
        <div className="flex flex-col gap-3">
          <Accordion
            question="What's inside the box"
            name="product-details"
            defaultOpen
          >
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              {product.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Accordion>

          {product.ageRange || product.craftTime || product.pieces ? (
            <Accordion question="Ages, timing & pieces" name="product-details">
              <dl className="flex flex-col gap-2">
                {product.ageRange ? (
                  <Row label="Suitable for" value={product.ageRange} />
                ) : null}
                {product.craftTime ? (
                  <Row label="Takes about" value={product.craftTime} />
                ) : null}
                {product.pieces ? (
                  <Row
                    label="Pieces in the set"
                    value={String(product.pieces)}
                  />
                ) : null}
              </dl>
            </Accordion>
          ) : null}

          <Accordion question="Shipping & delivery" name="product-details">
            <p>
              {siteConfig.shipping.dispatchCopy}{" "}
              {siteConfig.shipping.deliveryCopy}
            </p>
            <p className="mt-3">
              Shipping is a flat {formatINR(siteConfig.shipping.flatRate)}, and
              free on orders above {formatINR(siteConfig.shipping.freeAbove)}.
              We&apos;ll confirm the total on WhatsApp before you pay.
            </p>
          </Accordion>

          <Accordion question="Care & safety" name="product-details">
            <p>
              The acrylic paints are non-toxic but not washable once dry —
              cover the table and keep a wet cloth handy. Painted pieces need
              about 24 hours to cure fully.
            </p>
            <p className="mt-3">
              Crochet pieces should be hand-washed in cold water and dried
              flat, never wrung out. Not suitable for children under three —
              the beads and small pieces are a choking hazard.
            </p>
          </Accordion>
        </div>
      </Section>

      <RelatedProducts slug={product.slug} />

      <Testimonials
        limit={3}
        showStats={false}
        tone="cream"
        eyebrow="From other parents"
        title="Bought, made and enjoyed"
      />

      <ShareYourMoment />

      <FinalCta />

      <StickyBuyBar product={product} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-x-2">
      <dt className="font-semibold text-ink">{label}:</dt>
      <dd>{value}</dd>
    </div>
  );
}
