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

a.  (U) Commander's Intent. [Intent statement]

(1) (U) Key Tasks.
(a) [Key task 1]
(b) [Key task 2]

(2) (U) End State. [Description of successful completion]

b.  (U) Concept of the Operations. [Overview of operations]

c.   (U) Scheme of Fires [Details of fire support plan]

d.  (U) Task to Subordinate Units:
(1) [Unit 1]
(a) [Task 1]
(b) [Task 2]

e.  (U) Coordinating Instructions.
[Numbered list of instructions applicable to two or more units]
```

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
