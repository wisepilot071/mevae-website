// Lists every REPLACE_ME left in src/ and every image path referenced in data that has no file yet.
import fs from 'node:fs';
import path from 'node:path';

const hits = [];
const imgs = new Set();
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (/\.(ts|tsx|svg)$/.test(f.name)) {
      fs.readFileSync(full, 'utf8').split('\n').forEach((line, i) => {
        if (line.includes('REPLACE_ME')) hits.push(`${full}:${i + 1}  ${line.trim().slice(0, 110)}`);
        for (const m of line.matchAll(/['"`](\/images\/[^'"`$]+\.(?:jpg|jpeg|png|webp|avif|svg))['"`]/g)) imgs.add(m[1]);
      });
    }
  }
};
walk('src');
console.log(`\nREPLACE_ME markers (${hits.length}):\n` + hits.join('\n'));
const missing = [...imgs].filter((src) => !fs.existsSync(path.join('public', src)));
console.log(`\nStatic image paths with no file yet (${missing.length}) — product images built from templates are checked at build time:\n` + missing.join('\n'));
