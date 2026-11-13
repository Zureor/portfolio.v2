# Carton Connect Project and Profile Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Carton Connect as the lead project (home + case study) and update the home disciplines and About Me.

**Architecture:** Reuse `layouts/Project` pieces for the case study (pattern: `src/pages/projects/liminal/`); reuse `ProjectSummary` on Home; data-only edits in `AboutMe.js`.

**Tech Stack:** Next 16 pages router (`.page.js`), CSS modules, webpack asset imports.

**Spec:** `docs/superpowers/specs/2026-11-13-carton-connect-design.md`

## Global Constraints

- Nothing from the spec's anti-goals list appears in copy, alt text or comments.
- No new dependencies. Branch `feat/carton-connect` from `chore/dependency-upgrade`.
- "Test" = `npm run build` passes + `npm run lint` 0 errors + browser check (repo has no test suite).

## Review Focus

- Home scroll reveal with five project sections: every section becomes visible once (check in Task 4).
- Case study on phone width (375px): screenshots and text fit, no horizontal scroll (Task 3).
- Light and dark theme on the case study page (Task 3).
- `/projects/carton-connect` appears in `public/sitemap.xml` after build (Task 3).
- External "Visit site" opens the live portal in a new tab (Task 3).

---

### Task 1: Branch, assets, disciplines

**Files:** Create `src/assets/carton-connect/{signin-desktop,signin-mobile,dashboard-dark,dashboard-light,query-builder}.webp` (+ `-placeholder.jpg` each); Modify `src/layouts/Home/Home.js:22`.

- [ ] `git switch -c feat/carton-connect`
- [ ] Copy screenshots 1–5 to the names above; make 32px placeholders with the puppeteer one-off used for CampusHub.
- [ ] `disciplines` → `['Developer', 'Data Analyst', 'System Designer', 'Techie']`.
- [ ] Commit `feat: System Designer discipline and Carton Connect screenshots`.

### Task 2: About Me

**Files:** Modify `src/pages/about_me/AboutMe.js` (`description`, `profile`, `snapshot`, `experience`, `skillGroups`).

- [ ] Add experience entry `id: 'pacd-dev'` first, per spec; set `pacd` period `06/2025 - 09/2026`.
- [ ] Add skill group `{ id: 'web', span: 'half', name: 'Web & Cloud', items: [...] }` per spec; keep the grid's half/full pairing balanced (move `tools` to stay `full`).
- [ ] Browser: `/about_me` shows new role first and the new group. Commit `feat: new PACD role and web/cloud skills on About Me`.

### Task 3: Case study page

**Files:** Create `src/pages/projects/carton-connect/{index.page.js,CartonConnect.js,CartonConnect.module.css}`.

**Interfaces:** Produces route `/projects/carton-connect`.

- [ ] Sections 1–7 per spec using `ProjectHeader`, `ProjectSection`, `ProjectSectionContent`, `ProjectTextRow`, `ProjectSectionHeading`, `ProjectSectionText`, `ProjectImage`/`Image` with `srcSet` + `placeholder`.
- [ ] `npm run build` lists `/projects/carton-connect`; sitemap contains it.
- [ ] Browser: desktop + 375px, dark + light, Visit site link target. Commit `feat: Carton Connect case study`.

### Task 4: Home summary

**Files:** Modify `src/layouts/Home/Home.js`.

- [ ] New first `ProjectSummary` (`id="project-1"`, index 1, laptop, dark dashboard texture); renumber the others `project-2..5`, add a section ref so all five are observed. Intro scroll link targets `/#project-1` (unchanged).
- [ ] Browser: scroll the home page; all five sections reveal; laptop shows the dashboard. Commit `feat: Carton Connect leads the home page`.

### Task 5: Verify

- [ ] `npm run build` exit 0; `npm run lint` 0 errors; grep the new copy for anti-goal terms (`$`, `Mumbai`, `ap-south`, `db.`, `WAF`, `two-factor`, `fee`, `0.75`, `211c2e7`) — Expected: none.
