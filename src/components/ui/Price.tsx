import { formatINR, effectivePrice } from '@/lib/format';
import { ui } from '@/data/ui';

/** Renders a product's price from product data. Hampers sold on request show "Price on request". */
export function Price({ product, className = '' }: { product: { price: number | null; salePrice?: number | null }; className?: string }) {
  const pay = effectivePrice(product);
  if (pay === null || product.price === null) {
    return <p className={`font-sans text-brown-soft ${className}`}>{ui.priceOnRequest}</p>;
  }
  const onSale = pay < product.price;
  return (
    <p className={`font-sans tabular-nums ${className}`}>
      {onSale ? (
        <>
          <span className="sr-only">Sale price </span>
          <span className="text-terracotta-ink">{formatINR(pay)}</span>{' '}
          <span className="sr-only">, was </span>
          <s className="text-brown-soft/80">{formatINR(product.price)}</s>
        </>
      ) : (
        formatINR(pay)
      )}
    </p>
  );
}
