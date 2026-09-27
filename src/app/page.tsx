import { Hero } from '@/components/home/Hero';
import { CollectionShowcase } from '@/components/home/CollectionShowcase';
import { SignatureSpotlight } from '@/components/home/SignatureSpotlight';
import { PandaStory } from '@/components/home/PandaStory';
import { MeaningfulMoments } from '@/components/home/MeaningfulMoments';
import { WhyMevae } from '@/components/home/WhyMevae';
import { CorporateBlock } from '@/components/home/CorporateBlock';
import { FinalCTA } from '@/components/home/FinalCTA';
import { JsonLd } from '@/components/ui/SEOHead';
import { itemListSchema } from '@/lib/schema';
import { featuredProducts } from '@/lib/products';

// Home metadata is the root layout default (pageSeo.home).
export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionShowcase />
      <SignatureSpotlight />
      <PandaStory />
      <MeaningfulMoments />
      <WhyMevae />
      <CorporateBlock />
      <FinalCTA />
      <JsonLd data={itemListSchema(featuredProducts(), '/')} />
    </>
  );
}
