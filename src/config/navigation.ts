/**
 * Navigation. Rename, hide, reorder or add items here — the header, mobile menu and footer all map over these lists.
 * The logo always links home, so "Home" is not a menu item.
 */
export interface NavItem {
  label: string;
  href: string;
  visible: boolean;
  order: number;
}

export const navigation: NavItem[] = [
  { label: 'Shop', href: '/shop', visible: true, order: 1 },
  { label: 'Corporate', href: '/corporate', visible: true, order: 2 },
  { label: 'About', href: '/about', visible: true, order: 3 },
  { label: 'Contact', href: '/contact', visible: true, order: 4 },
  // Reserved for later — set visible: true once /journal exists.
  { label: 'Journal', href: '/journal', visible: false, order: 5 },
];

/** Legal / help links shown in the footer. */
export const legalNavigation: NavItem[] = [
  { label: 'Orders & Delivery', href: '/policies#orders', visible: true, order: 1 },
  { label: 'Returns', href: '/policies#returns', visible: true, order: 2 },
  { label: 'Privacy', href: '/policies#privacy', visible: true, order: 3 },
  { label: 'Terms', href: '/policies#terms', visible: true, order: 4 },
];

export const navLabels = {
  whatsapp: 'WhatsApp',
  whatsappAria: 'Message MEVAÉ on WhatsApp (opens in a new tab)',
  cart: 'Cart',
  menu: 'Menu',
  close: 'Close',
  skipToContent: 'Skip to content',
  primaryNavLabel: 'Primary',
  mobileNavLabel: 'Menu',
  footerNavLabel: 'Footer',
  home: 'MEVAÉ home',
};

export const visibleNav = (items: NavItem[] = navigation) =>
  items.filter((i) => i.visible).sort((a, b) => a.order - b.order);
