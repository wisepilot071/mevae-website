'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { navigation, navLabels, visibleNav } from '@/config/navigation';
import { useCart } from '@/lib/cart';
import { whatsappUrl, externalLinkProps } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BagIcon, MenuIcon } from '@/components/ui/Icons';
import { MobileMenu } from './MobileMenu';
import { track } from '@/lib/analytics';
import { ui } from '@/data/ui';

export const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`) || (href === '/shop' && pathname.startsWith('/product/'));

/**
 * Header: navigation left, wordmark centred, WhatsApp + cart right.
 * On mobile: menu · wordmark · WhatsApp + cart. Sticky with a hairline once scrolled.
 */
export function Navbar({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const { count, hydrated, open: openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = visibleNav(navigation);
  const cartCount = hydrated ? count : 0;

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 12);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const iconBtn = 'relative inline-flex h-11 w-11 items-center justify-center text-brown transition-colors duration-micro hover:text-gold-ink';

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-ui ease-mevae ${
        scrolled ? 'border-b rule bg-ivory/95 backdrop-blur-[2px]' : 'border-b border-transparent bg-ivory'
      }`}
    >
      <div className="mx-auto grid h-16 w-full max-w-site grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-gutter md:h-[76px] md:px-gutter-md lg:px-gutter-lg">
        {/* Left: menu (mobile) / nav (desktop) */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={navLabels.menu}
            className={`${iconBtn} -ml-1 lg:hidden`}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <nav aria-label={navLabels.primaryNavLabel} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className="nav-link inline-flex min-h-[44px] items-center text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brown-soft hover:text-brown aria-[current=page]:text-brown"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Centre: wordmark */}
        <Link href="/" className="inline-flex min-h-[44px] items-center justify-center text-brown" aria-label={navLabels.home}>
          {logo}
        </Link>

        {/* Right: WhatsApp + cart */}
        <div className="flex items-center justify-end gap-0.5 sm:gap-2">
          <a
            href={whatsappUrl()}
            {...externalLinkProps}
            onClick={() => track('whatsapp_enquiry', { from: 'header' })}
            aria-label={navLabels.whatsappAria}
            className={iconBtn}
          >
            <WhatsAppIcon className="h-[22px] w-[22px]" />
          </a>
          <button type="button" onClick={openCart} aria-label={ui.cart.openLabel(cartCount)} className={`${iconBtn} -mr-1 lg:mr-0`}>
            <BagIcon className="h-6 w-6" />
            <span
              aria-hidden="true"
              className={`absolute right-1 top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brown px-1 text-[0.625rem] font-semibold tabular-nums text-ivory transition-transform duration-ui ease-mevae ${
                cartCount > 0 ? 'scale-100' : 'scale-0'
              }`}
            >
              {cartCount}
            </span>
            <span className="ml-2 hidden text-[0.75rem] font-semibold uppercase tracking-[0.18em] xl:inline">{navLabels.cart}</span>
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
