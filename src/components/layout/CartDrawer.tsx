'use client';

import { useRef, useState } from 'react';
import { useCart } from '@/lib/cart';
import { useDialog } from '@/hooks/useDialog';
import { formatINR } from '@/lib/format';
import { cartOrderUrl, externalLinkProps } from '@/lib/whatsapp';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CloseIcon } from '@/components/ui/Icons';
import { ui } from '@/data/ui';
import { track } from '@/lib/analytics';
import { CartItem } from './CartItem';

/**
 * Slide-out cart. Checkout is an honest order request: it opens WhatsApp with every line,
 * the total and the customer's optional note. No payment is taken on the site.
 */
export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count, setQty, remove, announcement } = useCart();
  const [note, setNote] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(isOpen, close, panelRef);

  const checkoutHref = cartOrderUrl(
    lines.map((l) => ({ name: l.product.name, qty: l.qty, unitPrice: l.product.unitPrice })),
    note,
  );

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-50 bg-brown/35 transition-opacity duration-ui ease-mevae ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-ivory shadow-drawer transition-[transform,visibility] duration-ui ease-mevae sm:w-[440px] ${
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b rule px-5 md:h-[76px] md:px-6">
          <h2 id="cart-title" className="font-serif text-[1.6rem] leading-none">
            {ui.cart.title}
            {count > 0 && <span className="ml-2 font-sans text-[0.8125rem] text-brown-soft">({ui.cart.itemCount(count)})</span>}
          </h2>
          <button type="button" onClick={close} data-autofocus aria-label={ui.cart.close} className="-mr-2 inline-flex h-11 w-11 items-center justify-center hover:text-gold-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span aria-hidden="true" className="font-serif text-[1.3rem] tracking-[0.16em] text-gold">
              MEVAÉ
            </span>
            <p className="font-serif text-h3">{ui.cart.empty}</p>
            <p className="text-brown-soft">{ui.cart.emptyNudge}</p>
            <ButtonLink href="/shop" onClick={close} className="mt-4">
              {ui.actions.shopHampers}
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 md:px-6">
              {lines.map((line) => (
                <CartItem key={line.id} line={line} onQty={(q) => setQty(line.id, q)} onRemove={() => remove(line.id)} onNavigate={close} />
              ))}
            </ul>
            <div className="border-t rule bg-ivory-deep/50 px-5 pt-5 pb-safe md:px-6">
              <label htmlFor="cart-note" className="micro-label text-brown-soft">
                {ui.cart.noteLabel}
              </label>
              <textarea
                id="cart-note"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 400))}
                rows={2}
                placeholder={ui.cart.notePlaceholder}
                className="mt-2 w-full resize-none rounded-sm border border-brown/20 bg-ivory px-3 py-2.5 text-[0.9375rem] placeholder:text-brown-soft/60 focus:border-brown"
              />
              <div className="mt-4 flex items-baseline justify-between">
                <p className="micro-label text-brown-soft">{ui.cart.subtotal}</p>
                <p className="font-serif text-[1.8rem] leading-none tabular-nums">{formatINR(subtotal)}</p>
              </div>
              <p className="mt-2 text-[0.8125rem] text-brown-soft">{ui.cart.note}</p>
              <a
                href={checkoutHref}
                {...externalLinkProps}
                onClick={() => track('begin_checkout_whatsapp', { subtotal })}
                className="mb-2 mt-4 flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-sm bg-brown px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-ui hover:bg-gold-ink"
              >
                <WhatsAppIcon /> {ui.actions.checkoutWhatsApp}
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
