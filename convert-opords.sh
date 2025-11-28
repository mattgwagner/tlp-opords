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

# Process all .md files in the current directory (where the script is located)
for md in "$(dirname "$0")"/*.md; do
  [ -f "$md" ] || continue
  # Skip README.md
  if [[ "$(basename "$md")" == "README.md" ]]; then
    continue
  fi
  # Generate output path with .html extension
  output="${md%.md}.html"
  echo "Converting: $md -> $output"
  # Extract document title and metadata
  doc_title=$(basename "$md" .md)
  
  # Extract header information for military documents
  header_info=$(grep -A5 "Copy __ of __ copies" "$md" 2>/dev/null || echo "")
  
  # Determine if this is a WARNO by looking at the filename
  if [[ "$doc_title" == *"WARNO"* ]]; then
    doc_type="WARNING ORDER"
  else
    doc_type="OPERATION ORDER"
  fi

  pandoc "$md" \
    --from gfm \
    --template="$TEMPLATE" \
    --standalone \
    --metadata title="$doc_title" \
    --metadata doctype="$doc_type" \
    --metadata header_info="$header_info" \
    -o "$output"
done

exit 0
