<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       ROADMAP.md
created:        2026-02-26
updated:        2026-03-01
version:        2.2.0
status:         active
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [../TO-DOS.md, prd/prd-design-studio.md, research/active/design-tokens/user-flows.md]
description:    Project roadmap with phases, milestones, definitions of done, and long-term vision
==============================================================================
-->

# Design Studio Roadmap

---

## Phase Overview

```
Phase 0: Foundation & Vertical Slice  ████████████████████ 100%  ✓ DONE
Phase 1: Design Tokens Studio         ░░░░░░░░░░░░░░░░░░░░  0%   ← CURRENT
Phase 2: Layout Playground            ░░░░░░░░░░░░░░░░░░░░  0%
Phase 3: Shape & Component Lab        ░░░░░░░░░░░░░░░░░░░░  0%
Phase 4: Svelte 5 Rebuild             ░░░░░░░░░░░░░░░░░░░░  0%
```

---

## Phase 0 — Foundation & Vertical Slice

**Goal:** Validate tooling, establish base styles, prove the state → CSS → preview architecture with one working color picker before building everything else.

**Target:** Pre-v0.1.0

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| CDN & Import Map Validation | High | **Done** | Chroma.js 3.1.2 + vanilla-colorful 0.7.2 via import map (CW-03) |
| Studio Chrome CSS Variables | High | **Done** | `--studio-*` vars added to `shared/styles/base.css` (CW-02) |
| Vertical Slice (1 color picker E2E) | High | **Done** | 5 pickers, homepage preview, presets, randomize, export (CW-03) |

### Definition of Done — Phase 0
- [x] Chroma.js imports and runs in browser (CDN + local fallback)
- [x] vanilla-colorful Web Component renders
- [x] One color picker changes a CSS variable that updates a preview component
- [x] Studio chrome is visually separate from preview area
- [x] No console errors

---

## Phase 1 — Design Tokens Studio

**Goal:** Build a fully functional visual editor for design tokens (colors, typography, spacing, shadows) with 250+ theme presets, accessibility tools, onboarding, and export.

**Target:** v0.1.0 (MVP) → v0.2.0 (Presets & Polish)

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Central State Module | High | Pending | Observer + history + validation + preview mode |
| Main Editor HTML/CSS Shell | High | Pending | 3-panel layout with Split.js |
| Color Token Controls | High | Pending | 11 color pickers + WCAG badges |
| Color Harmony Engine | High | Pending | OKLCH palette generation (not HSL!) |
| Typography Controls | High | Pending | Font picker, scale ratio, weight |
| Live Preview Panel | High | Pending | 6+ component types, all CSS var driven |
| Theme Presets & Browser | High | Pending | 250+ presets, search, hover preview |
| Dark/Light Mode Toggle | High | Pending | Preview switching, auto-generated light |
| WCAG Contrast Dashboard | Medium | Pending | Matrix + fix suggestions |
| Colorblind Simulation | Medium | Pending | SVG filter overlay + warnings |
| Spacing & Radius Controls | Medium | Pending | Base unit, scale, shadows |
| Export Engine | Medium | Pending | CSS/JSON/URL/HTML + Prism.js highlighting |
| Input Validation & Errors | Polish | Pending | Reject bad input, CDN fallbacks |
| Keyboard Shortcuts | Polish | Pending | Undo/Redo, export, tab switching |
| Onboarding & First-Run | Polish | Pending | Contextual tips, Rough Notation highlights |

### Definition of Done — Phase 1 (v0.1.0 MVP)
- [ ] All 11 color tokens editable with live preview
- [ ] Color harmony generates perceptually correct OKLCH palettes
- [ ] Typography controls change fonts, sizes, weights in preview
- [ ] Undo/Redo works for 30+ steps
- [ ] ≥6 custom presets load and apply correctly
- [ ] CSS export produces valid, pasteable `:root { }` block
- [ ] Dark/Light toggle switches preview mode
- [ ] WCAG contrast warnings appear for failing pairs
- [ ] State persists across page reload
- [ ] No console errors; invalid input rejected gracefully

### Definition of Done — Phase 1 (v0.2.0 Polish)
- [ ] 250+ Gogh themes browsable with search/filter
- [ ] Catppuccin (4 flavors) + Material presets integrated
- [ ] Preset hover preview works (temporary state, reverts on leave)
- [ ] Shareable URL encodes/decodes theme correctly
- [ ] Colorblind simulation renders all 3 CVD types
- [ ] WCAG dashboard shows fix suggestions
- [ ] First-time onboarding tips appear and dismiss
- [ ] All keyboard shortcuts functional
- [ ] Responsive layout works at 320px–1440px

---

## Phase 2 — Layout Playground

**Goal:** Add CSS Grid/Flexbox visual builder with drag & drop, responsive preview, and layout templates.

**Target:** v0.3.0

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| SortableJS integration | High | Pending | Drag & Drop for grid cells |
| CSS Grid visual builder | High | Pending | Columns, rows, gap controls |
| Block library | High | Pending | Header, Sidebar, Content, Footer, Card |
| Flexbox controls | Medium | Pending | Direction, wrap, justify, align |
| Responsive preview | High | Pending | 320/768/1024/1440px viewport toggle |
| Layout templates | Medium | Pending | Holy Grail, Sidebar, Dashboard, etc. |
| HTML/CSS layout export | High | Pending | Generated code for the layout |

### Definition of Done — Phase 2
- [ ] Users can build a CSS Grid layout by dragging blocks
- [ ] Grid columns, rows, and gap adjustable via sliders
- [ ] ≥5 layout templates load and apply
- [ ] Responsive preview shows layout at 4 breakpoints
- [ ] HTML/CSS export produces valid, usable code
- [ ] Layout state integrates with undo/redo

---

## Phase 3 — Shape & Component Lab

**Goal:** SVG shape editor + component compositor with variants and export.

**Target:** v0.4.0

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| SVG.js integration | High | Pending | Replaces Two.js (lighter, better API) |
| Shape primitives | High | Pending | Rect, Circle, Line, Polygon, Star |
| Shape properties panel | High | Pending | Fill, stroke, size, rotation |
| Shape drag + resize | High | Pending | interact.js for handles |
| Shape layering | Medium | Pending | Z-index controls |
| Component compositor | High | Pending | Build Cards/Buttons/Alerts from tokens |
| Component variants | Medium | Pending | Default, Hover, Active, Disabled states |
| SVG + HTML export | High | Pending | Download SVG, copy HTML snippet |

### Definition of Done — Phase 3
- [ ] ≥5 shape types drawable on SVG canvas
- [ ] Shapes draggable, resizable, rotatable
- [ ] Shape properties (fill, stroke, opacity) editable
- [ ] Component compositor builds from design tokens
- [ ] SVG export downloads valid SVG file
- [ ] Shape state integrates with undo/redo

---

## Phase 4 — Svelte 5 Rebuild

**Goal:** Rebuild all features in Svelte 5, achieve feature parity, document the comparison.

**Target:** v1.0.0

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Svelte + Vite project setup | High | Pending | |
| Svelte Stores (port state) | High | Pending | $state, $derived, $effect |
| All editor components | High | Pending | Port all editors to .svelte |
| Feature parity audit | High | Pending | Checklist: every v1 feature works in v2 |
| Performance benchmark | High | Pending | Load time, FPS, memory, bundle size |
| Comparison docs | High | Pending | LOC, DX, metrics matrix |
| Side-by-side demo | Medium | Pending | Link to both versions from README |

### Definition of Done — Phase 4
- [ ] Every Phase 1-3 feature works identically in Svelte 5
- [ ] Performance benchmarks documented (Lighthouse, DevTools)
- [ ] `comparison/metrics.md` published with data
- [ ] `comparison/dx-notes.md` published with qualitative analysis
- [ ] README updated with comparison matrix

---

## Milestones Summary

| Version | Phase | Key Deliverable |
|---------|-------|----------------|
| **v0.0.1** | 0 | Project scaffolding + docs |
| **v0.0.2** | 0 | Vertical slice (1 color picker E2E) |
| **v0.1.0** | 1 | Token Studio MVP (colors, fonts, export, undo) |
| **v0.2.0** | 1 | 250+ presets, WCAG dashboard, onboarding |
| **v0.3.0** | 2 | Layout Playground |
| **v0.4.0** | 3 | Shape & Component Lab |
| **v1.0.0** | 4 | Svelte rebuild + framework comparison |

---

## Long-Term Vision

### Q1 2026 (Feb–Mar)
- Complete Phase 0 + Phase 1 (Token Studio MVP + Polish)
- Begin Phase 2 (Layout Playground)

### Q2 2026 (Apr–Jun)
- Complete Phase 2 + Phase 3
- Begin Svelte 5 rebuild

### Q3 2026 (Jul–Sep)
- Complete Phase 4
- Publish framework comparison
- Consider additional framework (React? Solid?)

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.0.1 | 2026-02-26 | Project scaffolding, docs, repo setup |
| — | 2026-02-26 | Quality audit: added Phase 0, definitions of done, fixed dependencies |

---

*Last updated: 2026-02-26*
