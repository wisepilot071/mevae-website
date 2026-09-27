# Images

All photographs referenced by `src/data/*` live here. next/image serves AVIF/WebP versions automatically.

- `home/`: editorial images (signature spotlight, "meaningful moments")
- `og/mevae-og-default.jpg`: 1200×630 social-share image
- `products/<slug>/<slug>-<role>.jpg`: product gallery images, listed per product in `src/data/products.ts`
- `brand/mevae-logo.svg` (optional): the official logo, used exactly as supplied

To replace a photo, keep the same filename, or change the path in the data file. Export at ≤1800px on the long edge; JPG quality 80–86 is plenty. If a file is missing, the site shows a neutral panel at the correct size instead of a broken image.
