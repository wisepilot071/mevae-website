import Image from 'next/image';
import { brand } from '@/config/brand';
import { assetExists } from '@/lib/assets';

/**
 * The MEVAÉ logo, used exactly as supplied (never recoloured or redrawn) once the file exists at brand.logo.
 * Until then, the typeset wordmark stands in — the same letterforms used on the MEVAÉ boxes.
 */
export function Logo({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  if (assetExists(brand.logo)) {
    return (
      <Image
        src={brand.logo}
        alt={brand.logoAlt}
        width={brand.logoWidth}
        height={brand.logoHeight}
        priority
        unoptimized={brand.logo.endsWith('.svg')}
        className={`h-7 w-auto md:h-8 ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex flex-col items-center leading-none ${tone === 'light' ? 'text-ivory' : 'text-brown'} ${className}`}>
      <span className="font-serif text-[1.6rem] font-semibold tracking-[0.16em] md:text-[1.85rem]">{brand.brandName}</span>
      <span className="sr-only"> — home</span>
    </span>
  );
}
