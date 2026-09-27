'use client';

import { useEffect } from 'react';

/**
 * Loads the panda timeline only when the section nears the viewport, sets frame 0,
 * and plays once at 40% visibility. Does nothing under prefers-reduced-motion
 * (the server-rendered static composition stays as the final frame).
 */
export function PandaMotion({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root || !('IntersectionObserver' in window) || !('animate' in Element.prototype)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let anims: Animation[] = [];
    let played = false;
    let cancelled = false;

    const playIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && anims.length && !played) {
          played = true;
          anims.forEach((a) => a.play());
          playIO.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    const loadIO = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadIO.disconnect();
        import('./pandaTimeline').then(({ createSequence }) => {
          if (cancelled) return;
          // If it's already well in view on load, keep the static frame rather than snapping backwards.
          const r = root.getBoundingClientRect();
          const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
          if (visible > r.height * 0.75 && r.top < window.innerHeight * 0.3) return;
          anims = createSequence(root);
          playIO.observe(root);
        });
      },
      { rootMargin: '400px 0px' },
    );
    loadIO.observe(root);

    return () => {
      cancelled = true;
      loadIO.disconnect();
      playIO.disconnect();
    };
  }, [targetId]);

  return null;
}
