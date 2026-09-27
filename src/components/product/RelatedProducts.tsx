import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Container } from '@/components/ui/Container';

export function RelatedProducts({ products, heading }: { products: Product[]; heading: string }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="related-heading" className="border-t rule py-section md:py-section-md">
      <Container>
        <h2 id="related-heading" className="reveal mb-12 text-h2 md:mb-16">
          {heading}
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
