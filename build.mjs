import { mkdirSync, readdirSync, copyFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const DIST = 'dist';
const FLX = 'FLX';
const POI = 'POI';

// Files to exclude from deployment (meta/build files, not content)
const SKIP = new Set([
  'opord-template.html',
  'AGENTS.html',
  'CLAUDE.html',
]);

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Create output directories
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, 'FLX'), { recursive: true });

// Root index.html (generated from README.md by convert-opords.sh)
if (existsSync('index.html')) {
  copyFileSync('index.html', join(DIST, 'index.html'));
  console.log('Copied: index.html -> dist/index.html');
}

// Copy FLX/index.html
if (existsSync(join(FLX, 'index.html'))) {
  copyFileSync(join(FLX, 'index.html'), join(DIST, 'FLX', 'index.html'));
  console.log('Copied: FLX/index.html -> dist/FLX/index.html');
}

// Copy all generated HTML and KML from FLX/
for (const file of readdirSync(FLX)) {
  if (file === 'index.html') continue;
  if (file.endsWith('.html') || file.endsWith('.kml')) {
    copyFileSync(join(FLX, file), join(DIST, 'FLX', file));
    console.log(`Copied: FLX/${file} -> dist/FLX/${file}`);
  }
}

// Copy root-level generated HTML and KML (excluding meta/build files)
for (const file of readdirSync('.')) {
  if (file === 'index.html') continue; // already handled
  if (SKIP.has(file)) continue;
  if (file.endsWith('.html') || file.endsWith('.kml')) {
    copyFileSync(file, join(DIST, file));
    console.log(`Copied: ${file} -> dist/${file}`);
  }
}

// Copy POI directory (slides, images)
if (existsSync(POI)) {
  copyDir(POI, join(DIST, POI));
}

console.log('\nBuild complete.');
