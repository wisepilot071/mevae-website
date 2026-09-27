/** Small line icons. Decorative — always paired with a visible or sr-only label. */
type P = { className?: string };
const base = { 'aria-hidden': true, focusable: false, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 } as const;

export const BagIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const MenuIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3 8h18M3 15h12" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
  </svg>
);

export const ArrowIcon = ({ className = 'h-3.5 w-3.5' }: P) => (
  <svg viewBox="0 0 16 16" className={`arrow ${className}`} {...base} strokeWidth={1.3}>
    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MailIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 7l8 6 8-6" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ className = 'h-3.5 w-3.5' }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base} strokeWidth={1.5}>
    <path d="M8 3v10M3 8h10" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ className = 'h-3.5 w-3.5' }: P) => (
  <svg viewBox="0 0 16 16" className={className} {...base} strokeWidth={1.5}>
    <path d="M3 8h10" strokeLinecap="round" />
  </svg>
);

export const ExternalIcon = ({ className = 'h-3.5 w-3.5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UserIcon = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
  </svg>
);
