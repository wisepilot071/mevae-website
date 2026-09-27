import type { ReactNode } from 'react';

export function EmptyState({ heading, body, action }: { heading: string; body?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-5 border-y rule py-20 text-center">
      <p className="font-serif text-h3">{heading}</p>
      {body && <p className="max-w-md text-brown-soft">{body}</p>}
      {action}
    </div>
  );
}
