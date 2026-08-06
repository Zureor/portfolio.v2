# Projects refresh: liminal page, InvenTrack entry, scroll-driven 3D parallax — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/projects/liminal` page and an InvenTrack entry to the Other Projects page, and introduce a `Depth` component that produces real 3D parallax driven by scroll.

**Architecture:** `Depth` is a new sibling of the existing `Motion` components. It wraps children in a CSS `perspective` container and scrubs each `data-depth` descendant's `z` and `y` from a single ScrollTrigger, so layers at different depths separate as the container crosses the viewport. The liminal page is built from type and one hand-authored SVG rather than screenshots, because liminal is a library with no UI. The InvenTrack entry follows the two-column pattern already used five times on the Other Projects page.

**Tech Stack:** Next.js 12 (pages dir, `pageExtensions: ['page.js','api.js']`), React 18, CSS Modules with postcss-preset-env nesting, GSAP 3.15 with `@gsap/react` 2.1.2 and ScrollTrigger.

## Global Constraints

- **No test runner exists.** `package.json` declares `"test": "echo 'write some tests'"` and there are no test files in `src/`. Verification in this plan is `next lint`, `next build`, and browser probes run against the dev server. Do not add a test framework; that is out of scope.
- **Stop the dev server before running `next build`.** Both write to `.next`, and a build while `next dev` is running corrupts the running server with `Cannot find module './664.js'`. Recovery is `rm -rf .next` and restart.
- **Use `--rgbPrimary`, never `--rgbAccent`, for text and borders.** `--rgbAccent` is cyan `0 229 255` in *both* themes and fails contrast against the light theme's background. The site's own `Button` and `Link` use `--rgbPrimary`. `--rgbAccent` is acceptable only inside a low-opacity decorative gradient, as in `Motion.module.css`'s `.spotlightGlow`.
- **Section fade-in must use the `&:global` idiom.** A bare `animation: fadeIn ...` inside a CSS module has its keyframe identifier scoped by css-loader and never matches the global `fadeIn` in `global.css`, leaving the section stuck at `opacity: 0`. Always write it as `&:global { animation: fadeIn var(--durationXL) ease 400ms forwards; }`.
- **Keep every `ProjectSectionContent` at the default `width="l"`.** `.sectionInner` uses `align-items: center`, so a `width="xl"` block sits ~50px left of its `width="l"` neighbours. That is the desktop alignment defect already fixed once on the Stack and About pages.
- **3D space flattens** if any element between `Depth` and a `data-depth` layer sets `overflow` to anything but `visible`, sets `opacity` below 1, applies a `filter`, or omits `transform-style: preserve-3d`.
- **`data-depth` only ever goes on an HTML element, never on an SVG `<g>`, `<path>`, or `<text>`.** SVG child elements do not render 3D transforms — a `translateZ` on them is silently dropped by every major browser, and the layer comes out flat with no error to notice. To give a drawing depth, split it into stacked, absolutely-positioned `div`s that each hold their own `<svg>`.
- **Exact figures only.** Every number and claim on the liminal page comes from `/Users/evanahmedshoaib/Downloads/liminal-Project-Description.md`. Do not round, estimate, extrapolate, or invent metrics. No progress bars, no completion percentages.
- **Commit after every task.** End commit messages with `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/components/Motion/Motion.js` | Modify: add `Depth` alongside the existing five components. |
| `src/components/Motion/Motion.module.css` | Modify: add `.depth` and `.depthInner`. |
| `src/pages/projects/liminal/index.page.js` | Create: route entry point. |
| `src/pages/projects/liminal/Liminal.js` | Create: page content. |
| `src/pages/projects/liminal/Liminal.module.css` | Create: page styles. |
| `src/pages/projects/github/github.js` | Modify: featured liminal card, InvenTrack entry. |
| `src/pages/projects/github/github.module.css` | Modify: styles for the featured card. |

`Depth` goes in the existing `Motion.js` rather than a new file: it is one more member of a set that already shares `motionQuery`, `hoverQuery`, and the same matchMedia teardown shape, and splitting it out would duplicate that preamble.

---

## Task 1: `Depth` component

**Files:**
- Modify: `src/components/Motion/Motion.js` (append after `Tilt`, before `Spotlight`)
- Modify: `src/components/Motion/Motion.module.css` (append)

**Interfaces:**
- Consumes: `motionQuery`, `classes`, `cssProps`, `useGSAP`, `gsap`, `ScrollTrigger` — all already imported at the top of `Motion.js`.
- Produces: `Depth`, exported through the existing `src/components/Motion/index.js` barrel (`export * from './Motion'`, no change needed). Props: `as`, `perspective`, `minWidth`, `scrub`, `travel`, `className`, `children`. Reads `data-depth` (signed integer, px) from descendants.

- [ ] **Step 1: Confirm `Depth` does not yet exist**

Run:
```bash
grep -c "export const Depth" src/components/Motion/Motion.js
```
Expected: `0`

- [ ] **Step 2: Add the CSS**

Append to `src/components/Motion/Motion.module.css`:

```css
.depth {
  perspective: var(--perspective, 1200px);
}

/* Holds the 3D context for the layers. `overflow`, `opacity` below 1, and
   `filter` all flatten it, so none of them belong here or on any ancestor
   between this and a `data-depth` layer. */
.depthInner {
  transform-style: preserve-3d;
  will-change: transform;
}
```

- [ ] **Step 3: Add the component**

Insert into `src/components/Motion/Motion.js`, after the closing `};` of `Tilt` and before the `Spotlight` doc comment:

```jsx
/**
 * Scroll-driven 3D parallax. Descendants carrying `data-depth` sit at different
 * Z offsets and travel different distances as the container crosses the
 * viewport, so they pull apart from each other instead of sliding as one plane.
 * That separation is the difference between this and `Parallax`, which moves a
 * whole block flat.
 *
 * Reads the same `data-depth` attribute as `Tilt`, so a block wrapped in both
 * gets depth on scroll and tilt on hover out of one set of markup.
 *
 * Everything between this and a `data-depth` layer must keep
 * `transform-style: preserve-3d` and avoid `overflow`, `opacity` below 1, and
 * `filter`. Each of those flattens the 3D space and collapses the effect to a
 * plain vertical slide.
 */
export const Depth = ({
  as: Component = 'div',
  perspective = 1200,
  minWidth = 1040,
  scrub = 0.6,
  travel = 80,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const innerRef = useRef(null);

  // Depth separation between layers is meaningless once a narrow viewport has
  // stacked them, and the offsets just read as uneven gaps.
  const query = `${motionQuery} and (min-width: ${minWidth}px)`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(query, () => {
        const layers = gsap.utils.toArray(
          innerRef.current.querySelectorAll('[data-depth]')
        );

        if (!layers.length) return;

        const depths = layers.map(layer => Number(layer.dataset.depth) || 0);
        const maxDepth = Math.max(...depths.map(Math.abs));

        if (!maxDepth) return;

        // One trigger for the container rather than one per layer. Per-layer
        // triggers multiply the work done on every scroll by the layer count
        // and buy nothing, since they would all share these bounds anyway.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        });

        layers.forEach((layer, index) => {
          const depth = depths[index];

          timeline.fromTo(
            layer,
            { z: 0, y: 0 },
            {
              z: depth,
              // Z on its own reads as a size change rather than as movement.
              // Pairing it with a proportional Y offset is what makes the
              // layers look like they are passing each other.
              y: travel * (depth / maxDepth),
              ease: 'none',
              force3D: true,
            },
            0
          );
        });

        return () => {
          // The timeline is created inside the matchMedia callback, so its
          // ScrollTrigger has to be killed explicitly rather than left to
          // revert().
          timeline.scrollTrigger?.kill();
          timeline.kill();
          gsap.set(layers, { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [query, scrub, travel] }
  );

  return (
    <Component
      className={classes(styles.depth, className)}
      style={cssProps({ perspective })}
      ref={ref}
      {...rest}
    >
      <div className={styles.depthInner} ref={innerRef}>
        {children}
      </div>
    </Component>
  );
};
```

- [ ] **Step 4: Verify it lints and compiles**

Run:
```bash
npx next lint --dir src && npx stylelint "src/components/Motion/*.css"
```
Expected: no errors. `next lint` prints `No ESLint warnings or errors`; stylelint prints nothing.

- [ ] **Step 5: Commit**

```bash
git add src/components/Motion/Motion.js src/components/Motion/Motion.module.css
git commit -m "$(cat <<'EOF'
feat: add Depth component for scroll-driven 3D parallax

The existing Motion set covers flat-on-scroll (Parallax) and 3D-on-hover
(Tilt) but had nothing that produces depth as you scroll. Depth scrubs each
data-depth descendant's z and y from a single container-level ScrollTrigger,
so layers at different depths separate rather than sliding as one plane.

Pairs a proportional Y offset with the Z change deliberately: Z alone reads
as a size change, not as movement.

Reuses Tilt's data-depth attribute so one block can take both effects.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: liminal page skeleton and route

**Files:**
- Create: `src/pages/projects/liminal/index.page.js`
- Create: `src/pages/projects/liminal/Liminal.js`
- Create: `src/pages/projects/liminal/Liminal.module.css`

**Interfaces:**
- Consumes: `ProjectContainer`, `ProjectHeader`, `ProjectSection`, `ProjectSectionContent`, `ProjectSectionHeading`, `ProjectSectionText`, `ProjectTextRow` from `layouts/Project`; `Meta`, `Footer`, `Button` from `components/*`.
- Produces: the route `/projects/liminal`, and `styles.liminal`, `styles.section`, `styles.stat`, `styles.statFigure`, `styles.statCopy` in `Liminal.module.css` for later tasks.

Note: no `ProjectBackground`. The other project pages use borrowed stock footage; liminal has none, and inventing one would be dishonest. The page opens on type.

- [ ] **Step 1: Confirm the route does not resolve yet**

Start the dev server if it is not already running, then run:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects/liminal/
```
Expected: `404`

- [ ] **Step 2: Create the route entry point**

`src/pages/projects/liminal/index.page.js`:

```js
export { Liminal as default } from './Liminal';
```

- [ ] **Step 3: Create the page**

`src/pages/projects/liminal/Liminal.js`:

```jsx
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Liminal.module.css';

const title = 'liminal';
const description =
  'A Python library that calibrates LLM judges against human labels using Item Response Theory, treating each judge as a measured instrument rather than an oracle.';
const roles = ['Statistical Modeling', 'Python Library', 'Research Tooling'];
const repoUrl = 'https://github.com/Zureor/liminal';

export const Liminal = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.liminal}>
        <ProjectHeader
          title={title}
          description={description}
          url={repoUrl}
          linkLabel="View source"
          roles={roles}
        />
        <ProjectSection className={styles.section} padding="top">
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>The measurement problem</ProjectSectionHeading>
              <ProjectSectionText>
                LLM-as-judge is how most teams evaluate chatbots, summarizers and
                RAG pipelines. The trouble is that a judge is a biased
                instrument: it rewards verbosity, drifts from human taste, and
                disagrees with other judges. Most eval tooling reads its scores
                as ground truth anyway.
              </ProjectSectionText>
              <div className={styles.stat}>
                <p className={styles.statFigure}>&#954; &#8776; 0.3</p>
                <p className={styles.statCopy}>
                  Agreement between a naive LLM judge and human experts on
                  SummEval. Model rankings derived from that judge are unstable.
                </p>
              </div>
              <ProjectSectionText>
                liminal fits a statistical model of the judges instead, so the
                output separates who is harsh, who is noisy, and what quality
                actually looks like underneath.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Close</ProjectSectionHeading>
              <ProjectSectionText>
                <Button
                  secondary
                  iconHoverShift
                  icon="chevronRight"
                  href={repoUrl}
                >
                  View source
                </Button>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
```

The `Close` section is a placeholder anchor so the page has a valid end; Task 4 replaces its heading and adds the sections above it.

- [ ] **Step 4: Create the stylesheet**

`src/pages/projects/liminal/Liminal.module.css`:

```css
.liminal {
  --hairline: rgb(var(--rgbText) / 0.12);
  --hairlineSoft: rgb(var(--rgbText) / 0.07);
}

.section {
  opacity: 0;

  /* css-loader scopes keyframe identifiers per module, so a bare
     `animation: fadeIn` would never match the global keyframe and the section
     would stay invisible. */
  &:global {
    animation: fadeIn var(--durationXL) ease 400ms forwards;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  gap: var(--spaceS);
  margin: var(--spaceXL) 0;
  padding-left: var(--spaceL);
  border-left: 2px solid rgb(var(--rgbPrimary));
}

.statFigure {
  margin: 0;
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  line-height: 1;
  color: var(--colorTextTitle);
}

.statCopy {
  margin: 0;
  max-width: 46ch;
  font-size: var(--fontSizeBodyS);
  line-height: var(--lineHeightBody);
  color: rgb(var(--rgbText) / 0.7);
}
```

- [ ] **Step 5: Verify the route now resolves and renders**

Run:
```bash
curl -s http://localhost:3000/projects/liminal/ | grep -c "measurement problem"
```
Expected: `1` or greater. If it returns `0`, the route compiled but the content did not render — check the dev server output for a module error.

- [ ] **Step 6: Verify the section is not stuck invisible**

With the dev server running, open `http://localhost:3000/projects/liminal/` in the browser pane and run:

```js
getComputedStyle(document.querySelector('[class*="section"]')).opacity
```
Expected: `"1"` after the 400ms delay. A value of `"0"` means the `&:global` keyframe idiom was not applied correctly.

- [ ] **Step 7: Commit**

```bash
git add src/pages/projects/liminal
git commit -m "$(cat <<'EOF'
feat: add liminal project page skeleton

Route, header and the opening section. Deliberately no ProjectBackground:
the other project pages use borrowed stock footage and liminal has none, so
the page opens on type instead of on an invented image.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: the model section and its 3D figure

This is the task that proves `Depth` works. The figure's axis, curves and annotations sit on separate planes and separate as the section scrolls.

**Files:**
- Modify: `src/pages/projects/liminal/Liminal.js`
- Modify: `src/pages/projects/liminal/Liminal.module.css`

**Interfaces:**
- Consumes: `Depth` from `components/Motion` (Task 1); `styles.section` (Task 2).
- Produces: `styles.formula`, `styles.ledger`, `styles.ledgerRow`, `styles.figure`, `styles.figureLayer`, `styles.figureSvg`, `styles.figureLabels`. Task 4 reuses `styles.ledger` and `styles.ledgerRow`.

**Depth layers must be HTML elements, not SVG groups.** SVG child elements do not render 3D transforms; a `translateZ` on a `<g>` is silently dropped in every major browser and the figure would come out flat. Each depth layer is therefore a `div` holding its own `svg`, stacked absolutely.

- [ ] **Step 1: Add the import**

In `src/pages/projects/liminal/Liminal.js`, add below the `components/Meta` import:

```js
import { Depth } from 'components/Motion';
```

- [ ] **Step 2: Add the section**

Insert into `Liminal.js` immediately before the `Close` section:

```jsx
        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>What the model says</ProjectSectionHeading>
              <ProjectSectionText>
                liminal fits a Graded Response Model, which treats a 1&ndash;5
                rating as an ordered category rather than a number to average.
                The probability that judge <em>j</em> rates item <em>i</em> at
                least <em>k</em> is:
              </ProjectSectionText>
              <p className={styles.formula}>
                P(rating<sub>ij</sub> &#8805; k) = &#963;( a<sub>j</sub> &#183;
                ( &#952;<sub>i</sub> &#8722; &#946;<sub>j</sub> +
                &#947;<sub>j</sub>&#183;z<sub>i</sub> &#8722;
                &#964;<sub>jk</sub> ) )
              </p>
              <dl className={styles.ledger}>
                <div className={styles.ledgerRow}>
                  <dt>&#952;<sub>i</sub></dt>
                  <dd>Latent true quality of item i, the thing you actually wanted to measure.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#946;<sub>j</sub></dt>
                  <dd>Severity of judge j. Higher means a harder grader.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>a<sub>j</sub></dt>
                  <dd>Discrimination of judge j. Higher means more reliable.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#947;<sub>j</sub></dt>
                  <dd>Length-bias coefficient. Positive means the judge rewards verbosity.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>z<sub>i</sub></dt>
                  <dd>Standardized log-length of item i, the covariate that carries the bias.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#964;<sub>jk</sub></dt>
                  <dd>Judge j&#8217;s k-th category threshold. Four of them for a five-point scale.</dd>
                </div>
              </dl>
              <ProjectSectionText>
                Separating &#947; from &#952; is what pulls &#8220;long&#8221;
                apart from &#8220;good&#8221;, which is the best-documented
                failure mode these judges have.
              </ProjectSectionText>
              <Depth className={styles.figure} perspective={1100} travel={70}>
                <div className={styles.figureLayer} data-depth="-40" aria-hidden="true">
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g stroke="rgb(var(--rgbText) / 0.25)" strokeWidth="1">
                      <line x1="40" y1="260" x2="580" y2="260" />
                      <line x1="40" y1="20" x2="40" y2="260" />
                    </g>
                  </svg>
                </div>
                <div
                  className={styles.figureLayer}
                  data-depth="30"
                  role="img"
                  aria-label="Two logistic response curves plotted against latent quality. The lenient judge's curve rises earlier than the harsh judge's, so the same item draws a different rating from each."
                >
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g fill="none" strokeWidth="2">
                      <path
                        d="M 40 240 L 110 240 C 165 240 175 40 230 40 L 580 40"
                        stroke="rgb(var(--rgbPrimary))"
                      />
                      <path
                        d="M 40 240 L 260 240 C 315 240 325 40 380 40 L 580 40"
                        stroke="rgb(var(--rgbText) / 0.45)"
                        strokeDasharray="6 5"
                      />
                    </g>
                  </svg>
                </div>
                <div className={styles.figureLayer} data-depth="70" aria-hidden="true">
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g className={styles.figureLabels} fill="rgb(var(--rgbText) / 0.7)">
                      <text x="240" y="32">lenient judge</text>
                      <text x="392" y="60">harsh judge</text>
                      <text x="40" y="284">latent quality &#952;</text>
                      <text x="470" y="284">P(rating &#8805; k)</text>
                    </g>
                  </svg>
                </div>
              </Depth>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
```

- [ ] **Step 3: Add the styles**

Append to `src/pages/projects/liminal/Liminal.module.css`:

```css
.formula {
  margin: var(--spaceL) 0;
  padding: var(--spaceL);
  border: 1px solid var(--hairline);
  font-family: var(--monoFontStack);
  font-size: var(--fontSizeBodyM);
  line-height: 1.6;
  color: var(--colorTextTitle);
  overflow-x: auto;
}

.ledger {
  margin: 0 0 var(--spaceXL);
  padding: 0;
}

.ledgerRow {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: var(--space2XL);
  padding: var(--spaceM) 0;
  align-items: baseline;

  & + & {
    border-top: 1px solid var(--hairlineSoft);
  }

  & dt {
    margin: 0;
    font-family: var(--monoFontStack);
    font-size: var(--fontSizeBodyM);
    color: rgb(var(--rgbPrimary));
  }

  & dd {
    margin: 0;
    font-size: var(--fontSizeBodyS);
    line-height: var(--lineHeightBody);
    color: rgb(var(--rgbText) / 0.75);
  }

  @media (--mediaMobile) {
    grid-template-columns: 1fr;
    gap: var(--spaceXS);
  }
}

/* No `overflow` and no `opacity` below 1 anywhere in here: both flatten the
   3D space that Depth sets up, which collapses the layer separation into a
   plain vertical slide.

   The layers are stacked absolutely rather than drawn as groups inside one
   SVG because SVG child elements do not render 3D transforms. A translateZ on
   a `<g>` is silently dropped by every major browser, so the depth has to be
   carried by HTML elements that each hold their own SVG. */
.figure {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  margin-top: var(--spaceXL);
}

.figureLayer {
  position: absolute;
  inset: 0;
}

.figureSvg {
  width: 100%;
  height: 100%;
  display: block;
}

.figureLabels {
  font-family: var(--monoFontStack);
  font-size: 13px;
}
```

- [ ] **Step 4: Verify the layers are genuinely in 3D**

This is the decisive check. A flat `yPercent` shift looks like parallax to the eye and is not; measure the matrix instead of trusting it.

With the dev server running, load `http://localhost:3000/projects/liminal/` at a viewport at least 1040px wide, scroll the figure to the middle of the viewport with real scroll input, then run:

```js
(() => {
  const layers = [...document.querySelectorAll('[data-depth]')];
  return layers.map(el => {
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { depth: el.dataset.depth, translateZ: m.m43, translateY: m.m42 };
  });
})()
```

Expected: three entries, each with a **non-zero `translateZ`** whose sign matches its `data-depth`, and a `translateY` that is non-zero and scales with depth. If every `translateZ` is `0`, the 3D space has been flattened — walk up the ancestors from the SVG looking for `overflow` other than `visible`, `opacity` below 1, a `filter`, or a missing `transform-style: preserve-3d`.

- [ ] **Step 5: Verify the effect is correctly disabled below the breakpoint**

Resize the viewport to 375px wide, reload, and run the same snippet.

Expected: every `translateZ` is `0` and the SVG renders at rest and fully visible. `Depth` sets no initial hidden state outside its matchMedia block, so nothing should be missing.

- [ ] **Step 6: Commit**

```bash
git add src/pages/projects/liminal
git commit -m "$(cat <<'EOF'
feat: add liminal model section with 3D scroll figure

Sets the Graded Response Model formula in type with a parameter ledger, and
adds a hand-authored SVG of two logistic response curves showing what judge
severity does to the same underlying item.

The figure is where Depth earns its place: axis, curves and annotations sit
on separate planes and pull apart as the section scrolls. Verified as real 3D
by reading a non-zero m43 off each layer's computed transform, not by eye.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: remaining liminal sections

**Files:**
- Modify: `src/pages/projects/liminal/Liminal.js`
- Modify: `src/pages/projects/liminal/Liminal.module.css`

**Interfaces:**
- Consumes: `styles.section`, `styles.ledger`, `styles.ledgerRow` (Tasks 2 and 3).
- Produces: `styles.statusGroup`, `styles.statusHeading`, `styles.statusList` — nothing later depends on these.

Every figure below is taken verbatim from the project description. Do not adjust any of them.

- [ ] **Step 1: Add the estimation and reproducibility sections**

Insert into `Liminal.js` after the model section and before `Close`:

```jsx
        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>How it is estimated</ProjectSectionHeading>
              <ProjectSectionText>
                Item quality is integrated out by marginal maximum likelihood
                over a 20-node Gauss&#8211;Hermite quadrature, and the judge
                parameters are optimized with L-BFGS-B. Gradients come from JAX
                autodiff. The IRT core is written from scratch rather than
                pulled from an existing package.
              </ProjectSectionText>
              <ProjectSectionText>
                Four identifiability constraints make the parameters mean
                something rather than merely fit: severities sum to zero,
                log-discriminations sum to zero, thresholds are centred per
                judge so severity is not double-counted, and thresholds are
                built from positive increments so they stay ordered.
              </ProjectSectionText>
              <ProjectSectionText>
                Item quality then comes back as a posterior mean by the same
                quadrature, with credible intervals approximated by sampling.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Reproducible by construction</ProjectSectionHeading>
              <ProjectSectionText>
                Every LLM response is content-addressed on a SHA-256 of the
                provider, model, prompt, temperature and token limit, then
                written to a sharded cache. A study reproduces exactly even
                after the underlying models have moved on, and re-running one
                costs nothing. Every source of randomness is seeded explicitly.
              </ProjectSectionText>
              <ProjectSectionText>
                One OpenAI-compatible client covers Groq, Cerebras, Gemini and
                OpenRouter, with bounded concurrency and exponential backoff
                with jitter on retryable status codes.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
```

- [ ] **Step 2: Add the validation section**

Insert after the reproducibility section:

```jsx
        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>What has been checked</ProjectSectionHeading>
              <dl className={styles.ledger}>
                <div className={styles.ledgerRow}>
                  <dt>59</dt>
                  <dd>Unit tests across core types, matrix, metrics, providers, judges and datasets.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#961; &gt; 0.70</dt>
                  <dd>Spearman correlation for recovered item quality ordering, at 5 judges and 400 items.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#961; &gt; 0.9</dt>
                  <dd>Spearman correlation for recovered judge severity, at 4 judges and 600 items.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>1e&#8722;9</dt>
                  <dd>Agreement between this Krippendorff &#945; implementation, written from first principles, and the reference package.</dd>
                </div>
              </dl>
              <ProjectSectionText>
                Recovery accuracy tracks the information ceiling rather than
                beating it, and adding judges strictly improves it. The
                benchmark is SummEval: 100 CNN/DailyMail articles across 16
                summarization systems, three expert annotators each.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
```

- [ ] **Step 3: Add the status section and replace the `Close` heading**

Insert after the validation section:

```jsx
        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Where it stands</ProjectSectionHeading>
              <div className={styles.statusGroup}>
                <div>
                  <h3 className={styles.statusHeading}>Working now</h3>
                  <ul className={styles.statusList}>
                    <li>Core types, rating matrix and posterior</li>
                    <li>SummEval loader for coherence and fluency</li>
                    <li>Cached provider layer with three free-tier judges</li>
                    <li>Krippendorff &#945; and Spearman &#961;</li>
                    <li>GRM estimator with parameter recovery tests</li>
                    <li>Rubric-driven async panel runner</li>
                  </ul>
                </div>
                <div>
                  <h3 className={styles.statusHeading}>Still ahead</h3>
                  <ul className={styles.statusList}>
                    <li>Mean-score baseline for comparison</li>
                    <li>The flagship SummEval experiment</li>
                    <li>Rank-flip analysis: how often calibration changes top-k</li>
                    <li>One-command reproduction</li>
                    <li>CLI</li>
                  </ul>
                </div>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
```

Then change the `Close` section's heading from `Close` to `Read the code`, and its body to:

```jsx
              <ProjectSectionText>
                Apache-2.0, built on free-tier models and a public benchmark so
                anyone can reproduce the result rather than take it on trust.
              </ProjectSectionText>
```

kept above the existing `Button`.

- [ ] **Step 4: Add the styles**

Append to `src/pages/projects/liminal/Liminal.module.css`:

```css
.statusGroup {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space2XL);
  margin-top: var(--spaceL);

  @media (--mediaMobile) {
    grid-template-columns: 1fr;
    gap: var(--spaceXL);
  }
}

.statusHeading {
  margin: 0 0 var(--spaceM);
  padding-bottom: var(--spaceS);
  border-bottom: 1px solid var(--hairline);
  font-family: var(--monoFontStack);
  font-size: var(--fontSizeBodyXS);
  font-weight: var(--fontWeightRegular);
  letter-spacing: 0.04em;
  color: rgb(var(--rgbPrimary));
}

.statusList {
  margin: 0;
  padding-left: var(--spaceL);
  display: flex;
  flex-direction: column;
  gap: var(--spaceS);
  font-size: var(--fontSizeBodyS);
  line-height: var(--lineHeightBody);
  color: rgb(var(--rgbText) / 0.75);
}
```

- [ ] **Step 5: Verify every section renders and none is stuck invisible**

Load the page and run:

```js
[...document.querySelectorAll('h2')].map(h => h.textContent)
```
Expected, in order: `The measurement problem`, `What the model says`, `How it is estimated`, `Reproducible by construction`, `What has been checked`, `Where it stands`, `Read the code`.

Then:
```js
[...document.querySelectorAll('section')].map(s => getComputedStyle(s).opacity)
```
Expected: every value `"1"`.

- [ ] **Step 6: Check the light theme**

Toggle the site's theme to light and confirm every heading, the formula block, the ledger terms and the status headings remain legible. Any element that vanishes or turns pale cyan is using `--rgbAccent` and must be switched to `--rgbPrimary`.

- [ ] **Step 7: Commit**

```bash
git add src/pages/projects/liminal
git commit -m "$(cat <<'EOF'
feat: complete liminal page with estimation, validation and status

Adds the estimation, reproducibility, validation and status sections. Every
figure is taken verbatim from the project's own description: 59 tests,
Spearman rho above 0.70 and 0.9 for the two recovery benchmarks, and
Krippendorff alpha agreeing with the reference package to 1e-9.

Status is stated as two plain lists rather than as a progress bar, since
there is no real completion percentage to report.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: route into liminal from the Other Projects page

Without this the page exists but nothing links to it.

**Files:**
- Modify: `src/pages/projects/github/github.js`
- Modify: `src/pages/projects/github/github.module.css`

**Interfaces:**
- Consumes: `Depth` from `components/Motion` (Task 1); the `/projects/liminal` route (Tasks 2&ndash;4).
- Produces: `styles.featuredSection`, `styles.featured`, `styles.featuredLabel`, `styles.featuredTitle`, `styles.featuredCopy`.

- [ ] **Step 1: Add the imports**

In `src/pages/projects/github/github.js`, add after the `components/Meta` import:

```js
import { Depth } from 'components/Motion';
```

- [ ] **Step 2: Add the featured card**

Insert immediately after the `<ProjectHeader ... />` element and before the first `<ProjectSection>`:

```jsx
        <ProjectSection className={styles.featuredSection} padding="top">
          <ProjectSectionContent>
            <Depth className={styles.featured} perspective={1100} travel={50}>
              <p className={styles.featuredLabel} data-depth="20">
                Currently building
              </p>
              <h2 className={styles.featuredTitle} data-depth="60">
                liminal
              </h2>
              <p className={styles.featuredCopy} data-depth="30">
                Calibrating LLM judges against human labels with Item Response
                Theory, so a judge&#8217;s severity and length bias can be
                separated from the quality it was supposed to be measuring.
              </p>
              <div data-depth="10">
                <Button
                  secondary
                  iconHoverShift
                  icon="chevronRight"
                  href="/projects/liminal"
                >
                  Read the write-up
                </Button>
              </div>
            </Depth>
          </ProjectSectionContent>
        </ProjectSection>
```

- [ ] **Step 3: Add the styles**

Append to `src/pages/projects/github/github.module.css`:

```css
.featuredSection {
  position: relative;
}

/* No `overflow` and no `opacity` below 1: both would flatten the 3D space
   Depth establishes and collapse the layers onto one plane. */
.featured {
  width: 100%;
  padding: var(--space2XL) 0;
  border-top: 1px solid rgb(var(--rgbText) / 0.12);
  border-bottom: 1px solid rgb(var(--rgbText) / 0.12);
}

.featuredLabel {
  margin: 0 0 var(--spaceM);
  font-family: var(--monoFontStack);
  font-size: var(--fontSizeBodyXS);
  letter-spacing: 0.04em;
  color: rgb(var(--rgbPrimary));
}

.featuredTitle {
  margin: 0 0 var(--spaceL);
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  line-height: 1;
  color: var(--colorTextTitle);
}

.featuredCopy {
  margin: 0 0 var(--spaceXL);
  max-width: 54ch;
  font-size: var(--fontSizeBodyM);
  line-height: var(--lineHeightBody);
  color: rgb(var(--rgbText) / 0.78);
}
```

- [ ] **Step 4: Verify the link resolves**

Load `http://localhost:3000/projects/github/`, click **Read the write-up**, and confirm the browser lands on `/projects/liminal/` with the liminal header visible. `Button` routes internal hrefs through `next/link`, so this is a client-side navigation with no full reload.

- [ ] **Step 5: Verify the card's layers are in 3D**

Scroll the card into the middle of the viewport at a width of at least 1040px, then run:

```js
[...document.querySelectorAll('[class*="featured"] [data-depth]')].map(el => ({
  depth: el.dataset.depth,
  translateZ: new DOMMatrixReadOnly(getComputedStyle(el).transform).m43,
}))
```
Expected: four entries, each `translateZ` non-zero, and the entry with `depth: "60"` showing the largest value.

- [ ] **Step 6: Commit**

```bash
git add src/pages/projects/github
git commit -m "$(cat <<'EOF'
feat: feature liminal at the top of the Other Projects page

The liminal page needed something linking to it. A homepage ProjectSummary
slot was the alternative and was rejected: those render a 3D laptop model
that needs a screenshot texture, and liminal has no UI to screenshot.

Card layers sit at four depths so they separate under Depth as the section
scrolls.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: InvenTrack entry

**Files:**
- Modify: `src/pages/projects/github/github.js`

**Interfaces:**
- Consumes: `ProjectSection`, `ProjectSectionContent`, `ProjectSectionHeading`, `ProjectSectionText`, `ProjectTextRow`, `Button` — all already imported in this file.
- Produces: nothing consumed later.

**Images are deliberately not wired.** A Next `Image` import pointing at a file that does not exist fails the build, and no InvenTrack screenshots exist in the repo or on the machine. The entry ships text-only and renders correctly that way; the Monty Expense Tracker entry directly above it already runs with a single image, so a text-only entry is not visually out of place. When screenshots arrive at `src/assets/projects/inventrack-dashboard.png` and `src/assets/projects/inventrack-products.png`, wiring them means copying the two-column `sidebarImages` block from the Monty entry.

- [ ] **Step 1: Add the section**

Insert into `src/pages/projects/github/github.js` after the Monty Expense Tracker `</ProjectSection>` and before the closing `</ProjectContainer>`:

```jsx
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>InvenTrack</ProjectSectionHeading>
              <ProjectSectionText>
                A full-stack inventory system for small and mid-sized
                businesses: product catalogue with SKUs and reorder levels,
                suppliers, purchase orders, and a dashboard that values the
                whole inventory and flags what is running low.
              </ProjectSectionText>
              <ProjectSectionText>
                The part worth naming is the stock ledger. Every movement in,
                out or as a correction writes through to the product&#8217;s
                on-hand count in the same operation that records it, so the
                audit trail and the quantity can never disagree with each
                other. Stock is clamped at zero rather than allowed to go
                negative.
              </ProjectSectionText>
              <ProjectSectionText>
                Django 5 and Django REST Framework on the back end with JWT
                auth against PostgreSQL, React 18 and Vite on the front, and an
                Axios interceptor that refreshes an expired token and retries
                the original request rather than bouncing the user to the login
                screen.
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                  secondary
                  iconHoverShift
                  icon="chevronRight"
                  href="https://github.com/Zureor/InvenTrack"
                >
                  View Source Code
                </Button>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
```

- [ ] **Step 2: Verify it renders in order**

Load `http://localhost:3000/projects/github/` and run:

```js
[...document.querySelectorAll('h2')].map(h => h.textContent)
```
Expected, in order: `liminal`, `University Library Management System`, `Student Dashboard`, `Portfolio Website`, `Perfume Sales Dashboard`, `Monty Expense Tracker`, `InvenTrack`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/github/github.js
git commit -m "$(cat <<'EOF'
feat: add InvenTrack to the Other Projects page

Text-only for now. No screenshots of it exist in the repo or on the machine,
and a Next Image import pointing at a missing file fails the build, so the
image slots stay unwired rather than shipping placeholders.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: full verification pass

No new code. This task exists because every claim of completion needs evidence behind it, and several of the defects fixed last session were only visible under conditions the happy path never hits.

**Files:** none modified.

- [ ] **Step 1: Lint everything**

```bash
npx next lint --dir src && npx stylelint "src/**/*.css"
```
Expected: no errors from either.

- [ ] **Step 2: Build**

Stop the dev server first.

```bash
rm -rf .next && npx next build
```
Expected: compiles successfully. The articles' puppeteer OG-image step fails in this environment because Chrome cannot launch; that is pre-existing and unrelated. Confirm the failure is that same step and not a compile error, and that no browserslist warning has reappeared.

- [ ] **Step 3: Check both pages at three widths**

Restart the dev server. For each of `/projects/liminal/` and `/projects/github/`, at 1280px, 768px and 375px, confirm no horizontal scrollbar on the body and no block sitting offset from its neighbours.

Alignment check, run at 1280px on each page:
```js
[...document.querySelectorAll('[class*="sectionContent"]')]
  .map(el => Math.round(el.getBoundingClientRect().left))
```
Expected: every value identical. Differing values mean a block escaped the shared max-width, which is the offset defect fixed on Stack and About last session.

- [ ] **Step 4: Check both themes**

Toggle light and dark on both pages. Every heading, ledger term, formula, status heading and label must stay legible in both. Pale cyan text on a light background means `--rgbAccent` slipped in somewhere.

- [ ] **Step 5: Check the reduced-motion path**

In the browser pane, emulate `prefers-reduced-motion: reduce`, reload `/projects/liminal/`, and run:

```js
[...document.querySelectorAll('[data-depth]')].map(el => ({
  opacity: getComputedStyle(el).opacity,
  transform: getComputedStyle(el).transform,
}))
```
Expected: every `opacity` is `"1"` and every `transform` is `"none"`. Anything at `opacity: 0` means a hidden initial state leaked outside a matchMedia block, which would leave the content permanently invisible for those users.

- [ ] **Step 6: Sample frame timing**

Lag was reported after the last motion work. Measure rather than assume. On `/projects/liminal/` at 1280px, run this, then scroll the full page during the sampling window:

```js
(() => {
  const frames = [];
  let last = performance.now();
  return new Promise(resolve => {
    const tick = now => {
      frames.push(now - last);
      last = now;
      if (frames.length < 240) requestAnimationFrame(tick);
      else resolve({
        median: frames.sort((a, b) => a - b)[120].toFixed(1),
        worst: Math.max(...frames).toFixed(1),
        over32ms: frames.filter(f => f > 32).length,
      });
    };
    requestAnimationFrame(tick);
  });
})()
```
Expected: `median` near 16.7 and `over32ms` at or near 0. If frames are dropping, check that only one ScrollTrigger exists per `Depth` container:
```js
ScrollTrigger.getAll().length
```

- [ ] **Step 7: Commit any fixes**

If steps 1&ndash;6 surfaced nothing, there is nothing to commit and the branch is done. If they surfaced defects, fix them, re-run the affected step, and commit with a message naming the specific defect and the evidence that it is resolved.

---

## Deferred, and why

- **InvenTrack screenshots.** Blocked on assets that do not exist. The entry ships text-only. Wiring is a five-line change once `src/assets/projects/inventrack-dashboard.png` and `src/assets/projects/inventrack-products.png` land.
- **SEU CampusHub.** Untouched by explicit decision. It already has a dedicated page and the first homepage feature; the supplied description was context, not a request for a third placement.
- **A homepage slot for liminal.** Rejected during design. `ProjectSummary` renders a 3D laptop or phone model that needs a screenshot texture, and liminal has no UI.
