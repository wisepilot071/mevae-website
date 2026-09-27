// Fails if any retail price from products.ts is hard-coded elsewhere in src/.
import fs from 'node:fs';
import path from 'node:path';

const productsFile = path.join('src', 'data', 'products.ts');
const src = fs.readFileSync(productsFile, 'utf8');
const prices = [...src.matchAll(/^\s*price:\s*(\d+)/gm)].map((m) => m[1]);
const patterns = prices.flatMap((p) => [p, Number(p).toLocaleString('en-IN')]).filter((p) => p.length >= 3);
const offenders = [];
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(f.name) && path.normalize(full) !== path.normalize(productsFile)) {
      const text = fs.readFileSync(full, 'utf8');
      for (const p of patterns) if (new RegExp(`(?<![\\d,])${p.replace(/,/g, ',')}(?![\\d,])`).test(text)) offenders.push(`${full}: ${p}`);
    }
  }
};
walk('src');
if (offenders.length) {
  console.error('Hard-coded prices found:\n' + offenders.join('\n'));
  process.exit(1);
}
console.log(`OK — prices ${prices.join(', ')} appear only in ${productsFile}.`);
