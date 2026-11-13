# Dependency upgrade — design

## Why

The site no longer builds on current Node (Node 26: Next 12 crashes on removed `SlowBuffer`), and
`npm audit` reports 138 vulnerabilities (12 critical), mostly from Next 12. Goal: every package on
its current major, a passing `next build` on Node 26, and the site looking the same as today.

## Goals

- `next build` passes on Node 26.
- All kept dependencies on their latest major.
- Pages, animations and 3D scenes look and behave as they do on the live site.

## Non-goals

- No redesign, no content rewrite, no switch to the App Router.
- No new features or new dependencies beyond what the upgrades require.

## Anti-goals

- 3D models visibly darker/brighter or mis-coloured after the three.js bump.
- Deploy on Netlify broken by the change.

## Approaches considered

- **A: full upgrade, staged** (picked). Framework first, verify; then three.js, verify visually.
- **B: framework only.** Leaves three.js at 0.146; avoids lighting changes but stays 41 releases behind.
- **Pin Node 22 + minor bumps.** Smallest diff, keeps the critical vulnerabilities. Rejected.

## Design

### Stage 1 — framework

- Remove unused: `@react-three/fiber`, `react-three-fiber`, `@react-spring/three`,
  `@react-three/postprocessing`, `react-intersection-observer`.
- Remove Storybook 6 (all `@storybook/*`, `storybook`, `storybook-addon-next`, `.storybook/`,
  `*.stories.js`, storybook scripts, `scripts/draco-storybook.js`).
- Remove dead files: `functions/` (unused Lambda API; contact uses Formspree), `build/`
  (stale export; live site does not serve it), `.DS_Store`.
- Upgrade: `next` 16, `react`/`react-dom` 19, `framer-motion` latest, `mdx-bundler` 10,
  `puppeteer` latest, `eslint` 9 + `eslint-config-next` 16 (flat config), rehype plugins, `globby`,
  `fs-extra`, `@svgr/webpack`, `esbuild`, `postcss-preset-env`, `prettier` 3, stylelint stack.
- Build stays on webpack (`next build --webpack`, `next dev --webpack`) so the existing svg / glsl /
  asset rules in `next.config.js` keep working.
- Code fixes the upgrades force: `next/link` without child `<a>`, `AnimatePresence mode="wait"`,
  anything else the build or console reports.
- Bump `engines.node` to `>=20.9`.

### Stage 2 — three.js 0.146 → latest

- `sRGBEncoding` / `.encoding` / `outputEncoding` → `SRGBColorSpace` / `.colorSpace` / `outputColorSpace`.
- Drop `physicallyCorrectLights`; retune light intensities for the new default lighting model.
- Fix `onBeforeCompile` shader-chunk patches if chunk names changed.
- `scripts/draco.js`: copy from `three/examples/jsm/libs/draco/gltf/`.
- Compare home sphere, device models and carousel against the live site in the browser pane.

## Left to the builder

- Exact light-intensity values (tuned by eye against live site).
- Lint/stylelint rule fallout: fix real issues, relax rules only where the new presets are noisy.

### Stage 3 — bug fixes (added at user request)

- `Home.js`: "Comming Soon" → "Coming Soon"; title "Relive" → "Relieve" to match the description
  (builder's call — stress-relief app); section observer effect runs once instead of re-creating
  observers every time a section appears.
- CampusHub placeholders (home + project page): generate small blurred placeholder images instead
  of reusing the full-size PNGs, if an image tool is available locally; otherwise leave as is.
- Rename `DeepSeek's Disruptive Influence on the American Ec.mdx` → `deepseek-american-economy.mdx`
  and add a 301 in `public/_redirects` from the old URL.

## Out of scope (noted, not done)

- Zahoor uses Slice template screenshots on the home page and its project page. No Zahoor images
  exist in the repo; needs real screenshots from the owner.
