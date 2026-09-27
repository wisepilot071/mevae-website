import type { Metadata } from 'next';
import { pageSeo } from '@/data/seo';
import { policiesPage } from '@/data/pages';
import { policies } from '@/data/policies';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';

const seo = pageSeo.policies;

export const metadata: Metadata = buildMetadata({
  title: seo.seoTitle,
  description: seo.metaDescription,
  path: seo.path,
  keywords: seo.keywords,
});

export default function PoliciesPage() {
  return (
    <section aria-labelledby="policies-heading" className="pb-section pt-10 md:pb-section-md md:pt-16">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="micro-label dot text-gold-ink">{policiesPage.eyebrow}</p>
          <h1 id="policies-heading" className="mt-6 text-h2">
            {policiesPage.h1}
          </h1>
          <p className="mt-5 text-brown-soft">{policiesPage.intro}</p>
          <nav aria-label={policiesPage.h1} className="mt-8 hidden lg:block">
            <ul className="border-t rule">
              {policies.map((p) => (
                <li key={p.id} className="border-b rule">
                  <a href={`#${p.id}`} className="flex min-h-[48px] items-center font-serif text-lg hover:text-gold-ink">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {policies.map((p) => (
            <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className="border-t rule py-10 first:border-t-0 first:pt-0">
              <h2 id={`${p.id}-h`} className="text-h3">
                {p.title}
              </h2>
              <div className="mt-5 space-y-4 text-brown-soft">
                {p.body.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
