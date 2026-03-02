import { mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, existsSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import { marked } from 'marked';

// Configure marked for GitHub Flavored Markdown
marked.use({ gfm: true });

const DIST = 'dist';
const FLX = 'FLX';
const POI = 'POI';

// Files to skip (not content — meta/build files)
const SKIP_FILES = new Set(['AGENTS.md', 'CLAUDE.md']);
const SKIP_PATTERNS = ['cadre-notes'];

// Read the HTML template and split at placeholders
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
  const body = marked.parse(md);

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

// Create output directories
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, 'FLX'), { recursive: true });

// --- Root index from README.md ---
if (existsSync('README.md')) {
  renderMarkdown('README.md', join(DIST, 'index.html'), {
    title: 'OCS Operations Orders',
    isIndex: true,
  });
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

// --- Convert root-level markdown files ---
for (const file of readdirSync('.')) {
  if (!file.endsWith('.md')) continue;
  if (file === 'README.md') continue; // already handled as index
  if (shouldSkip(file)) continue;
  renderMarkdown(file, join(DIST, file.replace('.md', '.html')));
}

// --- Copy root-level non-markdown assets (KML, pre-existing HTML) ---
for (const file of readdirSync('.')) {
  if (file === 'opord-template.html') continue;
  if (file === 'AGENTS.html' || file === 'CLAUDE.html') continue;
  if (file.endsWith('.kml')) {
    copyFileSync(file, join(DIST, file));
    console.log(`Copied: ${file} -> dist/${file}`);
  }
  // Copy pre-existing HTML files that don't have a .md source
  // (e.g., opord-blank-template.html, patrol-base-ops.html, tac-quick-reference.html)
  if (file.endsWith('.html')) {
    const mdSource = file.replace('.html', '.md');
    if (!existsSync(mdSource) && file !== 'opord-template.html') {
      copyFileSync(file, join(DIST, file));
      console.log(`Copied (pre-built): ${file} -> dist/${file}`);
    }
  }
}

// --- Copy POI directory (slides, images) ---
if (existsSync(POI)) {
  copyDir(POI, join(DIST, POI));
}

console.log('\nBuild complete.');
