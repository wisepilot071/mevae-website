/** A neutral chat-bubble glyph used beside "WhatsApp" labels (the label carries the meaning). */
export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 19.5l1.2-3.6A7.5 7.5 0 1 1 8.4 18.6L4.5 19.5z" strokeLinejoin="round" />
      <path d="M9.2 9.3c.2 1.9 2.2 4.4 4.9 5 .5.1 1-.1 1.3-.5l.3-.5-1.6-.9-.6.6c-.8-.3-1.9-1.3-2.2-2.2l.6-.6-.9-1.6-.5.3c-.4.3-.6.8-.5 1.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}
