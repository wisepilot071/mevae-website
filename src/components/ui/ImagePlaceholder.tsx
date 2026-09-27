/**
 * Neutral stand-in used only if an image file is missing or fails to load.
 * It never announces an unfinished state — just a quiet sand panel with the MEVAÉ mark.
 */
export function ImagePlaceholder({ label, className = '' }: { label?: string; compact?: boolean; align?: 'center' | 'right'; className?: string }) {
  return (
    <div role="img" aria-label={label ?? 'MEVAÉ'} className={`absolute inset-0 flex items-center justify-center bg-ivory-deep ${className}`}>
      <span aria-hidden="true" className="font-serif text-[clamp(1rem,2vw,1.5rem)] tracking-[0.18em] text-brown/25">
        MEVAÉ
      </span>
    </div>
  );
}
