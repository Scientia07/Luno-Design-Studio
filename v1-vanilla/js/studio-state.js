/**
 * @ai-generated true
 * @agent claude-code
 * @created 2026-03-01
 */
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

// ─── CSS var name mapping ─────────────────────────────────
// Maps state paths to CSS custom property names.
// Keys that don't match the simple --color-{kebab} pattern need explicit mapping.
const CSS_VAR_MAP = {
    'colors.bgDark':      '--bg-dark',
    'colors.bgDarker':    '--bg-darker',
    'colors.bgCard':      '--bg-card',
    'colors.textPrimary': '--text-primary',
    'colors.textMuted':   '--text-muted',
};

// ─── Helpers ──────────────────────────────────────────────

/** Convert camelCase to kebab-case */
function toKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Get nested value by dot path */
function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
}

/** Set nested value by dot path */
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

// ─── State ────────────────────────────────────────────────

const data = structuredClone(DEFAULTS);
const subscribers = new Map();

/**
 * Subscribe to state changes at a given path.
 * @param {string} path - Dot-delimited path, or '*' for all changes
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
 * @param {string} path
 * @returns {*}
 */
function get(path) {
    return getByPath(data, path);
}

/**
 * Get full state snapshot (deep clone).
 * @returns {object}
 */
function getAll() {
    return structuredClone(data);
}

/**
 * Set a value in state. Validates colors, notifies subscribers, syncs CSS.
 * @param {string} path - Dot-delimited path (e.g., 'colors.primary')
 * @param {*} value - New value
 * @returns {boolean} True if set succeeded
 */
function set(path, value) {
    if (path.startsWith('colors.') && typeof value === 'string') {
        if (!isValidColor(value)) {
            console.warn(`[state] Invalid color rejected: "${value}" for ${path}`);
            return false;
        }
    }

    const oldValue = get(path);
    if (oldValue === value) return true;

    setByPath(data, path, value);
    syncCSSVar(path, value);

    // Notify exact-path subscribers
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
 * Map a state path to a CSS custom property and set it on :root.
 */
function syncCSSVar(path, value) {
    if (!path.startsWith('colors.')) return;

    // Check explicit mapping first, then auto-generate
    let cssName = CSS_VAR_MAP[path];
    if (!cssName) {
        const key = path.split('.').pop();
        cssName = `--color-${toKebab(key)}`;
    }

    document.documentElement.style.setProperty(cssName, value);
}

/**
 * Apply all default values to CSS custom properties.
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
