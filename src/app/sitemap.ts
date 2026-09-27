import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';
import { navigation } from '@/config/navigation';
import { indexableProducts, visibleCategories, productsInCategory, primaryImage } from '@/lib/products';
import { assetExists } from '@/lib/assets';
import { absoluteUrl } from '@/lib/format';

/** Static pages + every indexable product + every visible, non-empty category. Hidden / comingSoon excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['/', '/shop', '/corporate', '/about', '/contact', '/policies'];
  const extra = navigation.filter((n) => n.visible && !staticPaths.includes(n.href) && !n.href.includes('#')).map((n) => n.href);

  return [
    ...[...staticPaths, ...extra].map((path) => ({
      url: `${brand.siteUrl}${path === '/' ? '' : path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...visibleCategories()
      .filter((c) => productsInCategory(c.slug).length > 0)
      .map((c) => ({ url: `${brand.siteUrl}/shop/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...indexableProducts().map((p) => {
      const img = primaryImage(p);
      return {
        url: p.seo.canonicalUrl,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        ...(img && assetExists(img.src) ? { images: [absoluteUrl(img.src)] } : {}),
      };
    }),
  ];
}
