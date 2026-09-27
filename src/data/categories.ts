/**
 * CATEGORIES — drive the Shop filters, /shop/<slug> category pages, their SEO and the sitemap.
 * To add a category: add an object here, then add its slug to the `category` array of the products that belong in it.
 */
export interface Category {
  name: string;
  /** Page heading on /shop/<slug>. Defaults to name. */
  h1?: string;
  slug: string;
  description: string;
  /** Optional hero/OG image. Falls back to the first product image in the category. */
  image?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sortOrder: number;
  visible: boolean;
}

export const categories: Category[] = [
  {
    name: 'Diwali',
    h1: 'Diwali Gift Hampers',
    slug: 'diwali',
    description: 'Diwali gift hampers, thoughtfully curated for the festival of lights.',
    seoTitle: 'Diwali Gift Hampers | MEVAÉ',
    seoDescription:
      'Premium Diwali gift hampers from MEVAÉ — dry fruits, candlelight and keepsakes, beautifully presented and delivered across Delhi NCR.',
    keywords: ['Diwali gift hampers', 'Diwali gifts', 'Diwali hamper Delhi NCR'],
    sortOrder: 1,
    visible: true,
  },
  {
    name: 'Gift Hampers',
    slug: 'gift-hampers',
    description: 'Premium gift hampers for celebrations and the people who matter.',
    seoTitle: 'Premium Gift Hampers | MEVAÉ',
    seoDescription:
      'Browse premium gift hampers by MEVAÉ — curated, beautifully presented gifting for celebrations, family, friends and clients.',
    keywords: ['gift hampers', 'premium gift hampers'],
    sortOrder: 2,
    visible: true,
  },
  {
    name: 'Dry Fruit Hampers',
    slug: 'dry-fruit-hampers',
    description: 'Dry fruit hampers and gift boxes, presented with care.',
    seoTitle: 'Dry Fruit Gift Hampers | MEVAÉ',
    seoDescription:
      'Dry fruit gift hampers and wooden dry fruit gift boxes from MEVAÉ, curated for Diwali, celebrations and corporate gifting.',
    keywords: ['dry fruit hampers', 'dry fruit gift box', 'dry fruit gift hamper'],
    sortOrder: 3,
    visible: true,
  },
  {
    name: 'Festive Gifts',
    slug: 'festive-gifts',
    description: 'Festive gifts for every name on your list.',
    seoTitle: 'Festive Gift Hampers | MEVAÉ',
    seoDescription:
      'Festive gift hampers from MEVAÉ — thoughtful, beautifully presented gifts for Diwali and every celebration in between.',
    keywords: ['festive gift hampers', 'festive gifts'],
    sortOrder: 4,
    visible: true,
  },
  {
    name: 'Corporate Gifting',
    h1: 'Hampers for Teams & Clients',
    slug: 'corporate-gifting',
    description: 'Hampers chosen for teams, clients and partners. Enquire for corporate orders.',
    seoTitle: 'Hampers for Teams, Clients & Partners | MEVAÉ',
    seoDescription:
      'Gift hampers from MEVAÉ suited to teams, clients and partners. See the range, then enquire for corporate orders.',
    keywords: ['gift hampers for teams', 'hampers for clients'],
    sortOrder: 5,
    visible: true,
  },
];
