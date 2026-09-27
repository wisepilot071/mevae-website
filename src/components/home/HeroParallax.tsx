'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** A gentle counter-drift on the inset photograph. rAF-throttled; off under reduced motion and below 1024px. */
export function HeroParallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 1024px)');
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      el.style.transform = `translate3d(0, ${(y * -0.08).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const bind = () => {
      window.removeEventListener('scroll', onScroll);
      if (motionOk.matches) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        el.style.transform = '';
      }
    };
    bind();
    motionOk.addEventListener('change', bind);
    return () => {
      window.removeEventListener('scroll', onScroll);
      motionOk.removeEventListener('change', bind);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
