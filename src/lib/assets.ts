import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Build-time check for image files in /public. Missing files render a styled placeholder
 * instead of a broken image (and log a warning in development).
 */
const cache = new Map<string, boolean>();

export function assetExists(src: string | undefined | null): boolean {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  const hit = cache.get(src);
  if (hit !== undefined) return hit;
  const exists = fs.existsSync(path.join(process.cwd(), 'public', decodeURIComponent(src)));
  cache.set(src, exists);
  if (!exists && process.env.NODE_ENV !== 'production') {
    console.warn(`[MEVAÉ] Missing image: public${src} — rendering placeholder.`);
  }
  return exists;
}

/** Returns a copy of any object with `src` fields that exist on disk, else `undefined` src flagged via `missing`. */
export function withAsset<T extends { src: string }>(img: T): T & { missing: boolean } {
  return { ...img, missing: !assetExists(img.src) };
}
