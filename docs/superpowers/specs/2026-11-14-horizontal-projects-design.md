# Horizontal project scroll on the home page — design (short)

**Intent.** On the home page, the five project sections glide sideways while the visitor scrolls
down: the project area pins, the projects slide in from the right one after another in one
continuous motion, then vertical scrolling resumes into Details.

**Goals.** Continuous glide (no per-project snapping); reuse the existing `ProjectSummary`
sections unchanged in content; desktop only.

**Non-goals / anti-goals.** No sideways scrolling on phones/tablets or for reduced-motion users
(they keep today's vertical stack). Nothing must become unreachable: nav "Projects" link, the
scroll-down arrow, and keyboard Tab focus must all still land on visible content.

## Approaches

- **A. GSAP pin + scrub (picked).** ScrollTrigger pins a wrapper and tweens a flex track's `x`
  with `ease: 'none'`, `scrub: 1`. Standard pattern, least code, cleanly reverted by
  `gsap.matchMedia()`.
- B. CSS `position: sticky` + GSAP progress. No pin-spacer, but more custom height maths.

## Design

- `Home.js`: wrap the five `ProjectSummary` sections in `<div className={styles.projects}>`
  → `<div className={styles.track}>`.
- A `useGSAP` hook in `Home.js` (GSAP and `@gsap/react` already installed; ScrollTrigger registered
  as in `components/Motion`) with `gsap.matchMedia()` condition
  `(min-width: 1041px) and (prefers-reduced-motion: no-preference)`:
  - tween `track` to `x: () => -(track.scrollWidth - window.innerWidth)`, `ease: 'none'`;
  - ScrollTrigger: `trigger: projects`, `pin: true`, `scrub: 1`,
    `end: () => '+=' + (track.scrollWidth - window.innerWidth)`, `invalidateOnRefresh: true`.
- CSS in `Home.module.css`, same media condition: `.track` is `display: flex`; each section is
  `flex: 0 0 100vw`, `height: 100vh`, `margin: 0`. Outside the condition nothing changes.
- **Focus:** when an element inside the track gets keyboard focus while pinned, scroll the page to
  the position that shows that panel (panel index × panel width mapped onto the trigger's
  start→end).
- **Reveal and models:** unchanged — the existing IntersectionObserver reveals each section and
  mounts its model as it slides into the viewport.
- **Refresh:** `ScrollTrigger.refresh()` once after the page transition settles so the pin
  spacer is measured correctly.

## Builder's calls

- Breakpoint = existing `media.tablet` (1040px). `scrub: 1` (≈1s catch-up) for the glide.
- Branch `feat/horizontal-projects` from `feat/carton-connect`.
