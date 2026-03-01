<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       2026-03-01-phase0-vertical-slice-design.md
created:        2026-03-01
updated:        2026-03-01
version:        1.0.0
status:         active
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [../../TO-DOS.md, ../prd/prd-design-studio.md, ../research/active/design-tokens/library-research-2026.md]
description:    Design document for Phase 0 — Foundation & Vertical Slice
==============================================================================
-->

# Design: Phase 0 — Foundation & Vertical Slice

> **Approved:** 2026-03-01
> **Scope:** Tasks 0.1, 0.2, 0.3 from TO-DOS.md
> **Approach:** Import Map + ES Modules (modern vanilla JS, zero build tools)

---

## What Phase 0 Proves

The vertical slice validates one critical assumption: **a CDN-only vanilla JS app with ES module imports can drive real-time CSS variable updates through an observer pattern.**

Specifically:
1. ES module import maps work with Chroma.js CDN
2. vanilla-colorful Web Component renders and fires events
3. State → CSS variable → preview cascade works in real-time (< 50ms)
4. `--studio-*` / `--color-*` separation works (changing preview colors doesn't break editor)
5. Chroma.js `oklch()` method works (proof for harmony engine later)

---

## Architecture: The Pipeline

```
User picks color in <hex-color-picker>
  → token-editor.js reads event.detail.value
  → calls state.set('colors.primary', '#newcolor')
  → state validates via chroma(value).hex()
  → state notifies subscribers
  → subscriber calls document.documentElement.style.setProperty('--color-primary', value)
  → CSS cascade instantly updates all preview components
```

---

## File Structure

```
v1-vanilla/
├── index.html              # Entry: import map, HTML shell, skip link
├── css/
│   ├── studio.css          # Editor chrome layout (uses --studio-*)
│   └── preview.css         # Preview component styles (uses --color-*)
├── js/
│   ├── studio-state.js     # Minimal state: get/set/subscribe + CSS var sync
│   └── editors/
│       └── token-editor.js # Color picker wiring, hex input, swatch buttons
└── lib/
    └── chroma.min.js       # Local fallback (downloaded from CDN)
```

---

## CDN Dependencies (Phase 0 only)

| Library | Version | Import Method | Purpose |
|---------|---------|---------------|---------|
| Chroma.js | 3.1.2+ | Import map → `import chroma from 'chroma-js'` | Color validation, OKLCH |
| vanilla-colorful | latest | `<script type="module">` (self-registers) | `<hex-color-picker>` element |

**Fallback strategy:** If jsdelivr `+esm` fails → try `esm.sh` → fall back to local `lib/chroma.min.js` with global.

---

## State Module (Minimal — Phase 0 Scope)

```javascript
// studio-state.js — Phase 0 API surface
const state = {
  data: {
    colors: {
      primary: '#6366f1',
      secondary: '#ec4899',
      accent: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      bgDark: '#0f172a',
      bgCard: 'rgba(255,255,255,0.05)',
      textPrimary: '#ffffff',
      textMuted: 'rgba(255,255,255,0.75)',
    }
  },

  set(path, value),        // dot-path setter, validates, triggers notify
  get(path),               // dot-path getter
  subscribe(path, cb),     // returns unsubscribe fn
  getAll(),                // returns full state snapshot
};
```

**NOT in Phase 0:** undo/redo, localStorage, URL hash, history, preview mode, debounce pipeline. Those are Phase 1 Task 1.

**Validation:** `state.set()` validates colors via `chroma(value)` — rejects invalid input, returns false.

**CSS sync:** A default subscriber auto-maps state paths to CSS custom properties:
- `colors.primary` → `--color-primary`
- `colors.bgDark` → `--color-bg-dark`
- Pattern: camelCase → kebab-case with `--color-` prefix

---

## HTML Shell Layout

```
┌─────────────────────────────────────────┐
│  Luno Design Studio             [↩][↪] │  ← header (--studio-*)
├───────────┬─────────────────────────────┤
│  Controls │  Preview                    │  ← 2-column flex
│  (~300px) │  (flex: 1)                  │
│           │                             │
│  Primary  │  ┌────────────────┐         │
│  [picker] │  │ Sample Card    │         │
│  #6366f1  │  │ with heading   │         │
│           │  │ and button     │         │
│  Second.  │  └────────────────┘         │
│  [picker] │                             │
│  #ec4899  │  [Primary] [Secondary]      │
│           │  [Accent]  [Outline]        │
│  Accent   │                             │
│  [picker] │  ┌────────────────┐         │
│  #10b981  │  │ Alert / Notice │         │
│           │  └────────────────┘         │
│           │                             │
│           │  Heading Text               │
│           │  Body text paragraph        │
│           │  Muted text                 │
├───────────┴─────────────────────────────┤
│  Phase 0 · Vertical Slice              │  ← status bar
└─────────────────────────────────────────┘
```

### Accessibility
- Skip link → `<main>` content
- `<nav>`, `<main>`, `<aside>` landmarks
- `aria-label` on color pickers
- `:focus-visible` states on all interactive elements
- `prefers-reduced-motion` → no transitions
- `prefers-color-scheme` → not relevant (studio is always dark)

---

## Controls Panel (Left)

For each of the 3 colors (Primary, Secondary, Accent):

1. **Label** — color name
2. **Color swatch** — 24x24px circle showing current color, clickable to toggle picker
3. **`<hex-color-picker>`** — vanilla-colorful Web Component, opens below swatch
4. **Hex input** — `<input type="text">` with `#RRGGBB` validation
5. **OKLCH readout** — shows L, C, H values (read-only, educational)

**Event flow:**
- Picker `color-changed` → update hex input + state.set()
- Hex input `input` → validate → if valid, update picker + state.set()
- state change → CSS var update → preview reacts

---

## Preview Panel (Right)

All components use **only** CSS custom properties. Zero hardcoded colors.

### Components:

1. **Sample Card**
   - Header bar: `--color-primary` background
   - Body: `--color-bg-card` background, `--color-text-primary` text
   - Footer: muted text in `--color-text-muted`

2. **Button Row**
   - Primary button: `--color-primary` bg, white text
   - Secondary button: `--color-secondary` bg, white text
   - Accent button: `--color-accent` bg, white text
   - Outline button: transparent bg, `--color-primary` border + text

3. **Alert Box**
   - `--color-warning` left border, tinted background

4. **Text Block**
   - Heading in `--color-text-primary`
   - Paragraph in `--color-text-primary`
   - Muted line in `--color-text-muted`

---

## CSS Architecture

Two separate CSS files enforce the studio/preview boundary:

### studio.css — Editor Chrome
```css
.studio-header    { background: var(--studio-bg-darker); }
.studio-sidebar   { background: var(--studio-bg); }
.studio-statusbar { background: var(--studio-bg-darker); }
/* ALL editor UI uses --studio-* only */
```

### preview.css — Preview Components
```css
.preview-card    { background: var(--color-bg-card); }
.preview-btn     { background: var(--color-primary); }
.preview-heading { color: var(--color-text-primary); }
/* ALL preview UI uses --color-* only */
```

This separation means: if the user changes `--color-primary` to white, the editor chrome stays dark and usable.

---

## What Phase 0 Does NOT Build

| Feature | Deferred To |
|---------|-------------|
| Undo/Redo | Phase 1 Task 1 |
| localStorage persistence | Phase 1 Task 1 |
| URL hash sharing | Phase 1 Task 1 |
| Debounce pipeline | Phase 1 Task 1 |
| Resizable panels | Phase 1 Task 2 |
| Typography controls | Phase 1 Task 5 |
| Harmony engine | Phase 1 Task 4 |
| Presets | Phase 1 Task 7 |
| Export | Phase 1 Task 12 |

---

## Build Order

| Step | Time | What | Validates |
|------|------|------|-----------|
| 1 | ~10 min | CDN smoke test — bare HTML, import map, both libraries | Blocker 1 resolved |
| 2 | ~20 min | State module — get/set/subscribe + CSS var sync | Core data flow |
| 3 | ~30 min | HTML shell + CSS — 2-panel layout, studio chrome | CSS architecture |
| 4 | ~30 min | Wire up — pickers → state → preview components | End-to-end pipeline |

**Total: ~90 minutes**

---

## Success Criteria (from TO-DOS.md)

- [ ] `import chroma from 'chroma-js'` works in browser
- [ ] `chroma('#6366f1').oklch()` returns valid OKLCH values
- [ ] `<hex-color-picker>` renders from CDN
- [ ] Color picker responds to user input
- [ ] Changing color updates `--color-primary` in real-time (< 50ms)
- [ ] Preview card visually changes color on every picker adjustment
- [ ] Console shows no errors
- [ ] State object contains the new color value
- [ ] Studio chrome is visually separate from preview area
- [ ] `--studio-*` vars unaffected by `--color-*` changes

---

*Design approved: 2026-03-01*
