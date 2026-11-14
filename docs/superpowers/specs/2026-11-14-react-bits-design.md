# React Bits: Hyperspeed, DitherVeil, LogoLoop — design (short)

**Intent.** Replace three static pieces with React Bits components: the Other Projects video
background with **Hyperspeed**, the home "Details" photo with **DitherVeil**, and the About Me
skills chips with **LogoLoop** rows.

**Anti-goals.** No regression of the mobile speed work (home 60 / desktop 98); nothing that hides
content from reduced-motion or keyboard users; no broken page on browsers without WebGL.

## Approaches

- **A. Copy the components verbatim, import their CSS once in `_app.page.js` (picked).** Fewest
  edits, easy to re-sync with React Bits; ~5 KB of prefixed global CSS on every page.
- B. Convert each to CSS modules. Matches house style, but rewrites ~20 class names per component.

## Design

- **Files:** `src/components/Hyperspeed/{Hyperspeed.js,Hyperspeed.css,index.js}`, same for
  `DitherVeil` and `LogoLoop`, source as supplied. `'use client'` lines dropped (pages router).
  CSS imported in `_app.page.js`. New deps: `ogl` (DitherVeil), `react-icons` (LogoLoop icons).
- **Hyperspeed — `/projects/github`:** replaces `<ProjectBackground>` (video) with a fixed,
  full-viewport layer behind the header, loaded with `next/dynamic` (`ssr: false`). Colours keep
  the site's cyan accent for oncoming lights (`headColors`), the stock magenta/violet for tails,
  transparent background, `theme` follows the site theme. Phones (`media.mobile`): `density` 20,
  `glow` 0, `dust` 40. `interactive` off (the page has links/buttons on top; boost-on-hold would
  fight clicks). Reduced motion: the component already slows to 30 %; the static placeholder
  (`github.png`) stays as the fallback when WebGL is unavailable. The `coding_video.mp4` import is
  removed.
- **DitherVeil — home Profile photo:** replaces the `<Image>` of `profile.jpg` inside
  `.image`, keeping the katakana SVG. Duotone Floyd dither, `inkColor` = theme background,
  `paperColor` = theme text colour, `rimColor` = accent cyan, `rim` 0.15, `revealRadius` 160,
  `fit: 'cover'`, `src` = the local `profile.jpg`. Loaded with `next/dynamic` (`ssr: false`), the
  existing placeholder image shows until it mounts. Alt text moves to an `aria-label` on a
  `role="img"` wrapper.
- **LogoLoop — About Me skills:** the six skill groups become six loops stacked vertically, each
  with its group name as a small heading, alternating `direction` left/right, `labels: 'inline'`,
  `logoHeight` 22, `gap` 40, `hoverSpeed` 20, `fadeOut`. Each skill gets a `react-icons/si` brand
  icon where one exists (React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, Docker, Python,
  pandas, NumPy, C++, C#, JavaScript, HTML5, Power BI, Excel, scikit-learn, Git, Cisco, Photoshop,
  Lightroom, Cinema 4D, Unreal Engine, Canva…); skills without a logo show the name only. Reduced
  motion: LogoLoop already stops moving.

## Builder's calls

- Hyperspeed non-interactive; phone settings above; theme-following colours.
- One loop per skill group, alternating direction.
- Branch `feat/react-bits` from `feat/horizontal-projects`.
