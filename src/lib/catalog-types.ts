import type { Availability } from '@/data/products';

export interface ResolvedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  missing: boolean;
}

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  salePrice: number | null;
  /** null when the hamper is sold on request. */
  unitPrice: number | null;
  availability: Availability;
  url: string;
  image: ResolvedImage | null;
}
