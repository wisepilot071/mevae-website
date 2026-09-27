import type { Metadata } from 'next';
import { notFoundPage } from '@/data/pages';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | MEVAÉ' },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-heading" className="py-section md:py-section-lg">
      <Container className="flex flex-col items-start gap-8">
        <p className="micro-label text-gold-ink">{notFoundPage.eyebrow}</p>
        <h1 id="nf-heading" className="max-w-4xl text-h1">
          {notFoundPage.heading}
        </h1>
        <p className="max-w-lg text-lead text-brown-soft">{notFoundPage.body}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href={notFoundPage.shop.href}>{notFoundPage.shop.label}</ButtonLink>
          <ButtonLink href={notFoundPage.home.href} variant="text">
            {notFoundPage.home.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
