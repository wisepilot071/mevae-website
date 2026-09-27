import type { ReactNode } from 'react';

interface Props {
  id: string;
  eyebrow?: string;
  heading: ReactNode;
  intro?: ReactNode;
  level?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
  tone?: 'dark' | 'light';
}

export function SectionHeading({ id, eyebrow, heading, intro, level = 'h2', align = 'left', className = '', tone = 'dark' }: Props) {
  const Tag = level;
  const center = align === 'center' ? 'text-center mx-auto items-center' : '';
  const muted = tone === 'light' ? 'text-ivory/80' : 'text-brown-soft';
  return (
    <div className={`reveal flex max-w-3xl flex-col gap-5 ${center} ${className}`}>
      {eyebrow && <p className={`micro-label ${tone === 'light' ? 'text-gold-light' : 'text-gold-ink'}`}>{eyebrow}</p>}
      <Tag id={id} className={level === 'h1' ? 'text-h1' : 'text-h2'}>
        {heading}
      </Tag>
      {intro && <p className={`max-w-measure text-lead ${muted}`}>{intro}</p>}
    </div>
  );
}
