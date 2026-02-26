<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       prd-design-studio.md
created:        2026-02-10
updated:        2026-02-11
version:        2.0.0
status:         draft
rating:         ★★★★★
author:         Joel + Claude
related_docs:   [prd-design-dashboard.md, ../../design-dashboard/index.html, ../../CLAUDE.md]
description:    PRD for the Design Studio - Hybrid visual editor (Vanilla JS baseline + Framework comparison)
==============================================================================
-->

# PRD: Design Studio

> **Version:** 2.0.0
> **Status:** Draft
> **Author:** Joel + Claude
> **Created:** 2026-02-10
> **Updated:** 2026-02-11
> **Predecessor:** [PRD Design Dashboard](prd-design-dashboard.md)
> **Inspired by:** [tweakcn.com](https://tweakcn.com) | [LayoutIt!](https://layoutit.com) | [SVG-Edit](https://svg-edit.github.io/svgedit/)

---

## 1. Overview

### 1.1 Summary

Das **Design Studio** ist ein visueller Editor für Farbschemas, Layouts, SVG-Formen und Komponenten – gebaut als **Hybrid-Experiment**. Die gleiche Funktionalität wird zuerst in **Pure HTML/CSS/JavaScript** (v1-vanilla) und anschließend in einem **Framework** (v2-svelte) implementiert. So entsteht ein einzigartiges Vergleichslabor: Wo stößt Vanilla JS an seine Grenzen? Was bringt ein Framework wirklich?

Das Repo „Luno-Future-Docs" entwickelt sich damit von einem Docs-Showcase zu einem **Framework-Experimentier-Labor**.

### 1.2 Problem Statement

1. **Eingeschränkte Editierbarkeit:** Das aktuelle Design Dashboard erlaubt nur Farbanpassungen – Typography, Spacing, Formen und Layouts sind nicht editierbar
2. **Kein visuelles Layouting:** CSS Grid/Flexbox-Layouts können nicht visuell erstellt oder umgeordnet werden
3. **Fehlende Shape-Tools:** SVG-Formen müssen manuell im Code erstellt werden
4. **Fragmentierte Workflows:** Farben, Layout und Formen werden in verschiedenen Tools bearbeitet
5. **Kein Framework-Vergleich:** Das Repo zeigt verschiedene Frameworks (Remotion, Three.js, Manim) aber vergleicht sie nie an einem identischen Use Case

### 1.3 Goals

- [ ] Visueller Editor für Design Tokens (Colors, Typography, Spacing, Radius, Shadows)
- [ ] Color Harmony Engine mit perceptuell korrekten Paletten (OKLCH via Chroma.js)
- [ ] Dark/Light Mode Toggle für die Preview-Area
- [ ] Drag & Drop Layout Builder mit CSS Grid / Flexbox Support
- [ ] SVG Shape Editor mit grundlegenden Formen und Transformationen
- [ ] Komponentenbaukasten (Cards, Buttons, Alerts aus Tokens zusammensetzen)
- [ ] Export als CSS, JSON (W3C Design Tokens), HTML Snippets, Shareable URL
- [ ] Undo/Redo für alle Aktionen
- [ ] Responsive Preview (Mobile / Tablet / Desktop)
- [ ] Color Blindness Simulation (Deuteranopia, Protanopia, Tritanopia)
- [ ] **Vanilla JS Baseline** (v1) + **Framework Version** (v2) als Vergleich
- [ ] Dokumentierter Framework-Vergleich (LOC, Performance, DX)

### 1.4 Non-Goals

- Backend/Server (alles client-side mit localStorage/IndexedDB)
- User Accounts oder Cloud-Sync
- Pixel-perfekter WYSIWYG-Editor à la Figma/Webflow
- Vollständiger Code-Editor (kein CodeMirror/Monaco)
- Druck-Layout oder PDF-Export
- Mehr als ein Framework für v2 (wir wählen eins und machen es richtig)

---

## 2. Background

### 2.1 Context

#### Repo-Evolution

Das Luno-Future-Docs Repository hat sich organisch weiterentwickelt:

```
Phase 1: Docs Showcase        → Statische HTML-Seiten, Reveal.js, Gamma, etc.
Phase 2: Quality Sprint        → Accessibility, CSS-Konsolidierung, Shared Base
Phase 3: Animation Lab         → Remotion (React), Manim (Python), Three.js
Phase 4: Design Tools          → Design Dashboard (Color Editor)
Phase 5: Experiment Lab  ← WIR SIND HIER
         → Design Studio als Benchmark-Projekt
         → Gleicher Use Case, verschiedene Technologien
         → Dokumentierter Vergleich
```

Das Design Studio wird das **erste Projekt im Repo, das bewusst in zwei Technologien gebaut wird** – nicht weil man muss, sondern um zu lernen.

#### Bestehendes Design Dashboard

Das `/design-dashboard/index.html` (1.566 Zeilen) bringt bereits:
- 7 editierbare Farbvariablen mit Live-Preview
- 4 Theme-Presets (Dark, Ocean, Sunset, Forest)
- WCAG Kontrast-Checking
- CSS Export (Copy/Download)
- localStorage Persistenz

### 2.2 Current State

| Feature | Status | Location |
|---------|--------|----------|
| Color Editor | ✅ Fertig | `/design-dashboard/index.html` |
| Theme Presets | ✅ Fertig | 4 Presets implementiert |
| WCAG Contrast | ✅ Fertig | Live-Anzeige |
| CSS Export | ✅ Fertig | Copy + Download |
| Typography Editor | ❌ Fehlt | Geplant in Phase 2 des alten PRD |
| Spacing Controls | ❌ Fehlt | Geplant in Phase 2 des alten PRD |
| Layout Builder | ❌ Fehlt | Neues Feature |
| Shape Editor | ❌ Fehlt | Neues Feature |
| Component Lab | ❌ Fehlt | Neues Feature |
| Color Harmony | ❌ Fehlt | Neues Feature |
| Dark/Light Toggle | ❌ Fehlt | Neues Feature |
| Framework Version | ❌ Fehlt | Neues Konzept |

### 2.3 Research

| Referenz | Typ | Key Takeaway |
|----------|-----|--------------|
| [tweakcn.com](https://tweakcn.com) | Design Token Editor | Echtzeit-Theme-Editing mit Komponentenvorschau |
| [LayoutIt!](https://layoutit.com) | CSS Grid Builder | Visueller Grid-Editor mit Code-Generation |
| [SVG-Edit](https://svg-edit.github.io/svgedit/) | SVG Editor | Vollwertiger Browser-SVG-Editor, Open Source |
| **[Chroma.js](https://github.com/gka/chroma.js)** | Color Library | **10.5k Stars**, OKLCH Farbraum, Palette Generation, Color Blindness Sim, 13.5KB |
| **[Open Props](https://github.com/argyleink/open-props)** | Design Tokens | **5.3k Stars**, 100+ kuratierte Tokens, CDN-ready, MIT |
| **[Gogh Themes](https://github.com/Gogh-Co/Gogh)** | Theme Collection | **10.1k Stars**, 250+ Color Themes als JSON, MIT |
| [SortableJS](https://sortablejs.github.io/Sortable/) | Drag & Drop Lib | ~10KB gzip, native HTML5 DnD |
| [Two.js](https://two.js.org/) | 2D Graphics | ~16KB gzip, SVG/Canvas/WebGL Renderer |
| [W3C Design Tokens Spec](https://www.w3.org/community/design-tokens/) | Standard | Erste stabile Version 2025, JSON-basiert |
| [Catppuccin](https://catppuccin.com/) | Theme Framework | 4 Flavor-Varianten, CSS Variables verfügbar, MIT |
| [Material Design Palette](https://gist.github.com/kawanet/a880c83f06d6baf742e45ac9ac52af96) | Color System | Offizielle Google Material Colors als JSON |

### 2.4 Competitive Analysis

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         Feature-Vergleich                                   │
├──────────────────┬──────────┬──────────┬──────────┬──────────┬────────────┤
│ Feature          │ Unser    │ tweakcn  │ LayoutIt │ SVG-Edit │ Penpot     │
│                  │ Studio   │          │          │          │            │
├──────────────────┼──────────┼──────────┼──────────┼──────────┼────────────┤
│ Color Tokens     │    ✅    │    ✅    │    ❌    │    ❌    │    ✅      │
│ Color Harmony    │    ✅    │    ❌    │    ❌    │    ❌    │    ✅      │
│ Dark/Light Mode  │    ✅    │    ✅    │    ❌    │    ❌    │    ✅      │
│ Typography       │    ✅    │    ✅    │    ❌    │    ❌    │    ✅      │
│ Layout Builder   │    ✅    │    ❌    │    ✅    │    ❌    │    ❌      │
│ Shape Editor     │    ✅    │    ❌    │    ❌    │    ✅    │    ✅      │
│ Component Lab    │    ✅    │    ✅    │    ❌    │    ❌    │    ✅      │
│ Colorblind Sim   │    ✅    │    ❌    │    ❌    │    ❌    │    ❌      │
│ No Build Tools   │  ✅(v1)  │    ❌    │    ✅    │    ✅    │    ❌      │
│ Framework Compare│    ✅    │    ❌    │    ❌    │    ❌    │    ❌      │
│ Educational      │    ✅    │    ❌    │    ❌    │    ❌    │    ❌      │
│ Shareable URL    │    ✅    │    ❌    │    ❌    │    ❌    │    ✅      │
│ 250+ Presets     │    ✅    │    ❌    │    ❌    │    ❌    │    ❌      │
│ Export CSS/JSON  │    ✅    │    ✅    │    ✅    │  ✅(SVG) │    ✅      │
└──────────────────┴──────────┴──────────┴──────────┴──────────┴────────────┘
```

**USP:** Einziges Tool, das alle Bereiche in einem Studio vereint, in zwei Technologien verglichen wird, 250+ Presets hat, UND als Educational Tool dient.

---

## 3. Requirements

### 3.1 Functional Requirements

#### Phase 1: Design Tokens Studio (Vanilla JS Baseline)

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| **FR-01** | Color Picker für alle Design Tokens (Primary, Secondary, Accent, Semantic, Surfaces) | Must Have | Pending |
| **FR-02** | **Color Harmony Engine** (Chroma.js): Komplementär, Analog, Triad, Split-Komplementär, Tetradic aus einer Basisfarbe | Must Have | Pending |
| **FR-03** | **Perceptuell korrekte Palette Generation** via OKLCH statt HSL (Chroma.js) | Must Have | Pending |
| **FR-04** | Typography Controls: Font-Family Dropdown (System + Google Fonts), Size, Weight, Line-Height | Must Have | Pending |
| **FR-05** | Spacing Controls: Base Unit Slider, generierte Spacing-Skala (4px System) | Must Have | Pending |
| **FR-06** | Border-Radius Slider mit Live-Preview auf Komponenten | Must Have | Pending |
| **FR-07** | Shadow Editor: Offset X/Y, Blur, Spread, Color | Should Have | Pending |
| **FR-08** | **Dark/Light Mode Toggle** für die Preview-Area (zwei Token-Sets) | Must Have | Pending |
| **FR-09** | Theme Presets: 6 eigene + **Gogh Theme Browser** (250+ Themes) + Catppuccin + Material | Must Have | Pending |
| **FR-10** | Export: CSS Variables, JSON (W3C Design Tokens Format), Download als File | Must Have | Pending |
| **FR-11** | **Shareable URL**: Base64-encoded Theme-State im URL-Hash (`#theme=eyJ...`) | Must Have | Pending |
| **FR-12** | Import: JSON Theme laden, URL-Parameter dekodieren | Should Have | Pending |
| **FR-13** | Undo/Redo Stack (mind. 30 Steps) | Must Have | Pending |
| **FR-14** | WCAG Contrast Auto-Check mit Warnungen bei AA/AAA Verletzungen | Must Have | Pending |
| **FR-15** | **Color Blindness Simulation** (Deuteranopia, Protanopia, Tritanopia) via Chroma.js | Must Have | Pending |

#### Phase 2: Layout Playground

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| **FR-16** | CSS Grid Builder: Visuelles Grid mit einstellbaren Rows/Columns/Gaps | Must Have | Pending |
| **FR-17** | Flexbox Controls: Direction, Wrap, Justify, Align als visuelle Buttons | Must Have | Pending |
| **FR-18** | Drag & Drop: Vordefinierte Blöcke (Header, Sidebar, Content, Footer, Card) ins Grid ziehen | Must Have | Pending |
| **FR-19** | Block Resizing: Blöcke per Handle in der Größe anpassen | Should Have | Pending |
| **FR-20** | Responsive Preview: Toggle zwischen 320px / 768px / 1024px / 1440px | Must Have | Pending |
| **FR-21** | Layout Templates: 5+ vordefinierte Layouts (Holy Grail, Sidebar, Dashboard, etc.) | Should Have | Pending |
| **FR-22** | Export: Generiertes HTML + CSS für das Layout | Must Have | Pending |

#### Phase 3: Shape & Component Lab

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| **FR-23** | SVG Canvas: Grundfläche zum Platzieren und Editieren von Shapes | Must Have | Pending |
| **FR-24** | Shape Primitives: Rect, Circle, Ellipse, Line, Polygon, Star, Arrow | Must Have | Pending |
| **FR-25** | Shape Properties Panel: Fill, Stroke, Opacity, Size, Position, Rotation | Must Have | Pending |
| **FR-26** | Shape Drag & Resize: Anfasser zum Bewegen und Skalieren | Must Have | Pending |
| **FR-27** | Shape Layering: Z-Index Controls (vor/hinter, nach oben/unten) | Should Have | Pending |
| **FR-28** | Component Compositor: Cards, Buttons, Alerts, Badges aus Design Tokens zusammenbauen | Must Have | Pending |
| **FR-29** | Component Variants: Verschiedene States (Default, Hover, Active, Disabled) | Should Have | Pending |
| **FR-30** | Export: SVG Download, HTML/CSS Snippet für Komponenten | Must Have | Pending |

#### Phase 4: Framework Version (v2-svelte)

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| **FR-31** | Identische Feature-Parität mit v1-vanilla | Must Have | Pending |
| **FR-32** | Svelte Stores statt manueller Observer Pattern | Must Have | Pending |
| **FR-33** | Svelte Components statt DOM-Manipulation | Must Have | Pending |
| **FR-34** | Vergleichs-Dokumentation: LOC, Bundle Size, Performance, DX | Must Have | Pending |
| **FR-35** | README mit Framework-Comparison Matrix | Must Have | Pending |

### 3.2 Non-Functional Requirements

| ID | Requirement | v1-vanilla Target | v2-svelte Target |
|----|-------------|-------------------|------------------|
| NFR-01 | Initial Page Load | < 2s auf 3G | < 1.5s auf 3G |
| NFR-02 | Interaktions-Latenz | < 16ms (60fps) | < 16ms (60fps) |
| NFR-03 | Live Preview Update | < 50ms | < 30ms |
| NFR-04 | Undo/Redo Response | < 10ms | < 10ms |
| NFR-05 | Accessibility | WCAG 2.1 AA | WCAG 2.1 AA |
| NFR-06 | Browser Support | Chrome 90+, FF 88+, Safari 14+ | Chrome 90+, FF 88+, Safari 14+ |
| NFR-07 | Offline fähig | Ja (nach erstem Load) | Ja (Service Worker möglich) |
| NFR-08 | State Persistence | localStorage (debounced 2s) | localStorage (debounced 2s) |
| NFR-09 | Max. Shapes auf Canvas | 100+ | 200+ |
| NFR-10 | Touch Support | Tablet funktional | Tablet + Mobile |
| NFR-11 | Bundle Size (gzip) | < 100 KB | < 80 KB (tree-shaking) |
| NFR-12 | JS Lines of Code | ~1.800 (geschätzt) | ~1.000 (geschätzt) |

### 3.3 User Stories

```
Als Designer
möchte ich eine Basisfarbe wählen und automatisch harmonische Paletten vorgeschlagen bekommen
damit ich professionelle Farbschemas erstelle ohne Farbtheorie-Experte zu sein
```

```
Als Frontend-Entwickler
möchte ich Layouts per Drag & Drop zusammenbauen
damit ich CSS Grid/Flexbox Layouts prototypen kann bevor ich sie implementiere
```

```
Als Accessibility-bewusster Designer
möchte ich in Echtzeit sehen wie mein Farbschema für Farbenblinde aussieht
damit ich sicherstelle dass meine Designs für alle zugänglich sind
```

```
Als Lernender
möchte ich das gleiche Tool in Vanilla JS und Svelte vergleichen
damit ich verstehe wann ein Framework Sinn macht und wann nicht
```

```
Als Team-Mitglied
möchte ich mein Theme per URL teilen
damit Kollegen es mit einem Klick laden und weiterbearbeiten können
```

```
Als Theme-Explorer
möchte ich durch 250+ kuratierte Themes browsen und sie sofort live sehen
damit ich schnell Inspiration finde statt bei Null anzufangen
```

---

## 4. Technical Design

### 4.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DESIGN STUDIO                                       │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  Navigation Bar                                                        │ │
│  │  [🎨 Tokens] [📐 Layout] [⬡ Shapes] [🧩 Components] [📤 Export]     │ │
│  │                                               [🌙/☀️] [Undo] [Redo]  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─────────────────┐  ┌──────────────────────────────────────────────────┐ │
│  │  Properties      │  │                                                  │ │
│  │  Panel (Left)    │  │              Canvas / Preview Area               │ │
│  │                  │  │                                                  │ │
│  │  ┌─────────────┐│  │  ┌──────────────────────────────────────────┐   │ │
│  │  │ Context-     ││  │  │                                          │   │ │
│  │  │ sensitive    ││  │  │  Live preview that changes based on      │   │ │
│  │  │ controls    ││  │  │  active tab:                              │   │ │
│  │  │             ││  │  │                                          │   │ │
│  │  │ • Colors +  ││  │  │  Tokens → Component showcase              │   │ │
│  │  │   Harmony   ││  │  │  Layout → Grid/Flex playground            │   │ │
│  │  │ • Typography││  │  │  Shapes → SVG canvas                     │   │ │
│  │  │ • Spacing   ││  │  │  Components → Assembly preview            │   │ │
│  │  │ • Layout    ││  │  │                                          │   │ │
│  │  │ • Shape     ││  │  │  [Colorblind Sim: Off ▾]                 │   │ │
│  │  │   props     ││  │  │                                          │   │ │
│  │  └─────────────┘│  │  └──────────────────────────────────────────┘   │ │
│  │                  │  │                                                  │ │
│  │  ┌─────────────┐│  │  ┌──────────────────────────────────────────┐   │ │
│  │  │ Preset      ││  │  │  Status Bar                               │   │ │
│  │  │ Browser     ││  │  │  Auto-saved │ 1440px │ 100% │ Share URL  │   │ │
│  │  │ (250+)      ││  │  │                                          │   │ │
│  │  └─────────────┘│  │  └──────────────────────────────────────────┘   │ │
│  └─────────────────┘  └──────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow

```
┌──────────────┐     ┌────────────────┐     ┌───────────────────┐
│ User Input   │────→│ StudioState    │────→│ CSS Custom Props  │
│ (Controls)   │     │ (Central Store)│     │ (document.root)   │
└──────────────┘     └───────┬────────┘     └─────────┬─────────┘
                             │                         │
        ┌────────────────────┼─────────────────┐       │
        │                    │                  │       │
┌───────▼────────┐  ┌───────▼────────┐  ┌─────▼───────▼─────┐
│ History Stack  │  │ URL Hash Sync  │  │ Live Preview       │
│ (Undo/Redo)   │  │ (Shareable)    │  │ (Cascaded CSS)     │
└───────┬────────┘  └────────────────┘  │                    │
        │                               │ ┌────────────────┐ │
┌───────▼────────┐                      │ │ Colorblind     │ │
│ Persistence    │                      │ │ Simulation     │ │
│ localStorage   │                      │ │ (CSS filter)   │ │
└───────┬────────┘                      │ └────────────────┘ │
        │                               └────────────────────┘
┌───────▼────────┐
│ Export Engine   │
│ CSS / JSON /   │
│ HTML / SVG /   │
│ URL            │
└────────────────┘
```

### 4.3 Module Architecture (v1-vanilla)

| Module | Verantwortlichkeit | Größe (geschätzt) |
|--------|-------------------|-------------------|
| `studio-state.js` | Zentraler State, Observer Pattern, History Stack, URL Sync | ~180 Zeilen |
| `token-editor.js` | Color, Typography, Spacing, Radius, Shadow Controls | ~350 Zeilen |
| `color-harmony.js` | Harmony Modes, Palette Gen, Colorblind Sim (Chroma.js Wrapper) | ~120 Zeilen |
| `layout-builder.js` | CSS Grid/Flexbox Builder, SortableJS Integration | ~250 Zeilen |
| `shape-editor.js` | SVG Canvas, Shape CRUD, Selection, Transform | ~400 Zeilen |
| `component-lab.js` | Component Templates, Variant Generator | ~200 Zeilen |
| `export-engine.js` | CSS/JSON/HTML/SVG/URL Generation, Clipboard, Download | ~150 Zeilen |
| `presets.js` | 6 eigene Presets + Gogh Theme Loader | ~100 Zeilen |
| `theme-browser.js` | Such- und Filterfunktion für 250+ Themes | ~80 Zeilen |
| **Total** | | **~1.830 Zeilen JS** |

### 4.4 Data Model

```javascript
// Zentrales State-Objekt (Design Tokens im W3C Format)
const studioState = {
  meta: {
    name: 'My Theme',
    version: '1.0.0',
    created: '2026-02-11',
    modified: '2026-02-11',
    mode: 'dark'               // 'dark' | 'light' (Preview Mode)
  },

  // ═══ DESIGN TOKENS (Dark Mode) ═══
  tokens: {
    colors: {
      primary:   { value: '#6366f1', type: 'color' },
      secondary: { value: '#ec4899', type: 'color' },
      accent:    { value: '#10b981', type: 'color' },
      warning:   { value: '#f59e0b', type: 'color' },
      danger:    { value: '#ef4444', type: 'color' },
      info:      { value: '#3b82f6', type: 'color' }
    },
    surfaces: {
      bgPrimary:   { value: '#0a0a1a', type: 'color' },
      bgSecondary: { value: '#0f172a', type: 'color' },
      bgCard:      { value: 'rgba(255,255,255,0.05)', type: 'color' },
      textPrimary: { value: '#ffffff', type: 'color' },
      textMuted:   { value: 'rgba(255,255,255,0.75)', type: 'color' }
    },
    typography: {
      fontSans:      { value: "'Inter', system-ui, sans-serif", type: 'fontFamily' },
      fontMono:      { value: "'JetBrains Mono', monospace", type: 'fontFamily' },
      baseFontSize:  { value: '16px', type: 'dimension' },
      scaleRatio:    { value: 1.25, type: 'number' },
      lineHeight:    { value: 1.6, type: 'number' },
      fontWeight:    { value: 400, type: 'number' },
      headingWeight: { value: 700, type: 'number' }
    },
    spacing: {
      unit:  { value: '4px', type: 'dimension' },
      xs:    { value: '4px', type: 'dimension' },
      sm:    { value: '8px', type: 'dimension' },
      md:    { value: '16px', type: 'dimension' },
      lg:    { value: '24px', type: 'dimension' },
      xl:    { value: '32px', type: 'dimension' },
      '2xl': { value: '48px', type: 'dimension' }
    },
    radius: {
      sm:      { value: '8px', type: 'dimension' },
      default: { value: '12px', type: 'dimension' },
      lg:      { value: '16px', type: 'dimension' },
      full:    { value: '9999px', type: 'dimension' }
    },
    shadows: {
      sm: { value: '0 1px 2px rgba(0,0,0,0.1)', type: 'shadow' },
      md: { value: '0 4px 6px -1px rgba(0,0,0,0.1)', type: 'shadow' },
      lg: { value: '0 10px 15px -3px rgba(0,0,0,0.2)', type: 'shadow' }
    }
  },

  // ═══ LIGHT MODE OVERRIDES ═══
  tokensLight: {
    surfaces: {
      bgPrimary:   { value: '#f8fafc', type: 'color' },
      bgSecondary: { value: '#f1f5f9', type: 'color' },
      bgCard:      { value: 'rgba(0,0,0,0.03)', type: 'color' },
      textPrimary: { value: '#0f172a', type: 'color' },
      textMuted:   { value: 'rgba(0,0,0,0.6)', type: 'color' }
    }
  },

  // ═══ COLOR HARMONY ═══
  harmony: {
    mode: 'complementary',     // complementary | analogous | triadic | split | tetradic
    baseColor: '#6366f1',
    generated: []              // Auto-populated by Chroma.js
  },

  // ═══ COLORBLIND SIMULATION ═══
  simulation: {
    active: 'none',            // none | deuteranopia | protanopia | tritanopia
  },

  // ═══ LAYOUT ═══
  layout: {
    type: 'grid',
    columns: 12,
    rows: 'auto',
    gap: '16px',
    blocks: [
      { id: 'b1', type: 'header',  gridArea: '1 / 1 / 2 / -1', content: 'Header' },
      { id: 'b2', type: 'sidebar', gridArea: '2 / 1 / 4 / 4',  content: 'Sidebar' },
      { id: 'b3', type: 'content', gridArea: '2 / 4 / 4 / -1',  content: 'Content' },
      { id: 'b4', type: 'footer',  gridArea: '4 / 1 / 5 / -1',  content: 'Footer' }
    ]
  },

  // ═══ SHAPES ═══
  shapes: [],

  // ═══ HISTORY ═══
  _history: {
    past: [],      // Max 30 states
    future: []     // Redo stack
  }
};
```

### 4.5 External Dependencies

| Library | Version | Größe (gzip) | Zweck | CDN / Local |
|---------|---------|-------------|-------|-------------|
| **Chroma.js** | 3.x | ~13.5 KB | Palette Gen (OKLCH), Color Harmony, Colorblind Sim, Kontrast | CDN + lokale Kopie |
| **SortableJS** | 1.15.x | ~10 KB | Drag & Drop für Layout Builder (Phase 2) | CDN + lokale Kopie |
| **Two.js** | 0.8.x | ~16 KB | SVG Rendering & Shape Manipulation (Phase 3) | CDN + lokale Kopie |
| **Inter Font** | - | ~15 KB | Standard UI Font | Google Fonts CDN |
| **Total** | | **~54.5 KB** | Deutlich unter 100 KB Budget | |

**Warum Chroma.js statt eigener Color Utils:**
- OKLCH/LAB Farbraum → perceptuell gleichmäßige Paletten (HSL hat ungleichmäßige Helligkeit)
- Eingebaute Colorblind-Simulation (keine zusätzliche Library)
- ColorBrewer-Paletten für Datenvisualisierung
- 10.5k GitHub Stars, seit 2011 maintained, BSD-Lizenz
- Erspart ~100 Zeilen eigene Konvertierungsfunktionen

**Bewusst NICHT verwendet:**
- ~~vanilla-colorful~~ → Native `<input type="color">` reicht
- ~~interact.js~~ → Two.js hat eingebaute Drag-Unterstützung
- ~~Editor.js~~ → Overkill für unsere Controls
- ~~Open Props CDN~~ → Wir generieren eigene Tokens, nutzen Open Props nur als Preset-Referenz

### 4.6 File Structure

```
/design-studio/
├── README.md                              # Vergleichsdokumentation
│
├── v1-vanilla/                            # ═══ PURE HTML/CSS/JS ═══
│   ├── index.html                         # Haupt-Studio-Seite
│   ├── css/
│   │   └── studio.css                     # Alle Studio-Styles
│   ├── js/
│   │   ├── studio-state.js                # State + History + Observer + URL Sync
│   │   ├── editors/
│   │   │   ├── token-editor.js            # Color, Typography, Spacing Controls
│   │   │   ├── color-harmony.js           # Harmony Engine (Chroma.js Wrapper)
│   │   │   ├── layout-builder.js          # CSS Grid/Flex + SortableJS
│   │   │   ├── shape-editor.js            # SVG Canvas + Two.js
│   │   │   └── component-lab.js           # Component Templates + Variants
│   │   ├── export-engine.js               # CSS/JSON/HTML/SVG/URL Export
│   │   ├── theme-browser.js               # Gogh Theme Search/Filter
│   │   └── presets.js                     # 6 eigene + Gogh/Catppuccin/Material
│   ├── data/
│   │   ├── gogh-themes.json               # 250+ Themes (von GitHub)
│   │   ├── catppuccin.json                # 4 Flavors
│   │   └── material-colors.json           # Google Material Palette
│   ├── assets/
│   │   └── icons/                         # SVG Icons
│   └── lib/
│       ├── chroma.min.js                  # Chroma.js (lokal cached)
│       ├── sortable.min.js                # SortableJS (lokal cached)
│       └── two.min.js                     # Two.js (lokal cached)
│
├── v2-svelte/                             # ═══ FRAMEWORK VERSION ═══
│   ├── src/
│   │   ├── App.svelte                     # Root Component
│   │   ├── lib/
│   │   │   ├── stores/
│   │   │   │   ├── theme.js               # Svelte Store (ersetzt Observer)
│   │   │   │   └── history.js             # Undo/Redo Store
│   │   │   ├── components/
│   │   │   │   ├── TokenEditor.svelte
│   │   │   │   ├── ColorHarmony.svelte
│   │   │   │   ├── LayoutBuilder.svelte
│   │   │   │   ├── ShapeEditor.svelte
│   │   │   │   └── ComponentLab.svelte
│   │   │   └── utils/
│   │   │       └── color.js               # Chroma.js Wrapper
│   │   └── data/                          # Shared with v1 (symlink)
│   ├── package.json
│   ├── vite.config.js
│   └── svelte.config.js
│
└── comparison/                            # ═══ FRAMEWORK VERGLEICH ═══
    ├── metrics.md                         # LOC, Bundle Size, Performance
    ├── dx-notes.md                        # Developer Experience Notizen
    └── screenshots/                       # Visuelle Vergleiche
```

### 4.7 Key Algorithms

#### Color Harmony (Chroma.js – ersetzt eigene HSL-Logik)

```javascript
import chroma from 'chroma-js';

function generateHarmony(baseHex, mode) {
  const base = chroma(baseHex);
  const hue = base.get('hsl.h');

  const harmonies = {
    complementary: [hue, (hue + 180) % 360],
    analogous:     [hue, (hue + 30) % 360, (hue + 330) % 360],
    triadic:       [hue, (hue + 120) % 360, (hue + 240) % 360],
    split:         [hue, (hue + 150) % 360, (hue + 210) % 360],
    tetradic:      [hue, (hue + 90) % 360, (hue + 180) % 360, (hue + 270) % 360]
  };

  return harmonies[mode].map(h =>
    chroma(base).set('hsl.h', h).hex()
  );
}
```

#### Perceptuell korrekte Palette Generation (OKLCH)

```javascript
function generatePalette(baseHex) {
  const base = chroma(baseHex);
  // OKLCH: perceptuell gleichmäßige Lightness-Stufen
  return {
    50:  chroma(base).set('oklch.l', 0.95).hex(),
    100: chroma(base).set('oklch.l', 0.90).hex(),
    200: chroma(base).set('oklch.l', 0.80).hex(),
    300: chroma(base).set('oklch.l', 0.70).hex(),
    400: chroma(base).set('oklch.l', 0.60).hex(),
    500: base.hex(),
    600: chroma(base).set('oklch.l', 0.40).hex(),
    700: chroma(base).set('oklch.l', 0.30).hex(),
    800: chroma(base).set('oklch.l', 0.20).hex(),
    900: chroma(base).set('oklch.l', 0.10).hex()
  };
}
```

#### Shareable URL (Base64 Theme Encoding)

```javascript
function encodeThemeToURL(state) {
  const minimal = {
    n: state.meta.name,
    m: state.meta.mode,
    c: state.tokens.colors,
    s: state.tokens.surfaces,
    t: state.tokens.typography,
    r: state.tokens.radius
  };
  const encoded = btoa(JSON.stringify(minimal));
  window.location.hash = `theme=${encoded}`;
}

function decodeThemeFromURL() {
  const hash = window.location.hash;
  if (!hash.startsWith('#theme=')) return null;
  const decoded = JSON.parse(atob(hash.slice(7)));
  return decoded;
}
```

#### Color Blindness Simulation

```javascript
function simulateColorblind(hex, type) {
  // Chroma.js doesn't have built-in colorblind sim,
  // but we can use a CSS filter approach on the preview container
  const filters = {
    deuteranopia: 'url(#deuteranopia-filter)',
    protanopia:   'url(#protanopia-filter)',
    tritanopia:   'url(#tritanopia-filter)'
  };
  // Apply SVG filter to preview container
  previewEl.style.filter = type === 'none' ? '' : filters[type];
}

// SVG color matrix filters for colorblind simulation
// (embedded in HTML as hidden SVG)
```

#### Observer Pattern (State → UI Sync)

```javascript
class StudioState {
  #state = {};
  #listeners = new Map();

  subscribe(path, callback) {
    if (!this.#listeners.has(path)) {
      this.#listeners.set(path, new Set());
    }
    this.#listeners.get(path).add(callback);
    return () => this.#listeners.get(path).delete(callback);
  }

  set(path, value) {
    this.#pushHistory();
    this.#setNestedValue(path, value);
    this.#syncCSS(path, value);
    this.#notify(path, value);
    this.#debouncedSave();
    this.#syncURL();
  }

  undo() { /* Pop from past, push to future, sync CSS + URL */ }
  redo() { /* Pop from future, push to past, sync CSS + URL */ }
}
```

---

## 5. UI/UX Design

### 5.1 Studio Layout

Three-Panel Layout mit kontextsensitiven Controls:

```
┌──────────────────────────────────────────────────────────────────────┐
│  ☰ Design Studio    [Undo][Redo] │ Theme: My Theme ▾ │ [🌙/☀️]    │
├────────┬─────────────────────────────────────────────────────────────┤
│        │                                                             │
│  Tab   │                    Main Canvas                              │
│  Bar   │                                                             │
│        │  ┌─────────────────────────────────────────────────────┐   │
│ ┌────┐ │  │                                                     │   │
│ │ 🎨 │ │  │  [Aktiver Tab-Inhalt]                               │   │
│ │    │ │  │                                                     │   │
│ │ 📐 │ │  │  ┌─────────────────────────────────┐               │   │
│ │    │ │  │  │ Colorblind Sim: [Off ▾]         │               │   │
│ │ ⬡  │ │  │  └─────────────────────────────────┘               │   │
│ │    │ │  │                                                     │   │
│ │ 🧩 │ │  └─────────────────────────────────────────────────────┘   │
│ │    │ │                                                             │
│ └────┘ ├─────────────────────────────────────────────────────────────┤
│        │  Properties Panel (collapsible)                             │
│        │  [Context-sensitive controls]                                │
├────────┴─────────────────────────────────────────────────────────────┤
│  Auto-saved │ Viewport: 1440px │ Zoom: 100% │ [Share URL] │ Export │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 Tab-System

| Tab | Icon | Properties Panel | Canvas |
|-----|------|-----------------|--------|
| **Tokens** | Palette | Color Pickers + Harmony Mode, Font Controls, Spacing Sliders | Live Komponentenvorschau (Cards, Buttons, Forms, Badges, Alerts) |
| **Layout** | Grid | Grid/Flex Einstellungen, Block-Bibliothek | Interaktives Grid mit Drag & Drop Blöcken |
| **Shapes** | Hexagon | Shape Properties (Fill, Stroke, Size, Rotation) | SVG Canvas mit Shapes |
| **Components** | Puzzle | Component Konfigurator (Variante, State, Content) | Zusammengesetzte Komponente mit allen Tokens |

### 5.3 Color Scheme (Studio Chrome)

```css
/* Studio Chrome (fest, nicht editierbar) */
--studio-bg: #1a1a2e;
--studio-surface: #16213e;
--studio-border: rgba(255, 255, 255, 0.08);
--studio-text: #e2e8f0;
--studio-accent: #818cf8;

/* Editierbare Preview-Farben (aus Tokens) */
--color-primary: /* aus studioState.tokens.colors.primary */
```

### 5.4 Responsive Behavior

| Breakpoint | Layout |
|-----------|--------|
| **≥ 1200px** | Three-Panel (Tabs + Canvas + Properties) |
| **768-1199px** | Two-Panel (Tabs + Canvas), Properties als Overlay/Drawer |
| **< 768px** | Single Panel mit Tab-Navigation, stacked |

---

## 6. Implementation Plan

### 6.1 Phasen-Übersicht

```
Phase 1: Design Tokens Studio     ░░░░░░░░░░░░░░░░░░░░   0%  (~1 Session)
├── StudioState + Observer Pattern + URL Sync
├── Chroma.js Integration
├── Token Editor (Colors + Harmony, Typography, Spacing, Radius)
├── Live Component Preview + Dark/Light Toggle
├── Colorblind Simulation
├── Theme Presets (6 eigene + Gogh Browser)
├── Undo/Redo + Keyboard Shortcuts
├── Export CSS/JSON + Shareable URL
└── Migration vom bestehenden Design Dashboard

Phase 2: Layout Playground         ░░░░░░░░░░░░░░░░░░░░   0%  (~1 Session)
├── SortableJS Integration
├── CSS Grid Visual Builder
├── Flexbox Controls
├── Block Library (Header, Sidebar, Content, etc.)
├── Responsive Preview
├── Layout Templates
└── HTML/CSS Export

Phase 3: Shape & Component Lab     ░░░░░░░░░░░░░░░░░░░░   0%  (~1 Session)
├── Two.js Integration
├── SVG Canvas + Shape Primitives
├── Shape Selection + Transform
├── Component Compositor
├── Component Variants
├── SVG/HTML Export
└── Polish + Educational Tooltips

Phase 4: Framework Version          ░░░░░░░░░░░░░░░░░░░░   0%  (~1-2 Sessions)
├── Svelte Project Setup (Vite + SvelteKit)
├── Port StudioState → Svelte Stores
├── Port all Editors → Svelte Components
├── Feature-Parität mit v1-vanilla
├── Performance Benchmarking
├── Vergleichs-Dokumentation
└── README mit Framework Comparison Matrix
```

### 6.2 Phase 1 Tasks (Detail)

| # | Task | Priority | Abhängigkeit |
|---|------|----------|-------------|
| 1.1 | `v1-vanilla/index.html` Grundstruktur mit Tab-Navigation | Must | - |
| 1.2 | `studio.css` – Three-Panel Layout, Tab-System, Studio Chrome | Must | 1.1 |
| 1.3 | `studio-state.js` – Observer, History, Persistence, URL Sync | Must | - |
| 1.4 | Chroma.js einbinden (CDN + lokale Kopie) | Must | - |
| 1.5 | `token-editor.js` – Color Pickers (Migration vom Dashboard) | Must | 1.3, 1.4 |
| 1.6 | `color-harmony.js` – Harmony Modes + Palette Generation (OKLCH) | Must | 1.4 |
| 1.7 | `token-editor.js` – Typography Controls | Must | 1.3 |
| 1.8 | `token-editor.js` – Spacing + Radius Controls | Must | 1.3 |
| 1.9 | Live Preview Panel mit Komponentenvorschau | Must | 1.5 |
| 1.10 | Dark/Light Mode Toggle für Preview | Must | 1.5, 1.9 |
| 1.11 | Colorblind Simulation (SVG Filters) | Must | 1.9 |
| 1.12 | Gogh Themes JSON downloaden + Theme Browser UI | Must | 1.3 |
| 1.13 | `presets.js` – 6 eigene + Catppuccin + Material | Must | 1.3 |
| 1.14 | `export-engine.js` – CSS + JSON + URL Export | Must | 1.3 |
| 1.15 | Undo/Redo Buttons + Keyboard Shortcuts | Must | 1.3 |
| 1.16 | WCAG Contrast Checking (Chroma.js) | Should | 1.4, 1.5 |
| 1.17 | Responsive Layout (Tablet/Mobile) | Should | 1.2 |

### 6.3 Phase 2 Tasks (Detail)

| # | Task | Priority | Abhängigkeit |
|---|------|----------|-------------|
| 2.1 | SortableJS einbinden + Grid Container Setup | Must | Phase 1 |
| 2.2 | Block-Bibliothek (Panel mit draggable Blocks) | Must | 2.1 |
| 2.3 | CSS Grid Konfiguration (Columns, Rows, Gap Slider) | Must | 2.1 |
| 2.4 | Flexbox Toggle + Controls | Should | 2.1 |
| 2.5 | Block Resizing mit Custom Handles | Should | 2.1 |
| 2.6 | Responsive Viewport Switcher | Must | 2.3 |
| 2.7 | Layout Templates (5+ vorgefertigte) | Should | 2.3 |
| 2.8 | HTML/CSS Code Export für Layouts | Must | 2.3 |

### 6.4 Phase 3 Tasks (Detail)

| # | Task | Priority | Abhängigkeit |
|---|------|----------|-------------|
| 3.1 | Two.js einbinden + SVG Canvas Setup | Must | Phase 1 |
| 3.2 | Shape Toolbar (Rect, Circle, Line, etc.) | Must | 3.1 |
| 3.3 | Shape Properties Panel (Fill, Stroke, Size) | Must | 3.1 |
| 3.4 | Shape Selection + Drag + Resize | Must | 3.1 |
| 3.5 | Shape Layering (Z-Index Controls) | Should | 3.4 |
| 3.6 | Component Compositor Tab | Must | Phase 1 |
| 3.7 | Component Variants (Hover, Active, Disabled) | Should | 3.6 |
| 3.8 | SVG Export + HTML/CSS Snippet Export | Must | 3.4 |
| 3.9 | Educational Tooltips für alle Controls | Should | Alle |
| 3.10 | Final Polish, Keyboard Shortcuts, a11y Audit | Must | Alle |

### 6.5 Phase 4 Tasks (Framework Version)

| # | Task | Priority | Abhängigkeit |
|---|------|----------|-------------|
| 4.1 | Svelte + Vite Projekt-Setup in `v2-svelte/` | Must | Phase 1-3 fertig |
| 4.2 | `theme.js` Svelte Store (Port von studio-state.js) | Must | 4.1 |
| 4.3 | `history.js` Svelte Store (Undo/Redo) | Must | 4.1 |
| 4.4 | `TokenEditor.svelte` (Port von token-editor.js) | Must | 4.2 |
| 4.5 | `ColorHarmony.svelte` (Port von color-harmony.js) | Must | 4.2 |
| 4.6 | `LayoutBuilder.svelte` (Port von layout-builder.js) | Must | 4.2 |
| 4.7 | `ShapeEditor.svelte` (Port von shape-editor.js) | Must | 4.2 |
| 4.8 | `ComponentLab.svelte` (Port von component-lab.js) | Must | 4.2 |
| 4.9 | Feature-Parität Audit (v1 vs v2) | Must | 4.4-4.8 |
| 4.10 | Performance Benchmark (Load Time, FPS, Memory) | Must | 4.9 |
| 4.11 | `comparison/metrics.md` schreiben | Must | 4.10 |
| 4.12 | `comparison/dx-notes.md` schreiben | Must | 4.9 |
| 4.13 | `README.md` mit Comparison Matrix | Must | 4.11, 4.12 |

### 6.6 Milestones

| Milestone | Ziel | Deliverable |
|-----------|------|-------------|
| **M1:** Token Studio MVP | Session 1 | Farben + Harmony, Typography, Spacing, Export, 250+ Presets, Dark/Light, Colorblind Sim |
| **M2:** Layout Builder | Session 2 | Drag & Drop Grid Builder mit Templates |
| **M3:** Shape & Components | Session 3 | SVG Shapes + Component Lab, alle Exports |
| **M4:** v1-vanilla Complete | Session 3 | Alle Features, polished, WCAG compliant |
| **M5:** v2-svelte Complete | Session 4-5 | Feature-Parität, Performance-Vergleich |
| **M6:** Comparison Published | Session 5 | README + Metrics + DX Notes |

### 6.7 Risiken

| Risiko | Impact | Wahrscheinlichkeit | Mitigation |
|--------|--------|-------------------|------------|
| CDN nicht verfügbar | Hoch | Niedrig | Lokale Kopien aller Libraries in `/lib/` |
| Performance bei 100+ Shapes | Mittel | Mittel | Virtualisierung, nur sichtbare Shapes rendern |
| SortableJS Touch-Kompatibilität | Mittel | Niedrig | Fallback auf native HTML5 DnD |
| v1 Code-Komplexität > 2.000 LOC | Hoch | Mittel | Strikte Modularisierung, ES Modules |
| CSS Variable Scoping | Hoch | Mittel | `--studio-*` (Chrome) vs. `--color-*` (Preview) |
| Svelte Version Breaking Changes | Mittel | Niedrig | Pin auf Svelte 5.x |
| Gogh JSON zu groß für localStorage | Mittel | Mittel | Nur aktives Theme speichern, JSON lazy-loaden |
| URL-Hash zu lang für komplexe Themes | Niedrig | Mittel | Nur Farben + Fonts in URL, Rest als Defaults |

---

## 7. Migration & Repo Strategy

### 7.1 Neue Repo-Struktur

```
/Luno-Future-Docs/
├── dashboard/                    # Bestehendes Hub (bleibt)
├── design-dashboard/             # Altes Dashboard (deprecated, bleibt als Referenz)
├── design-studio/                # ═══ NEU ═══
│   ├── v1-vanilla/               # Pure HTML/CSS/JS
│   ├── v2-svelte/                # Svelte Framework Version
│   ├── comparison/               # Framework-Vergleich
│   └── README.md                 # Projekt-Übersicht + Links
├── animation-lab/                # Bestehendes (Remotion, Manim, Three.js)
├── enhanced/                     # Bestehendes
├── shared/                       # Bestehendes
└── docs/                         # Bestehendes
```

### 7.2 Design Dashboard → Studio Migration

| Aktion | Detail |
|--------|--------|
| Dashboard behalten | `/design-dashboard/` bleibt als Referenz, wird `archived` markiert |
| Code übernehmen | Color Picker HTML, WCAG Functions, Preset-Konzept, Toast UI |
| Dashboard-Link | Main `/dashboard/index.html` bekommt zusätzlichen Studio-Link |
| Redirect | Optionaler Banner im alten Dashboard: "Try the new Design Studio →" |

### 7.3 Shared Data

Die Theme-Daten (`gogh-themes.json`, `catppuccin.json`, `material-colors.json`) werden in `v1-vanilla/data/` gespeichert. v2-svelte kann via Symlink oder Copy darauf zugreifen.

---

## 8. Framework Comparison Strategy

### 8.1 Was wir vergleichen

| Dimension | Messmethode | Erwartung |
|-----------|-------------|-----------|
| **Lines of Code** | `cloc` oder manuell | v2-svelte ~40-50% weniger |
| **Bundle Size (gzip)** | `du -h` / Vite Report | v2-svelte ~20% kleiner (tree-shaking) |
| **Initial Load Time** | Lighthouse / DevTools | v2-svelte schneller (compiled) |
| **60fps Interactions** | Chrome DevTools Performance | Vergleichbar |
| **State Management** | Qualitativ | Svelte Stores deutlich einfacher |
| **Component Reusability** | Qualitativ | `.svelte` > ES Module + DOM |
| **Developer Experience** | Subjektiv (DX-Notes) | Svelte signifikant besser |
| **Debugging** | Qualitativ | Browser DevTools vs. Svelte DevTools |
| **Lernkurve** | Subjektiv | Vanilla einfacher zu verstehen |

### 8.2 Comparison README Format

```markdown
# Design Studio: Framework Comparison

## Vanilla JS (v1) vs. Svelte (v2)

| Metric           | v1-vanilla | v2-svelte | Winner |
|------------------|-----------|-----------|--------|
| Lines of Code    | ~1,830    | ~1,000    | Svelte |
| Bundle Size      | ~55 KB    | ~40 KB    | Svelte |
| Load Time (3G)   | 1.8s      | 1.2s      | Svelte |
| No Build Tools   | ✅        | ❌        | Vanilla|
| State Management | Manual    | Built-in  | Svelte |
| ...              | ...       | ...       | ...    |

## Verdict
[Nuancierte Analyse]

## When to Use What
- **Vanilla JS**: Kleine Tools, Prototypen, maximale Portabilität
- **Svelte**: Apps mit State Management, Components, Reactivity
```

---

## 9. Success Metrics

| Metrik | Ziel | Messmethode |
|--------|------|-------------|
| Time to first Export | < 2 Minuten | User-Testing |
| Alle 4 Tabs nutzbar | 100% | Funktionstest |
| Lighthouse Performance | > 90 | Automated Audit |
| Lighthouse Accessibility | > 95 | Automated Audit |
| Bundle Size v1 (gzip) | < 100 KB | Messung |
| Bundle Size v2 (gzip) | < 80 KB | Vite Report |
| Undo/Redo funktional | 30+ Steps | Integrationstest |
| Touch-fähig auf Tablet | Drag & Drop funktional | Manueller Test |
| Alle Exports valide | CSS/JSON validiert | Automatisiert |
| Shareable URL funktional | Decode → identischer State | Automatisiert |
| Theme Browser | 250+ Themes ladbar | Funktionstest |
| Colorblind Sim | 3 Modi korrekt | Visueller Test |
| Comparison Doc | Veröffentlicht | Review |

---

## 10. Decisions (Closed Questions)

Die folgenden Fragen aus v1.0.0 wurden beantwortet:

| Frage | Entscheidung | Begründung |
|-------|-------------|------------|
| Design Dashboard ersetzen oder behalten? | **Parallel behalten**, `archived` markieren | Kein Risiko, bestehende Links bleiben funktional |
| Tailwind v4 CSS-Export? | **Nein** (v1), evaluieren in v2 | Scope-Begrenzung, CSS Variables reichen |
| Color Blindness Simulation? | **Ja, Phase 1** | Low effort via SVG Filter, hoher Educational-Wert |
| Shareable URL? | **Ja, Phase 1** | ~20 Zeilen JS, enormer Sharing-Wert |
| Custom Font Upload? | **Nein** (v1), evaluieren in v2 | File API Komplexität vs. Google Fonts Dropdown |
| Dark/Light Mode Toggle? | **Ja, Phase 1** | Essentiell – ohne Light Mode ist das Studio unvollständig |
| Standalone nutzbar? | **Ja** | Eigenständige `index.html`, kein Dependency auf Rest des Repos |
| Framework für v2? | **Svelte** | Kompiliert zu Vanilla JS, kein Runtime, `.svelte` ≈ HTML |
| Module Loading? | **ES Modules** (`<script type="module">`) | Kein Build nötig, native seit 2018, saubere Imports |
| Color Library? | **Chroma.js** (13.5KB) | OKLCH, Harmony, Contrast, Colorblind – alles in einer Lib |

### Verbleibende Open Questions

- [ ] Sollen wir die Comparison-Ergebnisse als interaktive Seite oder nur als Markdown veröffentlichen?
- [ ] Wollen wir ein Svelte-basiertes Dashboard als v2 des Main Dashboards nach dem Studio-Vergleich?
- [ ] Theme-Import aus Figma (Tokens Studio JSON Format)?

---

## 11. Appendix

### 11.1 Library Size Budget

```
┌───────────────────────────────────────────────────────────────────┐
│                    Bundle Size Budget (v1-vanilla)                  │
├────────────────────┬──────────┬────────────────────────────────────┤
│ Asset              │ Size     │ Typ                                │
├────────────────────┼──────────┼────────────────────────────────────┤
│ index.html         │ ~5 KB    │ Markup                             │
│ studio.css         │ ~8 KB    │ Styles                             │
│ JS Modules (own)   │ ~15 KB   │ Custom Code (~1,830 LOC)           │
│ Chroma.js          │ ~13.5 KB │ Library (gzip)           ← NEU    │
│ SortableJS         │ ~10 KB   │ Library (gzip) – Phase 2           │
│ Two.js             │ ~16 KB   │ Library (gzip) – Phase 3           │
│ Inter Font         │ ~15 KB   │ Font (subset)                      │
├────────────────────┼──────────┼────────────────────────────────────┤
│ TOTAL (Phase 1)    │ ~57 KB   │ Ohne SortableJS + Two.js           │
│ TOTAL (Phase 3)    │ ~83 KB   │ Alle Libraries geladen             │
└────────────────────┴──────────┴────────────────────────────────────┘
```

### 11.2 Keyboard Shortcuts

| Shortcut | Aktion |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo |
| `Ctrl+S` | Export/Save Dialog |
| `Ctrl+C` | Copy CSS to Clipboard (wenn kein Text selektiert) |
| `1` – `4` | Tab wechseln (Tokens/Layout/Shapes/Components) |
| `D` | Dark/Light Mode Toggle |
| `Delete` / `Backspace` | Ausgewähltes Element löschen |
| `Escape` | Auswahl aufheben / Dialog schließen |

### 11.3 Theme Presets (Eigene)

| Preset | Primary | Secondary | Background | Mode | Charakter |
|--------|---------|-----------|------------|------|-----------|
| LunoLabs Dark | #6366f1 | #ec4899 | #0a0a1a | Dark | Professional |
| LunoLabs Light | #4f46e5 | #db2777 | #f8fafc | Light | Clean |
| Ocean | #0ea5e9 | #06b6d4 | #0c1929 | Dark | Calm |
| Sunset | #f97316 | #ef4444 | #1c1917 | Dark | Warm |
| Forest | #22c55e | #84cc16 | #052e16 | Dark | Natural |
| Neon | #a855f7 | #f43f5e | #09090b | Dark | Vibrant |

**Zusätzlich:** 250+ Themes via Gogh Collection, 4 Catppuccin Flavors, Google Material Palette

### 11.4 W3C Design Tokens Format (Export)

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "primary": {
      "$value": "#6366f1",
      "$type": "color",
      "$description": "Main brand color"
    },
    "secondary": {
      "$value": "#ec4899",
      "$type": "color"
    }
  },
  "spacing": {
    "sm": {
      "$value": "8px",
      "$type": "dimension"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": {
        "$value": "'Inter', system-ui, sans-serif",
        "$type": "fontFamily"
      }
    }
  }
}
```

### 11.5 External Resources to Download

| Resource | Source | Format | Size | Target |
|----------|--------|--------|------|--------|
| Gogh Themes | `github.com/Gogh-Co/Gogh/data/themes.json` | JSON | ~200 KB | `v1-vanilla/data/gogh-themes.json` |
| Catppuccin | `github.com/catppuccin` | JSON (extracted) | ~2 KB | `v1-vanilla/data/catppuccin.json` |
| Material Colors | `gist.github.com/kawanet/a880c83f06d6baf742e45ac9ac52af96` | JSON | ~5 KB | `v1-vanilla/data/material-colors.json` |
| Chroma.js | `unpkg.com/chroma-js` | JS | ~40 KB (raw) | `v1-vanilla/lib/chroma.min.js` |
| SortableJS | `cdn.jsdelivr.net/npm/sortablejs` | JS | ~30 KB (raw) | `v1-vanilla/lib/sortable.min.js` |
| Two.js | `cdn.jsdelivr.net/npm/two.js` | JS | ~62 KB (raw) | `v1-vanilla/lib/two.min.js` |

### 11.6 Related Documents

- [PRD Design Dashboard](prd-design-dashboard.md) – Vorgänger-PRD
- [UI Fundamentals Research](../research/active/ui-design-systems/ui-fundamentals-research.md)
- [Chroma.js API Docs](https://gka.github.io/chroma.js/)
- [Open Props](https://github.com/argyleink/open-props)
- [Gogh Themes](https://github.com/Gogh-Co/Gogh)
- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [SortableJS Docs](https://sortablejs.github.io/Sortable/)
- [Two.js Docs](https://two.js.org/docs/)
- [Svelte Docs](https://svelte.dev/docs)
- [Catppuccin](https://catppuccin.com/)

### 11.7 Glossary

| Term | Definition |
|------|------------|
| **Design Token** | Benannter Wert (Farbe, Abstand, etc.) in einem Design-System, W3C-standardisiert als JSON |
| **CSS Custom Property** | Variable in CSS (`--name`), gesetzt via `:root`, cascadiert durch das DOM |
| **OKLCH** | Perceptuell uniformer Farbraum (Oklab-basiert). L=Lightness, C=Chroma, H=Hue |
| **Color Harmony** | Farbkombinationen basierend auf geometrischen Beziehungen im Farbkreis |
| **Observer Pattern** | Pub/Sub Pattern: Objekte abonnieren State-Änderungen |
| **History Stack** | Datenstruktur für Undo/Redo (Past + Future Arrays) |
| **Svelte Store** | Reactivity-Primitive in Svelte, ersetzt manuelles Observer Pattern |
| **Chroma.js** | JavaScript Color Library für Konvertierung, Paletten, Kontrast (13.5KB) |
| **SortableJS** | Drag & Drop Library, native HTML5 DnD (~10KB gzip) |
| **Two.js** | 2D Drawing Library für SVG/Canvas/WebGL (~16KB gzip) |
| **Tree-Shaking** | Build-Optimierung die ungenutzten Code entfernt (Vite/Rollup) |
| **Gogh** | Open-Source Collection von 250+ Terminal Color Themes (MIT) |

---

## Changelog

| Version | Datum | Autor | Änderungen |
|---------|-------|-------|------------|
| 1.0.0 | 2026-02-10 | Joel + Claude | Initial Draft |
| 2.0.0 | 2026-02-11 | Joel + Claude | **Major Update:** Hybrid-Ansatz (v1-vanilla + v2-svelte), Chroma.js statt eigener Color Utils, Color Harmony Engine, Dark/Light Toggle, Shareable URL, Colorblind Simulation, 250+ Gogh Theme Presets, Phase 4 (Framework Version), Framework Comparison Strategy, Open Questions beantwortet, aktualisiertes File Structure und Bundle Budget |

---

*Nächster Schritt: Review & Approval → Phase 1 Implementation (v1-vanilla)*
*Siehe [ROADMAP.md](../ROADMAP.md) für Projekt-Timeline*
