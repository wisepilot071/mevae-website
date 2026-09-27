# MEVAÉ — Gifts Worth Remembering.

Production website for MEVAÉ premium gift hampers. Built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is generated statically, the cart runs in the browser, and orders and enquiries go through WhatsApp. There's no payment gateway.

**Every word, price, image path, phone number and link lives in `src/data/` or `src/config/`.** You never have to open a component to change content.

---

## Launch checklist (do these before going live)

Run `npm run check:placeholders` to list everything still marked `REPLACE_ME`.

| What | Where |
|---|---|
| WhatsApp number (digits only) + how it's displayed | `src/config/brand.ts` → `whatsapp`. Until it's set, WhatsApp buttons open WhatsApp's generic share screen with the message pre-filled (so nothing is a dead link), but orders won't reach you. |
| Email address | `src/config/brand.ts` → `email`. Email links stay hidden until a real address is set. |
| MEVAÉ Noor retail price | `src/data/products.ts` → Noor `price`, then set `availability: 'available'` to enable the cart. Until then it shows "Price on request" with a WhatsApp enquiry. |
| **Real hamper contents, weights and dimensions** | `src/data/products.ts`. Current lists describe only what is visible in the photographs. Never list items that aren't in the box. |
| Returns / delivery policy wording | `src/data/policies.ts` (neutral wording for now) |
| Official logo file (optional) | The header uses a typeset wordmark. To use the supplied logo instead, add `public/images/brand/mevae-logo.svg` and swap it into `src/components/ui/Logo.tsx`. |
| Favicon | `src/app/icon.svg` |
| Live domain | `src/config/brand.ts` → `siteUrl` (used in canonical URLs, sitemap, structured data and the product links inside WhatsApp messages) |

### Photographs in use

| Product | Folder | What the photos show |
|---|---|---|
| MEVAÉ Bloom (₹1,319) | `public/images/products/mevae-bloom-diwali-gift-hamper/` | Blush pink box: jars, diyas, tumbler, card |
| MEVAÉ Signature (₹1,899) | `public/images/products/mevae-signature-dry-fruit-gift-hamper/` | Wood-finish case with four jars |
| MEVAÉ Festive (₹699) | `public/images/products/mevae-festive-gift-hamper/` | Clear gold-edged carry hamper (assumed to be Festive; confirm) |
| MEVAÉ Noor (price on request) | `public/images/products/mevae-noor-keepsake-gift-hamper/` | Peacock-print keepsake case with three tins |

Editorial images (hero, spotlight, "moments") are in `public/images/home/`, and the social-share image is `public/images/og/mevae-og-default.jpg`. If an image file is ever missing, the site shows a neutral sand panel at the right size instead of a broken image.

---

## Run it locally

Requires Node 20.9+ (Node 22 recommended — see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000
```

Useful scripts:

```bash
npm run build              # production build (all pages static)
npm start                  # serve the production build
npm run check              # typecheck + lint + price guard
npm run check:prices       # fails if a price is hard-coded anywhere outside products.ts
npm run check:placeholders # lists REPLACE_ME markers and missing image files
```

## Deploy to Vercel

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init && git add -A && git commit -m "MEVAÉ website"
   git branch -M main
   git remote add origin https://github.com/<you>/mevae.git
   git push -u origin main
   ```
2. At vercel.com choose **Add New → Project**, import the repository, and click **Deploy**. Vercel detects Next.js on its own, so you don't need to change any settings or add environment variables.
3. Under **Settings → Domains**, add `mevae.com`. Make sure `siteUrl` in `src/config/brand.ts` matches, because canonical URLs, the sitemap and structured data are built from it.

Every push to `main` redeploys automatically.

---

## How to change prices

Open `src/data/products.ts` and change `price` (whole rupees) on the product. That one number feeds the Home and Shop cards, the product page, cart line items and subtotal, the WhatsApp order message, and the `Product`/`Offer` structured data.

To run a sale, set `salePrice` (lower than `price`). The site then shows the sale price with the original struck through, and the cart and WhatsApp use the sale price. Set it back to `null` to end the sale.

`npm run check:prices` fails the check if a price ever gets typed anywhere else.

## How to add a product

1. In `src/data/products.ts`, copy an existing product object and paste it at the end of the `products` list.
2. Give it a new `id`, `name`, `slug` (lowercase-with-hyphens; this becomes `/product/<slug>`), `price`, descriptions, `contents`, `perfectFor`, `category` slugs and `seo` block.
3. Create the folder `public/images/products/<slug>/` and add the photos with the filenames you listed in `images`. For example:
   - `<slug>-main.jpg` · `<slug>-closed.jpg` · `<slug>-contents.jpg` · `<slug>-detail.jpg` · `<slug>-lifestyle.jpg`
   - Roles are only ordering hints. One image is enough, and the gallery adapts to however many you give it. Use a 4:5 portrait crop (e.g. 1600×2000).
4. Set `featured: true` to show it on the homepage. `sortOrder` controls where it appears.

The new product then automatically appears in Shop and its categories, gets its own static page, and becomes available in the cart, the WhatsApp messages, the corporate form's hamper list, the sitemap and structured data.

**Availability** (`availability`):
- `available`: normal
- `outOfStock`: greyed image, "Out of stock" badge, Add to Cart disabled (WhatsApp enquiry still works)
- `comingSoon`: badge and no cart button. The page exists but is `noindex` and kept out of the sitemap.
- `enquire`: shows "Price on request" and a WhatsApp enquiry button instead of the cart (use with `price: null`)
- `hidden`: removed everywhere (grid, homepage, related, sitemap, schema, cart); its URL returns 404

## How to add a category

1. Add an entry to `src/data/categories.ts` (`name`, `slug`, `description`, SEO fields, `sortOrder`, `visible: true`; `h1` is optional).
2. Add that slug to the `category` array of the products that belong in it.

The category then gets a filter on the Shop page, its own crawlable page at `/shop/<slug>` with its own title and description, and a sitemap entry. Categories with no visible products stay out of the filter bar and the sitemap.

## How to change copy

| Copy | File |
|---|---|
| Homepage (hero, panda line, sections, CTAs) | `src/data/homepage.ts` |
| "Meaningful moments" cards | `src/data/moments.ts` |
| Why MEVAÉ | `src/data/whyMevae.ts` |
| Shop, product page labels, Corporate, About, Contact, 404 | `src/data/pages.ts` |
| Orders, returns, privacy, terms | `src/data/policies.ts` |
| Buttons, cart, badges, footer micro-copy | `src/data/ui.ts` |
| Corporate form labels, hints, errors, success message | `src/config/forms.ts` |
| Page titles & meta descriptions (static pages) | `src/data/seo.ts` |
| Product SEO (title, description, OG, H1) | the `seo` block of each product in `src/data/products.ts` |
| Navigation labels, order, visibility | `src/config/navigation.ts` |
| Optional announcement bar | `src/data/announcement.ts` (leave `text` empty to hide it) |

## How to change the WhatsApp number

Edit `whatsapp.number` (digits only, no spaces or `+`) and `whatsapp.display` in `src/config/brand.ts`. The same number handles personal orders (cart checkout), product enquiries, corporate enquiries and general questions. The wording of every pre-filled message is in `src/config/whatsapp.ts`.

## How to add Instagram

Paste the full profile URL into `instagram` in `src/config/brand.ts`, e.g. `'https://instagram.com/mevae'`. The link then appears in the footer and on the Contact page, and is added to the Organization structured data as `sameAs`. Leave it as `''` to hide it everywhere.

---

## What's where

```
src/
  app/            routes: /, /shop, /shop/[category], /product/[slug], /corporate, /about, /contact, /policies, 404, sitemap, robots, OG fallback
  components/     layout (nav, mobile menu, cart drawer, footer) · home · product · shop · forms · ui
  config/         brand, navigation, whatsapp, forms, design-tokens
  data/           products, categories, homepage, moments, whyMevae, pages, policies, ui, seo, announcement
  lib/            cart (context + reducer + localStorage), whatsapp link builders, seo factory, JSON-LD, formatting
  hooks/          dialog (focus trap / ESC / scroll lock), reduced motion
  fonts/          self-hosted Cormorant Garamond + Manrope (Latin subset)
public/images/    brand · home · products/<slug> · og
```

**Design tokens.** Colours, type scale, spacing and motion are defined once in `src/config/design-tokens.ts`. Tailwind reads them from there, so there are no loose hex codes in components.

**Cart.** It's saved in the browser under `mevae.cart.v1`, syncs across tabs, and drops items that become hidden or unavailable. Checkout opens WhatsApp with an itemised order, the total and an optional gift note.

**The panda moment.** `src/components/home/PandaStory.tsx` draws two original SVG pandas and the hamper, and `pandaTimeline.ts` holds the Web Animations keyframes (only transforms and opacity are animated, runtime about 5.6s, plays once). The animation code loads only when the section is close to the viewport. Visitors with reduced motion turned on, or without JavaScript, see a single still frame of the handoff.

**SEO.** `src/lib/seo.ts` builds each page's title, description, canonical, Open Graph and Twitter tags from the data files. `src/lib/schema.ts` builds the Organization, WebSite, BreadcrumbList, Product/Offer and ItemList structured data. It never adds ratings, reviews or awards.

**Corporate enquiries.** `/corporate` has the enquiry form. On submit it validates the fields and prepares the enquiry, and the visitor then sends it on WhatsApp (or by email, once an email is configured). Nothing is stored on a server. Corporate pricing, bulk pricing and minimum order quantities are never displayed.

**Adding a blog later.** A `/journal` item is already in `navigation.ts` with `visible: false`. Build the route, then set it to `true`.
