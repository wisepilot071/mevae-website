import 'server-only';
import type { Product } from '@/data/products';
import { visibleProducts, primaryImage } from './products';
import { effectivePrice } from './format';
import { assetExists } from './assets';
import type { CatalogItem, ResolvedImage } from './catalog-types';

export const resolveImage = (img: { src: string; alt: string; width: number; height: number } | undefined): ResolvedImage | null =>
  img ? { src: img.src, alt: img.alt, width: img.width, height: img.height, missing: !assetExists(img.src) } : null;

export const toCatalogItem = (p: Product): CatalogItem => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  price: p.price,
  salePrice: p.salePrice ?? null,
  unitPrice: effectivePrice(p),
  availability: p.availability,
  url: p.seo.canonicalUrl,
  image: resolveImage(primaryImage(p)),
});

/** Client-safe snapshot of every purchasable product; passed to the cart provider from the root layout. */
export const buildCatalog = (): CatalogItem[] => visibleProducts().map(toCatalogItem);
