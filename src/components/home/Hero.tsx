import Link from 'next/link';
import { homepage } from '@/data/homepage';
import { getProduct } from '@/lib/products';
import { SmartImage } from '@/components/ui/SmartImage';
import { ButtonLink } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { ArrowIcon } from '@/components/ui/Icons';
import { HeroParallax } from './HeroParallax';

/**
 * Split editorial hero: the message on the left; on the right the Bloom box in MEVAÉ's arch frame,
 * with the Signature case layered over its edge. The photograph is the LCP element and loads first.
 */
export function Hero() {
  const { headline, subcopy, primaryCta, secondaryCta, image, inset, caption, notes } = homepage.hero;
  const featured = getProduct(caption.href.replace('/product/', ''));

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-site gap-8 px-gutter pb-14 pt-4 md:px-gutter-md md:pb-20 md:pt-12 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-gutter-lg lg:pb-24">
        <div className="order-2 lg:order-1 lg:col-span-6 lg:pr-6">
          <h1 id="hero-heading" className="text-display">
            <span className="block">{headline[0]}</span>
            <span className="block italic text-gold-ink">{headline[1]}</span>
          </h1>
          <p className="mt-7 max-w-[42ch] text-lead text-brown-soft">{subcopy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={primaryCta.href} className="w-full sm:w-auto">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="text" className="self-center sm:self-auto">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative order-1 mb-6 lg:order-2 lg:mb-0 lg:col-span-6">
          <div className="relative ml-auto w-[84%] sm:w-[64%] lg:w-[84%]">
            <SmartImage
              src={image.src}
              alt={image.alt}
              ratio="4 / 5"
              priority
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 88vw"
              wrapperClassName="arch shadow-lift"
            />
            {featured && (
              <Link
                href={caption.href}
                className="arrow-link absolute bottom-4 right-4 flex items-center gap-3 bg-ivory/95 px-4 py-3 text-left shadow-lift"
              >
                <span>
                  <span className="block font-serif text-lg leading-none">{featured.name}</span>
                  <Price product={featured} className="mt-1 text-[0.8125rem] text-brown-soft" />
                </span>
                <ArrowIcon />
              </Link>
            )}
          </div>
          <div className="absolute -bottom-6 left-0 w-[36%] sm:left-[8%] sm:w-[28%] lg:-left-[4%] lg:bottom-[8%] lg:w-[36%]">
            <HeroParallax>
              <SmartImage
                src={inset.src}
                alt={inset.alt}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 16vw, 40vw"
                wrapperClassName="border-[6px] border-ivory shadow-lift"
              />
            </HeroParallax>
          </div>
        </div>
      </div>

      <div className="border-y rule">
        <ul className="mx-auto flex max-w-site flex-wrap justify-center gap-x-10 gap-y-2 px-gutter py-4 md:justify-between md:px-gutter-md lg:px-gutter-lg">
          {notes.map((n) => (
            <li key={n} className="micro-label dot text-brown-soft">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
