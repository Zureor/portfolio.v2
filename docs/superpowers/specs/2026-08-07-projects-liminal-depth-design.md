# Projects refresh: liminal page, InvenTrack entry, scroll-driven 3D parallax

Date: 2026-08-07
Status: approved, not yet implemented

## Problem

Three things, one branch:

1. Two new projects need a home on the site: **liminal** (a Python library that
   calibrates LLM judges with Item Response Theory) and **InvenTrack** (a Django
   REST + React inventory system).
2. Neither has a screenshot anywhere in the repo or on the machine. Every
   existing project page on this site is built on paired screenshots, so the
   established layout has nothing to render.
3. The site needs a 3D parallax that responds to **scroll**. The existing
   `Motion` components cover flat-on-scroll (`Parallax`) and 3D-on-hover
   (`Tilt`), but nothing does 3D on scroll.

SEU CampusHub already has a dedicated page at `/projects/campushub` and is the
first feature on the homepage, so the supplied description for it is not a
request for a new page. It stays as-is.

## Decisions taken before design

Both settled with the user up front:

- **Placement.** liminal gets its own dedicated page. InvenTrack becomes an
  entry on the existing Other Projects page. CampusHub is untouched.
- **Visuals.** liminal is built from type and hand-authored SVG, no screenshots
  (it is a library with no UI, so a screenshot would be fabricated). InvenTrack
  waits on real dashboard screenshots from the user.

## Scope

### In

- New `Depth` component in `components/Motion`.
- New page at `/projects/liminal`.
- InvenTrack entry on `/projects/github`, copy and layout only.
- A link into `/projects/liminal` from the Other Projects page.

### Out

- CampusHub, Zahoor, the homepage, and the five existing Other Projects entries.
- Wiring InvenTrack's images. Blocked on assets that do not exist yet.
- Any change to `Parallax`, `Tilt`, `Reveal`, `Magnetic`, or `Spotlight`.

## Component: `Depth`

### Purpose

Scroll-driven parallax in a real perspective space. Descendants sit at different
Z depths, so as the container passes through the viewport the near layers travel
further than the far ones and visibly separate. This is what distinguishes it
from `Parallax`, which slides a whole block as one flat plane.

### Interface

```jsx
<Depth perspective={1200} minWidth={1040} scrub={0.6} travel={80}>
  <div data-depth="-60">recedes</div>
  <div data-depth="80">advances</div>
</Depth>
```

| Prop | Default | Meaning |
|---|---|---|
| `perspective` | `1200` | Viewing distance in px. Lower exaggerates depth. |
| `minWidth` | `1040` | Below this the effect does not run at all. |
| `scrub` | `0.6` | ScrollTrigger scrub smoothing, in seconds. |
| `travel` | `80` | Y offset in px applied at full depth, scaled per layer. |
| `as` | `'div'` | Rendered element. |

`data-depth` is read from each descendant, in px, signed. Positive advances
toward the viewer, negative recedes. It is deliberately the **same attribute
`Tilt` already reads**, so a block can be wrapped in both and get depth on
scroll plus tilt on hover from one set of markup.

### Behaviour

- One `ScrollTrigger` for the whole container, scrubbed, driving a timeline that
  moves every layer. Not one trigger per layer.
- Layers start at `z: 0` when the container's top hits the viewport bottom, and
  reach their full `data-depth` and proportional Y offset when its bottom hits
  the viewport top.
- Y offset per layer is `travel * (depth / maxDepth)`, where `maxDepth` is the
  largest absolute `data-depth` among the layers in that container. The layer
  furthest from rest therefore gets the full `travel` and the others scale down
  from it, keeping their signs. This is what makes the separation legible; Z
  alone reads as a size change rather than as movement.

### Constraints and failure modes

The 3D space collapses if any element between `Depth` and a `data-depth` layer
does one of:

- sets `overflow` to anything but `visible`
- sets `opacity` below 1
- fails to carry `transform-style: preserve-3d`
- applies its own `filter` or `transform` that creates a stacking context

This is the same trap that flattened `Spotlight` last session, which is why
`.spotlight` carries `transform-style: preserve-3d` and no `overflow`. The
`Depth` CSS must set `preserve-3d` on both the container and the layer wrapper,
and the page CSS must not add `overflow: hidden` to any section that wraps one.

### Accessibility and performance

- Gated on `(prefers-reduced-motion: no-preference)` **and** the `minWidth`
  prop, composed into a single query string the way `Parallax` already does it.
- No initial hidden state is set outside the matchMedia block, so with motion
  off or JS unavailable the content renders plainly at rest.
- `force3D: true` and `invalidateOnRefresh: true` on the timeline.
- `will-change: transform` on the layer wrapper only, not on every layer.
- `mm.revert()` on unmount; any tween created after the context runs is killed
  explicitly, as in `Magnetic` and `Tilt`.

## Page: `/projects/liminal`

Files: `src/pages/projects/liminal/{Liminal.js,Liminal.module.css,index.page.js}`,
following the existing `campushub` / `zahoor` / `github` structure.

### Content

Every figure below comes from the user's own project description file. Nothing
is invented, estimated, or rounded.

| Section | Content |
|---|---|
| Header | Title, one-line description, source link, roles: Statistical Modeling / Python Library / Research Tooling |
| The problem | A naive LLM judge agrees with human experts at κ ≈ 0.3 on SummEval, and rankings derived from it are unstable. Set as a pull stat. |
| The model | The GRM formula `P(rating_ij ≥ k) = σ(a_j(θ_i − β_j + γ_j·z_i − τ_jk))` set in type, with a ledger for θ, β, a, γ, z, τ. |
| Figure | Hand-authored SVG: rating curves for a harsh and a lenient judge against latent quality, showing what severity does to the same underlying item. |
| Estimation | JAX autodiff, marginal maximum likelihood over 20-node Gauss-Hermite quadrature, L-BFGS-B, and the four identifiability constraints. |
| Reproducibility | SHA-256 content-addressed cache keyed on provider, model, prompt, temperature, max_tokens. |
| Validation | 59 unit tests. Item quality recovery Spearman ρ > 0.70 at 5 judges / 400 items. Judge severity ρ > 0.9 at 4 judges / 600 items. Krippendorff α agrees with the reference package to 1e-9. |
| Status | What is complete vs on the roadmap, stated as such and not as a progress bar. |
| Close | Source link. |

### Visual approach

No `ProjectBackground` video, because there is no footage and the existing ones
are borrowed stock. The page opens on type. The one figure is the SVG, and it is
where `Depth` is used: axis, curves, and annotations sit on separate planes and
separate as the section scrolls. Motion is motivated by the content there rather
than applied for decoration.

Accent stays on `--rgbPrimary`, not `--rgbAccent`. `--rgbAccent` is cyan in both
themes and fails contrast on the light theme's `#F2F2F2`, which is the bug that
had to be fixed across 13 declarations on the About page last session.

Section reveal uses the `&:global { animation: fadeIn ... }` idiom. A bare
`animation: fadeIn` in a CSS module gets its keyframe identifier scoped by
css-loader and silently never matches the global keyframe, leaving the section
stuck at `opacity: 0`.

## Entry: InvenTrack on `/projects/github`

A `ProjectSection` in the established two-column form, matching its neighbours.

Copy covers: Django 5 + DRF backend with JWT auth against PostgreSQL, React 18 +
Vite frontend, and the part worth naming — stock movements write through to
product quantity atomically in `perform_create`, so the audit trail and the
on-hand count cannot drift apart. Source link to the repo.

Image slots are **not wired**. A Next `Image` import pointing at a file that does
not exist fails the build, so the entry ships text-only. When the user supplies
`src/assets/projects/inventrack-dashboard.png` and
`src/assets/projects/inventrack-products.png`, wiring them is a five-line change
mirroring the Monty Expense Tracker entry directly above it.

## Route into liminal

The Other Projects page gets a featured card at the top linking to
`/projects/liminal`.

The homepage was considered and rejected: its `ProjectSummary` slots render a 3D
laptop or phone model that requires a screenshot texture, which liminal does not
have. Adding it there would mean inventing one.

## Verification

Claims of completion require evidence, per the same standard applied last
session:

1. `npm run build` compiles. The articles' puppeteer OG-image step already fails
   in this environment for unrelated reasons and is not a regression.
2. Both pages render in a browser at desktop, tablet, and mobile widths.
3. Both themes checked. Light theme is where the accent-token bug appears.
4. `Depth` verified as genuinely 3D by reading a layer's computed transform via
   `DOMMatrixReadOnly` and confirming a non-zero `m43`, not by eyeballing it. A
   flat yPercent shift looked like parallax last session and was not.
5. Reduced-motion and narrow-viewport paths confirmed to render content at rest
   rather than invisible.
6. Frame timing sampled over a scroll pass; no frame over 32 ms.

## Risks

| Risk | Mitigation |
|---|---|
| 3D space silently flattens | Verify `m43` numerically, not visually. Audit ancestors for `overflow`, `opacity`, `filter`. |
| Perceived lag, as reported last session | One trigger per container, `force3D`, `will-change` on the wrapper only, effect off below `minWidth`. |
| Light-theme contrast | `--rgbPrimary` throughout, checked in both themes. |
| Section stuck invisible | Use the `&:global` keyframe idiom. |
| `next build` clobbers a running dev server's `.next` | Stop the dev server before building. This bit repeatedly last session. |
