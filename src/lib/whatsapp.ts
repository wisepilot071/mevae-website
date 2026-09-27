import { whatsappConfig, type CorporateEnquiryFields } from '@/config/whatsapp';
import { formatINR } from './format';

/** Build a wa.me deep link with the full message URL-encoded. */
export const whatsappUrl = (message: string = whatsappConfig.messages.general) =>
  `${whatsappConfig.base}?text=${encodeURIComponent(message)}`;

export const productEnquiryUrl = (p: { name: string; price: number | null }, pageUrl: string) =>
  whatsappUrl(whatsappConfig.messages.productEnquiry(p, pageUrl));

export const productOrderUrl = (p: { name: string; price: number }, qty: number, pageUrl: string) =>
  whatsappUrl(whatsappConfig.messages.productOrder(p, qty, pageUrl));

export interface CartLineForMessage {
  name: string;
  qty: number;
  unitPrice: number;
}

export const cartOrderMessage = (lines: CartLineForMessage[], note?: string) => {
  const body = lines
    .map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ${formatINR(l.unitPrice * l.qty)}`)
    .join('\n');
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  return whatsappConfig.messages.cartOrder(body, formatINR(subtotal), note?.trim() || undefined);
};

export const cartOrderUrl = (lines: CartLineForMessage[], note?: string) => whatsappUrl(cartOrderMessage(lines, note));

export const corporateEnquiryUrl = (f: CorporateEnquiryFields) =>
  whatsappUrl(whatsappConfig.messages.corporateEnquiry(f));

/** Every external WhatsApp link uses these attributes. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;
