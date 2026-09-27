'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import type { ResolvedImage } from '@/lib/catalog-types';
import { SmartImage } from '@/components/ui/SmartImage';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { productPage } from '@/data/pages';

/**
 * Product gallery: a native scroll-snap strip (swipe on touch, arrows + keys on desktop)
 * with thumbnails. Every slide keeps a fixed 4:5 box, so nothing shifts while loading.
 */
export function ProductGallery({ images, name, grayscale = false }: { images: ResolvedImage[]; name: string; grayscale?: boolean }) {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const count = images.length;

  const go = useCallback(
    (next: number) => {
      const el = track.current;
      if (!el || !count) return;
      const i = ((next % count) + count) % count;
      el.scrollTo({ left: i * el.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    },
    [count],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!count) {
    return (
      <div className="relative aspect-[4/5] w-full">
        <ImagePlaceholder label={name} />
      </div>
    );
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div className={`flex flex-col gap-3 md:flex-row-reverse md:gap-4 ${grayscale ? 'grayscale' : ''}`}>
      <div className="relative min-w-0 flex-1">
        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label={productPage.galleryLabel}
          tabIndex={count > 1 ? 0 : -1}
          onKeyDown={onKeyDown}
          className="scroll-snap-x flex aspect-[4/5] w-full overflow-x-auto bg-ivory-deep"
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative h-full w-full shrink-0 snap-start snap-always" aria-hidden={i !== index}>
              <SmartImage
                src={img.src}
                alt={img.alt}
                missing={img.missing}
                label={name}
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{`${index + 1} / ${count}: ${images[index]?.alt ?? ''}`}</p>
        {count > 1 && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5 md:hidden" aria-hidden="true">
              {images.map((img, i) => (
                <span key={img.src} className={`h-[3px] rounded-full bg-ivory transition-all duration-ui ${i === index ? 'w-6 opacity-100' : 'w-3 opacity-60'}`} />
              ))}
            </div>
            <div className="absolute bottom-3 right-3 hidden gap-2 md:flex">
              <button type="button" onClick={() => go(index - 1)} aria-label={productPage.galleryPrev} className="flex h-11 w-11 items-center justify-center bg-ivory/90 text-brown transition-colors hover:bg-ivory">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label={productPage.galleryNext} className="flex h-11 w-11 items-center justify-center bg-ivory/90 text-brown transition-colors hover:bg-ivory">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}
      </div>
      {count > 1 && (
        <ul className="scroll-snap-x flex gap-2 overflow-x-auto md:w-[84px] md:shrink-0 md:flex-col md:overflow-visible">
          {images.map((img, i) => (
            <li key={img.src} className="w-[72px] shrink-0 md:w-full">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={productPage.galleryThumb(i + 1, count)}
                aria-current={i === index ? 'true' : undefined}
                className={`relative block aspect-[4/5] w-full overflow-hidden transition-opacity duration-micro ${
                  i === index ? 'opacity-100 ring-1 ring-brown ring-offset-2 ring-offset-ivory' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {img.missing ? <ImagePlaceholder /> : <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
