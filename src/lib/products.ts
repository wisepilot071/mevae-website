import { products, type Product, type ProductImage } from '@/data/products';
import { categories, type Category } from '@/data/categories';

const roleOrder: ProductImage['role'][] = ['main', 'closed', 'contents', 'detail', 'lifestyle', 'additional', 'thumbnail'];

const bySort = <T extends { sortOrder: number; name: string }>(a: T, b: T) =>
  a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);

/** Every product that may appear anywhere on the site (excludes `hidden`). */
export const visibleProducts = (): Product[] =>
  products.filter((p) => p.availability !== 'hidden').sort(bySort);

/** Products that get their own indexable page & sitemap entry (excludes hidden + comingSoon from sitemap only). */
export const indexableProducts = (): Product[] =>
  visibleProducts().filter((p) => p.availability !== 'comingSoon');

export const featuredProducts = (): Product[] => visibleProducts().filter((p) => p.featured);

export const getProduct = (slug: string): Product | undefined =>
  visibleProducts().find((p) => p.slug === slug);

export const visibleCategories = (): Category[] =>
  categories.filter((c) => c.visible).sort(bySort);

export const getCategory = (slug: string): Category | undefined =>
  visibleCategories().find((c) => c.slug === slug);

export const productsInCategory = (slug: string): Product[] =>
  visibleProducts().filter((p) => p.category.includes(slug));

export const relatedProducts = (product: Product, limit = 3): Product[] =>
  visibleProducts()
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, score: p.category.filter((c) => product.category.includes(c)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || bySort(a.p, b.p))
    .slice(0, limit)
    .map(({ p }) => p);

/** Gallery order: roles are ordering hints, never requirements. */
export const orderedImages = (images: ProductImage[]) =>
  [...images].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

/** Image used for cards, cart lines and fallbacks. */
export const primaryImage = (p: Product): ProductImage | undefined =>
  p.images.find((i) => i.role === 'thumbnail') ?? orderedImages(p.images)[0];

export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
