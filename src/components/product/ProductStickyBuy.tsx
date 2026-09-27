'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatINR } from '@/lib/format';
import { ui } from '@/data/ui';
import type { Availability } from '@/data/products';

/** Mobile-only bar that appears once the main buy box scrolls out of view. */
export function ProductStickyBuy({ id, name, unitPrice, availability, targetId }: { id: string; name: string; unitPrice: number | null; availability: Availability; targetId: string }) {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  if (availability !== 'available' || unitPrice === null) return null;

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t rule bg-ivory/95 px-gutter pt-3 pb-safe backdrop-blur-[2px] transition-transform duration-ui ease-mevae lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-tight">{name}</p>
          <p className="text-sm tabular-nums text-brown-soft">{formatINR(unitPrice)}</p>
        </div>
        <button type="button" onClick={() => add(id)} className="inline-flex min-h-[48px] shrink-0 items-center bg-brown px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ivory">
          {ui.actions.addToCart}
        </button>
      </div>
    </div>
  );
}
