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
  email: 'REPLACE_ME@mevae.com', // REPLACE_ME
  whatsapp: {
    countryCode: '91',
    number: 'REPLACE_ME', // REPLACE_ME: 10-digit number, digits only, e.g. '9876543210'
    display: '+91 REPLACE_ME', // REPLACE_ME: how the number is printed on the site
  },
  instagram: '', // EMPTY → nothing renders. Paste a full URL (https://instagram.com/…) to show the icon automatically.
  location: 'Delhi NCR',
  deliveryArea: 'Delhi NCR',
  currency: 'INR',
  locale: 'en-IN',
  siteUrl: 'https://mevae.com', // no trailing slash
  foundingYear: 2026,
} as const;

export type Brand = typeof brand;

/** Email links render only once a real address is configured — no dead REPLACE_ME links in production. */
export const emailConfigured = !brand.email.includes('REPLACE_ME');
