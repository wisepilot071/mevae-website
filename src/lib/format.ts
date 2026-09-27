import { brand } from '@/config/brand';

const inr = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** e.g. 2500 → "₹2,500". The only way prices are rendered anywhere on the site. */
export const formatINR = (amount: number) => inr.format(amount);

/** The price a customer actually pays: salePrice when set, else price. */
export function effectivePrice(p: { price: number; salePrice?: number | null }): number;
export function effectivePrice(p: { price: number | null; salePrice?: number | null }): number | null;
export function effectivePrice(p: { price: number | null; salePrice?: number | null }): number | null {
  if (p.price === null) return null;
  return typeof p.salePrice === 'number' && p.salePrice > 0 && p.salePrice < p.price ? p.salePrice : p.price;
}

export const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${brand.siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;

export const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
