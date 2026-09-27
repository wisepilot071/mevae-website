import { homepage } from '@/data/homepage';
import { SmartImage } from '@/components/ui/SmartImage';
import { ButtonLink } from '@/components/ui/Button';

/** A single-product spotlight on an espresso band, using the wide editorial photograph of the Signature case. */
export function SignatureSpotlight() {
  const { eyebrow, heading, body, cta, image } = homepage.spotlight;
  return (
    <section aria-labelledby="spotlight-heading" className="on-dark grain-dark relative bg-forest text-ivory">
      <div className="mx-auto grid max-w-site lg:grid-cols-12">
        <div className="relative lg:order-2 lg:col-span-7">
          <SmartImage src={image.src} alt={image.alt} ratio="16 / 10" sizes="(min-width: 1024px) 58vw, 100vw" objectPosition="70% 50%" wrapperClassName="lg:h-full lg:!aspect-auto lg:min-h-[560px]" />
        </div>
        <div className="flex flex-col justify-center px-gutter py-14 md:px-gutter-md md:py-20 lg:order-1 lg:col-span-5 lg:px-gutter-lg">
          <p className="micro-label text-gold-light">{eyebrow}</p>
          <h2 id="spotlight-heading" className="reveal mt-5 text-h2">
            {heading}
          </h2>
          <p className="reveal mt-6 max-w-[40ch] text-ivory/75">{body}</p>
          <ButtonLink href={cta.href} variant="light" className="mt-10 self-start">
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
