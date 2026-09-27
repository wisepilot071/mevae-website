import { brand } from '@/config/brand';
import type { Product } from '@/data/products';
import { absoluteUrl, effectivePrice } from './format';
import { assetExists } from './assets';

/** JSON-LD builders. Never add ratings, reviews, awards or invented claims. */
const availabilityMap: Record<Product['availability'], string> = {
  available: 'https://schema.org/InStock',
  outOfStock: 'https://schema.org/OutOfStock',
  comingSoon: 'https://schema.org/PreOrder',
  enquire: 'https://schema.org/InStock',
  hidden: 'https://schema.org/Discontinued',
};

export const organizationSchema = () => {
  const sameAs = [brand.instagram].filter(Boolean);
  const phone = /^\d+$/.test(brand.whatsapp.number) ? `+${brand.whatsapp.countryCode}${brand.whatsapp.number}` : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${brand.siteUrl}/#organization`,
    name: brand.brandName,
    url: brand.siteUrl,
    ...(assetExists(brand.logo) ? { logo: absoluteUrl(brand.logo) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: brand.deliveryArea,
      availableLanguage: ['English', 'Hindi'],
      ...(brand.email.includes('REPLACE_ME') ? {} : { email: brand.email }),
      ...(phone ? { telephone: phone } : {}),
    },
    areaServed: { '@type': 'Place', name: brand.deliveryArea },
  };
};

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${brand.siteUrl}/#website`,
  name: brand.brandName,
  url: brand.siteUrl,
  inLanguage: brand.locale,
  publisher: { '@id': `${brand.siteUrl}/#organization` },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const productSchema = (p: Product) => {
  const images = p.images.filter((i) => assetExists(i.src)).map((i) => absoluteUrl(i.src));
  const price = effectivePrice(p);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${p.seo.canonicalUrl}#product`,
    name: p.name,
    description: p.shortDescription,
    sku: p.id,
    url: p.seo.canonicalUrl,
    ...(images.length ? { image: images } : {}),
    brand: { '@type': 'Brand', name: brand.brandName },
    category: 'Gift Hampers',
    ...(price !== null
      ? {
          offers: {
            '@type': 'Offer',
            url: p.seo.canonicalUrl,
            price: price.toFixed(2),
            priceCurrency: p.currency,
            availability: availabilityMap[p.availability],
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': `${brand.siteUrl}/#organization` },
            areaServed: brand.deliveryArea,
          },
        }
      : {}),
  };
};

export const itemListSchema = (items: Product[], path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  url: absoluteUrl(path),
  itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: p.seo.canonicalUrl, name: p.name })),
});
