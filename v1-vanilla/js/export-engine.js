/**
 * @ai-generated true
 * @agent claude-code
 * @created 2026-03-01
 */
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       export-engine.js
created:        2026-03-01
updated:        2026-03-01
version:        0.1.0
status:         draft
related_docs:   [studio-state.js, ../index.html]
description:    Export engine — CSS, JSON, URL hash encode/decode, copy, download
==============================================================================
*/

import chroma from 'chroma-js';

// ─── CSS Variable name mapping ────────────────────────────
const VAR_NAMES = {
    primary:     '--color-primary',
    secondary:   '--color-secondary',
    accent:      '--color-accent',
    warning:     '--color-warning',
    danger:      '--color-danger',
    info:        '--color-info',
    bgDark:      '--bg-dark',
    bgDarker:    '--bg-darker',
    bgCard:      '--bg-card',
    textPrimary: '--text-primary',
    textMuted:   '--text-muted',
};

/**
 * Generate CSS custom properties block.
 * @param {object} colors - { primary: '#6366f1', ... }
 * @param {object} opts - { comments: boolean }
 * @returns {string}
 */
export function toCSS(colors, opts = {}) {
    const { comments = true } = opts;
    let lines = [':root {'];

    const groups = [
        { label: 'Brand', keys: ['primary', 'secondary', 'accent'] },
        { label: 'Semantic', keys: ['warning', 'danger', 'info'] },
        { label: 'Surfaces', keys: ['bgDark', 'bgDarker', 'bgCard'] },
        { label: 'Text', keys: ['textPrimary', 'textMuted'] },
    ];

    for (const group of groups) {
        if (comments) lines.push(`    /* ${group.label} */`);
        for (const key of group.keys) {
            if (colors[key] !== undefined && VAR_NAMES[key]) {
                lines.push(`    ${VAR_NAMES[key]}: ${colors[key]};`);
            }
        }
        if (comments) lines.push('');
    }

    // Remove trailing blank line
    if (lines[lines.length - 1] === '') lines.pop();
    lines.push('}');
    return lines.join('\n');
}

/**
 * Generate JSON in W3C Design Tokens-inspired format.
 * @param {object} colors
 * @returns {string}
 */
export function toJSON(colors) {
    const tokens = {};
    for (const [key, value] of Object.entries(colors)) {
        if (!VAR_NAMES[key]) continue;

        let oklch = null;
        try {
            const [l, c, h] = chroma(value).oklch();
            oklch = `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${(h || 0).toFixed(1)})`;
        } catch { /* skip */ }

        tokens[key] = {
            $value: value,
            $type: 'color',
            ...(oklch ? { oklch } : {}),
        };
    }

    return JSON.stringify({ color: tokens }, null, 2);
}

/**
 * Encode colors into a URL-safe hash string.
 * Format: compact hex without # signs, separated by -
 * @param {object} colors
 * @returns {string}
 */
export function toURLHash(colors) {
    const keys = ['primary', 'secondary', 'accent', 'warning', 'danger'];
    const parts = keys.map(k => {
        const hex = colors[k] || '#000000';
        return hex.replace('#', '');
    });
    return parts.join('-');
}

/**
 * Decode a URL hash back into colors.
 * @param {string} hash - e.g., "6366f1-ec4899-10b981-f59e0b-ef4444"
 * @returns {object|null} colors or null if invalid
 */
export function fromURLHash(hash) {
    const clean = hash.replace('#', '').replace('?', '');
    const parts = clean.split('-');
    if (parts.length < 5) return null;

    const keys = ['primary', 'secondary', 'accent', 'warning', 'danger'];
    const colors = {};

    for (let i = 0; i < keys.length; i++) {
        const hex = `#${parts[i]}`;
        try {
            chroma(hex);
            colors[keys[i]] = hex;
        } catch {
            return null;
        }
    }
    return colors;
}

/**
 * Copy text to clipboard with fallback.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for HTTP or denied permission
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        return ok;
    }
}

/**
 * Download a string as a file.
 * @param {string} content
 * @param {string} filename
 * @param {string} mime
 */
export function downloadFile(content, filename, mime = 'text/plain') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
