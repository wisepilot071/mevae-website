'use client';

import { useCart } from '@/lib/cart';
import { ui } from '@/data/ui';
import { PlusIcon } from '@/components/ui/Icons';

/** Small add-to-cart control used on product cards (only for purchasable hampers). */
export function QuickAdd({ id, name }: { id: string; name: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(id)}
      aria-label={`${ui.actions.addToCart}: ${name}`}
      className="inline-flex min-h-[44px] items-center gap-2 border-b border-brown/30 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brown transition-colors duration-micro hover:border-brown"
    >
      <PlusIcon /> {ui.actions.addToCart}
    </button>
  );
}
