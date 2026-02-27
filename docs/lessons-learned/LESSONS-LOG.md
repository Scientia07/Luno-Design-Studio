<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       LESSONS-LOG.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         active
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [../handoffs/]
description:    Cumulative lessons learned across all Design Studio sessions
==============================================================================
-->

# Lessons Log — Luno Design Studio

> Transferable insights from each session. Referenced during planning and code review.

---

## Session: Project Setup — 2026-02-26

### [ARCHITECTURE] A vertical slice before full build prevents wasted effort
The initial plan jumped straight from scaffolding to building all 12 tasks. The quality audit revealed the architecture (state → CSS → preview pipeline) was unproven. Adding a Phase 0 vertical slice (one color picker end-to-end) validates the core data flow before committing to 18 tasks.

### [CODE-PATTERN] HSL hue rotation produces perceptually uneven color harmonies
The PRD's harmony algorithm used `hsl.h` for hue rotation, but HSL lightness is not perceptually uniform — a 180° rotation can produce wildly different perceived brightness. OKLCH hue rotation (`oklch.h`) preserves perceived lightness, which is the entire reason for choosing OKLCH as the color engine.

### [ARCHITECTURE] Separate editor chrome from user-editable tokens in CSS variables
Without `--studio-*` (fixed) vs `--color-*` (editable) separation, users changing background colors would break the editor UI itself. This pattern (seen in Figma, VS Code themes) was missing from the initial CSS architecture.

### [PROCESS] Quality audit before building catches document drift
Cross-referencing PRD ↔ CLAUDE.md ↔ TO-DOS ↔ ROADMAP revealed 10+ inconsistencies (wrong library refs, missing tasks, conflicting algorithms, no acceptance criteria). Finding these after building would have meant rework.

### [INSIGHT] User flow mapping exposes UX gaps invisible in technical specs
The PRD had detailed requirements but no onboarding flow, no error states, no preset hover preview, and no conflict resolution for shared URLs. These only became visible when tracing actual user journeys step by step.

### [PERFORMANCE] Multi-level debouncing is essential for real-time editors
CSS variable updates must be instant (60fps), but localStorage writes are synchronous/blocking and undo history requires deep cloning. Without separating update frequencies (16ms → 50ms → 300ms → 2000ms), a 1-second color drag would cause 60 localStorage writes and visible jank.
