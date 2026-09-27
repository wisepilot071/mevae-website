/**
 * MEVAÉ design tokens — the single source for colour, type, spacing and motion.
 * tailwind.config.ts reads from here. Never hard-code hex values in components.
 *
 * Palette: parchment grounds, sand and champagne mid-tones, espresso ink,
 * a restrained antique brass, the blush of MEVAÉ's own gift boxes, and a single
 * deep sindoor note used only for tiny details.
 */
export const colors = {
  ivory: '#F5F0E8', // parchment — primary background
  'ivory-deep': '#E9E0D2', // warm sand — alternate sections
  champagne: '#DCCBB0',
  brown: '#29231F', // espresso — primary text & dark sections
  'brown-soft': '#5C5048', // secondary text
  gold: '#A58A63', // antique brass — rules, marks, focus on dark
  'gold-ink': '#7A6243', // brass darkened for text on parchment (≥4.5:1)
  'gold-light': '#CBB38C', // brass lightened for text on espresso (≥4.5:1)
  forest: '#2A241F', // deep espresso for dark bands
  blush: '#E8CFC8', // the MEVAÉ box pink
  sindoor: '#8C3A2B', // festive accent — dots, active marks only
  sage: '#7C8B72',
  terracotta: '#B4654A',
  'terracotta-ink': '#8C3A2B',
  rule: 'rgba(41,35,31,0.12)',
  'rule-strong': 'rgba(41,35,31,0.26)',
} as const;

export const fontSize = {
  display: ['clamp(3rem, 9.5vw, 8.25rem)', { lineHeight: '0.9', letterSpacing: '-0.025em' }],
  h1: ['clamp(2.6rem, 7vw, 5.75rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
  h2: ['clamp(2rem, 4.4vw, 3.75rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
  h3: ['clamp(1.5rem, 2.3vw, 2.1rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
  lead: ['clamp(1.0625rem, 1.3vw, 1.2rem)', { lineHeight: '1.6' }],
  body: ['1rem', { lineHeight: '1.65' }],
  micro: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.2em' }],
} as const;

export const spacing = {
  gutter: '20px',
  'gutter-md': '40px',
  'gutter-lg': '64px',
  section: '88px',
  'section-md': '128px',
  'section-lg': '168px',
} as const;

export const motion = {
  micro: '180ms',
  ui: '320ms',
  editorial: '800ms',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export const layout = {
  maxWidth: '1440px',
  radius: '2px',
  measure: '64ch',
} as const;
