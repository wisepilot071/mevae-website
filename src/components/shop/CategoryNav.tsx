import Link from 'next/link';
import type { Category } from '@/data/categories';
import { shopPage } from '@/data/pages';

/**
 * Occasion filters as real links (/shop/<slug>): crawlable, instant, zero client JS.
 * Scrolls horizontally on phones with soft faded edges; the active item carries the sindoor dot.
 */
export function CategoryNav({ categories, active }: { categories: Category[]; active?: string }) {
  const item = (isActive: boolean) =>
    `relative inline-flex min-h-[48px] items-center whitespace-nowrap px-1 font-serif text-[1.2rem] transition-colors duration-micro md:text-[1.3rem] ${
      isActive ? 'italic text-brown dot' : 'text-brown-soft hover:text-brown'
    }`;
  return (
    <nav aria-label={shopPage.filterLabel} className="border-y rule">
      <ul className="scroll-snap-x fade-x -mx-gutter flex gap-7 overflow-x-auto px-gutter scroll-px-gutter md:mx-0 md:justify-center md:gap-10 md:px-0 md:[mask-image:none] md:[-webkit-mask-image:none]">
        <li className="snap-start">
          <Link href="/shop" className={item(!active)} aria-current={!active ? 'page' : undefined}>
            {shopPage.allLabel}
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug} className="snap-start">
            <Link href={`/shop/${c.slug}`} className={item(active === c.slug)} aria-current={active === c.slug ? 'page' : undefined}>
              {c.name}
            </Link>
          </li>
        ))}
        <li aria-hidden="true" className="w-2 shrink-0 md:hidden" />
      </ul>
    </nav>
  );
}
