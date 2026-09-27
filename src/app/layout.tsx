import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { serif, sans } from './fonts';
import { brand } from '@/config/brand';
import { navLabels } from '@/config/navigation';
import { pageSeo } from '@/data/seo';
import { buildMetadata } from '@/lib/seo';
import { buildCatalog } from '@/lib/catalog';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { CartProvider } from '@/lib/cart';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { Logo } from '@/components/ui/Logo';
import { JsonLd } from '@/components/ui/SEOHead';

const home = pageSeo.home;

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  applicationName: brand.brandName,
  ...buildMetadata({
    title: home.seoTitle,
    description: home.metaDescription,
    path: home.path,
    keywords: home.keywords,
    ogTitle: home.ogTitle,
  }),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const catalog = buildCatalog();
  return (
    <html lang={brand.locale} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-sm bg-brown px-4 py-3 text-sm font-semibold text-ivory"
        >
          {navLabels.skipToContent}
        </a>
        <CartProvider catalog={catalog}>
          <AnnouncementBar />
          <Navbar logo={<Logo />} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <RevealObserver />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
