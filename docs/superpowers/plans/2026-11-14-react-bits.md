# React Bits Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hyperspeed behind Other Projects, DitherVeil on the home photo, LogoLoop rows for About Me skills.

**Architecture:** Components copied verbatim to `src/components/<Name>/`; their CSS imported once in `_app.page.js`; WebGL ones loaded with `next/dynamic({ ssr: false })`.

**Tech Stack:** three (installed), ogl, react-icons.

**Spec:** `docs/superpowers/specs/2026-11-14-react-bits-design.md`

## Global Constraints

- Branch `feat/react-bits` from `feat/horizontal-projects`. Only new deps: `ogl`, `react-icons`.
- "Test" = `npm run build` + `npm run lint` (0 errors) + browser checks (no test suite).

## Review Focus

- WebGL unavailable / context lost: page still readable (placeholder stays).
- Light theme: DitherVeil colours and Hyperspeed theme follow it.
- Phone width: Hyperspeed lighter settings, LogoLoop rows don't overflow the page.
- Keyboard: LogoLoop rows are not focus traps; links inside (none) — rows are plain items.
- Leaving and returning to a page: WebGL contexts are disposed (no leak warnings).

---

### Task 1: Components and deps
- [ ] `git switch -c feat/react-bits`; `npm install ogl react-icons`.
- [ ] Create `Hyperspeed`, `DitherVeil`, `LogoLoop` folders (source verbatim minus `'use client'` and CSS import; `index.js` re-exports default). Import the three CSS files in `_app.page.js`.

### Task 2: Hyperspeed — `src/pages/projects/github/github.js`
- [ ] Replace video `ProjectBackground` with a fixed full-viewport layer holding dynamic `Hyperspeed` (spec values; phone values when `width <= media.mobile`); keep `github.png` as the static layer under it.

### Task 3: DitherVeil — `src/layouts/Home/Profile.js`
- [ ] Replace the photo `Image` with dynamic `DitherVeil` (spec values, theme colours from `useTheme()`), wrapped in `role="img"` with the old alt text.

### Task 4: LogoLoop — `src/pages/about_me/AboutMe.js`
- [ ] Map each skill to `{ node, title }` (react-icons/si where available, else text-only `node`); render one `LogoLoop` per group, alternating direction, spec props.

### Task 5: Verify
- [ ] Browser: Other Projects (desktop + phone), home Details photo hover (dark + light), About Me skills rows; build + lint; commit.
