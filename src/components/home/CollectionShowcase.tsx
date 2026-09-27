import { homepage } from '@/data/homepage';
import { featuredProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/product/ProductCard';
import { ButtonLink } from '@/components/ui/Button';

/** The collection as a row of editorial cards — a swipeable strip on phones, four columns on desktop. */
export function CollectionShowcase() {
  const items = featuredProducts();
  if (!items.length) return null;
  const { eyebrow, heading, intro, viewAll } = homepage.collection;
  return (
    <section aria-labelledby="collection-heading" className="py-section md:py-section-md">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="reveal md:col-span-7">
            <p className="micro-label text-gold-ink">{eyebrow}</p>
            <h2 id="collection-heading" className="mt-5 text-h2">
              {heading}
            </h2>
          </div>
          <div className="reveal md:col-span-5">
            <p className="max-w-[40ch] text-brown-soft">{intro}</p>
            <ButtonLink href={viewAll.href} variant="text" className="mt-3">
              {viewAll.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
      <div className="mx-auto mt-12 max-w-site md:mt-16">
        <ul className="scroll-snap-x flex gap-5 overflow-x-auto px-gutter pb-2 scroll-px-gutter md:px-gutter-md md:scroll-px-gutter-md lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-gutter-lg">
          {items.map((p) => (
            <li key={p.id} className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:max-w-none">
              <ProductCard product={p} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 78vw" />
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0 lg:hidden" />
        </ul>
      </div>
    </section>
  );
}
