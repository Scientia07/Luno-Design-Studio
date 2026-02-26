<!--
==============================================================================
FILE METADATA
==============================================================================
filename:       README.md
created:        2026-02-26
updated:        2026-02-26
version:        1.0.0
status:         draft
rating:         ★★☆☆☆
author:         Joel + Claude
related_docs:   [../../prd/prd-design-studio.md, ../../../comparison/README.md]
description:    Research hub for Vanilla JS vs Svelte 5 framework comparison
==============================================================================
-->

# Research: Framework Comparison

## Topics to Investigate

- [ ] Metrics to compare — LOC, bundle size, render performance, DX
- [ ] State management — Observer pattern vs Svelte stores ($state, $derived)
- [ ] DOM updates — manual DOM vs Svelte reactivity compiler
- [ ] Component patterns — web components vs .svelte files
- [ ] Build pipeline — zero-build CDN vs Vite
- [ ] Testing approaches — vanilla unit tests vs Svelte testing library

## Comparison Framework

| Metric | How to Measure | Tool |
|--------|----------------|------|
| Lines of Code | `cloc` or `wc -l` | CLI |
| Bundle Size | gzip size of all JS | `gzip -k` |
| First Paint | Lighthouse | Chrome DevTools |
| Interaction Latency | Performance.now() | Custom |
| State Update Speed | 1000 token changes/sec | Benchmark script |
| Developer Experience | Subjective rating | Documentation |

## Key Resources

- [Svelte 5 docs](https://svelte.dev/docs)
- [Framework Benchmarks](https://krausest.github.io/js-framework-benchmark/)
