<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       library-research-2026.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★★
author:         Joel + Claude
related_docs:   [CLAUDE.md, TO-DOS.md, docs/prd/prd-design-studio.md]
description:    Comprehensive research of libraries and tools for Luno Design Studio
==============================================================================
-->

# Luno Design Studio - Library & Tool Research (2025-2026)

> **Purpose:** Evaluate the best modern libraries for building an interactive, fun-to-use visual design token editor.
> **Constraints:** v1 must work via CDN/ES module imports (no build tools). v2 targets Svelte 5 + Vite.
> **Date:** 2026-02-26

---

## Table of Contents

- [A. Color Pickers / Color Tools](#a-color-pickers--color-tools)
- [B. Micro-Interaction & Animation Libraries](#b-micro-interaction--animation-libraries)
- [C. Drag & Drop / Sortable / Resizable](#c-drag--drop--sortable--resizable)
- [D. SVG Manipulation Libraries](#d-svg-manipulation-libraries)
- [E. Slider / Range / Knob Controls](#e-slider--range--knob-controls)
- [F. Toast / Notification / Feedback](#f-toast--notification--feedback)
- [G. Panel / Splitter / Resizable Layout](#g-panel--splitter--resizable-layout)
- [H. Tooltip / Popover / Context Menu](#h-tooltip--popover--context-menu)
- [I. Code Display / Syntax Highlighting](#i-code-display--syntax-highlighting)
- [J. Fun / Delight Libraries](#j-fun--delight-libraries)
- [K. Comparable Design Tools / Inspiration](#k-comparable-design-tools--inspiration)
- [Final Recommendations](#final-recommendations)

---

## A. Color Pickers / Color Tools

> Beyond Chroma.js (already chosen for OKLCH color math). These are the UI picker components.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **vanilla-colorful** | ~2.6k | **2.7 KB** | jsDelivr | Yes (Web Component) | Yes (custom elements work anywhere) | Tiny, accessible, zero-dependency. Port of react-colorful to Custom Elements. 12 color model bundles (HEX, RGBA, HSLA, HSVA). Standards-based, works everywhere. |
| **Coloris** | ~3.8k | **~5 KB** | jsDelivr | Yes (native ES6) | Yes (attach to any input) | Elegant, accessible, keyboard navigable, touch-friendly. Attaches to any input via `data-coloris` attribute. Beautiful out-of-the-box styling. |
| **@simonwep/pickr** | ~4.4k | **~7 KB** (modern) | jsDelivr | Yes | Yes | Three built-in themes (classic, monolith, nano). Supports RGBA, HSLA, HSVA, CMYK. Hackable, multi-themed, responsive. |
| **iro.js** | ~3.7k | **~9 KB** | jsDelivr | Yes | Yes | SVG-based circular color wheel. Multi-color selection. Modular components (wheel, box, slider). Beautiful visual UI with no extra CSS/images. |
| **color-input** (Web Component) | ~new | **~6 KB** | unpkg | Yes (Web Component) | Yes | **Supports OKLCH natively**, P3, LAB, LCH. Built on colorjs.io. One `<color-input>` tag — the only picker with native wide-gamut support. |

### Recommendation for Luno Design Studio

**Primary: vanilla-colorful** for the main color pickers (tiny, accessible, Web Component)
**Secondary: color-input** for OKLCH-specific picking where wide-gamut display is needed
**Chroma.js** remains the engine for all color math, harmony generation, and contrast checking.

---

## B. Micro-Interaction & Animation Libraries

> Make the UI feel alive: spring physics, gesture-based, buttery smooth.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **Motion** (motion.dev) | ~26k | **2.3 KB** (mini) / **3.8 KB** (animate) | jsDelivr | Yes | Yes | Built on Web Animations API = native browser perf. Real spring physics. 120fps GPU-accelerated. 1/7th the size of GSAP. CDN import via script tag. The modern gold standard. |
| **Anime.js v4** | ~50k | **~10 KB** | jsDelivr (ESM) | Yes | Yes | Complete rewrite in v4 (2025). ES modules. Spring physics, text splitting, layout animations. The most popular pure-JS animation library. |
| **GSAP** | ~20k | **~24 KB** (core) / **~30 KB** (+ScrollTrigger) | cdnjs, jsDelivr | Yes | Yes | Industry standard. Now **free for all uses** (Webflow acquired GreenSock 2025). ScrollTrigger, Flip, timeline control. Most powerful overall, but heaviest. |
| **AutoAnimate** (@formkit) | ~13k | **~2 KB** | cdnjs | Yes | Yes (native Svelte action) | Zero-config magic: add/remove/move DOM children get animated automatically. One function call. Works as Svelte `use:autoAnimate`. |
| **Built-in svelte/motion** | N/A (core) | **0 KB** (included) | N/A | No | Yes (native) | Svelte 5's `spring()` and `tweened()` stores. Since v5.8.0, `Spring` class for runes. No extra dependencies for v2. |

### Additional mentions

- **@humanspeak/svelte-motion**: Framer Motion-style API for Svelte 5 with motion components, gestures, variants, exit animations.
- **springTo.js**: Ultra-minimal spring physics in a single function call (mattkrenn).
- **Popmotion**: Functional, reactive animations. Foundation that powers Framer Motion internally.

### Recommendation for Luno Design Studio

**v1-vanilla: Motion (motion.dev)** as primary — 2.3 KB, spring physics, CDN-ready. Use **AutoAnimate** for list/panel transitions. Optionally add **Anime.js v4** for complex timeline sequences.
**v2-svelte: Built-in svelte/motion** for springs + **@humanspeak/svelte-motion** for gesture-driven animations.

---

## C. Drag & Drop / Sortable / Resizable

> For the layout builder (CSS Grid cells), SVG layer ordering, and component composition.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **SortableJS** (already chosen) | ~30k | **~10 KB** | cdnjs | Yes | Adapter exists | Battle-tested. Sortable lists, grid, kanban. Touch support. The default choice for v1. |
| **Pragmatic DnD** (Atlassian) | ~11k | **~4.7 KB** (core) | npm only | Yes (vanilla core) | Yes (any framework) | Powers Trello, Jira, Confluence. Lazy-loadable. Supports element, text, image, and file drops. Built on native HTML5 DnD. |
| **@neodrag/vanilla + @neodrag/svelte** | ~1.7k | **~2 KB** (brotli) | npm | Yes (@neodrag/vanilla) | Yes (native action) | Ultra-tiny. Svelte action-based. Reactive options. Great for dragging individual elements (not sorting). Perfect companion to SortableJS. |
| **interact.js** | ~12k | **~17 KB** | cdnjs | Yes | Yes | Drag + **Resize** + **Rotate** + multi-touch gestures. Inertia, snapping, constraints. The only library with built-in resize AND rotate — critical for the SVG shape editor. |
| **SvelteDnD** (thisuxhq) | ~new | **~3 KB** | npm | No | Yes (Svelte 5 native) | Built with TypeScript and Svelte 5 runes. Sortable lists, kanban, grid sorting. Designed for Svelte 5 from day one. |

### Recommendation for Luno Design Studio

**v1-vanilla: SortableJS** (layout builder sorting) + **interact.js** (SVG editor resize/rotate/drag).
**v2-svelte: SvelteDnD or svelte-dnd-action** (sortable) + **@neodrag/svelte** (individual dragging) + **interact.js** (resize/rotate).

---

## D. SVG Manipulation Libraries

> For the Shape Editor module — drawing, selecting, transforming, layering SVG shapes.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **SVG.js** | ~11k | **~16 KB** | cdnjs, jsDelivr | Yes | Yes | Lightweight, fluent API. Close to complete SVG spec coverage. Plugin ecosystem (select, filter, draw). Best balance of size vs features for pure SVG work. |
| **Fabric.js v6** | ~29k | **~90 KB** | cdnjs | Yes | Yes | Full canvas + SVG engine. Built-in selection, grouping, serialization, filters, SVG export. Best for Figma-like editors. Heavy but incredibly feature-rich. |
| **Paper.js** | ~14k | **~80 KB** | cdnjs | Yes | Yes | "Swiss Army Knife" of vector graphics. Powerful path operations (boolean ops, smooth, simplify). Great mouse/keyboard interaction model. |
| **Two.js** | ~8.2k | **~50 KB** | cdnjs | Yes | Yes | Renderer-agnostic (Canvas, SVG, WebGL). Built-in animation loop. SVG import. Good for animated illustrations and shape tweening. |
| **Rough.js** | ~20k | **<9 KB** | cdnjs | Yes | Yes | Hand-drawn, sketchy rendering style. Unique aesthetic. Could be used for "draft/wireframe" mode in the component lab. |

### Recommendation for Luno Design Studio

**v1-vanilla: SVG.js** as primary — lightweight, clean API, close to native SVG, plugin support for selection/drawing. Add **Rough.js** as an optional "sketch mode" for fun.
**v2-svelte:** Use Svelte components wrapping SVG.js, or consider **Fabric.js** if advanced selection/grouping is needed.

**Note:** If the SVG editor scope grows toward a Figma-like experience, **Fabric.js** is the clear upgrade path despite its size.

---

## E. Slider / Range / Knob Controls

> Custom range inputs for font size, weight, line height, spacing, border radius, shadow controls.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **noUiSlider** | ~5.7k | **~8 KB** | cdnjs | Yes | Yes (bind to DOM) | ARIA-accessible, GPU-animated, no reflows. Multi-handle, non-linear ranges, tooltips, pips (scale marks). The gold standard for range sliders. Touch + keyboard support. |
| **Jim Knopf** | ~small | **~3 KB** | npm/manual | Yes (SVG-based) | Yes | Pure JS rotary knob/dial from range inputs. SVG-rendered, touch-friendly. Perfect for HSL hue wheels, rotation controls. |
| **round-slider** | ~1k | **~5 KB** | jsDelivr | Yes (Web Component) | Yes | Circular/arc slider as a Web Component. Great for hue selection, angle controls, or percentage dials. |
| **CSS-only range** | N/A | **0 KB** | N/A | Yes | Yes | Modern CSS with `accent-color`, `@property`, and `appearance: none` can create beautiful range inputs with no JS. Good baseline. |

### Recommendation for Luno Design Studio

**v1-vanilla: noUiSlider** for all linear sliders (font size, weight, spacing, shadows). **round-slider** or custom SVG for hue/rotation dials.
**v2-svelte:** Wrap noUiSlider or use Svelte reactive bindings on native `<input type="range">` with custom styling.

---

## F. Toast / Notification / Feedback

> Lightweight, beautiful feedback for save, export, copy, undo actions.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **Notyf** | ~2.6k | **~3 KB** | jsDelivr | Yes | Yes | Responsive, A11Y-compliant, zero-dependency. Minimal API: `notyf.success()` / `notyf.error()`. Beautiful default styling. Designed for simplicity. |
| **Toastify JS** | ~1.8k | **~2 KB** | cdnjs | Yes | Yes | Ultra-lightweight, no dependencies. Non-blocking toasts. Customizable position, duration, styling. |
| **@zerodevx/svelte-toast** | ~800 | **~8 KB** (gzip) | jsDelivr | Yes (UMD build!) | Yes (native) | Compiles to UMD — works in vanilla JS via CDN AND as Svelte component. Rich features: dismissible, stackable, themed. Best of both worlds for our hybrid project. |
| **NotifyX** | ~new | **<3 KB** | npm | Yes | Yes | Framework-agnostic, TypeScript-first. Works with vanilla JS, React, Vue, Angular. Modern architecture. |

### Recommendation for Luno Design Studio

**v1-vanilla: Notyf** — 3 KB, beautiful defaults, zero config needed, A11Y compliant.
**v2-svelte: svelte-sonner** (Svelte port of Sonner by wobsoriano) — the most polished Svelte toast experience, integrates with shadcn-svelte.

**Alternative for both:** @zerodevx/svelte-toast — single library that works in both vanilla (UMD) and Svelte contexts.

---

## G. Panel / Splitter / Resizable Layout

> For the editor panels: left sidebar (properties/controls) + right canvas (live preview).

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **Split.js** | ~6.1k | **~2 KB** | cdnjs | Yes | Yes (bind to DOM) | Ultra-minimal. Supports flexbox, grid, float layouts. CSS-driven (no heavy JS). Perfect for vanilla. |
| **PaneForge** | ~625 | **~8 KB** | npm | No | Yes (Svelte 5 native) | Built for Svelte 5. Persistent layouts (localStorage/cookies). Nested pane groups. A11Y support. From the svecosystem team (same as Bits UI). |
| **svelte-splitpanes** | ~400 | **~10 KB** | npm | No | Yes | Feature-rich: min/max boundaries, snap, expand-on-double-click, fixed sizes, RTL. Originally ported from vue-splitpanes. |
| **CSS resize** | N/A | **0 KB** | N/A | Yes | Yes | Modern CSS `resize: horizontal` + `overflow: auto` on panels provides basic resizing with zero JS. Good enough for MVP. |

### Recommendation for Luno Design Studio

**v1-vanilla: Split.js** — 2 KB, dead simple, CSS-driven. Or even start with pure CSS `resize` property for MVP.
**v2-svelte: PaneForge** — native Svelte 5, persistent layouts, nested groups. The clear winner for the framework version.

---

## H. Tooltip / Popover / Context Menu

> For property info ("What is OKLCH?"), color details on hover, right-click context menus.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **Floating UI** | ~30k | **~3 KB** (core) | jsDelivr (ESM+UMD) | Yes | Yes | The positioning engine behind everything. Handles placement, flipping, shifting, arrow, overflow. Used by Tippy, Bits UI, and thousands of sites. 0.6 KB for just the core. |
| **Tippy.js** | ~12k | **~7 KB** (+Floating UI) | cdnjs, unpkg | Yes | Yes (bind to elements) | Complete tooltip/popover/dropdown/menu solution built on Floating UI. Themes, animations, A11Y, touch support. Ready-to-use. |
| **Bits UI** | ~2k | **tree-shakeable** | npm | No | Yes (Svelte 5 native) | Headless component library for Svelte 5. Tooltip, Popover, Context Menu, Dialog, and 30+ more primitives. Built on Melt UI builders. From the shadcn-svelte ecosystem. |
| **Melt UI** | ~3.3k | **tree-shakeable** | npm | No | Yes (Svelte 5 native) | Low-level headless builders. Maximum customization. Bits UI wraps Melt UI with a friendlier API. Choose Melt for full control, Bits for convenience. |

### Recommendation for Luno Design Studio

**v1-vanilla: Tippy.js** — drop-in tooltips and popovers, great defaults, accessible, CDN-ready.
**v2-svelte: Bits UI** — headless, accessible, Svelte 5 native. Includes Tooltip, Popover, Context Menu, and every other UI primitive you'd need.

---

## I. Code Display / Syntax Highlighting

> For the Export preview — showing generated CSS variables, JSON Design Tokens, HTML snippets.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **Highlight.js** | ~23k | **~13 KB** (core + 1 lang) | cdnjs | Yes | Yes | Auto-detection, 190+ languages, 90+ themes. Lightweight per-language bundles. Easy CDN setup. Best for quick integration. |
| **Prism.js** | ~12k | **~6 KB** (core + CSS/JS) | cdnjs | Yes | Yes | Modular — include only languages you need (CSS, JSON, HTML = tiny). Line numbers, copy button, and other plugins. The developer favorite for docs. |
| **Shiki** | ~11k | **~200 KB** (with WASM + 1 theme + 1 lang) | esm.run | Yes (async) | Yes | VS Code-quality highlighting (uses TextMate grammars). Beautiful output. But heavy due to WASM. Better for build-time or SSR. |

### Recommendation for Luno Design Studio

**v1-vanilla: Prism.js** — modular, tiny for CSS+JSON+HTML, line numbers plugin, CDN-ready. 6 KB for exactly the languages we need.
**v2-svelte: Shiki** — superior quality, can be loaded async with on-demand languages. Worth the extra weight in a Vite build context.

---

## J. Fun / Delight Libraries

> Confetti on export, particle effects, celebration moments. Small touches that spark joy.

| Library | GitHub Stars | Gzip Size | CDN | Vanilla JS | Svelte 5 | What Makes It Special |
|---------|-------------|-----------|-----|-----------|----------|----------------------|
| **canvas-confetti** | ~10k | **~6 KB** | jsDelivr, cdnjs | Yes | Yes | One function call: `confetti()`. Customizable shapes, colors, angles. `disableForReducedMotion` built-in. The go-to for celebration moments. |
| **party.js** | ~1.5k | **~8 KB** | jsDelivr | Yes | Yes | Particle system beyond confetti: sparkles, stars, hearts. Attach effects to DOM elements. `party.confetti(element)` — confetti explodes FROM a button. |
| **tsParticles** | ~7.5k | **variable** (modular) | jsDelivr | Yes | Yes (official Svelte package) | Full particle system: confetti, fireworks, snow, bubbles. Highly customizable. Heavy if you load everything, but the confetti preset is small. Official Svelte integration. |
| **Rough Notation** | ~8.3k | **~3.5 KB** | unpkg | Yes | Yes | Animated hand-drawn annotations — underline, circle, highlight, bracket. Perfect for highlighting color swatches, selected tokens, or tutorial callouts. Unique and delightful. |

### Recommendation for Luno Design Studio

**v1-vanilla: canvas-confetti** (export success celebrations) + **Rough Notation** (highlight active tokens, tutorial mode).
**v2-svelte:** Same libraries work, plus **tsParticles** Svelte package for richer particle effects.

**Use sparingly:** Respects `prefers-reduced-motion`. Triggered only on meaningful user actions (successful export, first theme applied, sharing URL).

---

## K. Comparable Design Tools / Inspiration

> Open-source and indie design tools to study for UX patterns, features, and architecture.

| Tool | Type | Open Source | Key Learnings for Luno |
|------|------|-------------|----------------------|
| **[Penpot](https://penpot.app)** | Full design tool | Yes (AGPL) | First open-source tool with **native W3C Design Tokens**. SVG-based. Inspect tab for developers. Study their token panel UX and CSS Grid layout system. |
| **[Realtime Colors](https://www.realtimecolors.com)** | Color system visualizer | Free (not OSS) | **Primary UX inspiration.** Live preview of colors on realistic page layouts. Toolbar + instant preview paradigm. Font pairing. Exactly the "feel" Luno should replicate. |
| **[tweakcn](https://tweakcn.com)** | shadcn/ui theme editor | Yes (GitHub) | Visual sliders for theming. Real-time code export. Component preview grid. Study their slider-to-CSS-variable pipeline. |
| **[Utopia.fyi](https://utopia.fyi)** | Fluid type/space calculator | Free (formulas OSS) | Fluid typography & spacing scales using `clamp()`. Their type scale visualizer is a perfect reference for our typography controls. |
| **[Open Props](https://open-props.style)** | CSS custom property library | Yes (MIT) | 16 OKLCH palette variables, comprehensive token system. Study their naming conventions and OKLCH palette generation. Consider importing as presets. |
| **[Coolors.co](https://coolors.co)** | Palette generator | Free (not OSS) | Best-in-class palette generation UX: spacebar to randomize, lock colors, adjust, export. Study their keyboard-driven workflow and color locking pattern. |
| **[Happy Hues](https://www.happyhues.co)** | Color palette previewer | Free (not OSS) | Shows palettes applied to real UI sections (not just swatches). Study their "palette in context" approach for our preview area. |
| **[Plasmic](https://www.plasmic.app)** | Visual builder | Partial OSS | Visual component building, drag-and-drop, token binding. Study their property panel layout and component composition UX. |

### Key UX Patterns to Adopt

1. **Realtime Colors model:** Toolbar controls on top/side, full-page live preview that updates instantly.
2. **Coolors keyboard flow:** Spacebar to randomize, arrow keys to navigate, Enter to lock.
3. **Penpot token panel:** Tokens grouped by type with inline editing and one-click apply.
4. **Utopia fluid scales:** Visual representation of the mathematical relationship between sizes.
5. **tweakcn code export:** Side-by-side preview + generated code with copy button.

---

## Final Recommendations

### The "Vanilla Stack" (v1 — CDN only, zero build tools)

| Category | Library | Size | CDN Import |
|----------|---------|------|-----------|
| Color Math | **Chroma.js 3.x** | 13.5 KB | `cdn.jsdelivr.net/npm/chroma-js` |
| Color Picker | **vanilla-colorful** | 2.7 KB | `cdn.jsdelivr.net/npm/vanilla-colorful` |
| Animation | **Motion** (motion.dev) | 2.3 KB | `cdn.jsdelivr.net/npm/motion` |
| Auto-Animate | **AutoAnimate** | ~2 KB | `cdnjs.cloudflare.com/ajax/libs/auto-animate` |
| Drag/Sort | **SortableJS** | 10 KB | `cdn.jsdelivr.net/npm/sortablejs` |
| Drag/Resize | **interact.js** | 17 KB | `cdn.jsdelivr.net/npm/interactjs` |
| SVG Editor | **SVG.js** | 16 KB | `cdn.jsdelivr.net/npm/@svgdotjs/svg.js` |
| Range Sliders | **noUiSlider** | 8 KB | `cdnjs.cloudflare.com/ajax/libs/noUiSlider` |
| Toasts | **Notyf** | 3 KB | `cdn.jsdelivr.net/npm/notyf` |
| Panel Split | **Split.js** | 2 KB | `cdnjs.cloudflare.com/ajax/libs/split.js` |
| Tooltips | **Tippy.js** | 7 KB | `unpkg.com/tippy.js` |
| Code Highlight | **Prism.js** | 6 KB | `cdnjs.cloudflare.com/ajax/libs/prism` |
| Confetti | **canvas-confetti** | 6 KB | `cdn.jsdelivr.net/npm/canvas-confetti` |
| Annotations | **Rough Notation** | 3.5 KB | `unpkg.com/rough-notation` |
| **TOTAL** | | **~99 KB** | |

**~99 KB gzipped for a complete, interactive, animated design editor.** That is remarkably lean.

### The "Svelte Stack" (v2 — Svelte 5 + Vite)

| Category | Library | Notes |
|----------|---------|-------|
| Color Math | **Chroma.js 3.x** | Same as v1 |
| Color Picker | **vanilla-colorful** | Web Components work in Svelte |
| Animation | **svelte/motion** (built-in) | Spring, tweened — free |
| Gesture Animation | **@humanspeak/svelte-motion** | Framer Motion-style API |
| Auto-Animate | **AutoAnimate** | Native Svelte action |
| Drag/Sort | **SvelteDnD** or **svelte-dnd-action** | Svelte 5 native |
| Drag/Resize | **interact.js** or **@neodrag/svelte** | Flexible |
| SVG Editor | **SVG.js** or **Fabric.js** | Depending on scope |
| Range Sliders | **noUiSlider** + Svelte bindings | Or native `<input>` with styling |
| Toasts | **svelte-sonner** | Svelte port of Sonner |
| Panel Split | **PaneForge** | Svelte 5 native, persistent |
| Tooltips/Popovers | **Bits UI** | 30+ headless Svelte primitives |
| Code Highlight | **Shiki** | VS Code quality, async loading |
| Confetti | **canvas-confetti** | Same as v1 |
| Annotations | **Rough Notation** | Same as v1 |

### Priority Order for Integration

1. **Chroma.js** + **vanilla-colorful** — color editing is the core feature
2. **Split.js** / **PaneForge** — editor layout structure
3. **noUiSlider** — all the property sliders
4. **Motion** / **AutoAnimate** — make it feel alive
5. **SortableJS** / **interact.js** — drag & drop for layout builder
6. **Tippy.js** / **Bits UI** — contextual information
7. **Prism.js** / **Shiki** — export code preview
8. **Notyf** / **svelte-sonner** — user feedback
9. **SVG.js** — shape editor (Phase 3)
10. **canvas-confetti** + **Rough Notation** — delight layer

---

## Sources

### Color Pickers
- [vanilla-colorful on GitHub](https://github.com/web-padawan/vanilla-colorful)
- [Coloris on GitHub](https://github.com/mdbassit/Coloris)
- [@simonwep/pickr on GitHub](https://github.com/simonwep/pickr)
- [iro.js on GitHub](https://github.com/jaames/iro.js)
- [color-input Web Component](https://www.cssscript.com/color-picker-oklch-p3/)

### Animation
- [Motion (motion.dev)](https://motion.dev/)
- [Anime.js v4](https://animejs.com/)
- [GSAP](https://gsap.com/)
- [AutoAnimate](https://auto-animate.formkit.com/)
- [springTo.js](https://matthaeuskrenn.com/springto/)
- [@humanspeak/svelte-motion](https://www.npmjs.com/package/@humanspeak/svelte-motion)

### Drag & Drop
- [Pragmatic DnD (Atlassian)](https://github.com/atlassian/pragmatic-drag-and-drop)
- [@neodrag/svelte](https://www.neodrag.dev/)
- [SvelteDnD](https://github.com/thisuxhq/sveltednd)
- [interact.js](https://interactjs.io/)
- [svelte-dnd-action](https://github.com/isaacHagoel/svelte-dnd-action)

### SVG
- [SVG.js](https://svgjs.dev/)
- [Fabric.js v6](https://fabricjs.com/)
- [Paper.js](http://paperjs.org/)
- [Two.js](https://two.js.org/)
- [Rough.js](https://roughjs.com/)

### Sliders & Controls
- [noUiSlider](https://refreshless.com/nouislider/)
- [round-slider](https://www.cssscript.com/tag/knob/)

### Notifications
- [Notyf](https://carlosroso.com/notyf/)
- [Toastify JS](https://apvarun.github.io/toastify-js/)
- [svelte-sonner](https://github.com/wobsoriano/svelte-sonner)
- [@zerodevx/svelte-toast](https://github.com/zerodevx/svelte-toast)

### Layout
- [Split.js](https://split.js.org/)
- [PaneForge](https://paneforge.com/)
- [svelte-splitpanes](https://github.com/orefalo/svelte-splitpanes)

### Tooltips & UI
- [Tippy.js](https://atomiks.github.io/tippyjs/)
- [Floating UI](https://floating-ui.com/)
- [Bits UI](https://bits-ui.com/)
- [Melt UI](https://melt-ui.com/)

### Code Highlighting
- [Prism.js](https://prismjs.com/)
- [Highlight.js](https://highlightjs.org/)
- [Shiki](https://shiki.style/)

### Fun & Delight
- [canvas-confetti](https://github.com/catdad/canvas-confetti)
- [party.js](https://party.js.org/)
- [tsParticles](https://confetti.js.org/)
- [Rough Notation](https://roughnotation.com/)

### Design Tools & Inspiration
- [Penpot](https://penpot.app/)
- [Realtime Colors](https://www.realtimecolors.com/)
- [tweakcn](https://tweakcn.com/)
- [Utopia.fyi](https://utopia.fyi/)
- [Open Props](https://open-props.style/)
- [Coolors.co](https://coolors.co/)
- [Happy Hues](https://www.happyhues.co/)
- [W3C Design Tokens Spec (stable 2025.10)](https://www.w3.org/community/design-tokens/)

---

*Research completed 2026-02-26 | Version 1.0.0*
