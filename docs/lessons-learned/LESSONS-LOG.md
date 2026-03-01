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

---

## Session: Phase 0 Vertical Slice — 2026-03-01

### [PROCESS] Over-planning delays delivery — build the vertical slice first, then iterate
CW-03 spent excessive time on design docs and implementation plans before writing any code. The user had to nudge to shift from planning to building. For Phase 0 prototypes, 10 minutes of planning is enough — get to working code fast and iterate based on feedback.

### [INSIGHT] Abstract component swatches are useless for design exploration — show real page compositions
The initial preview (isolated color blocks and form elements) felt dated and unhelpful. Users need to see colors applied to realistic UI patterns (navbar, hero section, features grid, testimonial, footer) to evaluate whether a palette works. This matches the Realtime Colors approach that the user referenced.

### [CODE-PATTERN] CSS grid-template-rows 0fr→1fr enables smooth height animations without JS
Wrapping content in a grid child with `overflow: hidden` and transitioning the parent's `grid-template-rows` between `0fr` and `1fr` creates a smooth slide-down animation. Avoids the `max-height` hack and works with dynamic content heights.

### [ARCHITECTURE] URL hash encoding enables zero-backend palette sharing
Encoding 5 hex colors as `primary-secondary-accent-warning-danger` in the URL hash provides instant sharing with no server, no database, and full bookmark/copy-paste support. Decode on page load with `fromURLHash(location.hash.slice(1))`.

### [DEPENDENCY] Import maps + CDN ESM work reliably for prototyping
`<script type="importmap">` with jsdelivr ESM URLs works in all modern browsers. Combined with vanilla-colorful web component self-registration, the entire studio runs with zero build step — proving the vanilla approach viable for Phase 0-3.
