'use client';

import Link from 'next/link';
import type { CartLine } from '@/lib/cart';
import { formatINR } from '@/lib/format';
import { SmartImage } from '@/components/ui/SmartImage';
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { ui } from '@/data/ui';

export function CartItem({ line, onQty, onRemove, onNavigate }: { line: CartLine; onQty: (qty: number) => void; onRemove: () => void; onNavigate: () => void }) {
  const { product } = line;
  return (
    <li className="flex gap-4 border-b rule py-5">
      <Link href={`/product/${product.slug}`} onClick={onNavigate} className="block w-[84px] shrink-0" tabIndex={-1} aria-hidden="true">
        {product.image ? (
          <SmartImage src={product.image.src} alt="" missing={product.image.missing} label={product.name} sizes="96px" ratio="4 / 5" />
        ) : (
          <div className="aspect-[4/5] bg-ivory-deep" />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`} onClick={onNavigate} className="font-serif text-[1.25rem] leading-tight hover:text-gold-ink">
            {product.name}
          </Link>
          <p className="shrink-0 tabular-nums">
            <span className="sr-only">{ui.cart.lineTotal}: </span>
            {formatINR(line.lineTotal)}
          </p>
        </div>
        <p className="mt-1 text-[0.8125rem] tabular-nums text-brown-soft">{formatINR(product.unitPrice)} {ui.cart.each}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div role="group" aria-label={`${ui.cart.quantity}: ${product.name}`} className="flex items-center border rule">
            <button type="button" onClick={() => onQty(line.qty - 1)} aria-label={ui.cart.decrease(product.name)} className="flex h-10 w-10 items-center justify-center hover:bg-ivory-deep">
              <MinusIcon />
            </button>
            <output aria-live="polite" className="w-7 text-center text-sm tabular-nums">
              {line.qty}
            </output>
            <button type="button" onClick={() => onQty(line.qty + 1)} aria-label={ui.cart.increase(product.name)} className="flex h-10 w-10 items-center justify-center hover:bg-ivory-deep">
              <PlusIcon />
            </button>
          </div>
          <button type="button" onClick={onRemove} className="min-h-[44px] text-[0.8125rem] text-brown-soft underline decoration-brown/30 underline-offset-4 hover:text-sindoor">
            {ui.cart.remove}
            <span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
