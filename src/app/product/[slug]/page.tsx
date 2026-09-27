import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand } from '@/config/brand';
import { productPage } from '@/data/pages';
import { ui } from '@/data/ui';
import { buildMetadata } from '@/lib/seo';
import { getProduct, visibleProducts, relatedProducts, orderedImages, categoryName } from '@/lib/products';
import { resolveImage } from '@/lib/catalog';
import { effectivePrice } from '@/lib/format';
import { breadcrumbSchema, productSchema } from '@/lib/schema';
import { Container } from '@/components/ui/Container';
import { Price } from '@/components/ui/Price';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/SEOHead';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductBuyBox } from '@/components/product/ProductBuyBox';
import { ProductStickyBuy } from '@/components/product/ProductStickyBuy';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import type { ResolvedImage } from '@/lib/catalog-types';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return visibleProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seo.seoTitle,
    description: p.seo.metaDescription,
    path: `/product/${p.slug}`,
    keywords: p.seo.keywords,
    ogTitle: p.seo.ogTitle,
    ogDescription: p.seo.ogDescription,
    ogImage: p.seo.ogImage,
    ogImageAlt: p.images[0]?.alt,
    noIndex: p.availability === 'comingSoon',
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const images = orderedImages(product.images)
    .map(resolveImage)
    .filter((i): i is ResolvedImage => i !== null);
  const storyImage = resolveImage(product.images.find((i) => i.role === 'lifestyle') ?? product.images[product.images.length - 1]);
  const related = relatedProducts(product);
  const unitPrice = effectivePrice(product);
  const h = product.headings ?? {};
  const details = [
    product.weight && { label: productPage.details.weight, value: product.weight },
    product.dimensions && { label: productPage.details.dimensions, value: product.dimensions },
    { label: productPage.details.availability, value: ui.availability[product.availability] },
    { label: productPage.details.delivery, value: brand.deliveryArea },
  ].filter(Boolean) as { label: string; value: string }[];

  const accordion = 'group border-b rule';
  const summary =
    'flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 font-serif text-[1.35rem] [&::-webkit-details-marker]:hidden';
  const plus = (
    <span aria-hidden="true" className="text-xl text-gold-ink transition-transform duration-ui ease-mevae group-open:rotate-45">
      +
    </span>
  );

  return (
    <>
      <Container className="pt-4 md:pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-brown-soft">
            <li>
              <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-brown">
                {productPage.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="inline-flex min-h-[44px] items-center hover:text-brown">
                {productPage.breadcrumbShop}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-brown">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <article>
        <Container className="grid grid-cols-1 gap-10 pb-section pt-2 md:pb-section-md lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 -mx-gutter sm:mx-0 lg:col-span-7">
            <ProductGallery images={images} name={product.name} grayscale={product.availability === 'outOfStock'} />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="micro-label text-gold-ink">{product.category.slice(0, 2).map(categoryName).join(' · ')}</p>
              <h1 className="mt-4 text-h1">{product.seo.h1}</h1>
              <p className="mt-4 font-serif text-[1.3rem] italic leading-snug text-brown-soft">{product.tagline}</p>
              <Price product={product} className="mt-6 text-[1.35rem]" />
              <p className="mt-6 max-w-measure text-brown-soft">{product.shortDescription}</p>

              <div id="buy-box" className="mt-8">
                <ProductBuyBox id={product.id} name={product.name} unitPrice={unitPrice} url={product.seo.canonicalUrl} availability={product.availability} />
              </div>

              <ul className="mt-6 space-y-2 text-[0.875rem] text-brown-soft">
                {productPage.delivery.points.map((p) => (
                  <li key={p} className="dot">
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t rule">
                <details className={accordion} open>
                  <summary className={summary}>
                    <h2 id="inside-heading" className="text-[1.35rem]">
                      {h.inside ?? productPage.insideHeading}
                    </h2>
                    {plus}
                  </summary>
                  <ul className="pb-6">
                    {product.contents.map((item) => (
                      <li key={item} className="flex items-baseline gap-3 py-1.5 text-brown-soft">
                        <span aria-hidden="true" className="h-px w-5 shrink-0 translate-y-[-3px] bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
                <details className={accordion}>
                  <summary className={summary}>
                    <h2 className="text-[1.35rem]">{h.perfectFor ?? productPage.perfectForHeading}</h2>
                    {plus}
                  </summary>
                  <ul className="flex flex-wrap gap-2 pb-6">
                    {product.perfectFor.map((item) => (
                      <li key={item} className="border rule px-3 py-1.5 text-[0.875rem] text-brown-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
                <details className={accordion}>
                  <summary className={summary}>
                    <h2 className="text-[1.35rem]">{productPage.detailsHeading}</h2>
                    {plus}
                  </summary>
                  <dl className="pb-6">
                    {details.map((d) => (
                      <div key={d.label} className="flex justify-between gap-6 py-1.5">
                        <dt className="text-brown-soft">{d.label}</dt>
                        <dd className="text-right">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </div>
            </div>
          </div>
        </Container>

        <section aria-labelledby="story-heading" className="bg-ivory-deep">
          <Container className="grid items-center gap-10 py-section md:py-section-md lg:grid-cols-12 lg:gap-16">
            {storyImage && (
              <div className="reveal lg:col-span-5">
                <SmartImage src={storyImage.src} alt={storyImage.alt} missing={storyImage.missing} ratio="4 / 5" sizes="(min-width: 1024px) 38vw, 92vw" wrapperClassName="arch" />
              </div>
            )}
            <div className="reveal lg:col-span-6 lg:col-start-7">
              <p className="micro-label text-gold-ink">{product.name}</p>
              <h2 id="story-heading" className="mt-5 text-h2">
                {h.story ?? product.name}
              </h2>
              <div className="mt-8 space-y-5 text-lead text-brown-soft">
                {product.fullDescription.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </article>

      <RelatedProducts products={related} heading={productPage.relatedHeading} />

      <section aria-labelledby="corp-strip-heading" className="on-dark grain-dark bg-forest text-ivory">
        <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <div>
            <h2 id="corp-strip-heading" className="text-h3">
              {productPage.corporateStrip.heading}
            </h2>
            <p className="mt-2 text-ivory/75">{productPage.corporateStrip.copy}</p>
          </div>
          <ButtonLink href={productPage.corporateStrip.cta.href} variant="light">
            {productPage.corporateStrip.cta.label}
          </ButtonLink>
        </Container>
      </section>

      <ProductStickyBuy id={product.id} name={product.name} unitPrice={unitPrice} availability={product.availability} targetId="buy-box" />

      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: productPage.breadcrumbHome, path: '/' },
            { name: productPage.breadcrumbShop, path: '/shop' },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
