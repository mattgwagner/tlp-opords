import { mkdirSync, readdirSync, copyFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

const DIST = 'dist';
const FLX = 'FLX';

// Files to skip when collecting build output
const SKIP = new Set(['opord-template.html']);

// Create dist directory
mkdirSync(DIST, { recursive: true });

// Copy FLX/index.html as the site root
if (existsSync(join(FLX, 'index.html'))) {
  copyFileSync(join(FLX, 'index.html'), join(DIST, 'index.html'));
  console.log('Copied: FLX/index.html -> dist/index.html');
}

// Copy all generated HTML from FLX/ (except index.html, already handled)
for (const file of readdirSync(FLX)) {
  if (file === 'index.html') continue;
  if (file.endsWith('.html') || file.endsWith('.kml')) {
    copyFileSync(join(FLX, file), join(DIST, file));
    console.log(`Copied: FLX/${file} -> dist/${file}`);
  }
}

// Copy any root-level generated HTML (non-template, non-FLX)
for (const file of readdirSync('.')) {
  if (file.endsWith('.html') && !SKIP.has(file)) {
    copyFileSync(file, join(DIST, file));
    console.log(`Copied: ${file} -> dist/${file}`);
  }
}

console.log('\nBuild complete.');
