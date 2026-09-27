import type { Config } from 'tailwindcss';
import { colors, fontSize, spacing, motion, layout } from './src/config/design-tokens';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontSize: fontSize as unknown as Record<string, [string, { lineHeight: string; letterSpacing?: string }]>,
      spacing,
      maxWidth: { site: layout.maxWidth, measure: layout.measure },
      borderRadius: { DEFAULT: layout.radius, sm: layout.radius },
      transitionTimingFunction: { mevae: motion.ease },
      transitionDuration: { micro: motion.micro, ui: motion.ui, editorial: motion.editorial },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        drawer: '-24px 0 60px -30px rgba(41,35,31,0.35)',
        lift: '0 30px 60px -40px rgba(41,35,31,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
