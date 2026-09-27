/** "Made for meaningful moments" — editorial cards on the homepage. */
export interface Moment {
  title: string;
  caption: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
}

export const moments: Moment[] = [
  {
    title: 'Diwali',
    caption: 'Light, sweetness, and something to open.',
    href: '/shop/diwali',
    image: { src: '/images/home/mevae-moment-diwali-laddoo.jpg', alt: 'A blush MEVAÉ box with dry fruits and laddoos among Diwali lamps.', width: 1122, height: 1402 },
  },
  {
    title: 'Celebrations',
    caption: 'For the milestones worth marking.',
    href: '/shop/gift-hampers',
    image: { src: '/images/home/mevae-moment-celebration-ivory-box.jpg', alt: 'An ivory MEVAÉ box with dry fruits, a tumbler and painted diyas.', width: 1254, height: 1254 },
  },
  {
    title: 'Family',
    caption: 'The people who were there first.',
    href: '/shop/festive-gifts',
    image: { src: '/images/home/mevae-moment-family-sweets.jpg', alt: 'A MEVAÉ gift box with dry fruits and sweets, ready to be shared.', width: 1122, height: 1402 },
  },
  {
    title: 'Clients & teams',
    caption: 'A thank-you that lingers.',
    href: '/corporate',
    image: { src: '/images/products/mevae-signature-dry-fruit-gift-hamper/mevae-signature-dry-fruit-gift-hamper-stand.jpg', alt: 'The MEVAÉ Signature case standing open with its jars.', width: 1122, height: 1402 },
  },
];
