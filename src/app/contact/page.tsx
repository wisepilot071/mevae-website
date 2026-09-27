import type { Metadata } from 'next';
import { brand, emailConfigured } from '@/config/brand';
import { pageSeo } from '@/data/seo';
import { contactPage } from '@/data/pages';
import { ui } from '@/data/ui';
import { buildMetadata } from '@/lib/seo';
import { whatsappUrl, externalLinkProps } from '@/lib/whatsapp';
import { breadcrumbSchema } from '@/lib/schema';
import { whatsappConfig } from '@/config/whatsapp';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { MailIcon, ExternalIcon, UserIcon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/SEOHead';

const seo = pageSeo.contact;

export const metadata: Metadata = buildMetadata({
  title: seo.seoTitle,
  description: seo.metaDescription,
  path: seo.path,
  keywords: seo.keywords,
});

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-heading" className="pb-12 pt-10 md:pb-16 md:pt-16">
        <Container>
          <p className="micro-label dot text-gold-ink">{contactPage.eyebrow}</p>
          <h1 id="contact-heading" className="mt-6 max-w-[14ch] text-h1">
            {contactPage.h1}
          </h1>
          <p className="mt-7 max-w-[46ch] text-lead text-brown-soft">{contactPage.intro}</p>
        </Container>
      </section>

      <Container>
        <div className="grid gap-px border-y rule bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-3">
        <section aria-labelledby="personal-heading" className="bg-ivory py-12 md:py-16 md:pr-10">
          <h2 id="personal-heading" className="text-h3">
            {contactPage.personal.heading}
          </h2>
          <p className="mt-4 text-brown-soft">{contactPage.personal.body}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a href={whatsappUrl(whatsappConfig.messages.general)} {...externalLinkProps} className="inline-flex min-h-[52px] items-center gap-2.5 bg-brown px-7 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold-ink">
              <WhatsAppIcon /> {contactPage.personal.whatsappLabel}
            </a>
          </div>
        </section>
        <section aria-labelledby="corp-heading" className="bg-ivory py-12 md:py-16 md:pl-10 lg:px-10">
          <h2 id="corp-heading" className="text-h3">
            {contactPage.corporate.heading}
          </h2>
          <p className="mt-4 text-brown-soft">{contactPage.corporate.body}</p>
          <ButtonLink href={contactPage.corporate.cta.href} variant="secondary" className="mt-8">
            {contactPage.corporate.cta.label}
          </ButtonLink>
        </section>
        <section aria-labelledby="direct-heading" className="bg-ivory py-12 md:col-span-2 md:py-16 lg:col-span-1 lg:pl-10">
          <h2 id="direct-heading" className="text-h3">
            {contactPage.directHeading}
          </h2>
          <dl className="mt-6 divide-y divide-[var(--rule)] border-y rule">
            <div className="py-4">
              <dt className="micro-label text-gold-ink">{contactPage.whatsappLabel}</dt>
              <dd className="mt-1.5">
                <a href={whatsappUrl(whatsappConfig.messages.general)} {...externalLinkProps} className="inline-flex min-h-[44px] items-center gap-2.5 text-brown">
                  <WhatsAppIcon /> <span className="link-rule tabular-nums">{brand.whatsapp.display}</span>
                </a>
              </dd>
            </div>
            {emailConfigured && (
              <div className="py-4">
                <dt className="micro-label text-gold-ink">{contactPage.emailLabel}</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${brand.email}`} className="inline-flex min-h-[44px] items-center gap-2.5 break-all text-brown">
                    <MailIcon /> <span className="link-rule">{brand.email}</span>
                  </a>
                </dd>
              </div>
            )}
            <div className="py-4">
              <dt className="micro-label text-gold-ink">{contactPage.founderLabel}</dt>
              <dd className="mt-1.5">
                <p className="inline-flex items-center gap-2.5 font-serif text-[1.35rem] leading-tight">
                  <UserIcon /> {brand.founder.name}
                </p>
                <a href={brand.founder.linkedin} {...externalLinkProps} className="mt-1 flex min-h-[44px] items-center gap-2 text-brown">
                  <span className="link-rule">{contactPage.linkedinLabel}</span>
                  <ExternalIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div className="py-4">
              <dt className="micro-label text-gold-ink">{contactPage.locationLabel}</dt>
              <dd className="mt-1.5 text-brown-soft">{contactPage.locationBody(brand.location)}</dd>
            </div>
          </dl>
          {brand.instagram && (
            <a href={brand.instagram} {...externalLinkProps} className="mt-6 inline-flex min-h-[44px] items-center">
              <span className="link-rule">{ui.footer.instagramLabel}</span>
            </a>
          )}
        </section>
        </div>
      </Container>
      <div className="h-section" />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
    </>
  );
}
