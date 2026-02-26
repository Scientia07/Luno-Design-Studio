<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       README.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★☆☆
author:         Joel + Claude
related_docs:   [CLAUDE.md, docs/prd/prd-design-studio.md]
description:    Project overview and getting started guide
==============================================================================
-->

# Luno Design Studio

> A visual editor for design tokens, layouts, shapes, and components — built twice to learn.

---

## What Is This?

The Design Studio lets you **visually tweak** colors, typography, spacing, layouts, and components in real-time. See what looks good. Export what works.

The twist: it's built **twice** — first in pure Vanilla JS (no build tools), then in Svelte 5 — to compare where frameworks actually add value.

## Features

### Phase 1: Design Tokens Studio
- Color Harmony Engine (OKLCH via Chroma.js)
- Typography controls (font family, size, weight, line-height)
- Spacing & border-radius sliders
- Shadow editor
- Dark/Light mode toggle
- 250+ theme presets (Gogh, Catppuccin, Material)
- Colorblind simulation (Deuteranopia, Protanopia, Tritanopia)
- Export: CSS Variables, JSON (W3C Design Tokens), Shareable URL
- Undo/Redo (30+ steps)

### Phase 2: Layout Playground
- CSS Grid/Flexbox visual builder
- Drag & Drop blocks
- Responsive preview (320px → 1440px)

### Phase 3: Shape & Component Lab
- SVG canvas editor
- Shape primitives & transformations
- Component compositor with variants

### Phase 4: Framework Comparison
- Svelte 5 rebuild with feature parity
- Documented comparison: LOC, performance, DX

## Quick Start

### v1 — Vanilla JS (No build tools)
```bash
# Just open it
open v1-vanilla/index.html

# Or serve locally
npx serve v1-vanilla
```

### v2 — Svelte 5
```bash
cd v2-svelte
npm install
npm run dev
```

## Tech Stack

| | v1-vanilla | v2-svelte |
|-|-----------|-----------|
| Core | HTML5/CSS3/JS | Svelte 5 + Vite |
| Color | Chroma.js | Chroma.js |
| DnD | SortableJS | svelte-dnd-action |
| Build | None | Vite |

## Project Structure

```
v1-vanilla/          → Phase 1-3 (no build tools)
v2-svelte/           → Phase 4 (framework version)
comparison/          → Framework comparison docs
shared/              → Shared CSS variables
docs/                → PRDs, research, handoffs
```

## Links

- **PRD:** [docs/prd/prd-design-studio.md](docs/prd/prd-design-studio.md)
- **Roadmap:** [docs/ROADMAP.md](docs/ROADMAP.md)
- **Predecessor:** [Luno-Future-Docs/design-dashboard](https://github.com/LunoLabs/Luno-Future-Docs/tree/main/design-dashboard)
- **Inspired by:** [tweakcn.com](https://tweakcn.com) | [LayoutIt!](https://layoutit.com) | [SVG-Edit](https://svg-edit.github.io/svgedit/)

---

**Part of the [LunoLabs](https://github.com/LunoLabs) ecosystem.**
