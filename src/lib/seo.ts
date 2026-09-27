import type { Metadata } from 'next';
import { brand } from '@/config/brand';
import { defaultOgImage } from '@/data/seo';
import { absoluteUrl } from './format';
import { assetExists } from './assets';

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

/** Resolve an OG image that actually exists: page image → default OG file → generated fallback. */
export const resolveOgImage = (candidate?: string) => {
  if (candidate && assetExists(candidate)) return absoluteUrl(candidate);
  if (assetExists(defaultOgImage)) return absoluteUrl(defaultOgImage);
  return absoluteUrl('/opengraph-image');
};

/** The one metadata factory. Every page's <title>, description, canonical, OG and Twitter tags come from here. */
export function buildMetadata(input: MetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = resolveOgImage(input.ogImage);
  const ogTitle = input.ogTitle ?? input.title;
  const ogDescription = input.ogDescription ?? input.description;
  return {
    title: { absolute: input.title },
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: input.type ?? 'website',
      url,
      siteName: brand.brandName,
      locale: brand.locale.replace('-', '_'),
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: input.ogImageAlt ?? ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}
