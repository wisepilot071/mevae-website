'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { productEnquiryUrl, productOrderUrl, externalLinkProps } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { ui } from '@/data/ui';
import { productPage } from '@/data/pages';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import type { Availability } from '@/data/products';

interface Props {
  id: string;
  name: string;
  unitPrice: number | null;
  url: string;
  availability: Availability;
}

const MAX = 20;

/** Quantity, add to cart, and a direct WhatsApp order — or an enquiry for hampers sold on request. */
export function ProductBuyBox({ id, name, unitPrice, url, availability }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const canBuy = availability === 'available' && unitPrice !== null;

  if (!canBuy) {
    return (
      <div className="space-y-4">
        {availability === 'enquire' && <p className="text-brown-soft">{productPage.enquireNote}</p>}
        {availability === 'outOfStock' && <p className="text-brown-soft">{ui.availability.outOfStock}.</p>}
        <a
          href={productEnquiryUrl({ name, price: unitPrice }, url)}
          {...externalLinkProps}
          onClick={() => track('whatsapp_enquiry', { id })}
          className="flex min-h-[54px] w-full items-center justify-center gap-2.5 bg-brown px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-ui hover:bg-forest"
        >
          <WhatsAppIcon /> {productPage.enquire}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-3">
        <div role="group" aria-label={`${productPage.quantity}: ${name}`} className="flex items-center border border-brown/25">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label={ui.cart.decrease(name)} className="flex h-[54px] w-12 items-center justify-center disabled:opacity-35">
            <MinusIcon />
          </button>
          <output aria-live="polite" className="w-8 text-center tabular-nums">
            {qty}
          </output>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX, q + 1))} disabled={qty >= MAX} aria-label={ui.cart.increase(name)} className="flex h-[54px] w-12 items-center justify-center disabled:opacity-35">
            <PlusIcon />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            add(id, qty);
            setQty(1);
          }}
          className="flex min-h-[54px] flex-1 items-center justify-center bg-brown px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-ui hover:bg-forest"
        >
          {ui.actions.addToCart}
        </button>
      </div>
      <a
        href={productOrderUrl({ name, price: unitPrice }, qty, url)}
        {...externalLinkProps}
        onClick={() => track('begin_checkout_whatsapp', { id, qty })}
        className="flex min-h-[54px] w-full items-center justify-center gap-2.5 border border-brown px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brown transition-colors duration-ui hover:bg-brown hover:text-ivory"
      >
        <WhatsAppIcon /> {productPage.orderNow}
      </a>
    </div>
  );
}
