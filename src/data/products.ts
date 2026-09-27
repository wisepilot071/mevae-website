/**
 * PRODUCT CATALOGUE — the single source of truth for every product, price and product image.
 *
 * To add a product: copy one object below, give it a new id/slug, and put its photos in
 * /public/images/products/<slug>/ using the filenames listed in `images`. That's it.
 *
 * Prices are whole rupees. Change `price` here and Home, Shop, product pages, the cart,
 * WhatsApp messages and structured data all update. Use `price: null` with
 * `availability: 'enquire'` for a hamper sold on request (no public price, no cart).
 *
 * `contents` describe what is visible in the supplied product photographs.
 * ⚠️ REPLACE_ME: confirm dry-fruit varieties, weights and dimensions before launch.
 */
import { brand } from '@/config/brand';

export type Availability = 'available' | 'outOfStock' | 'comingSoon' | 'enquire' | 'hidden';

export interface ProductImage {
  src: string;
  alt: string;
  role: 'thumbnail' | 'main' | 'closed' | 'contents' | 'detail' | 'lifestyle' | 'additional';
  width: number;
  height: number;
  caption?: string;
}

export interface ProductSEO {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  h1: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string[];
  price: number | null;
  salePrice?: number | null;
  currency: 'INR';
  /** One-line descriptor shown on product cards. */
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  /** Supporting headings for the product page — keep natural, never forced. */
  headings?: { inside?: string; story?: string; perfectFor?: string };
  contents: string[];
  perfectFor: string[];
  weight?: string;
  dimensions?: string;
  images: ProductImage[];
  availability: Availability;
  featured: boolean;
  sortOrder: number;
  seo: ProductSEO;
}

const img = (slug: string, file: string, alt: string, role: ProductImage['role'], width = 1122, height = 1402): ProductImage => ({
  src: `/images/products/${slug}/${slug}-${file}.jpg`,
  alt,
  role,
  width,
  height,
});
const canonical = (slug: string) => `${brand.siteUrl}/product/${slug}`;

const BLOOM = 'mevae-bloom-diwali-gift-hamper';
const SIGNATURE = 'mevae-signature-dry-fruit-gift-hamper';
const FESTIVE = 'mevae-festive-gift-hamper';
const NOOR = 'mevae-noor-keepsake-gift-hamper';

export const products: Product[] = [
  {
    id: 'mevae-bloom',
    name: 'MEVAÉ Bloom',
    slug: BLOOM,
    category: ['diwali', 'gift-hampers', 'dry-fruit-hampers', 'festive-gifts', 'corporate-gifting'],
    price: 1319,
    salePrice: null,
    currency: 'INR',
    tagline: 'Dry fruits, diya candles and a keepsake tumbler, in the MEVAÉ blush box.',
    shortDescription:
      'A warm, generous Diwali hamper — dry fruits, candlelight and a keepsake tumbler, presented to be opened slowly.',
    fullDescription: [
      'Bloom is our answer to the question every Diwali brings: what do you give someone you care about? A gift that feels considered from the moment it is handed over, and useful long after the festival lights come down.',
      'Two jars of dry fruits sit beside a pair of painted diyas and a tumbler worth keeping, nestled in the blush MEVAÉ box with a greeting card for your message.',
    ],
    headings: {
      inside: "What's Inside This Diwali Gift Hamper",
      story: 'A Thoughtfully Curated Festive Gift',
      perfectFor: 'Perfect for Diwali Gifting',
    },
    // As pictured. REPLACE_ME: confirm dry-fruit varieties and weights.
    contents: ['Two glass jars of dry fruits', 'Two decorative diya candles', 'Glass tumbler with sleeve and straw', 'Greeting card', 'Blush MEVAÉ gift box'],
    perfectFor: ['Diwali visits', 'Family and close friends', 'Thank-you gifts', 'Clients and colleagues'],
    weight: undefined, // REPLACE_ME e.g. '1.2 kg'
    dimensions: undefined, // REPLACE_ME e.g. '30 × 22 × 10 cm'
    images: [
      img(BLOOM, 'main', 'MEVAÉ Bloom open blush gift box with two jars of dry fruits, a greeting card, a glass tumbler and two diya candles.', 'main'),
      img(BLOOM, 'open', 'MEVAÉ Bloom hamper seen from the front, with cashews, almonds, a tumbler and painted diyas.', 'contents'),
      img(BLOOM, 'top', 'Overhead view of the MEVAÉ Bloom hamper and its Happy Diwali card.', 'detail', 1254, 1254),
      img(BLOOM, 'angle', 'MEVAÉ Bloom hamper on a festive table with marigolds and lamps.', 'lifestyle', 1312, 1199),
      img(BLOOM, 'detail', 'MEVAÉ Bloom hamper with its diya candles and gift tag.', 'additional', 1312, 1199),
      img(BLOOM, 'closed', 'The MEVAÉ Bloom blush box closed with a satin ribbon and flower.', 'closed', 1254, 1254),
    ],
    availability: 'available',
    featured: true,
    sortOrder: 1,
    seo: {
      seoTitle: 'MEVAÉ Bloom — Premium Diwali Gift Hamper with Dry Fruits | MEVAÉ',
      metaDescription:
        'MEVAÉ Bloom is a premium Diwali gift hamper with dry fruits, diya candles and a keepsake tumbler in the blush MEVAÉ box. Delivered across Delhi NCR.',
      slug: BLOOM,
      canonicalUrl: canonical(BLOOM),
      keywords: ['Diwali gift hamper', 'premium Diwali gift', 'dry fruit gift hamper'],
      ogTitle: 'MEVAÉ Bloom — Premium Diwali Gift Hamper',
      ogDescription: 'Dry fruits, candlelight and a keepsake tumbler, presented to be remembered.',
      ogImage: `/images/products/${BLOOM}/${BLOOM}-main.jpg`,
      h1: 'MEVAÉ Bloom',
    },
  },
  {
    id: 'mevae-signature',
    name: 'MEVAÉ Signature',
    slug: SIGNATURE,
    category: ['diwali', 'gift-hampers', 'dry-fruit-hampers', 'corporate-gifting'],
    price: 1899,
    salePrice: null,
    currency: 'INR',
    tagline: 'Four jars of dry fruits in a walnut-finish case with brass detailing.',
    shortDescription:
      'Our signature wooden hamper: four glass jars of dry fruits, set in a handsome carry case made to be kept.',
    fullDescription: [
      'Signature is MEVAÉ at its most composed. Four jars sit side by side on satin, each wrapped in a wood-grain sleeve — a gift that looks as considered on a sideboard as it does in someone’s hands.',
      'When the jars are empty, the case stays. That is the point: a present that keeps being part of the home.',
    ],
    headings: {
      inside: "What's Inside",
      story: 'A Wooden Dry Fruit Gift Box, Made to Be Kept',
      perfectFor: 'Perfect For',
    },
    // As pictured. REPLACE_ME: confirm the four dry-fruit varieties and weights.
    contents: ['Four glass jars of dry fruits', 'Wood-finish carry case with brass detailing and rope handles', 'Satin-lined interior'],
    perfectFor: ['Diwali and festive gifting', 'Senior clients and partners', 'Housewarmings', 'Milestone celebrations'],
    weight: undefined, // REPLACE_ME
    dimensions: undefined, // REPLACE_ME
    images: [
      img(SIGNATURE, 'main', 'MEVAÉ Signature wooden case with four jars of dry fruits resting on satin.', 'main'),
      img(SIGNATURE, 'open', 'MEVAÉ Signature case open, showing four jars and the brass MEVAÉ medallion.', 'contents'),
      img(SIGNATURE, 'stand', 'The MEVAÉ Signature case standing with its lid and rope handles.', 'detail'),
      img(SIGNATURE, 'front', 'Front view of the MEVAÉ Signature case with four jars of dry fruits.', 'additional'),
      img(SIGNATURE, 'detail', 'Close view of the MEVAÉ Signature jars and brass lattice detail.', 'lifestyle'),
    ],
    availability: 'available',
    featured: true,
    sortOrder: 2,
    seo: {
      seoTitle: 'MEVAÉ Signature — Premium Wooden Dry Fruit Gift Hamper | MEVAÉ',
      metaDescription:
        'MEVAÉ Signature is a premium dry fruit gift hamper: four jars in a wooden carry case made to be kept. Luxury festive and corporate gifting across Delhi NCR.',
      slug: SIGNATURE,
      canonicalUrl: canonical(SIGNATURE),
      keywords: ['premium dry fruit gift hamper', 'wooden dry fruit gift box', 'luxury dry fruit hamper'],
      ogTitle: 'MEVAÉ Signature — Wooden Dry Fruit Gift Box',
      ogDescription: 'Four jars of dry fruits in a wooden case made to be kept.',
      ogImage: `/images/products/${SIGNATURE}/${SIGNATURE}-main.jpg`,
      h1: 'MEVAÉ Signature',
    },
  },
  {
    id: 'mevae-festive',
    name: 'MEVAÉ Festive',
    slug: FESTIVE,
    category: ['diwali', 'gift-hampers', 'dry-fruit-hampers', 'festive-gifts'],
    price: 699,
    salePrice: null,
    currency: 'INR',
    tagline: 'A clear, gold-edged carry hamper of dry fruits, makhana and a diya.',
    shortDescription:
      'A light, lovely festive hamper — the easy yes for every name on your Diwali list.',
    fullDescription: [
      'Festive is the gift you can give generously. Neighbours, colleagues, the friend who always remembers — everyone deserves something beautiful at Diwali.',
      'A jar of mixed dry fruits, a pack of makhana and a painted diya, arranged in a clear gold-edged carry case and tied with a MEVAÉ ribbon.',
    ],
    headings: {
      inside: "What's Inside",
      story: 'A Festive Gift Hamper, Simply Done Well',
      perfectFor: 'Perfect For',
    },
    // As pictured. REPLACE_ME: confirm exact items and weights.
    contents: ['Jar of mixed dry fruits', 'Pack of makhana', 'Decorative diya candle', 'Greeting card', 'Clear gold-edged carry case with ribbon'],
    perfectFor: ['Diwali gifting in numbers', 'Neighbours and friends', 'Team gifts', 'Small thank-yous'],
    weight: undefined, // REPLACE_ME
    dimensions: undefined, // REPLACE_ME
    images: [
      img(FESTIVE, 'main', 'MEVAÉ Festive clear carry hamper tied with a MEVAÉ ribbon, holding dry fruits, makhana and a diya.', 'main'),
      img(FESTIVE, 'lifestyle', 'MEVAÉ Festive carry hamper on a marble table with a lit diya.', 'lifestyle', 1295, 1215),
      img(FESTIVE, 'open', 'Inside the MEVAÉ Festive hamper: a jar of mixed dry fruits, makhana and a greeting card.', 'contents'),
      img(FESTIVE, 'candlelight', 'MEVAÉ Festive hamper glowing among Diwali lamps.', 'additional'),
    ],
    availability: 'available',
    featured: true,
    sortOrder: 3,
    seo: {
      seoTitle: 'MEVAÉ Festive — Festive Dry Fruit Gift Hamper for Diwali | MEVAÉ',
      metaDescription:
        'MEVAÉ Festive is a festive gift hamper of dry fruits and makhana in a clear gold-edged carry case. A thoughtful Diwali hamper for friends and teams across Delhi NCR.',
      slug: FESTIVE,
      canonicalUrl: canonical(FESTIVE),
      keywords: ['festive gift hamper', 'Diwali hamper', 'dry fruit gift'],
      ogTitle: 'MEVAÉ Festive — Festive Gift Hamper',
      ogDescription: 'Dry fruits, makhana and a diya in a clear carry case. The easy yes for every name on your list.',
      ogImage: `/images/products/${FESTIVE}/${FESTIVE}-main.jpg`,
      h1: 'MEVAÉ Festive',
    },
  },
  {
    id: 'mevae-noor',
    name: 'MEVAÉ Noor',
    slug: NOOR,
    category: ['diwali', 'gift-hampers', 'corporate-gifting'],
    price: null, // REPLACE_ME: add the retail price and change availability to 'available' to enable the cart.
    salePrice: null,
    currency: 'INR',
    tagline: 'Three brass-lidded tins in a peacock-print keepsake case.',
    shortDescription:
      'A keepsake case printed with peacocks and blossoms, holding three brass-lidded tins. Available on request.',
    fullDescription: [
      'Noor borrows its colours from the palace garden — peacocks, blossoms and arches printed across a case you will want to keep long after the festival.',
      'Inside, three brass-lidded tins sit on satin. Message us to hear what goes into this season’s Noor and to reserve yours.',
    ],
    headings: {
      inside: "What's Inside",
      story: 'A Keepsake Case, Inspired by the Palace Garden',
      perfectFor: 'Perfect For',
    },
    // As pictured. REPLACE_ME: confirm what the tins contain.
    contents: ['Three brass-lidded decorative tins', 'Peacock-print keepsake case with brass clasp and handle', 'Satin-lined interior'],
    perfectFor: ['Special Diwali gifting', 'Weddings and family occasions', 'Senior clients', 'Keepsake gifts'],
    images: [
      img(NOOR, 'main', 'MEVAÉ Noor peacock-print keepsake case with a brass handle, closed.', 'main', 1254, 1254),
      img(NOOR, 'open', 'MEVAÉ Noor case open, showing three brass-lidded tins on satin beneath a peacock illustration.', 'contents'),
      img(NOOR, 'detail', 'Close view of the MEVAÉ Noor tins and printed lid.', 'detail'),
    ],
    availability: 'enquire',
    featured: true,
    sortOrder: 4,
    seo: {
      seoTitle: 'MEVAÉ Noor — Peacock Keepsake Gift Hamper | MEVAÉ',
      metaDescription:
        'MEVAÉ Noor is a keepsake gift hamper: three brass-lidded tins in a peacock-print case. Available on request across Delhi NCR.',
      slug: NOOR,
      canonicalUrl: canonical(NOOR),
      keywords: ['keepsake gift hamper', 'luxury Diwali gift box', 'peacock gift box'],
      ogTitle: 'MEVAÉ Noor — Keepsake Gift Hamper',
      ogDescription: 'Three brass-lidded tins in a peacock-print keepsake case.',
      ogImage: `/images/products/${NOOR}/${NOOR}-main.jpg`,
      h1: 'MEVAÉ Noor',
    },
  },
];
