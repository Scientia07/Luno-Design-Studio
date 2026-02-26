<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       2026-02-26-project-setup.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [../ROADMAP.md, ../prd/prd-design-studio.md, ../../CLAUDE.md]
description:    Initial project setup handoff — repo creation, structure, skills
==============================================================================
-->

# Handoff: Project Setup

**Session Date:** 2026-02-26
**Focus:** Repository creation, directory structure, documentation, skill setup

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
