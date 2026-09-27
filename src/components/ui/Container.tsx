import type { ElementType, ReactNode } from 'react';

export function Container({ as: Tag = 'div', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={`mx-auto w-full max-w-site px-gutter md:px-gutter-md lg:px-gutter-lg ${className}`}>{children}</Tag>;
}
