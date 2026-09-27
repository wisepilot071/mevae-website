import { homepage } from '@/data/homepage';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export function FinalCTA() {
  const { heading, body, primary, secondary } = homepage.finalCta;
  return (
    <section aria-labelledby="final-cta-heading" className="py-section md:py-section-md lg:py-section-lg">
      <Container className="reveal flex flex-col items-center text-center">
        <span aria-hidden="true" className="font-serif text-[1.6rem] tracking-[0.16em] text-gold">
          MEVAÉ
        </span>
        <h2 id="final-cta-heading" className="mt-8 max-w-[14ch] text-h1">
          {heading}
        </h2>
        <p className="mt-6 max-w-[42ch] text-brown-soft">{body}</p>
        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-8">
          <ButtonLink href={primary.href} className="w-full sm:w-auto">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="text">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
