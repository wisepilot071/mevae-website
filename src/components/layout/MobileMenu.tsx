'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { navigation, navLabels, visibleNav } from '@/config/navigation';
import { useDialog } from '@/hooks/useDialog';
import { useCart } from '@/lib/cart';
import { whatsappUrl, externalLinkProps } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CloseIcon, MailIcon } from '@/components/ui/Icons';
import { brand, emailConfigured } from '@/config/brand';
import { ui } from '@/data/ui';
import { isActive } from './Navbar';

/** Side sheet menu: focus-trapped, ESC / backdrop / route change all close it. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { count, hydrated, open: openCart } = useCart();
  useDialog(open, onClose, panelRef);
  const items = visibleNav(navigation);
  const cartCount = hydrated ? count : 0;

  // Close whenever the route changes (e.g. browser back while open).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    onCloseRef.current();
  }, [pathname]);

  return (
    <div className="lg:hidden" inert={!open}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-brown/35 transition-opacity duration-ui ease-mevae ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={navLabels.mobileNavLabel}
        className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[380px] flex-col bg-ivory shadow-drawer transition-transform duration-ui ease-mevae ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b rule px-5">
          <span className="font-serif text-[1.5rem] font-semibold tracking-[0.14em]">{brand.brandName}</span>
          <button type="button" onClick={onClose} data-autofocus aria-label={navLabels.close} className="-mr-2 inline-flex h-11 w-11 items-center justify-center">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label={navLabels.mobileNavLabel} className="flex-1 overflow-y-auto px-5 pt-6">
          <ul>
            {items.map((item, i) => (
              <li key={item.href} className="border-b rule">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="group flex min-h-[68px] items-baseline gap-4 font-serif text-[2.1rem] leading-none text-brown"
                >
                  <span className="w-6 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                  <span className="group-aria-[current=page]:italic">{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="border-b rule">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCart();
                }}
                className="flex min-h-[68px] w-full items-baseline gap-4 font-serif text-[2.1rem] leading-none text-brown"
              >
                <span className="w-6 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-ink">{String(items.length + 1).padStart(2, '0')}</span>
                {navLabels.cart}
                <span className="ml-auto self-center font-sans text-sm tabular-nums text-brown-soft">{ui.cart.itemCount(cartCount)}</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="space-y-1 border-t rule bg-ivory-deep/60 px-5 py-5 pb-safe">
          <a href={whatsappUrl()} {...externalLinkProps} className="flex min-h-[44px] items-center gap-3 text-sm font-medium">
            <WhatsAppIcon className="h-5 w-5" /> {navLabels.whatsapp}
          </a>
          {emailConfigured && (
            <a href={`mailto:${brand.email}`} className="flex min-h-[44px] items-center gap-3 text-sm font-medium">
              <MailIcon className="h-5 w-5" /> {brand.email}
            </a>
          )}
          <p className="micro-label pt-2 text-brown-soft">{brand.location}</p>
        </div>
      </div>
    </div>
  );
}
