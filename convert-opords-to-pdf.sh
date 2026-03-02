#!/usr/bin/env bash
# convert-opords-to-pdf.sh - Convert all Markdown OPORD files to PDF via HTML
# Files should be written in GitHub Flavored Markdown (GFM) format

# Enable errexit to exit on any error
set -e

# Ensure pandoc is installed
if ! command -v pandoc >/dev/null 2>&1; then
  echo "Error: pandoc not found. Please install pandoc and try again." >&2
  exit 1
fi

# Ensure wkhtmltopdf is installed
if ! command -v wkhtmltopdf >/dev/null 2>&1; then
  echo "Error: wkhtmltopdf not found. Please install wkhtmltopdf and try again." >&2
  exit 1
fi

# Path to the HTML template file
SCRIPT_DIR="$(dirname "$0")"
TEMPLATE="$SCRIPT_DIR/opord-template.html"

# Check if template exists
if [ ! -f "$TEMPLATE" ]; then
  echo "Error: Template file not found at $TEMPLATE" >&2
  exit 1
fi

# Function to convert a single markdown file to PDF via HTML
convert_md_to_pdf() {
  local md="$1"
  [ -f "$md" ] || return

  # Skip README.md and cadre notes
  local basename="$(basename "$md")"
  if [[ "$basename" == "README.md" ]] || [[ "$basename" == *"cadre-notes"* ]]; then
    return
  fi

  # Generate output paths
  local html_temp="${md%.md}.temp.html"
  local pdf_output="${md%.md}.pdf"

  echo "Converting: $md -> $pdf_output"

  # Extract document title and metadata
  local doc_title=$(basename "$md" .md)

  # Extract header information for military documents
  local header_info=$(grep -A5 "Copy __ of __ copies" "$md" 2>/dev/null || echo "")

  # Determine if this is a WARNO by looking at the filename
  local doc_type="OPERATION ORDER"
  if [[ "$doc_title" == *"WARNO"* ]]; then
    doc_type="WARNING ORDER"
  fi

  # Step 1: Convert Markdown to HTML using pandoc with template
  pandoc "$md" \
    --from gfm \
    --template="$TEMPLATE" \
    --standalone \
    --metadata title="$doc_title" \
    --metadata doctype="$doc_type" \
    --metadata header_info="$header_info" \
    -o "$html_temp"

  # Step 2: Convert HTML to PDF using wkhtmltopdf
  wkhtmltopdf \
    --enable-local-file-access \
    --print-media-type \
    --page-size Letter \
    --margin-top 0.5in \
    --margin-bottom 0.5in \
    --margin-left 0.5in \
    --margin-right 0.5in \
    "$html_temp" \
    "$pdf_output"

  # Clean up temporary HTML file
  rm -f "$html_temp"

  echo "✓ Created: $pdf_output"
}

# Process all .md files in the script directory
for md in "$SCRIPT_DIR"/*.md; do
  convert_md_to_pdf "$md"
done

# Process all .md files in the FLX subdirectory
for md in "$SCRIPT_DIR"/FLX/*.md; do
  convert_md_to_pdf "$md"
done

echo ""
echo "PDF conversion complete!"

exit 0
