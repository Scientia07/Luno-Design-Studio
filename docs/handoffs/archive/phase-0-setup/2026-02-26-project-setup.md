<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       2026-02-26-project-setup.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         archived
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [../ROADMAP.md, ../prd/prd-design-studio.md, ../../CLAUDE.md]
description:    Initial project setup handoff — repo creation, structure, skills
==============================================================================
-->

# Handoff: Project Setup

**Session Date:** 2026-02-26
**Focus:** Repository creation, directory structure, documentation, skill setup

## Conclusion & Lessons Learned

**Closed:** 2026-02-26 | **Outcome:** completed

### Lessons

1. **[ARCHITECTURE] A vertical slice before full build prevents wasted effort.** The initial plan jumped straight from scaffolding to building all 12 tasks. The quality audit revealed the architecture (state → CSS → preview pipeline) was unproven. Adding a Phase 0 vertical slice (one color picker end-to-end) validates the core data flow before committing to 18 tasks.

2. **[CODE-PATTERN] HSL hue rotation produces perceptually uneven color harmonies.** The PRD's harmony algorithm used `hsl.h` for hue rotation, but HSL lightness is not perceptually uniform — a 180° rotation can produce wildly different perceived brightness. OKLCH hue rotation (`oklch.h`) preserves perceived lightness, which is the entire reason for choosing OKLCH as the color engine.

3. **[ARCHITECTURE] Separate editor chrome from user-editable tokens in CSS variables.** Without `--studio-*` (fixed) vs `--color-*` (editable) separation, users changing background colors would break the editor UI itself. This pattern (seen in Figma, VS Code themes) was missing from the initial CSS architecture.

4. **[PROCESS] Quality audit before building catches document drift.** Cross-referencing PRD ↔ CLAUDE.md ↔ TO-DOS ↔ ROADMAP revealed 10+ inconsistencies (wrong library refs, missing tasks, conflicting algorithms, no acceptance criteria). Finding these after building would have meant rework.

5. **[INSIGHT] User flow mapping exposes UX gaps invisible in technical specs.** The PRD had detailed requirements but no onboarding flow, no error states, no preset hover preview, and no conflict resolution for shared URLs. These only became visible when tracing actual user journeys step by step.

6. **[PERFORMANCE] Multi-level debouncing is essential for real-time editors.** CSS variable updates must be instant (60fps), but localStorage writes are synchronous/blocking and undo history requires deep cloning. Without separating update frequencies (16ms → 50ms → 300ms → 2000ms), a 1-second color drag would cause 60 localStorage writes and visible jank.

---

## Completed

### 1. Repository Created
- New repo: `Luno-Design-Studio` at `/home/joel/Luno-web/Luno-Design-Studio/`
- Git initialized on `main` branch
- GitHub repo created and initial commit pushed

### 2. Directory Structure
Full project scaffold following Luno-Future-Docs conventions:
- `v1-vanilla/` — Phase 1-3 (no build tools)
- `v2-svelte/` — Phase 4 (Svelte 5)
- `comparison/` — Framework comparison docs
- `shared/` — Shared CSS variables
- `docs/` — PRDs, research, handoffs, templates

### 3. Documentation
| File | Purpose |
|------|---------|
| `CLAUDE.md` v1.0.0 | Project instructions with skills, standards, phases |
| `README.md` v1.0.0 | Project overview with quick start |
| `TO-DOS.md` v1.0.0 | 12 tasks across 3 priorities |
| `docs/ROADMAP.md` v1.0.0 | 4 phases, milestones v0.1.0 → v1.0.0 |
| `docs/prd/prd-design-studio.md` | Copied from Luno-Future-Docs (v2.0.0) |

### 4. Skills Configured
- Chroma.js skill symlinked (color engine)
- Svelte 5 skill symlinked (v2 phase)
- `.claude/settings.local.json` with permissions

### 5. Research Stubs
Active research directories created:
- `color-science/` — OKLCH, perceptual uniformity
- `design-tokens/` — W3C spec, token formats
- `layout-engines/` — CSS Grid/Flexbox builder approaches
- `svg-editors/` — Browser-based SVG editing
- `framework-comparison/` — Vanilla vs Svelte metrics

### 6. Shared Resources
- `shared/styles/base.css` — CSS reset + design token variables
- `.gitignore` — Node, OS, editor files

---

## Pending

### High Priority
- [ ] **Build Phase 1 MVP** — Start with Task 1 (studio-state.js) + Task 5 (HTML shell)
- [ ] **Populate theme presets** — Download Gogh themes JSON, format for our data model
- [ ] **Chroma.js CDN setup** — Test import map in v1-vanilla/index.html

### Medium Priority
- [ ] **Research: Gogh Themes API** — How to fetch/bundle 250+ themes
- [ ] **Research: W3C Design Tokens** — Finalize JSON export format

### Low Priority
- [ ] **Populate research docs** — Fill stubs with actual content
- [ ] **Comparison README** — Template for framework comparison metrics

---

## Context for Next Session

### Where to Start
1. Open `v1-vanilla/index.html` — build the editor shell (nav, panels, preview)
2. Create `v1-vanilla/js/studio-state.js` — central state with observer pattern
3. Wire up basic color controls with Chroma.js

### Key Decisions Made
- **OKLCH everywhere** — Chroma.js in OKLCH mode for perceptually uniform color manipulation
- **No build tools for v1** — CDN import maps, ES modules, zero npm
- **Observer pattern for state** — Custom pub/sub, not Redux-like
- **localStorage persistence** — Debounced 2s auto-save

### PRD Reference
The full PRD is at `docs/prd/prd-design-studio.md` (v2.0.0, 930+ lines). Key sections:
- Section 3.1: Functional requirements (FR-01 through FR-35)
- Section 4.3: Module architecture with line estimates
- Section 4.4: Data model (W3C Design Token format)
- Section 4.5: External dependencies

---

*Created: 2026-02-26*
