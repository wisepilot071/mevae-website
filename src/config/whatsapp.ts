import { brand } from './brand';
import { formatINR } from '@/lib/format';

export interface CorporateEnquiryFields {
  name: string;
  company: string;
  phone: string;
  email: string;
  quantity: number | string;
  budget: string;
  occasion: string;
  preferredHamper?: string;
  message: string;
}

/**
 * One WhatsApp number (from brand.ts) for personal orders, corporate enquiries and general questions.
 * Edit the message wording here. URLs are encoded in lib/whatsapp.ts.
 */
/** True once a real number (digits only) is set in brand.ts. */
export const whatsappConfigured = /^\d{6,15}$/.test(brand.whatsapp.number);

export const whatsappConfig = {
  // Until the number is configured, links open WhatsApp with the message ready so nothing is ever a dead link.
  base: whatsappConfigured
    ? `https://wa.me/${brand.whatsapp.countryCode}${brand.whatsapp.number}`
    : 'https://api.whatsapp.com/send',
  messages: {
    productEnquiry: (p: { name: string; price: number | null }, url: string) =>
      `Hi MEVAÉ, I'd like to know more about ${p.name}${p.price !== null ? ` (${formatINR(p.price)})` : ''}.\n${url}`,
    productOrder: (p: { name: string; price: number }, qty: number, url: string) =>
      `Hi MEVAÉ, I'd like to order:\n\n${p.name} × ${qty} — ${formatINR(p.price * qty)}\n\n${url}\n\nPlease confirm availability and delivery.`,
    cartOrder: (lines: string, subtotal: string, note?: string) =>
      `Hi MEVAÉ, I'd like to place an order:\n\n${lines}\n\nTotal: ${subtotal}${note ? `\n\nNote: ${note}` : ''}\n\nPlease confirm availability and delivery.`,
    corporateEnquiry: (f: CorporateEnquiryFields) =>
      `Hi MEVAÉ, corporate gifting enquiry:\nName: ${f.name}\nCompany: ${f.company}\nEmail: ${f.email}\nPhone: ${f.phone}\nApproximate quantity: ${f.quantity}\nBudget per hamper: ${f.budget}\nOccasion: ${f.occasion}${f.preferredHamper ? `\nPreferred hamper: ${f.preferredHamper}` : ''}\nMessage: ${f.message}`,
    general: `Hi MEVAÉ, I have a question.`,
    corporateIntro: `Hi MEVAÉ, I'd like to talk about corporate gifting.`,
  },
};
