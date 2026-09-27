import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'text' | 'light';

const base =
  'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-ui ease-mevae disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<Variant, string> = {
  primary: 'bg-brown px-8 text-ivory hover:bg-gold-ink',
  secondary: 'border border-brown px-8 text-brown hover:bg-brown hover:text-ivory',
  light: 'bg-ivory px-8 text-brown hover:bg-champagne',
  text: 'min-h-[44px] px-0 text-brown [&>span]:link-rule',
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { href: string; external?: boolean; 'aria-label'?: string; onClick?: () => void };

export function ButtonLink({ href, external, variant = 'primary', className = '', children, ...rest }: LinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = variant === 'text' ? <span>{children}</span> : children;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {variant === 'text' ? <span>{children}</span> : children}
    </button>
  );
}
