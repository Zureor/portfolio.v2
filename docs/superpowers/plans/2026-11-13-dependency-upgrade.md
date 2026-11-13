# Dependency Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every kept dependency to its latest major so `next build` passes on Node 26, without visible change to the site, then fix the listed content bugs.

**Architecture:** Next.js pages router (`.page.js` extension), CSS modules, vanilla three.js scenes, framer-motion + GSAP, MDX via mdx-bundler, OG images via puppeteer at build. Build keeps webpack (custom svg/glsl/asset rules), opted into with `--webpack`.

**Tech Stack:** Next 16, React 19, framer-motion (latest), three (latest), mdx-bundler 10, puppeteer (latest), ESLint 9 flat config.

**Spec:** `docs/superpowers/specs/2026-11-13-dependency-upgrade-design.md`

## Global Constraints

- Node 26 must build; `engines.node` becomes `>=20.9`.
- No new runtime dependencies beyond what the upgrades require.
- No App Router migration, no redesign, no copy changes beyond Task 5.
- Work on branch `chore/dependency-upgrade`; never commit to `main` directly.
- "Test" in this repo = `npm run build` succeeds + `npm run lint` clean + page check in the browser pane (no unit-test framework exists; none is added).

## Review Focus

- Theme toggle (light/dark) after React 19 / Next 16: inline theme script in `_document` still runs before hydration, no flash. Check in Task 3.
- Page transitions (`AnimatePresence`) between routes still fade out then in, and scroll restores. Check in Task 3.
- Article pages: MDX renders, code blocks highlighted, OG image generated into `public/og/`. Check in Task 3.
- 3D scenes under reduced motion (`prefers-reduced-motion`) still render a static frame. Check in Task 4.
- Old article URL with apostrophe/spaces redirects to new slug on Netlify (can only be verified after deploy; note in final report). Task 5.

---

### Task 1: Branch and dead-weight removal

**Files:**
- Delete: `build/`, `functions/`, `.storybook/`, `src/**/*.stories.js`, `scripts/draco-storybook.js`, `.DS_Store`
- Modify: `package.json` (remove deps + storybook scripts), `jsconfig.json` (drop `.storybook/StoryContainer.js` from `include`), `.gitignore` (add `.DS_Store`)

- [ ] **Step 1:** `git switch -c chore/dependency-upgrade`
- [ ] **Step 2:** Delete the files above; remove from `package.json`: `@react-three/fiber`, `react-three-fiber`, `@react-spring/three`, `@react-three/postprocessing`, `react-intersection-observer`, every `@storybook/*`, `storybook`, `storybook-addon-next`, and scripts `build:storybook`, `deploy:storybook`, `storybook`.
- [ ] **Step 3:** `grep -rn "stories\|storybook\|react-three\|react-spring\|intersection-observer" src scripts package.json` — Expected: no matches.
- [ ] **Step 4:** Commit `chore: remove unused deps, storybook 6, stale build and functions`.

### Task 2: Framework upgrade (Next 16, React 19, tooling)

**Files:**
- Modify: `package.json`, `package-lock.json`, `next.config.js`
- Create: `eslint.config.mjs`; Delete: `.eslintrc`
- Modify: `.stylelintrc`, `.prettierrc` only if new majors reject them

- [ ] **Step 1:** `npm install next@latest react@latest react-dom@latest framer-motion@latest mdx-bundler@latest puppeteer@latest gsap@latest @gsap/react@latest three-stdlib@latest` and dev: `eslint@latest eslint-config-next@latest @mapbox/rehype-prism@latest @svgr/webpack@latest esbuild@latest fs-extra@latest globby@latest postcss@latest postcss-flexbugs-fixes@latest postcss-preset-env@latest prettier@latest reading-time@latest rehype-img-size@latest rehype-preset-minify@latest rehype-slug@latest stylelint@latest stylelint-config-standard@latest stylelint-config-css-modules@latest`. Drop `stylelint-config-prettier` (obsolete since stylelint 15). Keep `.npmrc legacy-peer-deps` only if install fails without it.
- [ ] **Step 2:** `package.json` scripts: `dev` → `next dev --webpack`, `build` → `next build --webpack`, add `lint` → `eslint src scripts`. `engines.node` → `>=20.9`, `engines.npm` → `>=10`.
- [ ] **Step 3:** `eslint.config.mjs` using `eslint-config-next` flat export (`core-web-vitals`), carrying over the current rules from `.eslintrc` (`semi: error`, `no-unused-vars: warn`, the four `off` rules).
- [ ] **Step 4:** `postcss.config.js`: if `postcss-preset-env` 11 drops `custom-media-queries.importFrom`, move the `@custom-media` definitions so every CSS file that uses them still resolves (check with build output).
- [ ] **Step 5:** Run `npm run build` — Expected: fails with the Next 16 breakages; fix only what it reports (Task 3).

### Task 3: Fix framework breakages

**Files (expected, confirm against build/console output):**
- Modify: `src/components/Button/Button.js:22`, `src/components/Link/Link.js:20`, `src/components/Navbar/Navbar.js`, `src/layouts/Home/Intro.js`, `src/layouts/Post/Post.js`, `src/pages/articles/Articles.js` — `RouterLink` renders the anchor itself: move `className`/handlers/`aria-*` from the child `<a>` onto `RouterLink`, remove `passHref` and child `<a>`.
- Modify: `src/pages/_app.page.js:62` — `AnimatePresence exitBeforeEnter` → `mode="wait"`.
- Modify: `src/pages/articles/[slug].page.js`, `scripts/generate-sitemap.js` — adjust to mdx-bundler 10 API if build reports it.
- Modify: `src/pages/articles/og-image.js` — puppeteer launch option `headless: true` stays valid; fix if API errors.
- Modify: any file React 19 rejects (string refs, `defaultProps` on function components, `forwardRef` warnings are OK to leave).

- [ ] **Step 1:** Apply the edits above.
- [ ] **Step 2:** `npm run build` — Expected: `✓ Compiled` and every route listed, no errors.
- [ ] **Step 3:** `npm run lint` — Expected: 0 errors (warnings allowed).
- [ ] **Step 4:** `npm run dev`, open in browser pane: home, `/projects/campushub`, `/projects/github`, `/articles`, one article, `/contact`, `/about_me`, `/stack`, 404. Expected: no console errors; nav links work; theme toggle works without flash; route transition fades.
- [ ] **Step 5:** Commit `chore: upgrade to Next 16, React 19 and current tooling`.

### Task 4: three.js upgrade

**Files:**
- Modify: `src/components/Model/Model.js:28,102-103,372`, `src/components/Carousel/Carousel.js:15,106`, `src/layouts/Home/DisplacementSphere.js:18,64,72-…`, `scripts/draco.js`

- [ ] **Step 1:** `npm install three@latest`
- [ ] **Step 2:** Replace `sRGBEncoding` → `SRGBColorSpace`, `texture.encoding =` → `texture.colorSpace =`, `renderer.outputEncoding =` → `renderer.outputColorSpace =`; delete `physicallyCorrectLights` line.
- [ ] **Step 3:** `scripts/draco.js` source path → `node_modules/three/examples/jsm/libs/draco/gltf/` (confirm folder exists after install).
- [ ] **Step 4:** Check every chunk name used in `onBeforeCompile` string replaces (`DisplacementSphere.js`, `Model.js`) still exists in `node_modules/three/src/renderers/shaders/ShaderChunk/` and `ShaderLib/`; fix renamed ones.
- [ ] **Step 5:** `npm run build` — Expected: passes; `public/draco/draco_decoder.wasm` exists.
- [ ] **Step 6:** Dev server + browser pane, side by side with `https://ev1shoaib.netlify.app`: home sphere, laptop/phone models, carousel on project pages. Multiply light intensities (new physical lighting model) until brightness matches live site. Also check with reduced motion emulated.
- [ ] **Step 7:** Commit `chore: upgrade three.js to latest`.

### Task 5: Bug fixes

**Files:**
- Modify: `src/layouts/Home/Home.js`, `src/pages/projects/campushub/CampusHub.js`
- Create: `src/assets/campushub/*-placeholder.jpg` (one per screenshot used)
- Rename: `src/posts/DeepSeek's Disruptive Influence on the American Ec.mdx` → `src/posts/deepseek-american-economy.mdx`
- Modify: `public/_redirects`

- [ ] **Step 1:** `Home.js`: `"Comming Soon"` → `"Coming Soon"`; `title="Relive"` → `title="Relieve"`; section-observer `useEffect` dependency array `[visibleSections]` → `[]` and drop the `visibleSections.includes` guard (unobserve already prevents repeats).
- [ ] **Step 2:** Generate placeholders: one-off script in the scratchpad (not committed) using installed puppeteer to render each CampusHub PNG at ~40px wide, JPEG quality 60, saved as `<name>-placeholder.jpg`. Point the `*Placeholder` imports in `Home.js` and `CampusHub.js` at them.
- [ ] **Step 3:** `git mv` the post; add to `public/_redirects`:
  `/articles/DeepSeek's%20Disruptive%20Influence%20on%20the%20American%20Ec  /articles/deepseek-american-economy  301!` plus the trailing-slash variant.
- [ ] **Step 4:** `npm run build` — Expected: route `/articles/deepseek-american-economy` listed; `public/sitemap.xml` contains it.
- [ ] **Step 5:** Browser pane: home shows "Coming Soon" and "Relieve"; CampusHub images blur-up then sharpen; scrolling reveals each section once.
- [ ] **Step 6:** Commit `fix: home page copy, observer effect, campushub placeholders, post slug`.

### Task 6: Final check

- [ ] **Step 1:** `npm audit` — record counts (expect large drop from 138).
- [ ] **Step 2:** `npm outdated` — Expected: empty, or only items with a stated reason.
- [ ] **Step 3:** README: Node `20.9+`, npm `10+`. Commit `docs: update node requirement`.
