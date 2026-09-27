import type { Metadata } from 'next';
import { pageSeo } from '@/data/seo';
import { corporatePage } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { visibleProducts } from '@/lib/products';
import { whatsappUrl, externalLinkProps } from '@/lib/whatsapp';
import { whatsappConfig } from '@/config/whatsapp';
import { breadcrumbSchema } from '@/lib/schema';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { JsonLd } from '@/components/ui/SEOHead';
import { ProductCard } from '@/components/product/ProductCard';
import { CorporateEnquiryForm } from '@/components/forms/CorporateEnquiryForm';

const seo = pageSeo.corporate;

export const metadata: Metadata = buildMetadata({
  title: seo.seoTitle,
  description: seo.metaDescription,
  path: seo.path,
  keywords: seo.keywords,
});

export default function CorporatePage() {
  const products = visibleProducts().filter((p) => p.category.includes('corporate-gifting'));
  const hampers = visibleProducts()
    .filter((p) => p.availability !== 'comingSoon')
    .map((p) => ({ id: p.id, name: p.name }));

  return (
    <>
      <section aria-labelledby="corporate-heading" className="pb-section pt-10 md:pb-section-md md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <p className="micro-label dot text-gold-ink">{corporatePage.eyebrow}</p>
            <h1 id="corporate-heading" className="mt-6 text-h1">
              {corporatePage.h1}
            </h1>
            <p className="mt-7 max-w-[48ch] text-lead text-brown-soft">{corporatePage.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <a href="#enquiry" className="inline-flex min-h-[52px] items-center justify-center bg-brown px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold-ink">
                {corporatePage.formHeading}
              </a>
              <a href={whatsappUrl(whatsappConfig.messages.corporateIntro)} {...externalLinkProps} className="inline-flex min-h-[44px] items-center justify-center gap-2 self-center sm:self-auto">
                <WhatsAppIcon />
                <span className="link-rule text-[0.75rem] font-semibold uppercase tracking-[0.18em]">{corporatePage.whatsappLabel}</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SmartImage src={corporatePage.image.src} alt={corporatePage.image.alt} ratio="4 / 5" priority sizes="(min-width: 1024px) 38vw, 92vw" objectPosition="35% 50%" wrapperClassName="arch" />
          </div>
        </Container>
      </section>

      <section aria-label={corporatePage.stepsLabel} className="border-y rule bg-ivory-deep py-section-md md:py-section">
        <Container>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-0">
            {corporatePage.steps.map((s, i) => (
              <li key={s.title} className={`reveal md:px-10 ${i > 0 ? 'md:border-l md:rule' : 'md:pl-0'}`}>
                <span aria-hidden="true" className="font-serif text-[3rem] italic leading-none text-gold">
                  {i + 1}
                </span>
                <h2 className="mt-3 text-h3">{s.title}</h2>
                <p className="mt-3 max-w-[32ch] text-brown-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="corporate-hampers" className="py-section md:py-section-md">
        <Container>
          <h2 id="corporate-hampers" className="reveal text-h2">
            {corporatePage.hampersHeading}
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-heading" className="border-t rule bg-ivory-deep/60 py-section md:py-section-md">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="enquiry-heading" className="text-h2">
              {corporatePage.formHeading}
            </h2>
            <p className="mt-5 max-w-[36ch] text-brown-soft">{corporatePage.formIntro}</p>
          </div>
          <div className="lg:col-span-8">
            <CorporateEnquiryForm hampers={hampers} />
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Corporate gifting', path: '/corporate' },
        ])}
      />
    </>
  );
}
