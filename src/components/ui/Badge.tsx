import type { ReactNode } from 'react';

const tones = {
  neutral: 'border-brown/25 text-brown-soft bg-ivory/90',
  sale: 'border-terracotta-ink/40 text-terracotta-ink bg-ivory/90',
  soon: 'border-forest/30 text-forest bg-ivory/90',
};

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`micro-label inline-block rounded-sm border px-2.5 py-1 ${tones[tone]}`}>{children}</span>;
}
