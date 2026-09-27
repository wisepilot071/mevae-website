import type { Metadata } from 'next';
import { pageSeo } from '@/data/seo';
import { aboutPage } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { JsonLd } from '@/components/ui/SEOHead';
import { ExternalIcon, MailIcon } from '@/components/ui/Icons';
import { brand, emailConfigured } from '@/config/brand';
import { externalLinkProps } from '@/lib/whatsapp';

const seo = pageSeo.about;

export const metadata: Metadata = buildMetadata({
  title: seo.seoTitle,
  description: seo.metaDescription,
  path: seo.path,
  keywords: seo.keywords,
});

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-heading" className="pb-section pt-10 md:pb-section-md md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="micro-label dot text-gold-ink">{aboutPage.eyebrow}</p>
            <h1 id="about-heading" className="mt-6 text-display">
              {aboutPage.h1}
            </h1>
            <p className="mt-8 max-w-[48ch] text-lead text-brown-soft">{aboutPage.intro}</p>
          </div>
          <div className="lg:col-span-5">
            <SmartImage src={aboutPage.image.src} alt={aboutPage.image.alt} ratio="4 / 5" priority sizes="(min-width: 1024px) 38vw, 92vw" wrapperClassName="arch" />
          </div>
        </Container>
      </section>
      <section aria-label={aboutPage.eyebrow} className="border-t rule bg-ivory-deep">
        <Container>
          <ol className="grid md:grid-cols-2">
            {aboutPage.blocks.map((b, i) => (
              <li key={b.title} className={`reveal border-b rule py-12 md:py-16 ${i % 2 === 1 ? 'md:border-l md:pl-12' : 'md:pr-12'}`}>
                <span aria-hidden="true" className="font-serif text-[2.4rem] italic leading-none text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-5 text-h3">{b.title}</h2>
                <p className="mt-4 max-w-md text-brown-soft">{b.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section aria-labelledby="founder-heading" className="border-b rule py-section md:py-section-md">
        <Container className="grid gap-8 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-7">
            <p className="micro-label dot text-gold-ink">{aboutPage.founder.eyebrow}</p>
            <h2 id="founder-heading" className="mt-6 text-h1">
              {aboutPage.founder.heading}
            </h2>
            <p className="mt-6 max-w-[46ch] text-lead text-brown-soft">{aboutPage.founder.body}</p>
          </div>
          <div className="flex flex-col items-start gap-2 md:col-span-5 md:items-end">
            <p className="font-serif text-[1.6rem] leading-tight">{brand.founder.name}</p>
            <p className="micro-label text-brown-soft">
              {brand.founder.role}, {brand.brandName}
            </p>
            <a href={brand.founder.linkedin} {...externalLinkProps} className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-brown">
              <span className="link-rule">{aboutPage.founder.linkedinLabel}</span>
              <ExternalIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {emailConfigured && (
              <a href={`mailto:${brand.email}`} className="inline-flex min-h-[44px] items-center gap-2 text-brown">
                <MailIcon />
                <span className="link-rule">{brand.email}</span>
              </a>
            )}
          </div>
        </Container>
      </section>
      <section aria-label={aboutPage.links.shop.label} className="py-section md:py-section-md">
        <Container className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
          <ButtonLink href={aboutPage.links.shop.href} className="w-full sm:w-auto">
            {aboutPage.links.shop.label}
          </ButtonLink>
          <ButtonLink href={aboutPage.links.corporate.href} variant="text">
            {aboutPage.links.corporate.label}
          </ButtonLink>
        </Container>
      </section>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </>
  );
}
