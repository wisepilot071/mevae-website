import { ImageResponse } from 'next/og';
import { brand } from '@/config/brand';

/** Fallback social image, used only until /public/images/og/mevae-og-default.jpg exists. */
export const alt = `${brand.brandName} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F3EC',
          color: '#2E2620',
          padding: '72px 88px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 44, letterSpacing: 10 }}>{brand.brandName}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 64, height: 2, background: '#B08D57', marginBottom: 36 }} />
          <div style={{ fontSize: 88, lineHeight: 1 }}>{brand.tagline}</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#5A4B40" }}>{`Premium gift hampers · ${brand.deliveryArea}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
