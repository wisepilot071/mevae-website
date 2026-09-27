import type { Product } from '@/data/products';
import type { Category } from '@/data/categories';
import { shopPage } from '@/data/pages';
import { visibleCategories, productsInCategory } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { CategoryNav } from './CategoryNav';

/** Shop intro, occasion filters, the editorial grid, a short "how it comes together" story and a corporate prompt. */
export function ShopView({ products, active, h1, intro, eyebrow }: { products: Product[]; active?: Category; h1: string; intro: string; eyebrow?: string }) {
  const filters = visibleCategories().filter((c) => productsInCategory(c.slug).length > 0 || c.slug === active?.slug);

  return (
    <>
      <section aria-labelledby="shop-heading" className="pb-10 pt-10 md:pb-14 md:pt-16">
        <Container className="text-center">
          <p className="micro-label text-gold-ink">{eyebrow ?? shopPage.eyebrow}</p>
          <h1 id="shop-heading" className="mx-auto mt-5 max-w-[16ch] text-h1">
            {h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[46ch] text-lead text-brown-soft">{intro}</p>
        </Container>
      </section>

      <Container>
        <CategoryNav categories={filters} active={active?.slug} />
      </Container>

      <section aria-label={h1} className="pb-section pt-12 md:pb-section-md md:pt-20">
        <Container>
          {products.length ? (
            <ProductGrid products={products} priorityCount={2} headingLevel="h2" />
          ) : (
            <EmptyState
              heading={shopPage.emptyHeading}
              body={shopPage.emptyBody}
              action={
                <ButtonLink href="/shop" variant="secondary">
                  {shopPage.resetLabel}
                </ButtonLink>
              }
            />
          )}
        </Container>
      </section>

      <section aria-labelledby="shop-story" className="border-t rule bg-ivory-deep py-section md:py-section-md">
        <Container>
          <h2 id="shop-story" className="micro-label text-center text-gold-ink">
            {shopPage.story.eyebrow}
          </h2>
          <ol className="mx-auto mt-12 grid max-w-[1120px] gap-10 md:grid-cols-3 md:gap-0">
            {shopPage.story.steps.map((s, i) => (
              <li key={s.title} className={`reveal text-center md:px-10 ${i > 0 ? 'md:border-l md:rule' : ''}`}>
                <span aria-hidden="true" className="font-serif text-[3.5rem] italic leading-none text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-h3">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-brown-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="shop-corporate" className="py-section md:py-section-md">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 id="shop-corporate" className="text-h2">
              {shopPage.corporate.heading}
            </h2>
            <p className="mt-4 text-lead text-brown-soft">{shopPage.corporate.body}</p>
          </div>
          <ButtonLink href={shopPage.corporate.cta.href}>{shopPage.corporate.cta.label}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
