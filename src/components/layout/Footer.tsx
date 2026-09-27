import Link from 'next/link';
import { brand, emailConfigured } from '@/config/brand';
import { navigation, legalNavigation, navLabels, visibleNav } from '@/config/navigation';
import { whatsappUrl, externalLinkProps } from '@/lib/whatsapp';
import { visibleCategories, productsInCategory } from '@/lib/products';
import { ui } from '@/data/ui';
import { shopPage } from '@/data/pages';
import { Container } from '@/components/ui/Container';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function Footer() {
  const year = new Date().getFullYear();
  const shopLinks = visibleCategories()
    .filter((c) => productsInCategory(c.slug).length > 0)
    .slice(0, 4);
  const linkCls = 'inline-flex min-h-[40px] items-center text-ivory/80 transition-colors hover:text-ivory';
  const headCls = 'micro-label mb-4 font-sans text-gold-light';

  return (
    <footer className="on-dark grain-dark bg-forest text-ivory">
      <Container className="pt-16 md:pt-24">
        <div className="grid gap-12 border-b border-ivory/15 pb-14 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-5">
            <p className="font-serif text-[3rem] font-semibold leading-none tracking-[0.14em] md:text-[4rem]">{brand.brandName}</p>
            <p className="mt-5 max-w-sm font-serif text-[1.35rem] italic text-ivory/85">{ui.footer.tagline}</p>
            <a href={whatsappUrl()} {...externalLinkProps} className="mt-8 inline-flex min-h-[48px] items-center gap-3 border border-ivory/30 px-5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-ivory">
              <WhatsAppIcon /> {navLabels.whatsapp}
            </a>
          </div>
          <nav aria-label={navLabels.footerNavLabel} className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className={headCls}>{ui.footer.shopHeading}</h2>
              <ul>
                <li>
                  <Link href="/shop" className={linkCls}>
                    {shopPage.allLabel}
                  </Link>
                </li>
                {shopLinks.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/shop/${c.slug}`} className={linkCls}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={headCls}>{ui.footer.houseHeading}</h2>
              <ul>
                {visibleNav(navigation)
                  .filter((i) => i.href !== '/shop')
                  .map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkCls}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                {brand.instagram && (
                  <li>
                    <a href={brand.instagram} {...externalLinkProps} className={linkCls}>
                      {ui.footer.instagramLabel}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className={headCls}>{ui.footer.legalHeading}</h2>
              <ul>
                {visibleNav(legalNavigation).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkCls}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="flex flex-col gap-3 py-7 text-[0.8125rem] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{ui.footer.rights(year, brand.brandName)}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            {emailConfigured && (
              <a href={`mailto:${brand.email}`} className="hover:text-ivory">
                {brand.email}
              </a>
            )}
            <span>{brand.location}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
