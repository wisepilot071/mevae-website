/**
 * Orders, delivery and policies. Only facts that are true of how this site works today.
 * ⚠️ REPLACE_ME: confirm the returns wording and delivery lead times with the business before launch.
 */
import { brand, emailConfigured } from '@/config/brand';

export const policies = [
  {
    id: 'orders',
    title: 'Orders & delivery',
    body: [
      `Add hampers to your cart and send your order on WhatsApp. We reply to confirm availability, delivery date and address before anything is prepared.`,
      `No payment is taken on this website. Payment is arranged directly with us when your order is confirmed.`,
      `We deliver across ${brand.deliveryArea}. Delivery dates are agreed with you at confirmation, especially around Diwali.`,
    ],
  },
  {
    id: 'returns',
    title: 'Returns & issues',
    body: [
      `If anything arrives damaged or isn’t right, message us on WhatsApp${emailConfigured ? ` or email ${brand.email}` : ''} with a photo of the hamper and we’ll help straight away.`,
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: [
      `This site does not create accounts, take payments or store your details on a server. Your cart is saved only in your own browser.`,
      `When you send an order or enquiry, it goes to us through WhatsApp or email. We use those details only to fulfil your order and reply to you.`,
      `The site uses no advertising or tracking scripts.`,
    ],
  },
  {
    id: 'terms',
    title: 'Terms',
    body: [
      `Prices on this site are in Indian rupees. An order is confirmed only when we confirm it with you on WhatsApp or email.`,
      `Product photographs show how each hamper is presented. If anything in your hamper needs to change, we’ll tell you before confirming your order.`,
    ],
  },
];
