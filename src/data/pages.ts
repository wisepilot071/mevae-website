/** Copy for Shop, Product, About, Contact, Corporate, Policies and the 404 page. */
export const shopPage = {
  eyebrow: 'The MEVAÉ collection',
  h1: 'Premium gift hampers, thoughtfully composed.',
  intro: 'Each hamper is built around a feeling first — then filled, wrapped and finished to be remembered.',
  filterLabel: 'Browse by occasion',
  allLabel: 'All hampers',
  emptyHeading: 'Nothing here just yet.',
  emptyBody: 'We’re still wrapping this one. The full collection is a tap away.',
  resetLabel: 'See all hampers',
  story: {
    eyebrow: 'How a MEVAÉ hamper comes together',
    steps: [
      { title: 'Chosen', body: 'We start with a feeling — gratitude, celebration, welcome — and choose only what earns its place.' },
      { title: 'Composed', body: 'Every jar, diya and keepsake is arranged by hand so the box opens like a small scene.' },
      { title: 'Finished', body: 'Ribbon, tag and card. We confirm every order with you on WhatsApp before it leaves.' },
    ],
  },
  corporate: {
    heading: 'Gifting for a team, clients or an event?',
    body: 'Tell us the occasion and quantity — we’ll suggest hampers and handle the rest.',
    cta: { label: 'Start a corporate order', href: '/corporate' },
  },
};

export const productPage = {
  breadcrumbHome: 'Home',
  breadcrumbShop: 'Shop',
  insideHeading: "What's Inside",
  perfectForHeading: 'Perfect For',
  detailsHeading: 'Product Details',
  relatedHeading: 'You may also like',
  quantity: 'Quantity',
  orderNow: 'Order on WhatsApp',
  enquire: 'Enquire on WhatsApp',
  enquireNote: 'This hamper is prepared on request. Message us for pricing and availability.',
  delivery: {
    heading: 'Delivery & ordering',
    points: [
      'We deliver across Delhi NCR.',
      'Every order is confirmed with you on WhatsApp — no payment is taken on this site.',
      'Add a gift note in the cart and we’ll include it.',
    ],
  },
  details: {
    weight: 'Weight',
    dimensions: 'Dimensions',
    availability: 'Availability',
    delivery: 'Delivery',
  },
  corporateStrip: {
    heading: 'Ordering for a team or clients?',
    copy: 'We handle corporate orders of every size across Delhi NCR.',
    cta: { label: 'Start a corporate order', href: '/corporate' },
  },
  galleryLabel: 'Product photographs',
  galleryPrev: 'Previous photograph',
  galleryNext: 'Next photograph',
  galleryThumb: (i: number, n: number) => `Show photograph ${i} of ${n}`,
};

export const aboutPage = {
  eyebrow: 'About MEVAÉ',
  h1: 'Gifts, thoughtfully curated.',
  intro:
    'MEVAÉ is a contemporary Indian gifting house. We make hampers for the moments that deserve more than an afterthought — and we believe the way a gift arrives matters as much as what’s inside.',
  image: {
    src: '/images/products/mevae-noor-keepsake-gift-hamper/mevae-noor-keepsake-gift-hamper-open.jpg',
    alt: 'The MEVAÉ Noor keepsake case open, with three brass-lidded tins beneath a peacock illustration.',
    width: 1122,
    height: 1402,
  },
  blocks: [
    { title: 'Thoughtful curation', body: 'We choose fewer things, and choose them carefully. Every hamper is built around a feeling first, then filled with what earns its place.' },
    { title: 'Beautiful presentation', body: 'Boxes worth keeping, details worth noticing. The moment of handing it over is part of the gift.' },
    { title: 'Meaningful gifting', body: 'Diwali, a milestone, a thank-you to a client or a team — we design for the relationship, not the occasion alone.' },
    { title: 'Contemporary Indian aesthetics', body: 'Rooted in the rituals of Indian gifting — diyas, dry fruits, the ceremony of a wrapped box — expressed with a quieter, modern hand.' },
  ],
  founder: {
    eyebrow: 'The founder',
    heading: 'Founded by Amrit Malik',
    body: 'MEVAÉ was started by Amrit Malik. For orders, collaborations or corporate gifting, you can reach Amrit directly.',
    linkedinLabel: 'Connect on LinkedIn',
    emailLabel: 'Email Amrit',
  },
  links: {
    shop: { label: 'Shop hampers', href: '/shop' },
    corporate: { label: 'Corporate gifting', href: '/corporate' },
  },
};

export const contactPage = {
  eyebrow: 'Contact',
  h1: 'Let’s make it memorable.',
  intro: 'For orders, questions or a gift you can’t quite decide on — message us and we’ll help you choose.',
  personal: {
    heading: 'Personal gifting',
    body: 'Ordering for family or friends? WhatsApp is the fastest way to reach us.',
    whatsappLabel: 'Message on WhatsApp',
    emailLabel: 'Email us',
  },
  corporate: {
    heading: 'Corporate gifting',
    body: 'Planning gifts for a team, clients or an event? Share the details and we’ll come back with options.',
    cta: { label: 'Start a corporate order', href: '/corporate' },
  },
  directHeading: 'Reach us directly',
  whatsappLabel: 'WhatsApp',
  emailLabel: 'Email',
  founderLabel: 'Founder',
  linkedinLabel: 'LinkedIn',
  locationLabel: 'Based in',
  locationBody: (location: string) => `${location} — delivering across ${location}.`,
};

export const corporatePage = {
  eyebrow: 'Corporate gifting',
  h1: 'Thoughtful gifts for teams, clients and relationships that matter.',
  intro: 'Diwali gifting, client thank-yous, employee milestones and events — we help you choose, then pack and deliver every hamper consistently across Delhi NCR.',
  image: {
    src: '/images/products/mevae-festive-gift-hamper/mevae-festive-gift-hamper-lifestyle.jpg',
    alt: 'The MEVAÉ Festive carry hamper on marble beside a lit diya.',
    width: 1295,
    height: 1215,
  },
  steps: [
    { title: 'Tell us the brief', body: 'Occasion, quantity, budget per hamper and delivery dates.' },
    { title: 'Choose together', body: 'We suggest hampers from the collection that fit your brief.' },
    { title: 'Confirm & deliver', body: 'We confirm everything in writing and deliver across Delhi NCR.' },
  ],
  formHeading: 'Start a corporate order',
  whatsappLabel: 'WhatsApp us',
  stepsLabel: 'How corporate orders work',
  formIntro: 'Share a few details and we’ll reply on WhatsApp or email.',
  hampersHeading: 'Hampers teams often choose',
};

export const policiesPage = {
  eyebrow: 'Help',
  h1: 'Orders, delivery & policies',
  intro: 'How ordering from MEVAÉ works, in plain language.',
};

export const notFoundPage = {
  eyebrow: '404',
  heading: 'This page has moved on. The gifts haven’t.',
  body: 'The link may be old, or the page may never have existed. Either way, there’s a lot worth seeing from here.',
  home: { label: 'Back to home', href: '/' },
  shop: { label: 'Shop hampers', href: '/shop' },
};
