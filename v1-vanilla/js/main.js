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

// Expose state to console for debugging
window.__studioState = state;

console.log('[main] Luno Design Studio Phase 0 initialized');
