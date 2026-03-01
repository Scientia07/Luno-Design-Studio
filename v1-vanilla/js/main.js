/**
 * @ai-generated true
 * @agent claude-code
 * @created 2026-03-01
 */
/*
==============================================================================
FILE METADATA
==============================================================================
filename:       main.js
created:        2026-03-01
updated:        2026-03-01
version:        0.4.0
status:         draft
related_docs:   [../index.html, studio-state.js, editors/token-editor.js]
description:    App entry — state init, editors, quick presets, randomize
==============================================================================
*/

import chroma from 'chroma-js';
import state from './studio-state.js';
import { initColorControls } from './editors/token-editor.js';
import { toCSS, toJSON, toURLHash, fromURLHash, copyToClipboard, downloadFile } from './export-engine.js';

// ─── Curated presets ──────────────────────────────────────
const PRESETS = [
    {
        name: 'LunoLabs',
        colors: { primary: '#6366f1', secondary: '#ec4899', accent: '#10b981', warning: '#f59e0b', danger: '#ef4444' },
    },
    {
        name: 'Ocean',
        colors: { primary: '#0ea5e9', secondary: '#6366f1', accent: '#14b8a6', warning: '#f59e0b', danger: '#f43f5e' },
    },
    {
        name: 'Sunset',
        colors: { primary: '#f97316', secondary: '#e11d48', accent: '#eab308', warning: '#f59e0b', danger: '#dc2626' },
    },
    {
        name: 'Forest',
        colors: { primary: '#22c55e', secondary: '#06b6d4', accent: '#84cc16', warning: '#eab308', danger: '#ef4444' },
    },
    {
        name: 'Mono',
        colors: { primary: '#a3a3a3', secondary: '#737373', accent: '#e5e5e5', warning: '#d4d4d4', danger: '#525252' },
    },
    {
        name: 'Cyber',
        colors: { primary: '#a855f7', secondary: '#ec4899', accent: '#22d3ee', warning: '#facc15', danger: '#f43f5e' },
    },
    {
        name: 'Earth',
        colors: { primary: '#b45309', secondary: '#92400e', accent: '#65a30d', warning: '#ca8a04', danger: '#dc2626' },
    },
    {
        name: 'Neon',
        colors: { primary: '#00ff88', secondary: '#ff00ff', accent: '#00ffff', warning: '#ffff00', danger: '#ff0044' },
    },
];

// ─── Init ─────────────────────────────────────────────────

state.init();
loadFromURL();
initColorControls(document.getElementById('color-controls'), state);
initPresets(document.getElementById('quick-presets'));
initRandomize();
initExportPanel();

window.__studioState = state;
console.log('[main] Luno Design Studio v0.4 initialized');

// ─── Quick Presets ────────────────────────────────────────

function initPresets(container) {
    if (!container) return;

    for (const preset of PRESETS) {
        const btn = document.createElement('button');
        btn.className = 'quick-preset';
        btn.title = preset.name;
        btn.setAttribute('aria-label', `Apply ${preset.name} preset`);

        // Mini swatch strip showing the 3 main colors
        const colors = [preset.colors.primary, preset.colors.secondary, preset.colors.accent];
        btn.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 33%, ${colors[1]} 33%, ${colors[1]} 66%, ${colors[2]} 66%, ${colors[2]} 100%)`;

        const label = document.createElement('span');
        label.className = 'quick-preset__label';
        label.textContent = preset.name;
        btn.appendChild(label);

        btn.addEventListener('click', () => {
            for (const [key, value] of Object.entries(preset.colors)) {
                state.set(`colors.${key}`, value);
            }
        });

        container.appendChild(btn);
    }
}

// ─── Randomize ────────────────────────────────────────────

function initRandomize() {
    const btn = document.getElementById('btn-randomize');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const hue = Math.random() * 360;

        const primary = chroma.oklch(0.55, 0.2, hue).hex();
        const secondary = chroma.oklch(0.55, 0.2, (hue + 60) % 360).hex();
        const accent = chroma.oklch(0.6, 0.18, (hue + 150) % 360).hex();
        const warning = chroma.oklch(0.7, 0.15, 85).hex();
        const danger = chroma.oklch(0.55, 0.22, 25).hex();

        state.set('colors.primary', primary);
        state.set('colors.secondary', secondary);
        state.set('colors.accent', accent);
        state.set('colors.warning', warning);
        state.set('colors.danger', danger);
    });
}

// ─── URL Hash Loading ─────────────────────────────────────

function loadFromURL() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const colors = fromURLHash(hash);
    if (!colors) return;

    for (const [key, value] of Object.entries(colors)) {
        state.set(`colors.${key}`, value);
    }
    console.log('[main] Loaded palette from URL hash');
}

// ─── Export Panel ─────────────────────────────────────────

function initExportPanel() {
    const panel = document.getElementById('export-panel');
    const backdrop = document.getElementById('export-backdrop');
    const output = document.querySelector('#export-output code');
    const toast = document.getElementById('export-toast');
    if (!panel || !output) return;

    let activeTab = 'css';

    function getColors() {
        const all = state.getAll();
        return all.colors;
    }

    function renderOutput() {
        const colors = getColors();
        switch (activeTab) {
            case 'css':  output.textContent = toCSS(colors); break;
            case 'json': output.textContent = toJSON(colors); break;
            case 'url':  output.textContent = `${window.location.origin}${window.location.pathname}#${toURLHash(colors)}`; break;
        }
    }

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('is-visible');
        setTimeout(() => toast.classList.remove('is-visible'), 1800);
    }

    function openPanel() {
        renderOutput();
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('is-visible');
    }

    function closePanel() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('is-visible');
    }

    // Open/close
    document.getElementById('btn-export')?.addEventListener('click', openPanel);
    document.getElementById('btn-export-close')?.addEventListener('click', closePanel);
    backdrop?.addEventListener('click', closePanel);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) {
            closePanel();
        }
    });

    // Tabs
    panel.querySelectorAll('.export-panel__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            panel.querySelector('.export-panel__tab.is-active')?.classList.remove('is-active');
            tab.classList.add('is-active');
            panel.querySelectorAll('.export-panel__tab').forEach(t =>
                t.setAttribute('aria-selected', t === tab ? 'true' : 'false')
            );
            activeTab = tab.dataset.tab;
            renderOutput();
        });
    });

    // Copy
    document.getElementById('btn-copy')?.addEventListener('click', async () => {
        const ok = await copyToClipboard(output.textContent);
        showToast(ok ? 'Copied!' : 'Copy failed');
    });

    // Download
    document.getElementById('btn-download')?.addEventListener('click', () => {
        const colors = getColors();
        if (activeTab === 'css') {
            downloadFile(toCSS(colors), 'palette.css', 'text/css');
        } else if (activeTab === 'json') {
            downloadFile(toJSON(colors), 'palette.json', 'application/json');
        } else {
            const url = `${window.location.origin}${window.location.pathname}#${toURLHash(colors)}`;
            downloadFile(url, 'palette-link.txt', 'text/plain');
        }
        showToast('Downloaded!');
    });

    // Share link — copies URL and updates browser hash
    document.getElementById('btn-share-link')?.addEventListener('click', async () => {
        const colors = getColors();
        const hash = toURLHash(colors);
        window.location.hash = hash;
        const url = `${window.location.origin}${window.location.pathname}#${hash}`;
        const ok = await copyToClipboard(url);
        showToast(ok ? 'Link copied!' : 'Link updated in address bar');
    });
}
