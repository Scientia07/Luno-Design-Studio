<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       2026-03-01-phase0-implementation.md
created:        2026-03-01
updated:        2026-03-01
version:        1.0.0
status:         active
rating:         ★★★★☆
author:         Joel + Claude
related_docs:   [2026-03-01-phase0-vertical-slice-design.md, ../../TO-DOS.md]
description:    Step-by-step implementation plan for Phase 0 vertical slice
==============================================================================
-->

# Phase 0: Vertical Slice — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a working color picker → state → CSS variable → live preview pipeline with zero build tools, proving the CDN + ES module architecture.

**Architecture:** Import map aliases CDN URLs so ES modules use clean imports (`import chroma from 'chroma-js'`). A minimal observer-pattern state module connects color pickers to CSS custom properties. Preview components react via pure CSS cascade.

**Tech Stack:** Chroma.js 3.1.2 (CDN ESM), vanilla-colorful (CDN Web Component), pure HTML5/CSS3/JS ES modules.

**Key files to read before starting:**
- `shared/styles/base.css` — existing CSS variables (`--studio-*` chrome + `--color-*` tokens)
- `docs/plans/2026-03-01-phase0-vertical-slice-design.md` — approved design
- `docs/research/active/design-tokens/library-research-2026.md` — CDN URLs

---

## Task 1: CDN Smoke Test (T0.1)

**Goal:** Verify Chroma.js and vanilla-colorful load via CDN in the browser.

**Files:**
- Create: `v1-vanilla/index.html`

**Step 1: Create minimal index.html with import map**

```html
<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       index.html
created:        2026-03-01
updated:        2026-03-01
version:        0.0.1
status:         draft
rating:         ★☆☆☆☆
author:         Joel + Claude
related_docs:   [css/studio.css, css/preview.css, js/studio-state.js]
description:    Luno Design Studio — Phase 0 vertical slice entry point
==============================================================================
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Luno Design Studio — Visual Design Token Editor">
    <title>Luno Design Studio</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <!-- Shared base styles -->
    <link rel="stylesheet" href="../shared/styles/base.css">

    <!-- Import Map: CDN aliases for ES modules -->
    <script type="importmap">
    {
        "imports": {
            "chroma-js": "https://cdn.jsdelivr.net/npm/chroma-js@3.1.2/+esm"
        }
    }
    </script>

    <!-- vanilla-colorful: self-registering Web Component -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/vanilla-colorful@0.7.2/hex-color-picker.js"></script>
</head>
<body>
    <h1>CDN Smoke Test</h1>
    <p id="chroma-status">Chroma.js: loading...</p>
    <p id="picker-status">Picker: checking...</p>
    <hex-color-picker color="#6366f1"></hex-color-picker>

    <script type="module">
        // Test 1: Chroma.js import
        try {
            const chroma = await import('chroma-js');
            const c = chroma.default('#6366f1');
            const oklch = c.oklch();
            document.getElementById('chroma-status').textContent =
                `Chroma.js: OK — oklch(${oklch.map(v => v?.toFixed(3)).join(', ')})`;
            console.log('✓ Chroma.js loaded, OKLCH works:', oklch);
        } catch (e) {
            document.getElementById('chroma-status').textContent =
                `Chroma.js: FAILED — ${e.message}`;
            console.error('✗ Chroma.js failed:', e);
        }

        // Test 2: vanilla-colorful Web Component
        const picker = document.querySelector('hex-color-picker');
        if (picker && picker.shadowRoot) {
            document.getElementById('picker-status').textContent =
                'Picker: OK — rendered with shadow DOM';
            console.log('✓ vanilla-colorful loaded');
        } else {
            // Web Component may need a tick to upgrade
            await new Promise(r => setTimeout(r, 100));
            const p2 = document.querySelector('hex-color-picker');
            if (p2 && p2.shadowRoot) {
                document.getElementById('picker-status').textContent =
                    'Picker: OK — rendered (async upgrade)';
                console.log('✓ vanilla-colorful loaded (async)');
            } else {
                document.getElementById('picker-status').textContent =
                    'Picker: FAILED — no shadow root';
                console.error('✗ vanilla-colorful failed');
            }
        }

        // Test 3: Picker event
        picker.addEventListener('color-changed', (e) => {
            console.log('✓ color-changed event:', e.detail.value);
        });
    </script>
</body>
</html>
```

**Step 2: Serve and test in browser**

Run: `cd v1-vanilla && python3 -m http.server 8080`
Open: `http://localhost:8080`

Expected:
- "Chroma.js: OK — oklch(0.555, 0.239, 268....)
- "Picker: OK — rendered with shadow DOM"
- Color picker visible, dragging logs `color-changed` events

**Step 3: Verify OKLCH round-trip**

In browser console:
```javascript
const chroma = (await import('chroma-js')).default;
const hex = '#6366f1';
const oklch = chroma(hex).oklch();
const back = chroma.oklch(...oklch).hex();
console.log(hex, '→ oklch →', back); // Should match or be very close
```

**Step 4: Download local fallback**

Run: `curl -o v1-vanilla/lib/chroma.min.js "https://cdn.jsdelivr.net/npm/chroma-js@3.1.2/dist/chroma.min.cjs"`

Note: The local fallback is for offline scenarios only. We'll add the fallback mechanism in Phase 1 Task 13 (Error Handling). For Phase 0, CDN-only is fine.

**Step 5: Commit**

```bash
git add v1-vanilla/index.html v1-vanilla/lib/chroma.min.js
git commit -m "feat(phase0): CDN smoke test — Chroma.js + vanilla-colorful verified"
```

---

## Task 2: State Module (T0.3 — partial)

**Goal:** Build the minimal observer-pattern state module that connects color values to CSS custom properties.

**Files:**
- Create: `v1-vanilla/js/studio-state.js`

**Step 1: Write studio-state.js**

```javascript
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       studio-state.js
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [../index.html, editors/token-editor.js]
description:    Minimal state module — get/set/subscribe/CSS var sync (Phase 0)
==============================================================================
*/

import chroma from 'chroma-js';

// ─── Default token values ─────────────────────────────────
const DEFAULTS = {
    colors: {
        primary:     '#6366f1',
        secondary:   '#ec4899',
        accent:      '#10b981',
        warning:     '#f59e0b',
        danger:      '#ef4444',
        info:        '#3b82f6',
        bgDark:      '#0f172a',
        bgDarker:    '#0a0a1a',
        bgCard:      'rgba(255,255,255,0.05)',
        textPrimary: '#ffffff',
        textMuted:   'rgba(255,255,255,0.75)',
    },
};

// ─── Helpers ──────────────────────────────────────────────

/** Convert camelCase to kebab-case */
function toKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Get nested value by dot path: get(obj, 'colors.primary') */
function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
}

/** Set nested value by dot path: set(obj, 'colors.primary', '#fff') */
function setByPath(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((o, k) => {
        if (o[k] === undefined) o[k] = {};
        return o[k];
    }, obj);
    target[last] = value;
}

/** Validate a color value using Chroma.js */
function isValidColor(value) {
    try {
        chroma(value);
        return true;
    } catch {
        return false;
    }
}

// ─── State Module ─────────────────────────────────────────

const data = structuredClone(DEFAULTS);
const subscribers = new Map(); // path → Set<callback>

/**
 * Subscribe to state changes at a given path.
 * @param {string} path - Dot-delimited path (e.g., 'colors.primary')
 * @param {function} callback - Called with (newValue, path)
 * @returns {function} Unsubscribe function
 */
function subscribe(path, callback) {
    if (!subscribers.has(path)) {
        subscribers.set(path, new Set());
    }
    subscribers.get(path).add(callback);
    return () => subscribers.get(path).delete(callback);
}

/**
 * Get a value from state by dot path.
 * @param {string} path - Dot-delimited path
 * @returns {*} The value, or undefined
 */
function get(path) {
    return getByPath(data, path);
}

/**
 * Get the full state snapshot (deep clone).
 * @returns {object}
 */
function getAll() {
    return structuredClone(data);
}

/**
 * Set a value in state. Validates colors, notifies subscribers, syncs CSS.
 * @param {string} path - Dot-delimited path (e.g., 'colors.primary')
 * @param {*} value - New value
 * @returns {boolean} True if set succeeded, false if validation failed
 */
function set(path, value) {
    // Validate colors
    if (path.startsWith('colors.') && typeof value === 'string') {
        if (!isValidColor(value)) {
            console.warn(`[state] Invalid color rejected: "${value}" for ${path}`);
            return false;
        }
    }

    const oldValue = get(path);
    if (oldValue === value) return true; // No change

    setByPath(data, path, value);

    // Sync to CSS custom property
    syncCSSVar(path, value);

    // Notify subscribers (exact path match)
    const subs = subscribers.get(path);
    if (subs) {
        subs.forEach(cb => cb(value, path));
    }

    // Notify wildcard subscribers
    const wildcardSubs = subscribers.get('*');
    if (wildcardSubs) {
        wildcardSubs.forEach(cb => cb(value, path));
    }

    return true;
}

/**
 * Sync a state path to the corresponding CSS custom property.
 * colors.primary     → --color-primary
 * colors.bgDark      → --color-bg-dark
 * colors.textPrimary → --color-text-primary
 */
function syncCSSVar(path, value) {
    if (!path.startsWith('colors.')) return;

    const key = path.split('.').pop(); // e.g., 'primary', 'bgDark', 'textPrimary'
    const cssName = `--color-${toKebab(key)}`; // e.g., '--color-primary', '--color-bg-dark'
    document.documentElement.style.setProperty(cssName, value);
}

/**
 * Initialize: apply all default values to CSS custom properties.
 */
function init() {
    for (const [key, value] of Object.entries(data.colors)) {
        syncCSSVar(`colors.${key}`, value);
    }
    console.log('[state] Initialized with defaults');
}

// ─── Public API ───────────────────────────────────────────
export const state = {
    get,
    set,
    getAll,
    subscribe,
    init,
    DEFAULTS,
};

export default state;
```

**Step 2: Verify module loads**

Update `index.html` `<script type="module">` section to add:
```javascript
import state from './js/studio-state.js';
state.init();
console.log('✓ State module loaded:', state.getAll());
```

Reload browser. Expected: console shows `[state] Initialized with defaults` and the full state object.

**Step 3: Verify set + subscribe + CSS sync**

In browser console test:
```javascript
// This won't work in console directly (module scope), so add to index.html for now:
state.subscribe('colors.primary', (val) => console.log('Primary changed to:', val));
state.set('colors.primary', '#ff0000');
// Expected: "Primary changed to: #ff0000"
// Expected: document.documentElement has --color-primary: #ff0000

state.set('colors.primary', 'banana');
// Expected: console.warn "[state] Invalid color rejected: "banana" for colors.primary"
// Expected: returns false, state unchanged
```

**Step 4: Commit**

```bash
git add v1-vanilla/js/studio-state.js
git commit -m "feat(phase0): state module — get/set/subscribe with CSS var sync"
```

---

## Task 3: Editor CSS (T0.2 + T0.3)

**Goal:** Create the 2-panel editor layout styled with `--studio-*` variables, and preview component styles using `--color-*` variables.

**Files:**
- Create: `v1-vanilla/css/studio.css`
- Create: `v1-vanilla/css/preview.css`

**Step 1: Write studio.css — Editor chrome layout**

```css
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       studio.css
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [../index.html, ../../shared/styles/base.css]
description:    Editor chrome layout — uses --studio-* variables only
==============================================================================
*/

/* ═══ LAYOUT SHELL ═══ */
.studio {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    overflow: hidden;
}

/* ═══ HEADER ═══ */
.studio-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-2) var(--space-4);
    background: var(--studio-bg-darker);
    border-bottom: 1px solid var(--studio-border);
    z-index: var(--z-sticky);
}

.studio-header__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--studio-text);
    letter-spacing: 0.02em;
}

.studio-header__actions {
    display: flex;
    gap: var(--space-2);
}

.studio-header__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid var(--studio-border);
    border-radius: var(--radius-md);
    color: var(--studio-text-muted);
    cursor: pointer;
    font-size: 1rem;
    transition: all var(--transition-fast);
}

.studio-header__btn:hover {
    background: var(--studio-surface-hover);
    color: var(--studio-text);
    border-color: var(--studio-border-focus);
}

.studio-header__btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* ═══ MAIN AREA ═══ */
.studio-main {
    display: grid;
    grid-template-columns: 300px 1fr;
    overflow: hidden;
}

/* ═══ SIDEBAR (Controls) ═══ */
.studio-sidebar {
    background: var(--studio-bg);
    border-right: 1px solid var(--studio-border);
    overflow-y: auto;
    padding: var(--space-4);
}

.studio-sidebar__section {
    margin-bottom: var(--space-6);
}

.studio-sidebar__heading {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--studio-text-muted);
    margin-bottom: var(--space-3);
}

/* ═══ COLOR CONTROL ═══ */
.color-control {
    margin-bottom: var(--space-4);
}

.color-control__header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
}

.color-control__swatch {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-sm);
    border: 2px solid var(--studio-border);
    cursor: pointer;
    transition: border-color var(--transition-fast);
}

.color-control__swatch:hover,
.color-control__swatch:focus-visible {
    border-color: var(--studio-border-focus);
}

.color-control__label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--studio-text);
}

.color-control__picker-wrap {
    display: none;
    margin: var(--space-2) 0;
}

.color-control__picker-wrap.is-open {
    display: block;
}

.color-control__picker-wrap hex-color-picker {
    width: 100%;
}

.color-control__hex-input {
    width: 100%;
    padding: var(--space-1) var(--space-2);
    background: var(--studio-surface);
    border: 1px solid var(--studio-border);
    border-radius: var(--radius-sm);
    color: var(--studio-text);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    transition: border-color var(--transition-fast);
}

.color-control__hex-input:focus {
    outline: none;
    border-color: var(--studio-border-focus);
}

.color-control__hex-input.is-invalid {
    border-color: var(--color-danger);
}

.color-control__oklch {
    font-size: 0.6875rem;
    font-family: var(--font-mono);
    color: var(--studio-text-muted);
    margin-top: var(--space-1);
}

/* ═══ STATUS BAR ═══ */
.studio-statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-1) var(--space-4);
    background: var(--studio-bg-darker);
    border-top: 1px solid var(--studio-border);
    font-size: 0.6875rem;
    color: var(--studio-text-muted);
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 768px) {
    .studio-main {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }

    .studio-sidebar {
        max-height: 40vh;
        border-right: none;
        border-bottom: 1px solid var(--studio-border);
    }
}
```

**Step 2: Write preview.css — Preview component styles**

```css
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       preview.css
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [../index.html, ../../shared/styles/base.css]
description:    Preview component styles — uses --color-* variables only
==============================================================================
*/

/* ═══ PREVIEW CANVAS ═══ */
.preview {
    background: var(--bg-darker);
    overflow-y: auto;
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    align-items: center;
}

.preview__inner {
    max-width: 640px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

/* ═══ SAMPLE CARD ═══ */
.preview-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.preview-card__header {
    background: var(--color-primary);
    padding: var(--space-4) var(--space-5);
}

.preview-card__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
}

.preview-card__body {
    padding: var(--space-5);
}

.preview-card__text {
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: var(--space-4);
}

.preview-card__footer {
    padding: var(--space-3) var(--space-5);
    border-top: 1px solid var(--border-subtle);
    font-size: 0.8125rem;
    color: var(--text-muted);
}

/* ═══ BUTTONS ═══ */
.preview-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
}

.preview-btn {
    padding: var(--space-2) var(--space-4);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: var(--font-sans);
}

.preview-btn--primary {
    background: var(--color-primary);
    color: #ffffff;
}

.preview-btn--primary:hover {
    filter: brightness(1.1);
}

.preview-btn--secondary {
    background: var(--color-secondary);
    color: #ffffff;
}

.preview-btn--secondary:hover {
    filter: brightness(1.1);
}

.preview-btn--accent {
    background: var(--color-accent);
    color: #ffffff;
}

.preview-btn--accent:hover {
    filter: brightness(1.1);
}

.preview-btn--outline {
    background: transparent;
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.preview-btn--outline:hover {
    background: var(--color-primary);
    color: #ffffff;
}

/* ═══ ALERT ═══ */
.preview-alert {
    padding: var(--space-3) var(--space-4);
    border-left: 4px solid var(--color-warning);
    background: rgba(245, 158, 11, 0.08);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    color: var(--text-primary);
    font-size: 0.875rem;
}

.preview-alert__title {
    font-weight: 600;
    margin-bottom: var(--space-1);
}

/* ═══ TEXT BLOCK ═══ */
.preview-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.preview-text__heading {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

.preview-text__body {
    font-size: 1rem;
    color: var(--text-primary);
    line-height: 1.6;
}

.preview-text__muted {
    font-size: 0.875rem;
    color: var(--text-muted);
}

/* ═══ BADGES ═══ */
.preview-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
}

.preview-badge {
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 500;
}

.preview-badge--primary {
    background: rgba(99, 102, 241, 0.15);
    color: var(--color-primary-light);
}

.preview-badge--success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--color-accent);
}

.preview-badge--danger {
    background: rgba(239, 68, 68, 0.15);
    color: var(--color-danger);
}

.preview-badge--info {
    background: rgba(59, 130, 246, 0.15);
    color: var(--color-info);
}
```

**Step 3: Commit CSS files**

```bash
git add v1-vanilla/css/studio.css v1-vanilla/css/preview.css
git commit -m "feat(phase0): editor chrome + preview CSS with studio/color var separation"
```

---

## Task 4: Full HTML Shell (T0.2 + T0.3)

**Goal:** Replace the smoke test HTML with the full 2-panel editor shell: header, sidebar with color controls, preview area with sample components, status bar.

**Files:**
- Modify: `v1-vanilla/index.html` (full rewrite from smoke test)

**Step 1: Rewrite index.html with full shell**

Replace the entire body content of `index.html` with the production shell. Keep the `<head>` (import map, fonts, stylesheets) and add the new CSS links:

```html
    <!-- Editor styles -->
    <link rel="stylesheet" href="css/studio.css">
    <link rel="stylesheet" href="css/preview.css">
```

Body structure:

```html
<body>
    <!-- Skip link (a11y) -->
    <a href="#main-preview" class="skip-link">Skip to preview</a>

    <div class="studio">
        <!-- ═══ HEADER ═══ -->
        <header class="studio-header" role="banner">
            <span class="studio-header__title">Luno Design Studio</span>
            <div class="studio-header__actions">
                <button class="studio-header__btn" title="Undo (Ctrl+Z)" disabled aria-label="Undo">↩</button>
                <button class="studio-header__btn" title="Redo (Ctrl+Y)" disabled aria-label="Redo">↪</button>
            </div>
        </header>

        <!-- ═══ MAIN: sidebar + preview ═══ -->
        <main class="studio-main">
            <!-- Sidebar: Color Controls -->
            <aside class="studio-sidebar" aria-label="Design controls">
                <div class="studio-sidebar__section">
                    <h2 class="studio-sidebar__heading">Colors</h2>
                    <div id="color-controls">
                        <!-- Color controls injected by token-editor.js -->
                    </div>
                </div>
            </aside>

            <!-- Preview Canvas -->
            <section class="preview" id="main-preview" aria-label="Live preview">
                <div class="preview__inner">

                    <!-- Sample Card -->
                    <article class="preview-card">
                        <div class="preview-card__header">
                            <h3 class="preview-card__title">Sample Card</h3>
                        </div>
                        <div class="preview-card__body">
                            <p class="preview-card__text">
                                This card updates in real-time as you change colors in the sidebar.
                                Every element uses CSS custom properties.
                            </p>
                        </div>
                        <div class="preview-card__footer">
                            Last updated just now
                        </div>
                    </article>

                    <!-- Buttons -->
                    <div class="preview-buttons">
                        <button class="preview-btn preview-btn--primary">Primary</button>
                        <button class="preview-btn preview-btn--secondary">Secondary</button>
                        <button class="preview-btn preview-btn--accent">Accent</button>
                        <button class="preview-btn preview-btn--outline">Outline</button>
                    </div>

                    <!-- Alert -->
                    <div class="preview-alert" role="alert">
                        <div class="preview-alert__title">Heads up</div>
                        <div>This alert uses the warning color token. Change it in the sidebar to see it update.</div>
                    </div>

                    <!-- Text Block -->
                    <div class="preview-text">
                        <h2 class="preview-text__heading">Typography Preview</h2>
                        <p class="preview-text__body">
                            Body text using the primary text color. This paragraph demonstrates
                            how your chosen palette affects readability and visual hierarchy.
                        </p>
                        <p class="preview-text__muted">
                            Muted text for secondary information and captions.
                        </p>
                    </div>

                    <!-- Badges -->
                    <div class="preview-badges">
                        <span class="preview-badge preview-badge--primary">Primary</span>
                        <span class="preview-badge preview-badge--success">Success</span>
                        <span class="preview-badge preview-badge--danger">Danger</span>
                        <span class="preview-badge preview-badge--info">Info</span>
                    </div>

                </div>
            </section>
        </main>

        <!-- ═══ STATUS BAR ═══ -->
        <footer class="studio-statusbar">
            <span>Phase 0 · Vertical Slice</span>
            <span>v0.0.1</span>
        </footer>
    </div>

    <!-- App entry point -->
    <script type="module" src="js/main.js"></script>
</body>
```

Note: We add a `js/main.js` entry point to keep the HTML clean.

**Step 2: Create js/main.js entry point**

```javascript
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       main.js
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [../index.html, studio-state.js, editors/token-editor.js]
description:    Application entry point — initializes state and editors
==============================================================================
*/

import state from './studio-state.js';
import { initColorControls } from './editors/token-editor.js';

// Initialize state → applies default CSS vars
state.init();

// Initialize color editor UI
initColorControls(document.getElementById('color-controls'), state);

console.log('[main] Luno Design Studio Phase 0 initialized');
```

**Step 3: Commit**

```bash
git add v1-vanilla/index.html v1-vanilla/js/main.js
git commit -m "feat(phase0): full HTML shell with 2-panel layout and preview components"
```

---

## Task 5: Token Editor — Color Controls (T0.3)

**Goal:** Build the color picker UI that connects vanilla-colorful pickers to state, completing the end-to-end pipeline.

**Files:**
- Create: `v1-vanilla/js/editors/token-editor.js`

**Step 1: Write token-editor.js**

```javascript
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       token-editor.js
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [../studio-state.js, ../../index.html]
description:    Color control UI — wires vanilla-colorful pickers to state module
==============================================================================
*/

import chroma from 'chroma-js';

/**
 * Color tokens to create controls for.
 * key = state path suffix, label = display name.
 */
const COLOR_TOKENS = [
    { key: 'primary',   label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent',    label: 'Accent' },
    { key: 'warning',   label: 'Warning' },
    { key: 'danger',    label: 'Danger' },
];

/**
 * Create a single color control: swatch + picker + hex input + OKLCH readout.
 * @param {object} token - { key, label }
 * @param {object} state - State module
 * @returns {HTMLElement}
 */
function createColorControl(token, state) {
    const path = `colors.${token.key}`;
    const currentColor = state.get(path);

    // Container
    const el = document.createElement('div');
    el.className = 'color-control';
    el.dataset.token = token.key;

    // Header: swatch + label
    const header = document.createElement('div');
    header.className = 'color-control__header';

    const swatch = document.createElement('button');
    swatch.className = 'color-control__swatch';
    swatch.style.background = currentColor;
    swatch.setAttribute('aria-label', `Pick ${token.label} color`);
    swatch.title = `Pick ${token.label} color`;

    const label = document.createElement('span');
    label.className = 'color-control__label';
    label.textContent = token.label;

    header.append(swatch, label);

    // Picker wrapper (toggle on swatch click)
    const pickerWrap = document.createElement('div');
    pickerWrap.className = 'color-control__picker-wrap';

    const picker = document.createElement('hex-color-picker');
    picker.setAttribute('color', currentColor);
    pickerWrap.appendChild(picker);

    // Hex input
    const hexInput = document.createElement('input');
    hexInput.className = 'color-control__hex-input';
    hexInput.type = 'text';
    hexInput.value = currentColor;
    hexInput.setAttribute('aria-label', `${token.label} hex value`);
    hexInput.spellcheck = false;
    hexInput.autocomplete = 'off';

    // OKLCH readout
    const oklchDisplay = document.createElement('div');
    oklchDisplay.className = 'color-control__oklch';
    oklchDisplay.textContent = formatOklch(currentColor);

    // Assemble
    el.append(header, pickerWrap, hexInput, oklchDisplay);

    // ─── Events ───────────────────────────────────

    // Toggle picker visibility
    swatch.addEventListener('click', () => {
        pickerWrap.classList.toggle('is-open');
    });

    // Picker drag → update state (real-time)
    picker.addEventListener('color-changed', (e) => {
        const hex = e.detail.value;
        hexInput.value = hex;
        hexInput.classList.remove('is-invalid');
        swatch.style.background = hex;
        oklchDisplay.textContent = formatOklch(hex);
        state.set(path, hex);
    });

    // Hex input → validate → update picker + state
    hexInput.addEventListener('input', () => {
        const raw = hexInput.value.trim();
        const valid = isValidHex(raw);

        hexInput.classList.toggle('is-invalid', !valid);

        if (valid) {
            const hex = normalizeHex(raw);
            picker.setAttribute('color', hex);
            swatch.style.background = hex;
            oklchDisplay.textContent = formatOklch(hex);
            state.set(path, hex);
        }
    });

    // Subscribe to external state changes (e.g., from presets later)
    state.subscribe(path, (value) => {
        picker.setAttribute('color', value);
        hexInput.value = value;
        hexInput.classList.remove('is-invalid');
        swatch.style.background = value;
        oklchDisplay.textContent = formatOklch(value);
    });

    return el;
}

/**
 * Format OKLCH values for display.
 * @param {string} hex
 * @returns {string} e.g., "L: 0.55  C: 0.24  H: 264"
 */
function formatOklch(hex) {
    try {
        const [l, c, h] = chroma(hex).oklch();
        return `L: ${l.toFixed(2)}  C: ${c.toFixed(2)}  H: ${(h || 0).toFixed(0)}°`;
    } catch {
        return 'L: —  C: —  H: —';
    }
}

/**
 * Check if a string is a valid hex color.
 * Accepts: #RGB, #RRGGBB, RGB, RRGGBB
 */
function isValidHex(str) {
    return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}

/**
 * Normalize hex to #RRGGBB format.
 */
function normalizeHex(str) {
    let hex = str.startsWith('#') ? str : `#${str}`;
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    return hex.toLowerCase();
}

/**
 * Initialize color controls in the sidebar.
 * @param {HTMLElement} container - #color-controls element
 * @param {object} state - State module
 */
export function initColorControls(container, state) {
    if (!container) {
        console.error('[token-editor] Container #color-controls not found');
        return;
    }

    for (const token of COLOR_TOKENS) {
        container.appendChild(createColorControl(token, state));
    }

    console.log(`[token-editor] ${COLOR_TOKENS.length} color controls initialized`);
}
```

**Step 2: Test the full pipeline**

Reload browser at `http://localhost:8080`.

Expected behavior:
1. Five color controls render in the sidebar (Primary, Secondary, Accent, Warning, Danger)
2. Each shows: swatch, hex input, OKLCH readout
3. Click swatch → picker opens/closes
4. Drag picker → card header, buttons, badges change color in real-time
5. Type valid hex in input → picker + preview update
6. Type invalid hex → red border on input, state unchanged
7. Console shows no errors
8. OKLCH readout updates on every color change

**Step 3: Test CSS variable separation**

1. Change Primary to white (#ffffff) — card header becomes white
2. Verify: sidebar background stays dark (--studio-bg), text stays light (--studio-text)
3. Change Primary to black (#000000) — card header becomes black
4. Verify: sidebar is unchanged

This proves the `--studio-*` / `--color-*` separation works.

**Step 4: Commit**

```bash
git add v1-vanilla/js/editors/token-editor.js
git commit -m "feat(phase0): color controls — picker → state → CSS → preview pipeline complete"
```

---

## Task 6: Final Cleanup + Verification (T0.3 — done)

**Goal:** Remove .gitkeep files, verify all acceptance criteria, clean up.

**Files:**
- Remove: `v1-vanilla/css/.gitkeep`, `v1-vanilla/js/editors/.gitkeep`
- Modify: `v1-vanilla/index.html` (bump version to 0.1.0, status to active)

**Step 1: Remove .gitkeep placeholders**

```bash
git rm v1-vanilla/css/.gitkeep v1-vanilla/js/editors/.gitkeep v1-vanilla/data/presets/.gitkeep v1-vanilla/lib/.gitkeep
```

**Step 2: Run full acceptance checklist**

Open browser, verify each:

- [ ] `import chroma from 'chroma-js'` works (no console errors)
- [ ] `chroma('#6366f1').oklch()` returns valid values (check OKLCH readout)
- [ ] `<hex-color-picker>` renders and responds to input
- [ ] Changing any color updates preview in real-time (< 50ms visual)
- [ ] Preview card, buttons, badges all change color
- [ ] Console shows no errors
- [ ] State object contains correct values (check via console: `import('./js/studio-state.js').then(m => console.log(m.state.getAll()))`)
- [ ] Studio chrome (header, sidebar, status bar) unaffected by color changes
- [ ] Invalid hex input shows red border, does NOT corrupt state
- [ ] OKLCH readout updates correctly for each color
- [ ] Skip link works (Tab → Enter → focus moves to preview)
- [ ] Layout works on narrow viewport (resize to < 768px → stacks vertically)

**Step 3: Update metadata versions**

In `index.html`: version `0.0.1` → `0.1.0`, status `draft` → `active`

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(phase0): vertical slice complete — color picker → state → CSS → preview pipeline validated

Phase 0 acceptance criteria met:
- CDN import map works (Chroma.js + vanilla-colorful)
- State module with observer pattern + CSS var sync
- 5 color controls with OKLCH readout
- 4 preview components (card, buttons, alert, text, badges)
- Studio chrome / preview token separation validated"
```

**Step 5: Push**

```bash
git push
```

---

## Summary

| Task | Files Created | Est. Time |
|------|--------------|-----------|
| 1. CDN Smoke Test | `index.html`, `lib/chroma.min.js` | ~10 min |
| 2. State Module | `js/studio-state.js` | ~20 min |
| 3. Editor CSS | `css/studio.css`, `css/preview.css` | ~15 min |
| 4. HTML Shell | `index.html` (rewrite), `js/main.js` | ~15 min |
| 5. Token Editor | `js/editors/token-editor.js` | ~20 min |
| 6. Cleanup + Verify | Metadata, .gitkeep removal | ~10 min |
| **Total** | **7 files** | **~90 min** |

---

## Phase 0 Definition of Done

After Task 6, these must all be true:
- [ ] Chroma.js loads and OKLCH works
- [ ] vanilla-colorful renders and fires events
- [ ] Changing a color picker updates the preview in < 50ms
- [ ] State module validates input (rejects "banana")
- [ ] Studio chrome is visually separate from preview
- [ ] No console errors
- [ ] Committed and pushed to main
