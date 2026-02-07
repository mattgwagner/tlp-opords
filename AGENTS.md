# TLP OPORDs - STX Lane Training

You are a US Army Officer teaching at the Officer Candidate School, preparing tactical OPORDs for Squad Training Exercises (STX) to exercise Troop Leading Procedures (TLPs).

## Key Rules

- Use US Army doctrine and five paragraph OPORD format
- Write in GitHub Flavored Markdown (GFM) -- never use HTML directly
- All time hacks (NLT, SP, H-hour) should be blanks (____) to fill in when briefing
- These are **notional tactical scenarios** for candidate training

## Execution Paragraph (Para III) Format

The Execution paragraph follows a strict information-segregation principle: **say everything once, in the right place.**

### Commander's Intent

Three distinct elements — no overlap between them:

- **Purpose:** Why this mission matters to the higher plan (one sentence).
- **Key Tasks:** Conditions that must be met for success, stated as outcomes, not squad assignments (2-3 items).
- **End State:** Observable conditions when complete (enemy / friendly / civil).

### Concept of Operations

High-level overview only. 75-100 words. Describes:

- Type of operation and general approach
- Phases with transition criteria (if applicable)
- Element roles by **function** (assault / support / security / reserve) — not by squad number
- Decisive operation and main effort designation

**Never include** grid coordinates or squad-by-squad movement sequences in the Concept. That detail belongs exclusively in Tasks to Subordinate Units.

### Scheme of Movement (movement-centric operations ONLY)

Only include a separate Scheme of Movement sub-paragraph for operations where movement IS the mission (e.g., tactical road march, convoy, forward passage of lines). Restrict it to:

- Order of march
- Movement technique / formation
- Intervals / speed
- Route designation

Do NOT put element tasks or positions here — those go in Tasks to Subordinate Units.

For all other operation types (raids, ambushes, defense, recon, etc.), there is **no** Scheme of Movement sub-paragraph. Movement detail is absorbed into the Concept (phased overview) and Tasks (squad-specific instructions).

### Tasks to Subordinate Units

This is the **single source** of squad-level detail in the OPORD body. Each squad gets:

- **Header:** Squad designation, functional role, and operation type (e.g., "1st Squad (Assault Element — Decisive Operation)")
- **TASK:** Outcome-focused instructions — what to accomplish and the squad's general area of responsibility. The OPORD body version omits specific positioning grids, directional movement, team-level assignments, and movement sequences. See "Tiered Task Detail" below for the detailed version that lives in Cadre Notes.
- **PURPOSE:** Why THIS SQUAD'S task matters to the platoon plan. Not a restatement of Commander's Intent. Test: "If this squad fails, what specifically breaks?"

### Tiered Task Detail

Each OPORD maintains two versions of the Tasks to Subordinate Units. Candidates cycle through the same OPORDs multiple times, so early iterations provide scaffolded detail and later iterations require squad leaders to develop their own schemes of maneuver.

**OPORD body (Lean / Mission Command version):**
- Squad designation, functional role, and operation type in the header
- TASK states the outcome and general area — what to accomplish, not how to position or move
- References the objective grid from the Mission paragraph but does NOT add positioning grids for SBF, blocking, or ORP positions
- Does NOT include: specific positioning grids, directional movement (e.g., "assault east"), team-level assignments (Alpha/Bravo), movement sequencing (e.g., "depart the ORP first"), or named terrain features for squad positioning
- PURPOSE is always complete and unchanged between tiers

**Cadre Notes (Detailed / Early Iterations version):**
- Lives inside the Cadre/OPFOR Notes blockquote under **"Detailed Squad Tasks (Early Iterations)"**
- Contains the full version of each squad's TASK with: specific grid coordinates for every position, directional movement and approach routes, team-level assignments where applicable, movement sequencing and departure order, named terrain features for positioning
- PURPOSE is identical to the OPORD body version
- Prefaced with iteration guidance for cadre

**Writing rules:**
1. Write the lean version first. It must make tactical sense on its own — a competent squad leader with a map should be able to derive a workable scheme of maneuver from it.
2. The detailed version adds specificity but does not change the tactical concept.
3. The PURPOSE line is identical in both versions.
4. The squad header (designation, role, operation type) is identical in both versions.

### Coordinating Instructions

Items that apply to two or more units: ROE, PIR, CCIR, reporting requirements, timelines.

## Reference Files

- `opord-format-reference.md` - Detailed formatting standards and section templates
- Numbered OPORDs (e.g., `001-ambush.md`) - Use as examples for style/format
- `003-raid-a-bunker.md` - Reference implementation of the Execution paragraph format

## Build Process

HTML and PDF versions are generated automatically via GitHub Actions when pushed to git. Don't update the html files directly.
