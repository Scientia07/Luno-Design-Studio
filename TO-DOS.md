<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       TO-DOS.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★★
author:         Joel + Claude
related_docs:   [CLAUDE.md, docs/ROADMAP.md, docs/prd/prd-design-studio.md]
description:    Sprint task list with priorities and progress tracking
==============================================================================
-->

# Luno Design Studio - Tasks

> **Sprint:** Setup & Phase 1 Foundation
> **Started:** 2026-02-26
> **Based on:** PRD Design Studio v2.0.0

## Quick Stats

| Priority | Tasks | Status |
|----------|-------|--------|
| High | 6 | 0/6 Complete |
| Medium | 4 | 0/4 Complete |
| Low | 2 | 0/2 Complete |
| **Total** | **12** | **0/12 (0%)** |

---

## High Priority

### Task 1: Central State Module
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Impact:** Foundation — everything depends on this

**File:** `v1-vanilla/js/studio-state.js`

**What to build:**
- Observer pattern for reactive state
- History stack (Undo/Redo, 30+ steps)
- localStorage persistence (debounced 2s)
- URL hash sync (Base64 encoded shareable state)
- W3C Design Token compatible data model

---

### Task 2: Token Editor — Color Controls
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Impact:** Core feature — color picking with live preview

**File:** `v1-vanilla/js/editors/token-editor.js`

**What to build:**
- Color pickers for Primary, Secondary, Accent, Semantic, Surface tokens
- Live CSS custom property updates
- Integration with studio-state.js
- WCAG contrast warnings on every change

---

### Task 3: Color Harmony Engine
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Impact:** Key differentiator — perceptually correct palettes

**File:** `v1-vanilla/js/editors/color-harmony.js`

**What to build:**
- Chroma.js integration (OKLCH mode)
- Harmony modes: Complementary, Analogous, Triadic, Split-Complementary, Tetradic
- Auto-generate palette from single base color
- Colorblind simulation (Deuteranopia, Protanopia, Tritanopia)

---

### Task 4: Typography Controls
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Impact:** Essential token — fonts affect entire feel

**File:** `v1-vanilla/js/editors/token-editor.js` (extend)

**What to build:**
- Font family dropdown (System fonts + Google Fonts)
- Font size with scale ratio (1.125, 1.25, 1.333, 1.5)
- Weight slider (100-900)
- Line-height slider
- Live preview on sample text

---

### Task 5: Main Editor HTML/CSS
- [ ] **Status:** Pending
- **Effort:** ~3 hours
- **Impact:** The actual UI — editor layout, panels, canvas

**Files:** `v1-vanilla/index.html`, `v1-vanilla/css/studio.css`

**What to build:**
- Navigation bar with tab switching
- Left panel (properties/controls)
- Right canvas (live preview)
- Status bar
- Dark theme matching LunoLabs aesthetic
- Responsive layout

---

### Task 6: Theme Presets & Browser
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Impact:** 250+ presets = instant value

**Files:** `v1-vanilla/js/presets.js`, `v1-vanilla/data/presets/`

**What to build:**
- 6 custom LunoLabs presets
- Gogh theme loader (250+ terminal themes → design tokens)
- Catppuccin (4 flavors)
- Material Design palette
- Search & filter UI
- One-click apply with undo

---

## Medium Priority

### Task 7: Export Engine
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Impact:** Utility — lets users take their work out

**File:** `v1-vanilla/js/export-engine.js`

**What to build:**
- CSS Variables export (copy + download)
- JSON export (W3C Design Tokens format)
- Shareable URL generation
- HTML snippet export

---

### Task 8: Spacing & Border Radius Controls
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Impact:** Completes the token set

**File:** `v1-vanilla/js/editors/token-editor.js` (extend)

**What to build:**
- Base unit slider (4px system)
- Generated spacing scale preview
- Border-radius slider with live preview on components
- Shadow editor (offset, blur, spread, color)

---

### Task 9: Dark/Light Mode Toggle
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Impact:** Essential for realistic preview

**What to build:**
- Toggle between dark and light token sets
- Preview area switches independently of editor UI
- Smooth transition animation

---

### Task 10: WCAG Contrast Dashboard
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Impact:** Accessibility — differentiator feature

**What to build:**
- Auto-check all token combinations
- AA/AAA pass/fail badges
- Suggested fixes for failing combinations
- Color blindness simulation overlay

---

## Low Priority

### Task 11: Keyboard Shortcuts
- [ ] **Status:** Pending
- **Effort:** ~30 min

**What to build:**
- Ctrl+Z / Ctrl+Y: Undo/Redo
- Ctrl+S: Save/Export
- Ctrl+Shift+U: Share URL
- Tab: Navigate between controls

---

### Task 12: Research & Docs
- [ ] **Status:** Pending
- **Effort:** ~1 hour

**What to do:**
- Populate research docs (color science, design tokens spec)
- Document architecture decisions
- Create integration plan for Gogh themes JSON

---

## Schedule

| Session | Tasks | Focus |
|---------|-------|-------|
| **Session 1** | Task 5, Task 1 | UI shell + State foundation |
| **Session 2** | Task 2, Task 3 | Color editing + harmony |
| **Session 3** | Task 4, Task 8 | Typography + spacing |
| **Session 4** | Task 6, Task 7 | Presets + export |
| **Session 5** | Task 9, Task 10 | Dark/light + WCAG |
| **Session 6** | Task 11, Task 12 | Polish + docs |

---

## Notes

- v1-vanilla must work with zero build tools (CDN imports only)
- Chroma.js is the color backbone — use OKLCH mode everywhere
- State module is the foundation — build it first, test it well
- Preview area should use CSS custom properties cascading (not JS style manipulation)
