import Link from 'next/link';
import { homepage } from '@/data/homepage';
import { moments } from '@/data/moments';
import { assetExists } from '@/lib/assets';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { ArrowIcon } from '@/components/ui/Icons';

/** Four occasions in an asymmetric editorial row — arches alternate with straight frames. */
export function MeaningfulMoments() {
  const { eyebrow, heading } = homepage.moments;
  return (
    <section aria-labelledby="moments-heading" className="bg-ivory-deep py-section md:py-section-md">
      <Container>
        <div className="reveal max-w-2xl">
          <p className="micro-label text-gold-ink">{eyebrow}</p>
          <h2 id="moments-heading" className="mt-5 text-h2">
            {heading}
          </h2>
        </div>
      </Container>
      <div className="mx-auto mt-12 max-w-site md:mt-16">
        <ul className="scroll-snap-x flex gap-5 overflow-x-auto px-gutter pb-2 scroll-px-gutter md:px-gutter-md md:scroll-px-gutter-md lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-gutter-lg">
          {moments.map((m, i) => (
            <li key={m.title} className={`w-[70vw] max-w-[320px] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:max-w-none ${i % 2 === 1 ? 'lg:mt-16' : ''}`}>
              <Link href={m.href} className="group block">
                <SmartImage
                  src={m.image.src}
                  alt={m.image.alt}
                  missing={!assetExists(m.image.src)}
                  label={m.title}
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 70vw"
                  wrapperClassName={i % 2 === 0 ? 'arch-sm' : ''}
                  className="transition-transform duration-[1200ms] ease-mevae [@media(hover:hover)]:group-hover:scale-[1.04]"
                />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-[1.6rem] leading-none">{m.title}</h3>
                  <ArrowIcon className="h-4 w-4 text-gold-ink" />
                </div>
                <p className="mt-2 text-[0.9375rem] text-brown-soft">{m.caption}</p>
              </Link>
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0 lg:hidden" />
        </ul>
      </div>
    </section>
  );
}
