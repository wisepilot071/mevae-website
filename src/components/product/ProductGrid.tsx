import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

/** Editorial grid: one column on phones, two staggered columns from tablet up. */
export function ProductGrid({ products, priorityCount = 0, headingLevel = 'h3' }: { products: Product[]; priorityCount?: number; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="mx-auto grid max-w-[1120px] grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-12 lg:gap-x-20 sm:[&>li:nth-child(even)]:mt-20 lg:[&>li:nth-child(even)]:mt-32">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < priorityCount} headingLevel={headingLevel} sizes="(min-width: 1120px) 520px, (min-width: 640px) 46vw, 92vw" />
        </li>
      ))}
    </ul>
  );
}
