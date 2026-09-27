import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getCategory, productsInCategory, visibleCategories, primaryImage } from '@/lib/products';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { ShopView } from '@/components/shop/ShopView';
import { JsonLd } from '@/components/ui/SEOHead';

type Params = { category: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return visibleCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  const first = productsInCategory(c.slug)[0];
  return buildMetadata({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/shop/${c.slug}`,
    keywords: c.keywords,
    ogImage: c.image ?? (first ? primaryImage(first)?.src : undefined),
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const products = productsInCategory(c.slug);
  return (
    <>
      <ShopView products={products} active={c} h1={c.h1 ?? c.name} intro={c.description} eyebrow={c.name} />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: c.name, path: `/shop/${c.slug}` },
          ]),
          itemListSchema(products, `/shop/${c.slug}`),
        ]}
      />
    </>
  );
}
