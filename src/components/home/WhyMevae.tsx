import { homepage } from '@/data/homepage';
import { whyMevae } from '@/data/whyMevae';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';

export function WhyMevae() {
  const { eyebrow, heading, image } = homepage.why;
  return (
    <section aria-labelledby="why-heading" className="py-section md:py-section-md lg:py-section-lg">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="reveal lg:col-span-5">
          <SmartImage src={image.src} alt={image.alt} ratio="4 / 5" sizes="(min-width: 1024px) 38vw, 92vw" objectPosition="45% 50%" wrapperClassName="arch" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="micro-label text-gold-ink">{eyebrow}</p>
          <h2 id="why-heading" className="reveal mt-5 text-h2">
            {heading}
          </h2>
          <ol className="mt-10 border-t rule">
            {whyMevae.map((item, i) => (
              <li key={item.title} className="reveal grid grid-cols-[3rem_1fr] gap-x-4 border-b rule py-7">
                <span aria-hidden="true" className="font-serif text-[2rem] italic leading-none text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-brown-soft">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
