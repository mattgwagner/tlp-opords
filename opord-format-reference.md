# OPORD Format Reference

Detailed formatting standards for Army Operation Orders (OPORDs) and Warning Orders (WARNORDs).

## Document Format Standards

### GitHub Flavored Markdown (GFM) Requirements
- Write all Army orders in GitHub Flavored Markdown (GFM) format
- Use proper heading hierarchies: `#`, `##`, `###`, etc.
- Use **bold** for emphasis with double asterisks `**bold text**`
- Use *italic* for less emphasis with single asterisks `*italic text*`
- Use proper list formatting: `-` or `*` for bullet lists, `1.`, `2.`, `3.` for numbered lists
- Use tables with pipe syntax `| Header | Header |` for structured information
- Use three backticks for code blocks or preformatted text when needed

### Document Structure Requirements

#### 1. Classification and Header
- Begin and end documents with classification markings (e.g., "UNCLASSIFIED") centered and in ALL CAPS
- Include document identifier left-aligned at top
- Include page numbers right-aligned

#### 2. Document Identification Block
- Right-aligned: "Copy __ of __ copies"
- Left-aligned headquarters (e.g., "HQ, 2/116th FA")
- Left-aligned location (e.g., "CBJTC, FL")
- Left-aligned date-time group in military format (e.g., "131200APR18")
- Left-aligned document type and title in ALL CAPS

#### 3. Time Zone Declaration
- Include "(U) Time Zone Used Throughout the OPORD: ROMEO (Local)" after title

#### 4. Task Organization
- List participating units separated by commas

## Content Structure Requirements

### 1. Situation Section
```
1.  (U) SITUATION.

a.  (U) Area of Interest. [Geographic area]

b.  (U) Area of Operation. [Specific location]

(1) (U) Terrain. [Terrain description]

(2) (U) Weather. [Weather data - use markdown tables for structured format]

c.   (U) Enemy Forces. [Description or N/A]

d.  (U) Attachments. [Units attached or "None"]
```

### 2. Mission Section
```
2.  (U) MISSION.  [Unit] conducts [operations] at [location] from [start date] to [end date] IOT [purpose].
```

### 3. Execution Section
```
3.  (U) EXECUTION.

a.  (U) Commander's Intent.

    Purpose: [Why this mission matters to the higher plan — one sentence]

    Key Tasks: (1) [Condition for success] (2) [Condition] (3) [Condition]

    End State: [Observable conditions: enemy / friendly / civil]

b.  (U) Concept of Operations. [Overview — see guidance below]

c.  (U) Scheme of Fires. [Fire support plan]

d.  (U) Tasks to Subordinate Units.
    (1) [Unit (Role — Decisive/Shaping)]
        TASK: [Specific instructions with grids, triggers, actions]
        PURPOSE: [Why this squad's task matters to the platoon plan]

e.  (U) Coordinating Instructions.
    [ROE, PIR, CCIR, Reporting — items applicable to two or more units]
```

#### Execution Paragraph Writing Guidance

**Each sub-paragraph contains unique information. Do not restate content across sections.**

**a. Commander's Intent** — The "why" and conditions for success.
- **Purpose:** One sentence explaining why the mission matters to the higher commander's plan. Not a restatement of the mission statement.
- **Key Tasks:** 2-3 conditions that must be met for mission success, stated as outcomes (not squad assignments). These are things the PL cannot deviate from even if the plan falls apart.
- **End State:** Observable conditions on the ground when the mission is complete, described through the lenses of enemy, friendly forces, and civil considerations.
- The entire Intent should be brief enough for every squad leader to memorize.

**b. Concept of Operations** — The big picture of how the platoon fights as a whole.
- Describe the operation by phases (with transition criteria) or by decisive/shaping/sustaining framework.
- Identify the main effort and when/if it shifts.
- Use functional roles (assault element, support element, security element) rather than squad numbers where possible. The mapping of squad-to-role belongs in Tasks.
- Keep to 75-100 words. If it exceeds that, detail is leaking in that belongs in Tasks.
- **Does NOT contain:** grid coordinates, squad-by-squad movement sequences, or specific positions. Those belong in Tasks to Subordinate Units.

**c. Scheme of Fires** — Priority of indirect fires (which subordinate unit gets first call on indirect fire assets), fire support assets available, and restrictions. Unique information only.

**d. Tasks to Subordinate Units** — The ONE place with squad-specific detail.
- **TASK:** The squad's outcome-focused instructions — what to accomplish, general area of responsibility, and key coordination (triggers, on-order actions). The OPORD body states tasks at a mission-command level, omitting specific positioning grids, directional movement, and team-level assignments. The detailed version with specific grids, routes, and team assignments lives in the Cadre Notes under "Detailed Squad Tasks (Early Iterations)" for use during initial training iterations.
- **PURPOSE:** Why THIS SQUAD's task matters to the platoon plan specifically. Test: "If this squad fails, what specifically breaks?" Do not restate the Commander's Intent. A good purpose connects the squad's task to the next phase or another element's success. Identical between lean and detailed versions.
- Include the element's role (Assault, Support, Security, Reserve) and whether it is the decisive or shaping operation in the header.

**e. Coordinating Instructions** — Cross-cutting guidance that applies to two or more units. ROE, PIR, CCIR, reporting requirements, time hacks, restrictions.

**Note on Scheme of Movement and Maneuver:** This is NOT a separate sub-paragraph for most platoon operations. The phased overview belongs in the Concept of Operations; squad-specific positions and grids belong in Tasks. For movement-centric operations (tactical road march, convoy operations) where movement IS the operation, a Scheme of Movement sub-paragraph may be included between Concept and Fires, but it contains ONLY formation, technique, order of march, route, and speed/intervals — not element tasks.

### 4. Sustainment Section
```
4.  (U) SUSTAINMENT.

a.  Material and Services
(1) Supply
(a) Class I [Food/water details]
(b) Class III [Fuel details]
(c) Class V [Ammunition details]
(d) Class VIII [Medical supplies]

(2) Maintenance: [Maintenance support details]
```

### 5. Command and Control Section
```
5.  (U) COMMAND AND CONTROL.

(a) (U) Signal.
(1) Frequency and Call signs.
(2) PACE.
(a) P – [Primary]
(b) A – [Alternate]
(c) C – [Contingency]
(d) E – [Emergency]

(b) (U) Command.
(1) Location. [Command locations]
(2) Succession of Cmd. [Chain of command]
```

## Document Closing Requirements

```
ACKNOWLEDGE:
[COMMANDER'S LAST NAME]
[RANK]

OFFICIAL:
[STAFF OFFICER]
[POSITION]

ANNEXES:
[List of annexes, appendices, and tabs]

DISTRIBUTION:
[List of units receiving the order]
```

## Formatting Rules

### Outline Hierarchy
- Main paragraphs: 1., 2., 3., etc.
- First sub-level: a., b., c., etc.
- Second sub-level: (1), (2), (3), etc.
- Third sub-level: (a), (b), (c), etc.
- Fourth sub-level (if needed): 1, 2, 3, etc.

### Classification Markings
- Include "(U)" before each paragraph title to indicate unclassified information

### Date-Time Groups
- Use military format: DDHHMMMONYR (e.g., 131200APR18)
- For date spans: DDMONYY format (e.g., 31MAY18 to 03JUN18)

### Military Grid References
- Format as "MP XXX YYY" for grid coordinates
- Include "vic." (vicinity) before grid references

### Time References
- Use 24-hour military time format (e.g., 1500 for 3:00 PM)
- Include time zone identifier when appropriate

## Document Type Differences

### WARNORD (Warning Order)
- Issued earlier with preliminary information
- Contains tentative information (marked as TBP - To Be Published)
- Less detailed execution information
- Titled as "WARNORD # TO OPORD [number]"

### OPORD (Operation Order)
- Detailed and finalized information
- Complete task organizations and execution details
- Fully developed annexes and appendices
