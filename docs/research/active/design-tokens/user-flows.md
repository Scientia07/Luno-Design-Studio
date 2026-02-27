<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       user-flows.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★★
author:         Joel + Claude
related_docs:   [../../prd/prd-design-studio.md, quality-audit-2026-02-26.md]
description:    User flow analysis — primary journeys, edge cases, and interaction patterns for Luno Design Studio
==============================================================================
-->

# User Flows — Luno Design Studio

> **Purpose:** Map every user journey through the product to find UX gaps, missing states, and interaction patterns
> **Method:** Persona-driven flow analysis with state diagrams

---

## Table of Contents

- [1. User Personas](#1-user-personas)
- [2. Core User Flows](#2-core-user-flows)
  - [Flow A: First Visit (Onboarding)](#flow-a-first-visit-onboarding)
  - [Flow B: Color Exploration](#flow-b-color-exploration)
  - [Flow C: Build a Theme from Scratch](#flow-c-build-a-theme-from-scratch)
  - [Flow D: Apply & Customize a Preset](#flow-d-apply--customize-a-preset)
  - [Flow E: Export & Share](#flow-e-export--share)
  - [Flow F: Receive a Shared Theme](#flow-f-receive-a-shared-theme)
  - [Flow G: Layout Building (Phase 2)](#flow-g-layout-building-phase-2)
  - [Flow H: Accessibility Review](#flow-h-accessibility-review)
- [3. State Diagram: Application Lifecycle](#3-state-diagram-application-lifecycle)
- [4. Edge Cases & Error States](#4-edge-cases--error-states)
- [5. Interaction Patterns](#5-interaction-patterns)
- [6. Gaps Identified](#6-gaps-identified)

---

## 1. User Personas

| Persona | Name | Goal | Behavior |
|---------|------|------|----------|
| **The Explorer** | Alex | Browse themes, find inspiration, play with colors | Short sessions, lots of preset browsing, rarely exports |
| **The Builder** | Sam | Create a custom design system for a project | Long sessions, tweaks every token, exports CSS/JSON |
| **The Learner** | Kim | Understand color theory, frameworks, CSS variables | Reads tooltips, compares v1/v2, explores harmony modes |
| **The Accessor** | Jordan | Ensure design is accessible, WCAG compliant | Runs contrast checks, uses colorblind sim, iterates on failures |
| **The Collaborator** | Morgan | Share themes with team, import others' work | Uses share URL, imports JSON, applies team presets |

---

## 2. Core User Flows

### Flow A: First Visit (Onboarding)

This is the **most critical flow** — it determines whether a user stays or leaves.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW A: FIRST VISIT                                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① User opens URL / index.html                                          │
│     │                                                                    │
│     ▼                                                                    │
│  ② Check: URL has #theme= parameter?                                    │
│     │                                                                    │
│     ├── YES → Decode theme → Apply → Skip to ⑥                         │
│     │                                                                    │
│     └── NO → Check: localStorage has saved state?                        │
│              │                                                           │
│              ├── YES → Load saved state → Apply → Skip to ⑥            │
│              │                                                           │
│              └── NO → First-time experience ③                           │
│                                                                          │
│  ③ Show default theme (LunoLabs Dark)                                   │
│     • All tokens populated with sensible defaults                        │
│     • Preview area shows real component examples                         │
│     • Left panel open on "Colors" tab                                    │
│     │                                                                    │
│     ▼                                                                    │
│  ④ [DECISION POINT] Show guided tour?                                   │
│     │                                                                    │
│     ├── Option A: Subtle highlights (Rough Notation)                     │
│     │   "Try changing the primary color →"                               │
│     │   Highlights the first color picker with hand-drawn circle         │
│     │                                                                    │
│     ├── Option B: Quick tips on first interaction                        │
│     │   User clicks color picker → tooltip: "Tip: Try the                │
│     │   Harmony tab to auto-generate matching colors"                    │
│     │                                                                    │
│     └── Option C: No tour, just clear labels                            │
│         The UI is self-explanatory enough                                │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ User makes first change                                              │
│     • Preview updates INSTANTLY (< 50ms)                                 │
│     • "Auto-saved" indicator appears in status bar                       │
│     • Undo button becomes active                                         │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ User is now in the ACTIVE EDITING state                              │
│     • All controls responsive                                            │
│     • History tracking active                                            │
│     • Auto-save running (debounced 2s)                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Decision: Onboarding approach**
- Recommendation: **Option B** — contextual tips on first interaction, dismissible, stored in localStorage as `onboarding_seen: true`
- Rough Notation highlights (Option A) can accent the tips

**Missing from current plans:**
- [ ] Default theme definition (what are the exact starting values?)
- [ ] First-interaction tooltip content
- [ ] `onboarding_seen` flag in localStorage

---

### Flow B: Color Exploration

The most common flow — users playing with colors to see what looks good.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW B: COLOR EXPLORATION                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① User is on Tokens tab > Colors section                               │
│     │                                                                    │
│     ▼                                                                    │
│  ② Pick a base color                                                    │
│     ├── Click color swatch → opens color picker                         │
│     ├── Type hex value → validates → applies                            │
│     └── Paste from clipboard → validates → applies                      │
│     │                                                                    │
│     ▼                                                                    │
│  ③ [INSTANT] Preview updates                                            │
│     • All components using --color-primary change                        │
│     • WCAG contrast badges update (pass/fail)                            │
│     • If contrast fails → warning indicator appears                      │
│     │                                                                    │
│     ▼                                                                    │
│  ④ [OPTIONAL] Open Harmony panel                                        │
│     ├── Select mode: Complementary / Analogous / Triadic / etc.         │
│     ├── See generated palette from base color                            │
│     ├── Click "Apply" → fills Secondary, Accent from harmony            │
│     └── Click individual harmony color → applies to specific token      │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ [OPTIONAL] Expand palette (50–900 shades)                            │
│     ├── Auto-generated OKLCH lightness scale                             │
│     ├── Each shade shown as swatch with hex label                        │
│     └── Click shade → copies hex to clipboard                           │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ [OPTIONAL] Check accessibility                                       │
│     ├── Toggle colorblind simulation overlay                             │
│     ├── View WCAG contrast matrix (all color pairs)                     │
│     └── Click failing pair → suggestion tooltip                         │
│     │                                                                    │
│     ▼                                                                    │
│  ⑦ Iterate: repeat ②–⑥ for other tokens                               │
│     (secondary, accent, surfaces, text colors)                           │
│                                                                          │
│  STATE CHANGES DURING THIS FLOW:                                         │
│  • Each color change → state.set() → CSS var update → preview           │
│  • Each change → pushed to undo stack (debounced ~300ms)                │
│  • Auto-save fires 2s after last change                                  │
│  • URL hash updates on save (optional, can be disabled)                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Interaction detail: Color picker behavior**
```
User clicks swatch:
  → Picker opens (vanilla-colorful or native input)
  → User drags / adjusts
  → EVERY intermediate value updates preview (throttled 16ms = 60fps)
  → ONLY final value (on mouse-up) pushes to undo stack
  → Debounced save (2s after last change)
```

**Missing from current plans:**
- [ ] Throttle vs debounce strategy for real-time color updates
- [ ] Clipboard paste validation
- [ ] Harmony "Apply" button behavior — replace all? Or only empty tokens?
- [ ] Palette shade copy-to-clipboard UX

---

### Flow C: Build a Theme from Scratch

The "power user" journey — Sam wants a complete design system.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW C: BUILD THEME FROM SCRATCH                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① Name the theme                                                       │
│     • Click theme name in header → edit inline                           │
│     • Default: "Untitled Theme"                                          │
│     │                                                                    │
│     ▼                                                                    │
│  ② Set primary color                                                    │
│     • Pick base → generate harmony → apply palette                      │
│     • Check contrast → fix failures                                      │
│     │                                                                    │
│     ▼                                                                    │
│  ③ Set surface colors                                                   │
│     • Background (dark + light variants)                                 │
│     • Card background                                                    │
│     • Text primary + muted                                               │
│     • [AUTO-SUGGEST]: derive surfaces from primary color                │
│     │                                                                    │
│     ▼                                                                    │
│  ④ Configure typography                                                 │
│     • Choose heading font (Google Fonts dropdown with preview)           │
│     • Choose body font                                                   │
│     • Set scale ratio (preview: h1→h6 sizes)                            │
│     • Adjust weight + line-height                                        │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ Set spacing & radius                                                 │
│     • Base unit slider (2px / 4px / 8px)                                │
│     • Preview: spacing scale visualized as blocks                        │
│     • Border radius slider                                               │
│     • Preview: components update radius live                             │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ Configure shadows                                                    │
│     • Presets: none / subtle / medium / dramatic                         │
│     • Custom: offset-x, offset-y, blur, spread, color                   │
│     • Preview: card component shows shadow live                          │
│     │                                                                    │
│     ▼                                                                    │
│  ⑦ Toggle dark/light mode                                               │
│     • Switch preview to light mode                                       │
│     • Auto-generated light surfaces (or manually override)              │
│     • Verify contrast in both modes                                      │
│     │                                                                    │
│     ▼                                                                    │
│  ⑧ Run accessibility audit                                              │
│     • WCAG contrast matrix → fix any failures                           │
│     • Colorblind simulation → verify each mode                          │
│     │                                                                    │
│     ▼                                                                    │
│  ⑨ Export                                                                │
│     • CSS Variables → copy / download                                    │
│     • JSON (W3C Design Tokens) → download                               │
│     • Shareable URL → copy                                               │
│     • [CELEBRATION] → confetti on first export 🎉                       │
│                                                                          │
│  ESTIMATED TIME: 5–15 minutes for a complete theme                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Gap identified: Surface auto-suggestion**
- When user picks a primary color, we should auto-suggest:
  - Dark mode background: primary at 5% lightness in OKLCH
  - Light mode background: primary at 97% lightness in OKLCH
  - Card surface: primary tinted at low opacity
- This is not in the PRD but would dramatically improve the "from scratch" experience

**Missing from current plans:**
- [ ] Theme naming UX (inline edit in header)
- [ ] Surface color auto-suggestion from primary
- [ ] Light mode auto-generation algorithm
- [ ] Shadow presets (none/subtle/medium/dramatic)
- [ ] Google Fonts preview in dropdown

---

### Flow D: Apply & Customize a Preset

The "quick start" journey — Alex wants to browse and customize.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW D: APPLY & CUSTOMIZE PRESET                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① Open Preset Browser                                                  │
│     • Panel slides open (or section in left sidebar)                     │
│     • Categories: Custom (6) | Gogh (250+) | Catppuccin (4) | Material  │
│     │                                                                    │
│     ▼                                                                    │
│  ② Browse presets                                                       │
│     ├── Search by name: "monokai", "dracula", "solarized"               │
│     ├── Filter by mood: warm / cool / neutral / vibrant                 │
│     ├── Filter by type: dark / light / both                             │
│     └── Each preset shows: name + 5-color mini-swatch                   │
│     │                                                                    │
│     ▼                                                                    │
│  ③ Preview a preset                                                     │
│     ├── HOVER: preview updates temporarily (no state change)             │
│     └── CLICK: preview locks, but NOT yet saved                         │
│     │                                                                    │
│     ▼                                                                    │
│  ④ [DECISION] Apply or cancel?                                          │
│     │                                                                    │
│     ├── APPLY: preset values merge into state                            │
│     │   • Undo stack gets snapshot (can undo entire preset)              │
│     │   • Toast: "Applied 'Dracula' theme"                               │
│     │   • Preset name shows in header                                    │
│     │                                                                    │
│     └── CANCEL: revert to previous state                                │
│         • Preview snaps back                                             │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ Customize the applied preset                                        │
│     • Change individual colors, fonts, spacing                           │
│     • Theme name auto-changes to "Dracula (modified)"                   │
│     • Full undo/redo available                                           │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ [OPTIONAL] Save as custom preset                                    │
│     • "Save as Preset" button → name it → appears in Custom category    │
│     • Stored in localStorage                                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key UX decision: Hover preview**
- When hovering over a preset, the preview should update temporarily without committing to state
- This requires a "preview mode" in state management — temporary CSS var overrides that revert on mouse-leave
- This is NOT in the current architecture

**Missing from current plans:**
- [ ] Preset hover preview (temporary state override)
- [ ] Preset search & filter UX
- [ ] Mood/type filtering of presets (requires metadata tagging)
- [ ] "Save as Preset" flow
- [ ] "(modified)" indicator when preset is customized
- [ ] Preset category tabs

---

### Flow E: Export & Share

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW E: EXPORT & SHARE                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① Click "Export" in status bar (or nav)                                │
│     │                                                                    │
│     ▼                                                                    │
│  ② Export modal / panel opens with tabs:                                │
│     │                                                                    │
│     ├── [CSS] Tab:                                                       │
│     │   • Syntax-highlighted :root { } block                            │
│     │   • Toggle: include dark mode / light mode / both                 │
│     │   • Toggle: include comments                                       │
│     │   • [Copy] button → clipboard + toast "Copied!"                   │
│     │   • [Download] button → variables.css file                        │
│     │                                                                    │
│     ├── [JSON] Tab:                                                      │
│     │   • W3C Design Tokens format (stable 2025.10 spec)                │
│     │   • Syntax-highlighted JSON                                        │
│     │   • [Copy] / [Download] buttons                                    │
│     │                                                                    │
│     ├── [URL] Tab:                                                       │
│     │   • Generated shareable URL with #theme= hash                     │
│     │   • One-click copy                                                 │
│     │   • QR code? (stretch goal)                                        │
│     │   • Warning if URL exceeds ~2000 chars                            │
│     │                                                                    │
│     └── [HTML] Tab:                                                      │
│         • Complete HTML snippet with inline styles                       │
│         • Preview of what the snippet looks like                         │
│         • [Copy] / [Download] buttons                                    │
│                                                                          │
│  ③ On first successful export:                                          │
│     • 🎉 canvas-confetti celebration                                    │
│     • Stores `first_export_done: true` in localStorage                   │
│                                                                          │
│  ④ Toast notification confirms action                                   │
│     • "Copied CSS to clipboard" / "Downloaded tokens.json"              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Missing from current plans:**
- [ ] Export modal/panel design
- [ ] Dark/light/both toggle in CSS export
- [ ] Comments toggle in CSS export
- [ ] URL length warning
- [ ] HTML snippet export with inline preview
- [ ] First-export celebration trigger

---

### Flow F: Receive a Shared Theme

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW F: RECEIVE SHARED THEME                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① User receives URL with #theme=eyJ...                                 │
│     │                                                                    │
│     ▼                                                                    │
│  ② Page loads → detects URL hash                                        │
│     │                                                                    │
│     ├── Hash valid → decode Base64 → parse JSON                         │
│     │   │                                                                │
│     │   ├── JSON valid → apply theme → show editor                      │
│     │   │   • Banner: "Loaded shared theme: 'Ocean Breeze'"             │
│     │   │   • User can edit, export, save as own                        │
│     │   │                                                                │
│     │   └── JSON invalid (corrupted/truncated)                          │
│     │       • Banner: "Couldn't load shared theme — using defaults"     │
│     │       • Load default theme                                         │
│     │                                                                    │
│     └── Hash invalid (not Base64)                                       │
│         • Ignore hash silently                                           │
│         • Load from localStorage or defaults                             │
│                                                                          │
│  ③ [DECISION] Does user have existing saved work?                       │
│     │                                                                    │
│     ├── YES → "You have unsaved work. Load shared theme anyway?"        │
│     │         [Load Shared] [Keep Mine] [Compare Side-by-Side]          │
│     │                                                                    │
│     └── NO → Apply shared theme directly                                │
│                                                                          │
│  ④ Shared theme now behaves like a normal editing session               │
│     • Full undo/redo                                                     │
│     • Auto-save to localStorage                                         │
│     • Can re-export / re-share                                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical gap: Conflict resolution**
- What if the user has unsaved work AND receives a shared URL?
- The PRD doesn't address this at all
- Recommendation: Show a modal with options (Load / Keep / Compare)

**Missing from current plans:**
- [ ] URL hash decode error handling
- [ ] Conflict resolution when shared theme overwrites local work
- [ ] "Loaded shared theme" banner/notification
- [ ] Base64 decode safety (try/catch, validation)

---

### Flow G: Layout Building (Phase 2)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW G: LAYOUT BUILDING                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① Switch to Layout tab                                                 │
│     • Canvas changes from component preview to grid canvas               │
│     • Properties panel changes to layout controls                        │
│     │                                                                    │
│     ▼                                                                    │
│  ② Choose layout mode                                                   │
│     ├── CSS Grid (default)                                               │
│     │   • Set columns (slider: 1–12)                                    │
│     │   • Set rows (auto or fixed count)                                │
│     │   • Set gap (slider)                                               │
│     │                                                                    │
│     └── Flexbox                                                          │
│         • Direction: row / column                                        │
│         • Wrap: nowrap / wrap                                            │
│         • Justify: start / center / end / between / around              │
│         • Align: start / center / end / stretch                         │
│     │                                                                    │
│     ▼                                                                    │
│  ③ Add blocks to canvas                                                 │
│     ├── Drag from block library → drop onto grid                        │
│     │   Block types: Header, Sidebar, Content, Footer, Card, Nav        │
│     │                                                                    │
│     └── Click "Add Block" → placed in next available cell               │
│     │                                                                    │
│     ▼                                                                    │
│  ④ Arrange blocks                                                       │
│     • Drag to reorder (SortableJS)                                      │
│     • Resize with handles (interact.js)                                  │
│     • Set grid-area manually (advanced)                                  │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ Preview at different viewports                                       │
│     • Toggle: 320px / 768px / 1024px / 1440px                          │
│     • Canvas resizes to show responsive behavior                         │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ [OPTIONAL] Apply layout template                                    │
│     • Holy Grail, Sidebar, Dashboard, Magazine, Card Grid               │
│     • Template fills grid with preset block arrangement                  │
│     │                                                                    │
│     ▼                                                                    │
│  ⑦ Export layout                                                        │
│     • HTML + CSS code for the layout                                     │
│     • Preview of exported code                                           │
│     • Copy / Download                                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Flow H: Accessibility Review

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW H: ACCESSIBILITY REVIEW                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ① Enable WCAG Dashboard                                                │
│     • Shows contrast matrix: every color pair tested                     │
│     │                                                                    │
│     ▼                                                                    │
│  ② View contrast results                                                │
│     • Grid: text colors × background colors                             │
│     • Each cell: ratio (e.g., "7.3:1") + badge (AA ✅ / AAA ✅ / ❌)  │
│     • Failing pairs highlighted in red                                   │
│     │                                                                    │
│     ▼                                                                    │
│  ③ Fix failing pairs                                                    │
│     ├── Click failing cell → suggestion popup                           │
│     │   "Lighten text to #e2e8f0 for 4.5:1 AA compliance"              │
│     │   [Apply Fix] [Ignore]                                             │
│     │                                                                    │
│     └── Manual adjustment → matrix updates live                         │
│     │                                                                    │
│     ▼                                                                    │
│  ④ Enable colorblind simulation                                        │
│     • Dropdown: None / Deuteranopia / Protanopia / Tritanopia           │
│     • Preview area applies simulation filter                             │
│     • Does NOT change actual token values                                │
│     │                                                                    │
│     ▼                                                                    │
│  ⑤ Verify in all simulation modes                                       │
│     • Check that important distinctions remain visible                   │
│     • Error (red) vs Success (green) must remain distinguishable         │
│     │                                                                    │
│     ▼                                                                    │
│  ⑥ [OPTIONAL] Run full audit                                            │
│     • Summary: "12/15 color pairs pass AA"                               │
│     • List of all issues with one-click fixes                            │
│     • Export: accessibility report as JSON/text                          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Missing from current plans:**
- [ ] Contrast fix suggestions (auto-compute nearest compliant color)
- [ ] Accessibility report export
- [ ] Color pair matrix UI design
- [ ] "Indistinguishable in colorblind mode" warning

---

## 3. State Diagram: Application Lifecycle

```
                    ┌──────────────┐
                    │   LOADING    │
                    └──────┬───────┘
                           │
                    Check sources:
                    1. URL hash
                    2. localStorage
                    3. Defaults
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ URL Theme│ │  Saved   │ │ Default  │
        │  Loaded  │ │  State   │ │  Theme   │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             └────────────┼────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │    READY     │ ← CSS vars applied, preview rendered
                   └──────┬───────┘
                          │
                    User interaction
                          │
                          ▼
                   ┌──────────────┐
                   │   EDITING    │ ← Active state changes, history tracking
                   └──────┬───────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │   Undo   │ │  Apply   │ │  Export   │
        │   Redo   │ │  Preset  │ │  Share    │
        └──────────┘ └──────────┘ └──────────┘
              │           │           │
              └───────────┼───────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  AUTO-SAVE   │ ← Debounced 2s after last change
                   └──────┬───────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   EDITING    │ ← Back to editing loop
                   └──────────────┘
```

### State Transitions Detail

| From | Trigger | To | Side Effects |
|------|---------|-----|-------------|
| LOADING | URL hash found | READY | Decode + apply theme, show banner |
| LOADING | localStorage found | READY | Load + apply saved state |
| LOADING | Nothing found | READY | Apply default theme |
| READY | User changes any control | EDITING | Push to undo stack, start auto-save timer |
| EDITING | Undo/Redo | EDITING | Pop/push history, update CSS vars |
| EDITING | Apply preset | EDITING | Snapshot current → undo stack, apply preset values |
| EDITING | 2s idle | AUTO-SAVE | Write to localStorage, optionally update URL hash |
| EDITING | Export clicked | EXPORT MODAL | Generate export content, show modal |
| EDITING | Share clicked | EDITING | Encode state → URL hash, copy to clipboard |
| ANY | CDN failure | ERROR | Show fallback UI, try local lib copies |
| ANY | localStorage full | WARNING | Show toast, suggest export to file |

---

## 4. Edge Cases & Error States

| # | Scenario | Current Plan | Recommendation |
|---|----------|-------------|----------------|
| E1 | localStorage full (5MB limit) | Not addressed | Toast warning + suggest JSON export |
| E2 | URL hash > 2000 chars | Not addressed | Truncate to colors+fonts only, show warning |
| E3 | Chroma.js CDN unreachable | Local fallback in `/lib/` | Also show "offline mode" indicator |
| E4 | User pastes invalid hex ("banana") | Not addressed | Validate before state.set(), show inline error |
| E5 | User opens on mobile (< 768px) | Responsive layout planned | But no touch-optimized color picker plan |
| E6 | 250+ presets slow to render | Not addressed | Virtualize the preset list (render only visible) |
| E7 | User opens two tabs with same theme | localStorage sync | Use `storage` event listener for cross-tab sync |
| E8 | User clicks Undo 30+ times | History limit of 30 | Disable undo button when stack empty, show toast |
| E9 | Google Fonts CDN unreachable | Not addressed | System font fallback + warning |
| E10 | User tries to undo a preset apply | One undo should revert entire preset | Ensure preset apply is one atomic undo step |
| E11 | Browser doesn't support OKLCH | Not addressed | Detect `CSS.supports('color', 'oklch(0.5 0.2 240)')`, fallback to hex |
| E12 | Copy to clipboard fails (HTTP, no permission) | Not addressed | Fallback: select text in a textarea, show "Select All + Copy" |

---

## 5. Interaction Patterns

### 5.1 Real-Time Update Pipeline

```
User Input (e.g., color picker drag)
  │
  ▼ throttle 16ms (60fps)
CSS Custom Property Update (instant visual)
  │
  ▼ debounce 300ms
State Object Update (triggers observers)
  │
  ▼ debounce 300ms
History Push (undo stack snapshot)
  │
  ▼ debounce 2000ms
localStorage Save (persistence)
  │
  ▼ debounce 2000ms (optional)
URL Hash Update (shareable state)
```

**Why multi-level debouncing?**
- CSS update must be instant (user sees lag otherwise)
- State update can be slightly delayed (observers don't need every pixel)
- History should batch rapid changes (dragging a slider = one undo step)
- Persistence should be infrequent (localStorage writes are synchronous and blocking)

### 5.2 Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Ctrl+Z` | Undo | Global |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo | Global |
| `Ctrl+S` | Export CSS (copy) | Global |
| `Ctrl+Shift+S` | Export JSON (download) | Global |
| `Ctrl+Shift+U` | Copy share URL | Global |
| `Space` | Randomize current color | Color picker focused |
| `Tab` / `Shift+Tab` | Navigate between controls | Global |
| `Escape` | Close modal/panel | Modal open |
| `1-5` | Switch tabs (Tokens/Layout/Shapes/Components/Export) | Global |
| `D` | Toggle Dark/Light preview | Global |
| `[` / `]` | Previous/Next preset | Preset browser focused |

### 5.3 Responsive Touch Patterns (Mobile)

| Desktop Action | Mobile Equivalent |
|----------------|-------------------|
| Hover preset to preview | Long-press to preview, release to cancel |
| Right-click context menu | Long-press menu |
| Drag slider | Touch drag with larger hit target |
| Color picker fine adjustment | Pinch to zoom color space |
| Keyboard shortcuts | Gesture bar or toolbar buttons |

---

## 6. Gaps Identified (New Items for Planning)

### Priority: Must Address Before Building

| # | Gap | Impact | Suggested Solution |
|---|-----|--------|-------------------|
| G1 | No onboarding flow defined | Users won't know what to do | Contextual tooltips on first interaction |
| G2 | No input validation layer | Crashes on bad input | Validate in state.set() before applying |
| G3 | No error states designed | Silent failures | Toast notifications + inline error indicators |
| G4 | Harmony algo uses HSL not OKLCH | Wrong colors generated | Fix code to use oklch.h for hue rotation |
| G5 | No debounce strategy for real-time updates | Jank or undo bloat | Multi-level debounce pipeline (see 5.1) |
| G6 | Preset hover preview not in architecture | Users can't browse safely | Add "preview mode" to state management |

### Priority: Should Address in Planning

| # | Gap | Impact | Suggested Solution |
|---|-----|--------|-------------------|
| G7 | No multi-theme management | Users can only have one theme | localStorage theme list, save/load/delete |
| G8 | No conflict resolution for shared URLs | Overwrites unsaved work | Modal: Load / Keep / Compare |
| G9 | No testing tasks or acceptance criteria | Quality unknown | Add test tasks + done criteria to TO-DOS |
| G10 | No vertical slice task | Architecture unvalidated | Task 0: one color picker end-to-end |
| G11 | No surface auto-suggestion from primary | "From scratch" is slow | OKLCH lightness derivation for surfaces |
| G12 | No preset metadata (mood, type) | Can't filter 250+ presets | Tag presets during import |

### Priority: Nice-to-Have

| # | Gap | Impact | Suggested Solution |
|---|-----|--------|-------------------|
| G13 | No CSS import/paste flow | Developers can't migrate themes | Parse `:root { }` block into tokens |
| G14 | No keyboard-driven palette (Coolors.co) | Less fun to use | Spacebar=randomize, arrows=navigate |
| G15 | No theme diffing | Can't compare presets | Side-by-side swatch comparison |
| G16 | No QR code for share URL | Can't share to mobile | QR generation library (~3KB) |

---

*Analysis completed: 2026-02-26 | Version 1.0.0*
