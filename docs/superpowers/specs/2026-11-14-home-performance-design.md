# Home page performance — design (short)

**Why.** The home page is slow to load and laggy while scrolling (user report). Measured
(production, Lighthouse): phone 39 / desktop 60; DitherVeil alone costs ~2 s of blocked main
thread on phones. Up to seven WebGL canvases end up alive at once. Also a bug: arriving at
`/#details` sometimes lands near project 2.

**Goal.** Same look, far less work: at most ~2 live 3D canvases, nothing heavy before it's needed,
smaller textures. **Non-goal:** removing the 3D models, the sphere or Lenis.

## Approaches

- **A. Keep the look, make everything wait its turn (picked)** + compact the model textures.
- B. Replace the 3D models with flat screenshots. Biggest win, loses the signature look.
- C. A plus native scrolling (no Lenis) on home. Loses the glide.

## Design

1. **DitherVeil mounts near the viewport only.** In `Profile.js`, mount it (and fetch
   `profile.jpg`) when the Details section is within ~1 viewport (existing `useInViewport` hook);
   until then the existing placeholder image shows.
2. **Models live only while on screen.** In `ProjectSummary.js`, the model mounts while its section
   is in (or near) view and unmounts — disposing its WebGL scene — when it leaves; it re-mounts with
   its normal fade-in when it returns. Works for both the vertical stack and the horizontal track.
3. **Sphere lighter on phones, later on load.** `DisplacementSphere` mounts after the intro text
   has started (idle callback / short delay), and on phones renders at a lower pixel ratio (0.75).
4. **Compact textures.** Re-encode the five home textures to WebP: laptops 1280 + 2048 px wide,
   phones 640 + 1150 px, quality ~82; `Home.js` `srcSet` uses [small, large] so phones pick small.
   GLB files unchanged (already Draco, 56 KB + 27 KB).
5. **Details bug.** After the horizontal pin is created/refreshed, if the URL hash targets an element
   below the pin (`#details`), jump to it again so the inserted pin spacer is accounted for.
   `ScrollRestore` uses `getBoundingClientRect().top + scrollY` instead of `offsetTop`.

6. **Every image gets a very light placeholder** (user request, site-wide). Placeholders are tiny
   blurred JPEGs (≈32 px wide, ≤ 2 KB) generated from the real image, shown until the real one loads.
   Audit found these without a proper one:
   - Other Projects page: 8 images use the full image as their own "placeholder" (283 KB–1.9 MB
     PNGs, ~7.4 MB total) → real placeholders, and the images themselves re-encoded to WebP at
     display size (same treatment as item 4).
   - Home: the Other Projects laptop texture borrows Zahoor's placeholder → its own.
   - Articles: `ai.jpg` banner has no `-placeholder.jpg` (404) → add.
   - MDX inline images (`inspiration.png`): no placeholder → `PostImage` shows
     `<name>-placeholder.jpg` as a background until the image paints; add the file.
   Already fine: Carton Connect, CampusHub, Zahoor, Relive, profile photo, other banners.

**Done when:** Lighthouse home phone/desktop clearly above today's 39/60; no more than ~2 canvases
alive while scrolling; `/#details` from another page lands on Details every time.

## Builder's calls

- "Near view" = within one viewport height. Phone pixel ratio 0.75. WebP quality 82.
- Branch `perf/home` from `feat/react-bits`.
