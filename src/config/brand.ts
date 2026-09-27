/**
 * Brand identity & contact details. Every surface of the site reads from here.
 * ⚠️ REPLACE_ME values must be updated before launch (see README → "Launch checklist").
 */
export const brand = {
  brandName: 'MEVAÉ',
  legalName: 'MEVAÉ',
  tagline: 'Gifts Worth Remembering.',
  positioning: 'Thoughtfully curated premium gift hampers, made in India for the moments that matter.',
  logo: '/images/brand/mevae-logo.svg', // Optional: add the official logo file here and use it in Logo.tsx (do not redraw it)
  logoAlt: 'MEVAÉ — premium Indian gift hampers',
  logoWidth: 132,
  logoHeight: 32,
  email: 'mevae03@gmail.com',
  whatsapp: {
    countryCode: '91',
    number: '9368131208', // 10 digits, no spaces or +
    display: '+91 93681 31208',
  },
  instagram: '', // EMPTY → nothing renders. Paste a full URL (https://instagram.com/…) to show the icon automatically.
  location: 'Delhi NCR',
  deliveryArea: 'Delhi NCR',
  currency: 'INR',
  locale: 'en-IN',
  siteUrl: 'https://mevae.vercel.app', // no trailing slash — change when the custom domain goes live
  foundingYear: 2026,
  founder: {
    name: 'Amrit Malik',
    role: 'Founder',
    linkedin: 'https://www.linkedin.com/in/amrit-malik-1b2ba22a0',
  },
} as const;

export type Brand = typeof brand;

/** Email links render only once a real address is configured — no dead REPLACE_ME links in production. */
export const emailConfigured = !brand.email.includes('REPLACE_ME');
