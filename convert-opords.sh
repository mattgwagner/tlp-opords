#!/usr/bin/env zsh
# convert-opords.sh - Convert all Markdown OPORD files to DOCX using a reference Word template
# Files should be written in GitHub Flavored Markdown (GFM) format

# Enable nullglob so that the script doesn’t error out when a folder has no Markdown files
setopt nullglob

# Ensure pandoc is installed
if ! command -v pandoc >/dev/null 2>&1; then
  echo "Error: pandoc not found. Please install pandoc and try again." >&2
  exit 1
fi

# Path to the HTML template file
TEMPLATE="$(dirname "$0")/opord-template.html"

# Script directory
SCRIPT_DIR="$(dirname "$0")"

# Function to convert a single markdown file to HTML
convert_md() {
  local md="$1"
  [ -f "$md" ] || return
  # Skip README.md and cadre notes
  local basename="$(basename "$md")"
  if [[ "$basename" == "README.md" ]] || [[ "$basename" == *"cadre-notes"* ]]; then
    return
  fi
  # Generate output path with .html extension
  local output="${md%.md}.html"
  echo "Converting: $md -> $output"
  # Extract document title and metadata
  local doc_title=$(basename "$md" .md)

  # Extract header information for military documents
  local header_info=$(grep -A5 "Copy __ of __ copies" "$md" 2>/dev/null || echo "")

  # Determine if this is a WARNO by looking at the filename
  local doc_type="OPERATION ORDER"
  if [[ "$doc_title" == *"WARNO"* ]]; then
    doc_type="WARNING ORDER"
  fi

  pandoc "$md" \
    --from gfm \
    --template="$TEMPLATE" \
    --standalone \
    --metadata title="$doc_title" \
    --metadata doctype="$doc_type" \
    --metadata header_info="$header_info" \
    -o "$output"
}

# Process all .md files in the script directory
for md in "$SCRIPT_DIR"/*.md; do
  convert_md "$md"
done

# Process all .md files in the FLX subdirectory
for md in "$SCRIPT_DIR"/FLX/*.md; do
  convert_md "$md"
done

exit 0
