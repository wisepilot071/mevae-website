/** Every string and image on the homepage. Edit copy here — never in components. */
const BLOOM = '/images/products/mevae-bloom-diwali-gift-hamper/mevae-bloom-diwali-gift-hamper';
const SIG = '/images/products/mevae-signature-dry-fruit-gift-hamper/mevae-signature-dry-fruit-gift-hamper';

export const homepage = {
  hero: {
    headline: ['Gifts worth', 'remembering.'],
    subcopy:
      'MEVAÉ composes gift hampers for Diwali, celebrations and the people who matter — dry fruits, candlelight and keepsakes, presented in boxes made to be kept.',
    primaryCta: { label: 'Shop hampers', href: '/shop' },
    secondaryCta: { label: 'Corporate gifting', href: '/corporate' },
    image: {
      src: `${BLOOM}-main.jpg`,
      alt: 'The MEVAÉ Bloom blush gift box, open, with dry fruits, a tumbler and painted diyas.',
      width: 1122,
      height: 1402,
    },
    inset: {
      src: `${SIG}-open.jpg`,
      alt: 'The MEVAÉ Signature wooden case with four jars of dry fruits.',
      width: 1122,
      height: 1402,
    },
    caption: { label: 'Shown', href: '/product/mevae-bloom-diwali-gift-hamper' },
    notes: ['Composed by hand', 'Delivered across Delhi NCR', 'Order on WhatsApp'],
  },
  collection: {
    eyebrow: 'The collection',
    heading: 'Four ways to say it beautifully.',
    intro: 'From a generous Diwali box to a keepsake case — each MEVAÉ hamper is finished to be given, not just delivered.',
    viewAll: { label: 'View the collection', href: '/shop' },
  },
  spotlight: {
    eyebrow: 'The Signature',
    heading: 'A case you keep long after the jars are empty.',
    body: 'Four jars of dry fruits on satin, in a walnut-finish case with brass detailing and rope handles. Our most considered gift — for the people you most want to thank.',
    cta: { label: 'Discover Signature', href: '/product/mevae-signature-dry-fruit-gift-hamper' },
    image: {
      src: '/images/home/mevae-signature-wooden-case-editorial.jpg',
      alt: 'The MEVAÉ Signature case closed, on a marble ledge in soft morning light.',
      width: 1672,
      height: 941,
    },
  },
  panda: {
    line: 'Some gifts say it better.',
    srDescription:
      'An illustration: one panda lifts a MEVAÉ hamper, walks over and hands it to a second panda, who tilts its head and blushes, quietly delighted.',
    label: 'A small story about giving',
  },
  moments: {
    eyebrow: 'For every occasion',
    heading: 'Made for meaningful moments.',
  },
  why: {
    eyebrow: 'The MEVAÉ way',
    heading: 'The gift, before the gift.',
    image: {
      src: `${BLOOM}-closed.jpg`,
      alt: 'A closed MEVAÉ blush box tied with a satin ribbon, beside a card reading “Small gifts, big moments.”',
      width: 1254,
      height: 1254,
    },
  },
  corporate: {
    eyebrow: 'For businesses',
    heading: 'Corporate gifting, handled with care.',
    copy: 'Thoughtful hampers for teams, clients and partners — chosen with you, packed consistently, delivered across Delhi NCR.',
    cta: { label: 'Start a corporate order', href: '/corporate' },
    aboutLink: { label: 'About MEVAÉ', href: '/about' },
    image: {
      src: `${SIG}-front.jpg`,
      alt: 'The MEVAÉ Signature case open with four jars, ready for a client.',
      width: 1122,
      height: 1402,
    },
  },
  finalCta: {
    heading: 'Gifts worth remembering.',
    body: 'Choose a hamper, add a note, and we’ll confirm the details with you on WhatsApp.',
    primary: { label: 'Shop hampers', href: '/shop' },
    secondary: { label: 'Corporate gifting', href: '/corporate' },
  },
};
