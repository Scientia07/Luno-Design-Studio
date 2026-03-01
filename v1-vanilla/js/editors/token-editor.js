/**
 * @ai-generated true
 * @agent claude-code
 * @created 2026-03-01
 */
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

/** Color tokens to create controls for. */
const COLOR_TOKENS = [
    { key: 'primary',   label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent',    label: 'Accent' },
    { key: 'warning',   label: 'Warning' },
    { key: 'danger',    label: 'Danger' },
];

/**
 * Create a single color control: swatch + picker + hex input + OKLCH readout.
 * @param {{ key: string, label: string }} token
 * @param {object} state - State module
 * @returns {HTMLElement}
 */
function createColorControl(token, state) {
    const path = `colors.${token.key}`;
    const currentColor = state.get(path);

    const el = document.createElement('div');
    el.className = 'color-control';

    // Header: swatch + info block (label, hex, oklch)
    const header = document.createElement('div');
    header.className = 'color-control__header';

    const swatch = document.createElement('button');
    swatch.className = 'color-control__swatch';
    swatch.style.background = currentColor;
    swatch.setAttribute('aria-label', `Pick ${token.label} color`);
    swatch.title = `Pick ${token.label} color`;

    const info = document.createElement('div');
    info.className = 'color-control__info';

    const label = document.createElement('span');
    label.className = 'color-control__label';
    label.textContent = token.label;

    // Hex input — inline with label
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

    info.append(label, hexInput, oklchDisplay);
    header.append(swatch, info);

    // Picker wrapper with inner div for animated slide
    const pickerWrap = document.createElement('div');
    pickerWrap.className = 'color-control__picker-wrap';

    const pickerInner = document.createElement('div');
    pickerInner.className = 'color-control__picker-inner';

    const picker = document.createElement('hex-color-picker');
    picker.setAttribute('color', currentColor);
    pickerInner.appendChild(picker);
    pickerWrap.appendChild(pickerInner);

    el.append(header, pickerWrap);

    // ─── Events ───────────────────────────────────

    // Toggle picker + active state
    swatch.addEventListener('click', () => {
        const wasOpen = pickerWrap.classList.contains('is-open');
        pickerWrap.classList.toggle('is-open');
        el.classList.toggle('is-active', !wasOpen);
    });

    // Picker drag → state
    picker.addEventListener('color-changed', (e) => {
        const hex = e.detail.value;
        hexInput.value = hex;
        hexInput.classList.remove('is-invalid');
        swatch.style.background = hex;
        oklchDisplay.textContent = formatOklch(hex);
        state.set(path, hex);
    });

    // Hex input → validate → state
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

    // External state changes (presets, undo, etc.)
    state.subscribe(path, (value) => {
        picker.setAttribute('color', value);
        hexInput.value = value;
        hexInput.classList.remove('is-invalid');
        swatch.style.background = value;
        oklchDisplay.textContent = formatOklch(value);
    });

    return el;
}

/** Format OKLCH values for display. */
function formatOklch(hex) {
    try {
        const [l, c, h] = chroma(hex).oklch();
        return `L: ${l.toFixed(2)}  C: ${c.toFixed(2)}  H: ${(h || 0).toFixed(0)}°`;
    } catch {
        return 'L: —  C: —  H: —';
    }
}

/** Validate hex color string (#RGB, #RRGGBB, RGB, RRGGBB). */
function isValidHex(str) {
    return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}

/** Normalize to #rrggbb format. */
function normalizeHex(str) {
    let hex = str.startsWith('#') ? str : `#${str}`;
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    return hex.toLowerCase();
}

/**
 * Initialize color controls in the sidebar container.
 * @param {HTMLElement} container
 * @param {object} state
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
