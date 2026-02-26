<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       CLAUDE.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★★ (critical project file)
author:         Joel + Claude
related_docs:   [TO-DOS.md, docs/ROADMAP.md, docs/prd/prd-design-studio.md]
description:    Project instructions for AI agents and developers
==============================================================================
-->

# Luno-Design-Studio - Project Instructions

> **Project:** Visual Design Token Editor & Framework Comparison Lab
> **Type:** Hybrid — Pure HTML/CSS/JS (v1) + Svelte 5 (v2)
> **Status:** Active Development
> **Origin:** Evolved from Luno-Future-Docs Design Dashboard

---

## Project Overview

The Design Studio is a visual editor for **color schemes, typography, layouts, SVG shapes, and components** — built as a **hybrid experiment**. The same functionality is first built in **Pure HTML/CSS/JavaScript** (v1-vanilla) and then in **Svelte 5** (v2-svelte), creating a unique comparison lab.

### Vision

> Change fonts, color schemes, animations — see visually what appears intuitive.
> Then compare: where does Vanilla JS hit its limits? What does a framework actually add?

### Tech Stack

| Layer | v1-vanilla | v2-svelte |
|-------|-----------|-----------|
| **Core** | Pure HTML5/CSS3/JS | Svelte 5 + Vite |
| **Color Engine** | Chroma.js (OKLCH) | Chroma.js (OKLCH) |
| **Drag & Drop** | SortableJS | svelte-dnd-action |
| **SVG** | Native SVG API | Svelte SVG components |
| **State** | Observer Pattern + localStorage | Svelte Stores ($state, $derived) |
| **Build** | None (CDN imports) | Vite |

### External Dependencies

| Library | Version | Size (gzip) | Purpose |
|---------|---------|-------------|---------|
| Chroma.js | 3.1.2 | 13.5 KB | Color manipulation, OKLCH, palettes, CVD simulation |
| SortableJS | 1.15.6 | 10 KB | Drag & drop for layout builder (v1 only) |
| Google Fonts | — | varies | Inter, JetBrains Mono |
| Open Props | 1.7.x | 2 KB (per file) | Optional design token presets |

### Directory Structure

```
/Luno-Design-Studio/
├── CLAUDE.md                  # This file — project instructions
├── TO-DOS.md                  # Current sprint tasks
├── README.md                  # Project overview & demo
│
├── v1-vanilla/                # ═══ PHASE 1-3: No Build Tools ═══
│   ├── index.html             # Main editor entry point
│   ├── js/
│   │   ├── studio-state.js    # Central state, observer, history, URL sync
│   │   ├── editors/
│   │   │   ├── token-editor.js    # Color, typography, spacing controls
│   │   │   ├── color-harmony.js   # Chroma.js wrapper, palettes, CVD sim
│   │   │   ├── layout-builder.js  # CSS Grid/Flexbox builder
│   │   │   ├── shape-editor.js    # SVG canvas, shape CRUD
│   │   │   └── component-lab.js   # Component compositor
│   │   ├── export-engine.js   # CSS/JSON/HTML/SVG/URL export
│   │   └── presets.js         # Theme presets + Gogh loader
│   ├── css/
│   │   ├── studio.css         # Main editor styles
│   │   ├── variables.css      # CSS custom properties
│   │   └── preview.css        # Preview area styles
│   ├── data/
│   │   └── presets/           # 250+ theme preset JSON files
│   │       ├── gogh-themes.json
│   │       ├── catppuccin.json
│   │       ├── material.json
│   │       └── custom.json
│   └── lib/                   # Vendored libraries (fallback)
│       └── chroma.min.js
│
├── v2-svelte/                 # ═══ PHASE 4: Framework Version ═══
│   ├── src/
│   │   ├── App.svelte
│   │   ├── lib/
│   │   │   ├── stores/        # Svelte 5 runes stores
│   │   │   ├── components/    # .svelte components
│   │   │   └── utils/         # Shared logic
│   │   └── data/              # Shared presets (symlink to v1)
│   ├── package.json
│   ├── vite.config.js
│   └── svelte.config.js
│
├── comparison/                # ═══ Framework Comparison Docs ═══
│   └── README.md              # LOC, Performance, DX comparison
│
├── shared/                    # ═══ Shared Resources ═══
│   └── styles/
│       └── base.css           # Global reset + CSS variables
│
├── docs/                      # ═══ Documentation ═══
│   ├── ROADMAP.md
│   ├── prd/
│   │   └── prd-design-studio.md
│   ├── research/
│   │   ├── active/
│   │   │   ├── color-science/
│   │   │   ├── design-tokens/
│   │   │   ├── layout-engines/
│   │   │   ├── svg-editors/
│   │   │   └── framework-comparison/
│   │   ├── completed/
│   │   └── archive/
│   ├── handoffs/
│   └── templates/
│
└── .claude/                   # ═══ AI Agent Config ═══
    ├── settings.local.json
    └── skills/                # Symlinks to global skills
```

---

## File Standards (CRITICAL)

### 1. Metadata Header (Required for ALL files)

**For Markdown files (.md):**
```markdown
<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       example.md
created:        YYYY-MM-DD
updated:        YYYY-MM-DD
version:        X.Y.Z
status:         [draft|active|review|archived]
rating:         ★☆☆☆☆ to ★★★★★
author:         Name
related_docs:   [file1.md, file2.md]
description:    Brief description of file purpose
==============================================================================
-->
```

**For HTML files:**
```html
<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       example.html
created:        YYYY-MM-DD
updated:        YYYY-MM-DD
version:        X.Y.Z
status:         [draft|active|review|archived]
rating:         ★☆☆☆☆ to ★★★★★
author:         Name
related_docs:   [file1.html, file2.md]
description:    Brief description
==============================================================================
-->
```

**For CSS/JS files:**
```css
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       styles.css
created:        YYYY-MM-DD
updated:        YYYY-MM-DD
version:        X.Y.Z
status:         [draft|active|review|archived]
related_docs:   [index.html]
description:    Brief description
==============================================================================
*/
```

### 2. Version Numbering

Semantic versioning: `MAJOR.MINOR.PATCH`
- **MAJOR:** Breaking changes, major rewrites
- **MINOR:** New features, significant updates
- **PATCH:** Bug fixes, small improvements

### 3. Status Values

| Status | Meaning |
|--------|---------|
| `draft` | Work in progress |
| `active` | Current, maintained |
| `review` | Needs review/approval |
| `archived` | No longer maintained |

### 4. Rating System

| Rating | Meaning |
|--------|---------|
| ★☆☆☆☆ | Needs major work |
| ★★☆☆☆ | Functional but issues |
| ★★★☆☆ | Good, some improvements needed |
| ★★★★☆ | Very good |
| ★★★★★ | Excellent, production ready |

---

## Code Standards

### HTML
- Valid DOCTYPE and `lang` attribute
- `<meta name="description">` required
- Semantic elements (`<main>`, `<nav>`, `<section>`)
- Alt text on all images
- ARIA landmarks and skip links
- Focus states for keyboard navigation

### CSS
- Use CSS custom properties (`:root`)
- Follow project color system (see shared/styles/base.css)
- Mobile-first responsive design
- Include `:focus-visible` states
- Respect `prefers-reduced-motion`
- Respect `prefers-color-scheme`

### JavaScript (v1-vanilla)
- Always null-check DOM queries
- Use `const`/`let`, never `var`
- Error handling for async operations
- Event listeners, not inline `onclick`
- ES modules (`import`/`export`)
- JSDoc comments for public functions

### Svelte 5 (v2-svelte) — CRITICAL RULES
- Use `$state()` not `let` for reactive state
- Use `$derived()` not `$:` for computed values
- Use `$effect()` not `afterUpdate` for side effects
- Use `onclick` not `on:click` for events
- Use `{#snippet}` not `<slot>` for composition
- File must be `.svelte.js` to use runes outside components
- Use `$props()` not `export let` for component props

### Color System

```css
:root {
    /* Primary palette */
    --color-primary: #6366f1;
    --color-primary-dark: #4f46e5;
    --color-secondary: #ec4899;
    --color-accent: #10b981;
    --color-warning: #f59e0b;
    --color-danger: #ef4444;

    /* Surfaces */
    --bg-dark: #0f172a;
    --bg-darker: #0a0a1a;
    --bg-card: rgba(255,255,255,0.05);

    /* Text */
    --text-primary: #ffffff;
    --text-muted: rgba(255,255,255,0.75);  /* WCAG AA compliant */
}
```

### Accessibility (WCAG 2.1 AA Baseline)
- Color contrast: 4.5:1 for text, 3:1 for components
- Keyboard navigation for all interactive elements
- Screen reader labels (aria-label, aria-describedby)
- Skip links on every page
- `prefers-reduced-motion` respected

---

## Task Management

### TO-DOS.md Structure
- Quick stats table (priority counts, completion %)
- Tasks grouped by priority (High → Low)
- Each task: checkbox, due date, effort, impact, file paths, code examples
- Update after completing each task

### When to Create a PRD
- New major feature or phase
- Exploring new technology
- Significant refactoring

---

## Skills (Auto-Activation)

### Available Skills

| Skill | Trigger Context | Use For |
|-------|-----------------|---------|
| `chroma` | Color palette tasks, Chroma.js imports, OKLCH | Palette generation, harmony, contrast, CVD sim |
| `svelte` | Working in `v2-svelte/`, `.svelte` files, runes | Svelte 5 components, stores, SvelteKit |
| `threejs` | 3D preview features, WebGL | Optional 3D component previews |
| `confidence-check` | Before implementing features | Pre-implementation validation |

### Chroma.js Skill (Primary for this project)

**Auto-activate when:**
- Working on color features in any directory
- Files import `chroma-js` or `chroma`
- User mentions: color palette, OKLCH, harmony, contrast, colorblind

**Key rules to read:**
- `~/.claude/skills/chroma/rules/color-spaces.md` — HSL vs OKLCH vs LAB
- `~/.claude/skills/chroma/rules/palette-generation.md` — Scales, Bezier, Brewer
- `~/.claude/skills/chroma/rules/contrast.md` — WCAG AA/AAA, luminance
- `~/.claude/skills/chroma/rules/harmony.md` — Complementary, analogous, triadic
- `~/.claude/skills/chroma/rules/colorblind.md` — CVD simulation, safe palettes

**Key pattern:** Always use `.mode('oklch')` for color interpolation (not HSL or RGB).

### Svelte 5 Skill (v2 Phase)

**Auto-activate when:**
- Working in `v2-svelte/` directory
- Creating or editing `.svelte` files

**Key rules to read:**
- `~/.claude/skills/svelte/rules/runes.md` — $state, $derived, $effect, $props
- `~/.claude/skills/svelte/rules/components.md` — Props, snippets, events
- `~/.claude/skills/svelte/rules/stores.md` — Shared state, .svelte.js files
- `~/.claude/skills/svelte/rules/transitions.md` — Animations, FLIP, spring/tweened

---

## Implementation Phases

| Phase | Name | Focus | Status |
|-------|------|-------|--------|
| **1** | Design Tokens Studio | Colors, Typography, Spacing, Shadows, Presets, Export | Pending |
| **2** | Layout Playground | CSS Grid/Flexbox builder, Drag & Drop, Responsive preview | Pending |
| **3** | Shape & Component Lab | SVG editor, Component compositor, Variants | Pending |
| **4** | Framework Version | Rebuild in Svelte 5, Framework comparison docs | Pending |

### Phase 1 Modules (Current Focus)

| Module | File | Lines (est.) |
|--------|------|-------------|
| Central State | `studio-state.js` | ~180 |
| Token Editor | `token-editor.js` | ~350 |
| Color Harmony | `color-harmony.js` | ~120 |
| Export Engine | `export-engine.js` | ~150 |
| Presets | `presets.js` | ~100 |
| Theme Browser | `theme-browser.js` | ~80 |

---

## AI Agent Instructions

1. **Always check TO-DOS.md first** — understand current tasks
2. **Update metadata** when editing files — bump version, update date
3. **Follow file standards** — metadata header in all new files
4. **Use Chroma.js skill** when working on color features
5. **Use Svelte skill** when working in v2-svelte/
6. **Reference specific file paths** with line numbers
7. **Update task lists** after completing work
8. **Run confidence-check** before major implementations

### Quick Commands

| Command | Action |
|---------|--------|
| `/sc:analyze` | Code analysis |
| `/sc:build` | Implementation mode |
| `/sc:test` | Run tests |
| `/svelte` | Svelte 5 skill |
| `/chroma` | Chroma.js color skill |

---

## Contacts & Resources

- **Project:** Luno-Design-Studio
- **Part of:** LunoLabs ecosystem
- **Predecessor:** Luno-Future-Docs `/design-dashboard/`
- **PRD:** `docs/prd/prd-design-studio.md`
- **Inspired by:** [tweakcn.com](https://tweakcn.com) | [LayoutIt!](https://layoutit.com) | [SVG-Edit](https://svg-edit.github.io/svgedit/)
- **WCAG Reference:** https://www.w3.org/WAI/WCAG21/quickref/

---

*Last updated: 2026-02-26 | Version 1.0.0*
