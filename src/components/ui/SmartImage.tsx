'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface Props {
  src: string;
  alt: string;
  /** Resolved at build time on the server (lib/assets). */
  missing?: boolean;
  sizes: string;
  priority?: boolean;
  label?: string;
  className?: string;
  /** Aspect ratio of the wrapper, e.g. "4 / 5". Omit when the parent sizes the box. */
  ratio?: string;
  wrapperClassName?: string;
  /** Kept for API compatibility. */
  compact?: boolean;
  placeholderAlign?: 'center' | 'right';
  objectPosition?: string;
}

/**
 * next/image with a guaranteed box: aspect-ratio wrapper + fill, so there is no layout shift.
 * Falls back to a neutral panel if the file is missing at build time or fails at runtime.
 */
export function SmartImage({ src, alt, missing, sizes, priority, label, className = '', ratio, wrapperClassName = '', objectPosition }: Props) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = missing || failed;
  return (
    <div className={`relative w-full overflow-hidden bg-ivory-deep ${ratio ? '' : 'h-full'} ${wrapperClassName}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {showPlaceholder ? (
        <ImagePlaceholder label={label ?? alt} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={82}
          className={`object-cover ${className}`}
          style={objectPosition ? { objectPosition } : undefined}
          onError={() => {
            if (process.env.NODE_ENV !== 'production') console.warn(`[MEVAÉ] Image failed to load: ${src}`);
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
