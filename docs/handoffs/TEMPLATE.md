# Handoff: <Game Name> - Session <N>

> **Version:** 1.2.0 | **Date:** 2026-02-26 | **Rating:** 8.8/10

**Date:** YYYY-MM-DD
**Context Window ID:** CW-XX
**Session Focus:** <one-line description of what was worked on>
**Status:** completed | partial | blocked

---

## Completed This Session
- Item 1
- Item 2

## Files Created / Modified
```
NEW:      path/to/new/file.luau
MODIFIED: path/to/existing/file.luau
DELETED:  path/to/removed/file.luau
```

## Key Decisions Made
| Decision | Rationale |
|----------|-----------|
| Decision 1 | Why |

## Deviations from PRD
*Did this session diverge from the PRD scope? Track intentional changes here so future sessions don't "correct" them back.*
- None / Description of deviation and why

## Known Issues
| Issue | Severity | Proposed Fix |
|-------|----------|-------------|
| Issue 1 | low/medium/high | How to fix |

## Blockers & Dependencies
| Blocker | Blocking What | Resolution |
|---------|---------------|------------|
| Blocker 1 | What it blocks | How to unblock |

## Architecture Impact
*Did this session change any architectural decisions? If yes, update `docs/DECISIONS.md`.*
- None / Description of impact

## Quality Checkpoint
| Check | Result | Notes |
|-------|--------|-------|
| Lint (selene) | pass / fail / skipped | |
| Format (stylua) | pass / fail / skipped | |
| Type check | pass / fail / skipped | |
| Tests (frktest) | X/Y passing / skipped | |
| Build (rojo) | pass / fail / skipped | |

## Confidence Assessment
- **Code stability:** high | medium | low
- **Test coverage:** sufficient | gaps in <area>
- **Ready for next phase:** yes | needs <what>

## Skill Updates
*Did this session introduce patterns that conflict with `.claude/skills/`? List any skills updated or confirmed current. Skip if research-only session.*
- [ ] `luau-codegen` — current / updated (describe change)
- [ ] `roblox-architecture` — current / updated (describe change)
- [ ] `frktest-testing` — current / updated (describe change)
- [ ] Other: `<skill-name>` — current / updated (describe change)

## Pending / Next Session
- **Next CW:** CW-XX
- **Focus:** <specific task for next session>
- **Priority tasks:**
  1. Task 1
  2. Task 2

## Context Loading for Next Session
```
READ (required):
  1. games/<game>/PRD.md
  2. docs/handoffs/<this-file>.md
  3. pipeline/type-stubs/core-api.luau

READ (relevant source files):
  4. games/<game>/src/server/Services/RelevantService.luau
  5. games/<game>/src/shared/Types.luau

REFERENCE (if needed):
  6. docs/PRD/pipeline/ARCHITECTURE.md
  7. research/<relevant-doc>.md

Estimated context load: ~XXK tokens
  - PRD:          ~XK
  - This handoff:  ~XK
  - Type stubs:   ~XK
  - Source files:  ~XK
```

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-24 | Initial template with blockers and architecture impact sections. Rating: 7.5/10 |
| 1.1.0 | 2026-02-24 | Fix completed items markup, remove duplicate date, add Quality Checkpoint, Deviations from PRD, Confidence Assessment, token budget estimate. Replace vanity metrics with actionable sections. Remove meta-review from template body. Rating: 8.5/10 |
| 1.2.0 | 2026-02-26 | Added Skill Updates section — checklist for verifying `.claude/skills/` stay current after implementation sessions. Rating: 8.8/10 |
