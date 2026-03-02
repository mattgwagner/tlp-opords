import { mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, existsSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import { marked } from 'marked';

// Configure marked for GitHub Flavored Markdown
marked.use({ gfm: true });

const DIST = 'dist';
const STX = 'STX';
const FLX = 'FLX';
const REF = 'reference';
const TOOLS = 'tools';
const ASSETS = 'assets';
const POI = 'POI';

// Files to skip (not content — meta/build files)
const SKIP_FILES = new Set(['AGENTS.md', 'CLAUDE.md']);
const SKIP_PATTERNS = ['cadre-notes'];

// Read the HTML template
const template = readFileSync('opord-template.html', 'utf8');

function shouldSkip(filename) {
  if (SKIP_FILES.has(filename)) return true;
  if (filename === 'README.md') return false; // handled specially
  if (SKIP_PATTERNS.some(p => filename.includes(p))) return true;
  return false;
}

function renderMarkdown(mdPath, outputPath, options = {}) {
  const md = readFileSync(mdPath, 'utf8');
  const filename = basename(mdPath, '.md');

  // Determine document type from filename
  let docType = 'OPERATION ORDER';
  if (filename.includes('WARNO')) docType = 'WARNING ORDER';
  if (options.isIndex) docType = 'INDEX';

  const title = options.title || filename;

  // Convert markdown to HTML body
  let body = marked.parse(md);

  // Rewrite relative paths for files flattened to dist root.
  // Source files in subdirectories use ../assets/ or ../reference/ paths,
  // but since output is flattened to dist/, we strip the ../ prefix.
  if (options.flatten) {
    body = body.replace(/(?:src|href)="\.\.\/assets\//g, (match) => match.replace('../assets/', 'assets/'));
    body = body.replace(/(?:src|href)="\.\.\/reference\//g, (match) => match.replace('../reference/', ''));
    body = body.replace(/(?:src|href)="\.\.\/tools\//g, (match) => match.replace('../tools/', ''));
  }

  // Inject into template
  let html = template
    .replace('$title$', title)
    .replace('$header-includes$', '')
    .replace('$body$', body);

  // For index pages, remove the OPORD footer (acknowledge/signature/distribution)
  if (options.isIndex) {
    html = html.replace(/<footer>[\s\S]*<\/footer>/, '');
  }

  writeFileSync(outputPath, html, 'utf8');
  console.log(`Built: ${mdPath} -> ${outputPath}`);
}

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

// Helper: process a source directory, flattening output to dist root
function processDir(srcDir, options = {}) {
  if (!existsSync(srcDir)) return;
  for (const file of readdirSync(srcDir)) {
    const srcPath = join(srcDir, file);
    if (statSync(srcPath).isDirectory()) continue;

    if (file.endsWith('.md') && !shouldSkip(file)) {
      renderMarkdown(srcPath, join(DIST, file.replace('.md', '.html')), { flatten: true });
    } else if (file.endsWith('.kml')) {
      copyFileSync(srcPath, join(DIST, file));
      console.log(`Copied: ${srcPath} -> dist/${file}`);
    } else if (file.endsWith('.html')) {
      copyFileSync(srcPath, join(DIST, file));
      console.log(`Copied: ${srcPath} -> dist/${file}`);
    }
  }
}

// Create output directories
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, 'FLX'), { recursive: true });
mkdirSync(join(DIST, 'assets'), { recursive: true });

// --- Root index from README.md ---
if (existsSync('README.md')) {
  renderMarkdown('README.md', join(DIST, 'index.html'), {
    title: 'OCS Operations Orders',
    isIndex: true,
  });
}

// --- STX OPORDs (flattened to dist root) ---
processDir(STX);

// --- Reference materials (flattened to dist root) ---
processDir(REF);

// --- Tools / standalone HTML (flattened to dist root) ---
processDir(TOOLS);

// --- Assets (copied as directory to dist/assets/) ---
if (existsSync(ASSETS)) {
  copyDir(ASSETS, join(DIST, ASSETS));
}

// --- FLX index (hand-maintained HTML) ---
if (existsSync(join(FLX, 'index.html'))) {
  copyFileSync(join(FLX, 'index.html'), join(DIST, 'FLX', 'index.html'));
  console.log('Copied: FLX/index.html -> dist/FLX/index.html');
}

// --- Convert FLX markdown files ---
for (const file of readdirSync(FLX)) {
  if (!file.endsWith('.md')) continue;
  if (shouldSkip(file)) continue;
  renderMarkdown(join(FLX, file), join(DIST, 'FLX', file.replace('.md', '.html')));
}

// --- Copy FLX non-markdown assets (KML files) ---
for (const file of readdirSync(FLX)) {
  if (file.endsWith('.kml')) {
    copyFileSync(join(FLX, file), join(DIST, 'FLX', file));
    console.log(`Copied: FLX/${file} -> dist/FLX/${file}`);
  }
}

// --- Copy POI directory (slides, images) ---
if (existsSync(POI)) {
  copyDir(POI, join(DIST, POI));
}

console.log('\nBuild complete.');
