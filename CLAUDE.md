# TLP OPORDs — Notional Tactical Training Scenarios

Notional operations orders for Squad Training Exercises (STX) and Field Leadership Exercises (FLX). These exercise OCS candidates on Troop Leading Procedures (TLPs) — they are training scenarios, not real administrative orders (those live in `../6 - Operation Orders/`).

## Key Rules

- Use US Army doctrine and the five-paragraph OPORD format
- Write in GitHub Flavored Markdown (GFM) — never use HTML directly
- All time hacks (NLT, SP, H-hour) should be blanks (`____`) to fill in when briefing
- These are **notional tactical scenarios** for candidate training
- Do not edit generated HTML files — edit the markdown source and rebuild

## Folder Structure

- `STX/` — Squad Training Exercise lanes (evaluated STX lanes at Camp Blanding)
- `FLX/` — Field Leadership Exercise materials (multi-day company-level staff exercise)
- `POI/` — TLP instructional slides and imagery
- `reference/` — Format references, inject cards, grid references, quick-reference guides
- `tools/` — Blank OPORD template and other standalone tools
- `assets/` — Map imagery and FLER card scans

## File Naming (STX and FLX)

Each OPORD has up to three files per mission number:

- `NNN-mission-name.md` — Mission Command version (lean, outcome-focused tasks)
- `NNN-mission-name-detailed.md` — Detailed version with specific grids, movement sequences, team assignments
- `NNN-mission-name.kml` — Google Earth overlay with objective locations and terrain

Template/reference files have descriptive names (e.g., `cadre-brief.md`, `aar-guide.md`).

Some missions also have a `-TRAINING-GUIDE.md` variant or `-cadre-notes.md` with additional cadre-facing instruction.

## Tiered Task Detail (Critical Convention)

Each OPORD maintains two versions of Tasks to Subordinate Units. Candidates cycle through the same OPORDs, so early iterations provide scaffolded detail and later iterations require squad leaders to develop their own schemes of maneuver.

**OPORD body (Mission Command version — the base `.md` file):**
- Squad designation, functional role, and operation type in header
- TASK states the outcome and general area — what to accomplish, not how to position
- Does NOT include: specific positioning grids, directional movement, team-level assignments, movement sequencing
- PURPOSE is always complete

**Detailed version (`-detailed.md`):**
- Full version of each squad's TASK with: specific grids, directional movement, approach routes, team assignments, departure order
- PURPOSE is identical to the Mission Command version
- Contains Cadre/OPFOR Notes blockquote with iteration guidance

## Execution Paragraph (Para III) Format

Follow these information-segregation rules strictly:

- **Commander's Intent:** Purpose (one sentence), Key Tasks (2-3 outcomes), End State (enemy/friendly/civil)
- **Concept of Operations:** 75-100 words. Type of operation, phases, element roles by function (assault/support/security/reserve), decisive operation designation. NO grids, NO squad-by-squad sequences.
- **Scheme of Movement:** Only for movement-centric operations (road march, convoy, FPOL). Order of march, technique, intervals, route. NO element tasks.
- **Tasks to Subordinate Units:** Single source of squad-level detail. Header with designation + functional role + operation type. TASK (outcome-focused) and PURPOSE (why this squad's task matters to the platoon plan).
- **Coordinating Instructions:** Items applying to 2+ units — ROE, PIR, CCIR, reporting, timelines.

## Build Process

Run `node build.mjs` from this directory to build all content to `dist/`.

- Converts markdown to HTML using `opord-template.html` and the `marked` library (GFM mode)
- STX and reference files are flattened to `dist/` root
- FLX files go to `dist/FLX/`
- POI and assets are copied as directories
- `README.md` becomes `dist/index.html`
- `AGENTS.md` and `CLAUDE.md` are skipped automatically
- `.gitignore` excludes `dist/`, `*.html` (except templates), `*.pdf`, and `node_modules/`
- Cloudflare Pages or GitHub Actions runs the build on push

## Reference Files

- `reference/opord-format-reference.md` — Detailed formatting standards and section templates
- `reference/lta-grid-reference.md` (and `.kml`) — Camp Blanding LTA grid reference with all objective locations
- `reference/inject-cards-guide.md` — How to use the inject card system to vary iterations
- `reference/inject-cards-*.md` — Six categories of inject cards (situation, enemy, friendly, weather, civilian, timeline)
- `reference/tlp-training-package.md` — Complete Crawl-Walk-Run TLP training package
- `reference/tac-quick-reference.html` — Quick reference for formations, battle drills, and actions on objective
- `STX/003-raid-a-bunker.md` — Reference implementation of the Execution paragraph format
- `FLX/cadre-brief.md` — FLX cadre briefing and exercise framework
