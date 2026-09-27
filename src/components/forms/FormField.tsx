import type { ReactNode } from 'react';

interface Props {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (a11y: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }) => ReactNode;
  className?: string;
}

/** Visible label + hint + inline error, wired with aria-describedby / aria-invalid. */
export function FormField({ id, label, hint, error, children, className = '' }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="micro-label text-brown">
        {label}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && (
        <p id={hintId} className="text-sm text-brown-soft">
          {hint}
        </p>
      )}
      {hint && error && (
        <p id={hintId} className="sr-only">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-sindoor">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'min-h-[52px] w-full rounded-sm border border-brown/25 bg-ivory/70 px-4 py-3 text-body text-brown placeholder:text-brown-soft/60 transition-colors duration-micro hover:border-brown/50 focus:border-brown focus:bg-ivory aria-[invalid=true]:border-sindoor';
