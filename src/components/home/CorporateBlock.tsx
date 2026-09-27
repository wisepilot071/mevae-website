import { homepage } from '@/data/homepage';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';

export function CorporateBlock() {
  const { eyebrow, heading, copy, cta, aboutLink, image } = homepage.corporate;
  return (
    <section aria-labelledby="corporate-heading" className="on-dark grain-dark bg-forest py-section text-ivory md:py-section-md">
      <Container className="grid gap-12 md:grid-cols-12 md:items-center">
        <div className="reveal md:col-span-6 lg:col-span-5">
          <p className="micro-label text-gold-light">{eyebrow}</p>
          <h2 id="corporate-heading" className="mt-5 text-h2">
            {heading}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lead text-ivory/75">{copy}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={cta.href} variant="light">
              {cta.label}
            </ButtonLink>
            <ButtonLink href={aboutLink.href} variant="text" className="text-ivory">
              {aboutLink.label}
            </ButtonLink>
          </div>
        </div>
        <div className="reveal md:col-span-6 lg:col-span-6 lg:col-start-7">
          <SmartImage src={image.src} alt={image.alt} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 46vw, 92vw" wrapperClassName="md:ml-auto md:max-w-[480px]" />
        </div>
      </Container>
    </section>
  );
}
