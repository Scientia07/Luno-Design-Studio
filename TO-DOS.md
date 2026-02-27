<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       TO-DOS.md
created:        2026-02-26
updated:        2026-02-26
version:        2.0.0
status:         active
rating:         ★★★★★
author:         Joel + Claude
related_docs:   [CLAUDE.md, docs/ROADMAP.md, docs/prd/prd-design-studio.md, docs/research/active/design-tokens/user-flows.md]
description:    Sprint task list with priorities, acceptance criteria, dependencies, and progress tracking
==============================================================================
-->

# Luno Design Studio - Tasks

> **Sprint:** Phase 0 Foundation + Phase 1 Token Studio
> **Started:** 2026-02-26
> **Based on:** PRD v2.0.0 + Quality Audit + User Flow Analysis

## Quick Stats

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 0 — Foundation | 3 | 0/3 Complete |
| Phase 1 — High | 8 | 0/8 Complete |
| Phase 1 — Medium | 4 | 0/4 Complete |
| Phase 1 — Polish | 3 | 0/3 Complete |
| **Total** | **18** | **0/18 (0%)** |

## Dependency Graph

```
Phase 0:
  T0.1 (CDN/Import) ──┐
  T0.2 (Studio Chrome) ┼──→ T0.3 (Vertical Slice)
                       │
Phase 1 High:          │
  T1 (State Module) ───┼──→ T2 (HTML Shell) ──→ T3 (Color Controls)
                       │                    ├──→ T5 (Typography)
                       │                    └──→ T6 (Live Preview)
  T4 (Harmony Engine) ─┘                         │
                                                  ▼
  T7 (Presets) ──────────────────────────→ T8 (Dark/Light Toggle)

Phase 1 Medium:
  T3 ──→ T9 (WCAG Dashboard) ──→ T10 (Colorblind Sim)
  T5 ──→ T11 (Spacing & Radius)
  T3 ──→ T12 (Export Engine)

Phase 1 Polish:
  All above ──→ T13 (Validation) ──→ T14 (Keyboard Shortcuts)
            ──→ T15 (Onboarding)
```

---

## Phase 0 — Foundation

> Validate tooling, establish base styles, prove architecture with a vertical slice.

### Task 0.1: CDN & Import Map Validation
- [ ] **Status:** Pending
- **Effort:** ~30 min
- **Depends on:** Nothing
- **Blocks:** T0.3, T1, T4

**Files:** `v1-vanilla/index.html`, `v1-vanilla/lib/`

**What to do:**
- Set up `<script type="importmap">` with Chroma.js 3.x CDN
- Verify ES module import works: `import chroma from 'chroma-js'`
- Download local fallback to `v1-vanilla/lib/chroma.min.js`
- Test both CDN and local import paths
- Verify vanilla-colorful Web Component loads via CDN

**Done when:**
- [ ] `import chroma from 'chroma-js'` works in browser console
- [ ] `chroma('#6366f1').oklch()` returns valid OKLCH values
- [ ] Local fallback works when CDN is blocked (test with DevTools offline mode)
- [ ] `<hex-color-picker>` renders from vanilla-colorful CDN

---

### Task 0.2: Studio Chrome CSS Variables
- [ ] **Status:** Pending
- **Effort:** ~30 min
- **Depends on:** Nothing
- **Blocks:** T0.3, T2

**Files:** `shared/styles/base.css`

**What to do:**
- Add `--studio-*` variables for the editor chrome (non-editable)
- Separate from `--color-*` preview tokens (editable by user)
- This prevents the editor UI from breaking when the user changes colors

**Done when:**
- [ ] `--studio-bg`, `--studio-surface`, `--studio-border`, `--studio-text`, `--studio-accent` defined
- [ ] Studio chrome variables are in a separate `:root` block or clearly commented
- [ ] Preview tokens use `--color-*` prefix, studio uses `--studio-*`

---

### Task 0.3: Vertical Slice — One Color Picker End-to-End
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Depends on:** T0.1, T0.2
- **Blocks:** All Phase 1 tasks (proves the architecture)

**Files:** Minimal versions of `index.html`, `studio-state.js`, `token-editor.js`

**What to build:**
A minimal proof-of-concept that validates the entire data flow:
1. One color picker (Primary color) in a basic HTML page
2. Minimal state module (set, get, subscribe — no history yet)
3. CSS variable update on change (`--color-primary`)
4. One preview component (a card) that uses the CSS variable
5. Verify: change picker → state updates → CSS var updates → card changes color

**Done when:**
- [ ] Color picker renders and responds to user input
- [ ] Changing color updates `--color-primary` in real-time (< 50ms)
- [ ] Preview card visually changes color on every picker adjustment
- [ ] Console shows no errors
- [ ] State object contains the new color value
- [ ] Architecture validated: we know how state → CSS → preview works

---

## Phase 1 — High Priority

### Task 1: Central State Module
- [ ] **Status:** Pending
- **Effort:** ~2.5 hours
- **Depends on:** T0.3 (vertical slice proves the pattern)
- **Blocks:** T2, T3, T5, T7, T12

**File:** `v1-vanilla/js/studio-state.js`

**What to build:**
- Observer pattern with path-based subscriptions (`state.subscribe('tokens.colors.primary', cb)`)
- History stack (Undo/Redo, 30 steps, full state snapshots)
- localStorage persistence (debounced 2s via `requestIdleCallback` or `setTimeout`)
- URL hash sync (Base64 encoded minimal state)
- Input validation layer (validate before `set()`)
- W3C Design Token compatible data model
- Preview mode (temporary state override for preset hover — reverts on cancel)

**Multi-level debounce pipeline:**
```
CSS var update:    immediate (every input event, throttled 16ms)
State set():       debounced 50ms (batch rapid changes)
History push:      debounced 300ms (one undo step per interaction)
localStorage:      debounced 2000ms (persistence)
URL hash:          debounced 2000ms (shareable state)
```

**Done when:**
- [ ] `state.set('tokens.colors.primary', '#ff0000')` triggers subscribed callbacks
- [ ] `state.undo()` / `state.redo()` work correctly for 30 steps
- [ ] State persists across page reload (localStorage)
- [ ] URL hash contains encoded theme (decodable)
- [ ] `state.set('tokens.colors.primary', 'banana')` → rejected with error, state unchanged
- [ ] `state.preview({...overrides})` temporarily changes CSS vars without affecting history
- [ ] `state.previewClear()` reverts to actual state

---

### Task 2: Main Editor HTML/CSS Shell
- [ ] **Status:** Pending
- **Effort:** ~3 hours
- **Depends on:** T0.2 (studio chrome CSS), T1 (state module for tab switching)
- **Blocks:** T3, T5, T6

**Files:** `v1-vanilla/index.html`, `v1-vanilla/css/studio.css`, `v1-vanilla/css/variables.css`

**What to build:**
- Navigation bar: tab icons (Tokens, Layout, Shapes, Components), Undo/Redo buttons, theme name, dark/light toggle
- Left sidebar: properties panel with context-sensitive content per tab
- Right canvas: live preview area with component showcase
- Status bar: auto-save indicator, viewport size, share URL button, export button
- Resizable panels (Split.js or CSS `resize`)
- Skip link + ARIA landmarks
- Responsive: 3-panel (≥1200px), 2-panel (768-1199px), stacked (<768px)

**Done when:**
- [ ] Tab switching works (shows/hides correct panel content)
- [ ] Left panel and canvas are resizable
- [ ] Status bar shows all planned indicators
- [ ] Skip link focuses main content
- [ ] Layout works at 320px, 768px, 1024px, 1440px
- [ ] Studio chrome uses `--studio-*` vars (not affected by user token changes)
- [ ] Keyboard: Tab navigates controls, 1-4 switches tabs

---

### Task 3: Token Editor — Color Controls
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Depends on:** T1 (state), T2 (HTML shell)
- **Blocks:** T4, T9, T10, T12

**File:** `v1-vanilla/js/editors/token-editor.js`

**What to build:**
- Color pickers for: Primary, Secondary, Accent, Warning, Danger, Info
- Surface color pickers: Background Primary, Background Secondary, Card, Text Primary, Text Muted
- Each picker: swatch button → opens vanilla-colorful `<hex-color-picker>`
- Hex input field with validation (accepts: #RGB, #RRGGBB, named colors)
- Live CSS custom property updates (throttled 16ms for 60fps)
- WCAG contrast indicator next to each text/surface pair (pass/fail badge)
- Integration with state module (set on change, subscribe to external changes)

**Done when:**
- [ ] All 11 color tokens have working pickers
- [ ] Changing any color updates preview in < 50ms
- [ ] Invalid input (non-hex) shows inline error, does NOT update state
- [ ] WCAG contrast badge shows next to text-on-surface pairs
- [ ] Colors persist after page reload
- [ ] Undo reverts the last color change

---

### Task 4: Color Harmony Engine
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Depends on:** T0.1 (Chroma.js working)
- **Blocks:** T3 (harmony panel appears within color controls)

**File:** `v1-vanilla/js/editors/color-harmony.js`

**What to build:**
- Chroma.js integration using **OKLCH mode** (NOT HSL — critical!)
- Harmony modes: Complementary, Analogous, Triadic, Split-Complementary, Tetradic
- Auto-generate palette (50–900 shades) from base color using OKLCH lightness
- Visual harmony display: colored circles showing the palette
- "Apply" button: fills Secondary + Accent from harmony
- Surface auto-suggestion: derive dark/light backgrounds from primary via OKLCH

**OKLCH harmony algorithm (corrected from PRD):**
```javascript
// CORRECT: Use oklch.h for perceptually uniform hue rotation
const hue = chroma(baseHex).get('oklch.h');
const harmonies = {
  complementary: [hue, (hue + 180) % 360],
  analogous:     [hue, (hue + 30) % 360, (hue - 30 + 360) % 360],
  triadic:       [hue, (hue + 120) % 360, (hue + 240) % 360],
  // ... all rotations in OKLCH space
};
return harmonies[mode].map(h =>
  chroma(baseHex).set('oklch.h', h).hex()
);
```

**Done when:**
- [ ] All 5 harmony modes generate correct palettes
- [ ] Palette uses OKLCH hue rotation (NOT HSL)
- [ ] 50-900 shade scale shows perceptually even lightness steps
- [ ] "Apply" fills Secondary + Accent tokens
- [ ] Surface auto-suggestion generates usable dark/light backgrounds
- [ ] Harmony updates live when base color changes

---

### Task 5: Typography Controls
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Depends on:** T1 (state), T2 (HTML shell)
- **Blocks:** T11

**File:** `v1-vanilla/js/editors/token-editor.js` (extend)

**What to build:**
- Font family dropdown: system fonts + Google Fonts (Inter, Roboto, Poppins, Playfair Display, etc.)
- Font preview in dropdown (each option rendered in its own font)
- Base font size slider (12px–24px)
- Scale ratio selector (1.125 Minor Second → 1.618 Golden Ratio) with visual preview of h1→h6
- Weight slider (100–900, snaps to 100 increments)
- Line-height slider (1.0–2.0)
- Live preview: sample text block updates with all typography changes

**Done when:**
- [ ] Font dropdown shows ≥10 fonts, each previewed in its own typeface
- [ ] Changing font updates `--font-sans` CSS variable immediately
- [ ] Scale ratio shows computed sizes for h1–h6
- [ ] Weight and line-height sliders update live
- [ ] Google Fonts load dynamically when selected
- [ ] Fallback to system fonts if Google Fonts CDN fails

---

### Task 6: Live Preview Panel
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Depends on:** T2 (HTML shell), T3 (color controls)
- **Blocks:** T8

**File:** `v1-vanilla/css/preview.css`, section in `index.html`

**What to build:**
- Component showcase in the canvas area showing real UI components:
  - Card component (with header, body, footer)
  - Button variants (primary, secondary, outline, ghost)
  - Text block (heading, paragraph, muted text)
  - Badge/tag components
  - Alert/notification (info, success, warning, danger)
  - Form elements (input, select, checkbox)
- All components styled exclusively via CSS custom properties (`--color-*`, `--font-*`, `--space-*`, `--radius-*`)
- Components update instantly when any token changes

**Done when:**
- [ ] ≥6 component types render in the preview canvas
- [ ] Every component responds to color, typography, spacing, and radius token changes
- [ ] No hardcoded colors — 100% CSS custom property driven
- [ ] Components look good with the default LunoLabs theme
- [ ] Components remain readable after random color changes (stress test)

---

### Task 7: Theme Presets & Browser
- [ ] **Status:** Pending
- **Effort:** ~2 hours
- **Depends on:** T1 (state), T3 (color controls apply presets)
- **Blocks:** T8

**Files:** `v1-vanilla/js/presets.js`, `v1-vanilla/js/theme-browser.js`, `v1-vanilla/data/presets/`

**What to build:**
- 6 custom LunoLabs presets (curated, production-quality)
- Gogh theme loader: fetch/bundle 250+ terminal themes, map to our token format
- Catppuccin (4 flavors: Latte, Frappé, Macchiato, Mocha)
- Material Design palette (primary colors)
- Preset browser UI: category tabs, search by name, mini-swatch previews
- **Hover preview:** hovering a preset temporarily shows it in the canvas (using `state.preview()`)
- One-click apply: merges preset into state as one atomic undo step
- "(modified)" indicator when user changes an applied preset

**Done when:**
- [ ] ≥6 custom presets load correctly
- [ ] Gogh themes parse and display (at least 50 themes for MVP, lazy-load rest)
- [ ] Search filters presets by name
- [ ] Hovering a preset previews it without committing to state
- [ ] Clicking "Apply" merges preset and can be undone in one step
- [ ] Applied preset name shows in header
- [ ] Preset list doesn't lag with 250+ items (virtualized or paginated)

---

### Task 8: Dark/Light Mode Toggle
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Depends on:** T6 (preview panel), T7 (presets include light tokens)
- **Blocks:** T9

**What to build:**
- Toggle button in nav bar (sun/moon icon)
- Preview area switches between dark and light token sets
- Editor UI (studio chrome) stays unchanged
- Auto-generate light surfaces from dark (OKLCH lightness inversion) as default
- Allow manual override of light-mode surface colors
- Smooth CSS transition animation (respects `prefers-reduced-motion`)

**Done when:**
- [ ] Toggle switches preview between dark and light modes
- [ ] Editor chrome (nav, sidebar, status bar) is NOT affected by toggle
- [ ] Auto-generated light surfaces are readable (contrast > 4.5:1)
- [ ] Manual override of light surfaces persists
- [ ] Transition is smooth (no flash of unstyled content)
- [ ] `prefers-reduced-motion` disables the transition animation

---

## Phase 1 — Medium Priority

### Task 9: WCAG Contrast Dashboard
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Depends on:** T3 (color tokens), T8 (dark/light modes)

**What to build:**
- Contrast matrix: every text color × every surface color
- Each cell: contrast ratio (e.g., "7.3:1") + AA/AAA pass/fail badge
- Failing pairs highlighted
- **Fix suggestions:** click failing pair → tooltip with "Lighten to #xxx for AA compliance"
- Auto-compute nearest compliant color using Chroma.js OKLCH lightness adjustment
- Summary: "12/15 pairs pass AA, 8/15 pass AAA"

**Done when:**
- [ ] Matrix shows all text × surface combinations
- [ ] Contrast ratios are mathematically correct (verified against WebAIM)
- [ ] Fix suggestions produce valid AA-compliant alternatives
- [ ] "Apply Fix" button updates the token
- [ ] Matrix updates live when any color changes

---

### Task 10: Colorblind Simulation
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Depends on:** T6 (preview panel), T9 (contrast dashboard)

**What to build:**
- Dropdown in preview area: None / Deuteranopia / Protanopia / Tritanopia
- Apply SVG color matrix filter to preview container
- Show simulated version alongside original (or toggle)
- Warning when danger (red) and success (green) are indistinguishable in a mode

**Done when:**
- [ ] All 3 CVD types render correctly
- [ ] Simulation only affects preview area, not editor chrome
- [ ] Warning appears when semantic colors lose distinctiveness
- [ ] Simulation can be toggled on/off without losing state

---

### Task 11: Spacing & Border Radius Controls
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Depends on:** T1 (state), T5 (typography section pattern to follow)

**File:** `v1-vanilla/js/editors/token-editor.js` (extend)

**What to build:**
- Base unit slider (2px / 4px / 8px) → generates spacing scale (xs through 2xl)
- Visual spacing preview: blocks showing each spacing value
- Border-radius slider (0px → 24px → 9999px for pill)
- Shadow editor: presets (none/subtle/medium/dramatic) + custom (offset-x, offset-y, blur, spread, color)
- Preview components update radius and shadows live

**Done when:**
- [ ] Base unit change regenerates the entire spacing scale
- [ ] Spacing preview shows labeled blocks at each scale step
- [ ] Border radius updates all components in preview simultaneously
- [ ] Shadow presets apply correctly; custom shadow controls work
- [ ] Values persist and can be undone

---

### Task 12: Export Engine
- [ ] **Status:** Pending
- **Effort:** ~1.5 hours
- **Depends on:** T1 (state), T3 (color tokens)

**File:** `v1-vanilla/js/export-engine.js`

**What to build:**
- Export modal/panel with tabs: CSS / JSON / URL / HTML
- **CSS tab:** syntax-highlighted `:root { }` block, toggle dark/light/both, toggle comments, copy + download
- **JSON tab:** W3C Design Tokens format (stable 2025.10 spec), copy + download
- **URL tab:** shareable `#theme=` URL, copy button, warning if > 2000 chars
- **HTML tab:** complete snippet with inline styles, preview of what it looks like
- Syntax highlighting via Prism.js (CSS + JSON + HTML languages)
- Toast notification on copy/download success
- Confetti celebration on first export (`first_export_done` in localStorage)

**Done when:**
- [ ] CSS export produces valid, pasteable `:root { }` block
- [ ] JSON export validates against W3C Design Tokens spec
- [ ] URL export creates decodable, loadable links
- [ ] HTML export includes all custom properties inline
- [ ] Copy to clipboard works (with fallback for HTTP/no-permission)
- [ ] Prism.js syntax highlighting renders correctly
- [ ] First-time export triggers confetti

---

## Phase 1 — Polish & Quality

### Task 13: Input Validation & Error Handling
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Depends on:** T1 (state), T3 (color controls)

**What to build:**
- Validation in `state.set()`: reject invalid colors, NaN dimensions, empty strings
- Inline error indicators on controls (red border, error message)
- CDN failure detection: if Chroma.js fails to load, show fallback message
- localStorage full detection: warn user, suggest export
- URL hash decode errors: graceful fallback to defaults with notification
- Cross-tab sync: listen to `storage` event for multi-tab consistency

**Done when:**
- [ ] Invalid color input shows error, does NOT corrupt state
- [ ] CDN offline → local fallback loads automatically
- [ ] localStorage write failure shows warning toast
- [ ] Corrupted URL hash loads defaults with "Couldn't load theme" message
- [ ] Two tabs stay in sync when one changes a token

---

### Task 14: Keyboard Shortcuts
- [ ] **Status:** Pending
- **Effort:** ~30 min
- **Depends on:** T1 (state), T12 (export)

**What to build:**

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+S` | Copy CSS to clipboard |
| `Ctrl+Shift+S` | Download JSON |
| `Ctrl+Shift+U` | Copy share URL |
| `Space` | Randomize focused color |
| `1`–`4` | Switch tabs |
| `D` | Toggle dark/light preview |
| `Escape` | Close modal/panel |
| `Tab` / `Shift+Tab` | Navigate controls |

**Done when:**
- [ ] All shortcuts work globally (except Space which is context-dependent)
- [ ] Shortcuts don't conflict with browser defaults (no Ctrl+W, Ctrl+T)
- [ ] Shortcuts disabled when a text input is focused
- [ ] Shortcut help tooltip accessible via `?` key

---

### Task 15: Onboarding & First-Run Experience
- [ ] **Status:** Pending
- **Effort:** ~1 hour
- **Depends on:** T2 (HTML shell), T3 (color controls)

**What to build:**
- First-visit detection: `onboarding_seen` flag in localStorage
- Contextual tooltips on first interaction with each control type
- Rough Notation highlight on the primary color picker: "Start here — change a color"
- Tooltip on Harmony panel: "Generate matching colors automatically"
- Tooltip on Export: "Take your theme anywhere"
- Tips dismissible, stored as seen
- Default theme: LunoLabs Dark preset loaded, all controls populated

**Done when:**
- [ ] First visit shows highlight on primary color picker
- [ ] Interacting with a control shows its contextual tip (once)
- [ ] Tips don't appear after `onboarding_seen: true`
- [ ] Default theme loads cleanly with no empty/broken state
- [ ] Clearing localStorage resets onboarding

---

## Schedule (Revised)

| Session | Tasks | Focus | Estimated Time |
|---------|-------|-------|---------------|
| **Session 1** | T0.1, T0.2, T0.3 | Foundation + Vertical Slice | ~3 hours |
| **Session 2** | T1, T2 | State module + Editor shell | ~5.5 hours |
| **Session 3** | T3, T4, T6 | Colors + Harmony + Preview | ~5.5 hours |
| **Session 4** | T5, T11, T8 | Typography + Spacing + Dark/Light | ~3.5 hours |
| **Session 5** | T7, T12 | Presets + Export | ~3.5 hours |
| **Session 6** | T9, T10 | WCAG Dashboard + Colorblind Sim | ~2.5 hours |
| **Session 7** | T13, T14, T15 | Validation + Shortcuts + Onboarding | ~2.5 hours |

---

## Notes

- v1-vanilla must work with zero build tools (CDN imports only)
- Chroma.js is the color backbone — use **OKLCH mode everywhere** (never HSL for harmony)
- State module is the foundation — the vertical slice (T0.3) proves it works
- Preview area uses CSS custom properties cascading (not JS style manipulation)
- Multi-level debouncing: CSS instant → state 50ms → history 300ms → save 2s
- Studio chrome (`--studio-*`) stays fixed; preview tokens (`--color-*`) are user-editable
- Every task has acceptance criteria — check all boxes before marking complete
