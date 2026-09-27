import Link from 'next/link';
import type { Product } from '@/data/products';
import { orderedImages } from '@/lib/products';
import { resolveImage } from '@/lib/catalog';
import { effectivePrice } from '@/lib/format';
import { SmartImage } from '@/components/ui/SmartImage';
import { Price } from '@/components/ui/Price';
import { ArrowIcon } from '@/components/ui/Icons';
import { ui } from '@/data/ui';
import { QuickAdd } from './QuickAdd';

interface Props {
  product: Product;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
  sizes?: string;
  /** Index shown as a small editorial numeral, e.g. "01". */
  index?: number;
}

/**
 * Editorial product card. The image, name and descriptor form one link to the product page;
 * a separate quick-add sits beside the price. On devices with hover, the second photograph fades in.
 */
export function ProductCard({ product, priority = false, headingLevel = 'h3', sizes = "(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 92vw" }: Props) {
  const imgs = orderedImages(product.images);
  const main = resolveImage(imgs[0]);
  const alt = resolveImage(imgs[1]);
  const H = headingLevel;
  const out = product.availability === 'outOfStock';
  const badge =
    product.availability === 'outOfStock'
      ? ui.availability.outOfStock
      : product.availability === 'comingSoon'
        ? ui.availability.comingSoon
        : product.availability === 'enquire'
          ? ui.availability.enquire
          : product.price !== null && (effectivePrice(product) ?? 0) < product.price
            ? ui.availability.sale
            : null;

  return (
    <article className="reveal group flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className={`relative overflow-hidden bg-ivory-deep ${out ? 'grayscale' : ''}`}>
          {main && (
            <SmartImage
              src={main.src}
              alt={main.alt}
              missing={main.missing}
              label={product.name}
              ratio="4 / 5"
              priority={priority}
              sizes={sizes}
              className="transition-transform duration-[1200ms] ease-mevae [@media(hover:hover)]:group-hover:scale-[1.035]"
            />
          )}
          {alt && !alt.missing && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-editorial ease-mevae [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100"
            >
              <SmartImage src={alt.src} alt="" sizes={sizes} className="scale-[1.02]" />
            </div>
          )}
          {badge && (
            <span className="micro-label absolute left-3 top-3 bg-ivory/95 px-2.5 py-1.5 text-brown">{badge}</span>
          )}
        </div>
        <div className="mt-5">
          <H className="font-serif text-[1.75rem] leading-none md:text-[2rem]">
            <span aria-hidden="true" className="micro-label mb-2 block font-sans text-gold-ink">MEVAÉ</span>
            <span className="sr-only">MEVAÉ </span>
            {product.name.replace(/^MEVAÉ\s+/, '')}
          </H>
        </div>
        <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-brown-soft">{product.tagline}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-4 border-t rule pt-3">
        <Price product={product} className="text-[0.9375rem]" />
        {product.availability === 'available' ? (
          <QuickAdd id={product.id} name={product.name} />
        ) : (
          <Link href={`/product/${product.slug}`} className="arrow-link inline-flex min-h-[44px] items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]" tabIndex={-1} aria-hidden="true">
            {ui.actions.viewDetails} <ArrowIcon />
          </Link>
        )}
      </div>
    </article>
  );
}
