# Home Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faster load and smoother scroll on home; a light placeholder for every image; fix `/#details`.

**Architecture:** One-off puppeteer script re-encodes images to WebP + 32 px JPEG placeholders; components mount 3D only near the viewport; `ScrollRestore` measures with `getBoundingClientRect`, Home re-jumps after the pin refresh.

**Tech Stack:** existing (Next 16, three, ogl, GSAP); puppeteer for the one-off encode.

**Spec:** `docs/superpowers/specs/2026-11-14-home-performance-design.md`

## Global Constraints

- Branch `perf/home` from `feat/react-bits`. No new dependencies. WebP quality 0.82; placeholders 32 px wide, ≤ 2 KB.
- "Test" = `npm run build` + `npm run lint` (0 errors) + browser checks + Lighthouse home (baseline phone 39 / desktop 60).

## Review Focus

- Scrolling back to a project whose model was unmounted: it reappears (fade-in), no blank laptop.
- `/#details` from another page and from the nav on home: lands on Details every time.
- Light theme: placeholders don't flash a wrong-theme block.
- Phone width: smaller textures chosen (srcSet), no layout jump when the full image replaces the placeholder.
- No 404s in the console on home, Other Projects, Articles, any article.

---

### Task 1: Images
- [ ] Script: for home textures (`github.png`, `campushub/homepage-dark.png`, `slice-app.jpg`, `gamestack-login.jpg`, `gamestack-list.jpg`) write `<name>-1280.webp`/`-2048.webp` (laptop) or `-640.webp`/`-1150.webp` (phone); for Other Projects images (`src/assets/projects/*`) write `<name>.webp` at ≤ 1600 px; write `<name>-placeholder.jpg` (32 px) where missing; `public/static/ai-placeholder.jpg`, `inspiration-placeholder.jpg`.
- [ ] Point `Home.js` and `github.js` imports at the new files (`srcSet: [small, large]`, own placeholders).

### Task 2: Lazy 3D
- [ ] `Profile.js`: veil only when `useInViewport(ref, true, { rootMargin: '100% 0px' })` is true.
- [ ] `ProjectSummary.js`: model mounted while `useInViewport(section, false, { rootMargin: '50% 50%' })`.
- [ ] `DisplacementSphere.js`: pixel ratio 0.75 on phones; `Intro.js` mounts it after a 600 ms idle delay.

### Task 3: Details link
- [ ] `ScrollRestore.js`: `getBoundingClientRect().top + window.scrollY`.
- [ ] `Home.js`: after the pin's `ScrollTrigger.refresh`, if `location.hash` targets an element below the pin, jump to it again.

### Task 4: Article placeholders
- [ ] `PostMarkdown.js` `PostImage`: background `url(<name>-placeholder.jpg)` center/cover until load.

### Task 5: Verify and commit
- [ ] Lighthouse home (phone/desktop), canvases alive while scrolling ≤ ~2, `/#details` x5, console 404-free; build + lint; commit.
