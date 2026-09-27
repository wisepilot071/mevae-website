import type { ReactNode } from 'react';

/** Native <details> accordion: keyboard and screen-reader friendly with zero JS. */
export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="border-t rule">
      {items.map((item) => (
        <details key={item.title} className="group border-b rule">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
            {item.title}
            <span aria-hidden="true" className="text-gold-ink transition-transform duration-ui ease-mevae group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pb-6 text-brown-soft">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
