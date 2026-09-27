import type { Metadata } from 'next';
import { pageSeo } from '@/data/seo';
import { shopPage } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { visibleProducts } from '@/lib/products';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { ShopView } from '@/components/shop/ShopView';
import { JsonLd } from '@/components/ui/SEOHead';

const seo = pageSeo.shop;

export const metadata: Metadata = buildMetadata({
  title: seo.seoTitle,
  description: seo.metaDescription,
  path: seo.path,
  keywords: seo.keywords,
});

export default function ShopPage() {
  const products = visibleProducts();
  return (
    <>
      <ShopView products={products} h1={shopPage.h1} intro={shopPage.intro} />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
          ]),
          itemListSchema(products, '/shop'),
        ]}
      />
    </>
  );
}
