# Horizontal Project Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pin the home page's five project sections on desktop and glide them sideways with scroll.

**Architecture:** Wrapper + flex track in `Home.js`; `useGSAP` + `gsap.matchMedia()` pins the wrapper and scrubs the track's `x`; matching CSS media condition lays the track out horizontally.

**Tech Stack:** gsap 3.15 ScrollTrigger, @gsap/react `useGSAP`, Lenis (already driving native scroll).

**Spec:** `docs/superpowers/specs/2026-11-14-horizontal-projects-design.md`

## Global Constraints

- Condition, identical in CSS and JS: `(min-width: 1041px) and (prefers-reduced-motion: no-preference)`.
- `ease: 'none'`, `scrub: 1`, `invalidateOnRefresh: true`. No new dependencies.
- "Test" = `npm run build` + `npm run lint` (0 errors) + browser checks below (no test suite).

## Review Focus

- Window resized across 1040px mid-page: layout flips cleanly, no leftover transform or pin spacer.
- Tab to a "View project" button in a panel not yet on screen: page scrolls so it is visible.
- Navbar "Projects" / arrow → `#project-1` lands on the first panel; "Details" lands after the pin.
- Leaving home and coming back: pin re-measured, no doubled spacer.
- Each panel's model still mounts as it slides in.

---

### Task 1: Track markup, CSS, GSAP pin, focus

**Files:** Modify `src/layouts/Home/Home.js`, `src/layouts/Home/Home.module.css`.

- [ ] Wrap the five `ProjectSummary` in `div.projects > div.track` (refs `projectsRef`, `trackRef`).
- [ ] CSS under the condition: `.track { display: flex; width: max-content }`, `.track > * { flex: 0 0 100vw; width: 100vw; height: 100vh; max-height: none; margin: 0 }`.
- [ ] `useGSAP` with `gsap.matchMedia().add(condition, ...)`: `gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: projects, pin: true, scrub: 1, start: 'top top', end: () => '+=' + distance(), invalidateOnRefresh: true } })` where `distance = track.scrollWidth - window.innerWidth`.
- [ ] Inside the same context: `focusin` listener on `track`; for the focused panel index `i`, `window.scrollTo` (via `getLenis()` if present) to `st.start + i * window.innerWidth` — panels are one viewport wide so the mapping is linear.
- [ ] `ScrollTrigger.refresh()` after mount on a short timeout (page transition).
- [ ] Browser: desktop 1440 — scroll through, panels glide, Details follows; Tab focus check; resize to 900 and back; mobile preset vertical; reduced-motion emulation vertical.
- [ ] Build, lint, commit `feat: horizontal project scroll on desktop`.
