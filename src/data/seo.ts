/** Page-level SEO for the static pages. Product and category SEO live with their data. */
import { brand } from '@/config/brand';

export interface PageSEO {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const defaultOgImage = '/images/og/mevae-og-default.jpg';

export const pageSeo: Record<'home' | 'shop' | 'about' | 'contact' | 'corporate' | 'policies', PageSEO> = {
  home: {
    seoTitle: 'Premium Gift Hampers & Diwali Gifts in Delhi NCR | MEVAÉ',
    metaDescription:
      'Discover premium gift hampers, Diwali gifts and curated dry fruit hampers by MEVAÉ. Thoughtfully designed gifting for celebrations, clients, teams and loved ones across Delhi NCR.',
    keywords: ['premium gift hampers', 'Diwali gifts', 'premium gifting', 'Delhi NCR gifting'],
    path: '/',
    ogTitle: `${brand.brandName} — ${brand.tagline}`,
  },
  shop: {
    seoTitle: 'Premium Gift Hampers & Diwali Hampers | MEVAÉ',
    metaDescription:
      'Shop premium gift hampers, dry fruit hampers and festive Diwali gifts from MEVAÉ. Beautifully curated gifting for celebrations and meaningful moments.',
    keywords: ['gift hampers', 'Diwali gift hampers', 'dry fruit hampers', 'festive gift hampers'],
    path: '/shop',
  },
  about: {
    seoTitle: 'About MEVAÉ | Premium Indian Gift Hampers',
    metaDescription:
      'Discover MEVAÉ, a contemporary Indian gifting brand creating thoughtfully curated premium gift hampers, festive gifts and dry fruit hampers.',
    keywords: ['MEVAÉ', 'Indian gifting brand', 'premium gift hampers'],
    path: '/about',
  },
  contact: {
    seoTitle: 'Contact MEVAÉ | Order Gift Hampers in Delhi NCR',
    metaDescription:
      'Contact MEVAÉ to order premium gift hampers and Diwali gifts across Delhi NCR. Message us on WhatsApp or email and we’ll help you choose.',
    keywords: ['order gift hampers Delhi NCR', 'MEVAÉ contact'],
    path: '/contact',
  },
  corporate: {
    seoTitle: 'Corporate Gift Hampers & Diwali Corporate Gifts | MEVAÉ',
    metaDescription:
      'Explore premium corporate gift hampers and Diwali corporate gifts from MEVAÉ for clients, teams, employees and business partners across Delhi NCR.',
    keywords: [
      'corporate gift hampers',
      'corporate Diwali gifts',
      'corporate gifting',
      'employee Diwali gifts',
      'client gifts',
      'Delhi NCR corporate gifting',
    ],
    path: '/corporate',
  },
  policies: {
    seoTitle: 'Orders, Delivery & Policies | MEVAÉ',
    metaDescription: 'How ordering from MEVAÉ works: WhatsApp order confirmation, delivery across Delhi NCR, returns, privacy and terms.',
    keywords: ['MEVAÉ delivery', 'MEVAÉ policies'],
    path: '/policies',
  },
};
