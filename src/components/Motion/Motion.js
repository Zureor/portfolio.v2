import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { classes, cssProps } from 'utils/style';
import styles from './Motion.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Every effect in here is gated on `prefers-reduced-motion: no-preference`, and
 * the pointer-driven ones additionally on `pointer: fine`. Nothing sets an
 * initial hidden state outside those blocks, so with motion turned off (or with
 * JS unavailable) the content renders plainly instead of staying invisible.
 */
const motionQuery = '(prefers-reduced-motion: no-preference)';
const hoverQuery = `${motionQuery} and (pointer: fine)`;

/**
 * Reveals descendants matching `selector` as they scroll into view, batched so
 * items arriving together animate as one group rather than firing individually.
 */
export const Reveal = ({
  as: Component = 'div',
  selector = '[data-reveal-item]',
  y = 24,
  stagger = 0.08,
  start = 'top 88%',
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(motionQuery, () => {
        const items = gsap.utils.toArray(ref.current.querySelectorAll(selector));

        if (!items.length) return;

        gsap.set(items, { opacity: 0, y });

        ScrollTrigger.batch(items, {
          start,
          // A reveal only ever needs to happen once. Without this each item
          // leaves a live ScrollTrigger behind that keeps recalculating on
          // every scroll for the rest of the session.
          once: true,
          onEnter: batch =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger,
              ease: 'power2.out',
              overwrite: 'auto',
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [selector, y, stagger, start] }
  );

  return (
    <Component className={className} ref={ref} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Drifts its contents against the scroll so neighbouring blocks separate onto
 * different planes. `speed` is a yPercent offset across the full pass, so a
 * negative value rises and a positive value lags. Keep it small on anything
 * holding body copy: past roughly 10 the text visibly slides while you read it.
 */
export const Parallax = ({
  as: Component = 'div',
  speed = -8,
  scrub = 0.6,
  minWidth,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);

  // Differential parallax between blocks that sit side by side on desktop is
  // pointless once they stack, and the offsets just read as uneven gaps.
  const query = minWidth ? `${motionQuery} and (min-width: ${minWidth}px)` : motionQuery;

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(query, () => {
        gsap.to(ref.current, {
          yPercent: speed,
          ease: 'none',
          // Keeps the moving block on its own compositor layer. Without it the
          // browser repaints whatever is inside on every frame, which is
          // expensive when that content has gradient backgrounds.
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed, scrub, query] }
  );

  return (
    <Component className={className} ref={ref} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Leans its contents toward the cursor. Meant for a single primary action, not
 * for decorating every button on a page.
 */
export const Magnetic = ({ strength = 0.4, max = 16, className, children, ...rest }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(hoverQuery, () => {
        const element = ref.current;
        const pull = gsap.utils.clamp(-max, max);
        const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3' });

        // Cached on enter so pointermove never forces a layout read.
        let bounds = null;

        const enter = () => {
          bounds = element.getBoundingClientRect();
        };

        const move = event => {
          if (!bounds) bounds = element.getBoundingClientRect();
          xTo(pull((event.clientX - (bounds.left + bounds.width / 2)) * strength));
          yTo(pull((event.clientY - (bounds.top + bounds.height / 2)) * strength));
        };

        const leave = () => {
          bounds = null;
          xTo(0);
          yTo(0);
        };

        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', leave);

        return () => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointermove', move);
          element.removeEventListener('pointerleave', leave);

          // These tweens are created after the context runs, so revert() does
          // not know about them.
          gsap.killTweensOf(element);
          gsap.set(element, { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength, max] }
  );

  return (
    <div className={classes(styles.magnetic, className)} ref={ref} {...rest}>
      {children}
    </div>
  );
};

/**
 * True 3D parallax: the panel tilts under the cursor in a perspective space,
 * and any descendant carrying `data-depth` lifts toward the viewer by that many
 * pixels. Because the layers sit at different depths they slide past each other
 * as the panel turns, which is the parallax part.
 *
 * Every element between this and a `data-depth` layer must keep
 * `transform-style: preserve-3d` and avoid `overflow`, since both flatten the
 * 3D space and collapse the effect back to a plain tilt.
 */
export const Tilt = ({
  as: Component = 'div',
  max = 8,
  perspective = 900,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(hoverQuery, () => {
        const element = ref.current;
        const inner = innerRef.current;
        const layers = gsap.utils.toArray(inner.querySelectorAll('[data-depth]'));

        const rotateX = gsap.quickTo(inner, 'rotationX', {
          duration: 0.6,
          ease: 'power3',
        });
        const rotateY = gsap.quickTo(inner, 'rotationY', {
          duration: 0.6,
          ease: 'power3',
        });
        const liftLayer = layers.map(layer =>
          gsap.quickTo(layer, 'z', { duration: 0.6, ease: 'power3' })
        );

        let bounds = null;

        const enter = () => {
          bounds = element.getBoundingClientRect();
          layers.forEach((layer, index) => liftLayer[index](Number(layer.dataset.depth)));
        };

        const move = event => {
          if (!bounds) bounds = element.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotateY(x * max * 2);
          rotateX(-y * max * 2);
        };

        const leave = () => {
          bounds = null;
          rotateX(0);
          rotateY(0);
          liftLayer.forEach(lift => lift(0));
        };

        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', leave);

        return () => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointermove', move);
          element.removeEventListener('pointerleave', leave);

          gsap.killTweensOf([inner, ...layers]);
          gsap.set([inner, ...layers], { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [max] }
  );

  return (
    <Component
      className={classes(styles.tilt, className)}
      style={cssProps({ perspective })}
      ref={ref}
      {...rest}
    >
      <div className={styles.tiltInner} ref={innerRef}>
        {children}
      </div>
    </Component>
  );
};

/**
 * Panel with a light that follows the cursor. Use it to mark the one thing on a
 * section worth looking at first.
 */
export const Spotlight = ({
  as: Component = 'div',
  radius = 300,
  className,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref);

      mm.add(hoverQuery, () => {
        const element = ref.current;
        const glow = glowRef.current;
        const setX = gsap.quickSetter(glow, '--glowX', 'px');
        const setY = gsap.quickSetter(glow, '--glowY', 'px');

        let bounds = null;

        const enter = () => {
          bounds = element.getBoundingClientRect();
          gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        };

        const move = event => {
          if (!bounds) bounds = element.getBoundingClientRect();
          setX(event.clientX - bounds.left);
          setY(event.clientY - bounds.top);
        };

        const leave = () => {
          bounds = null;
          gsap.to(glow, { opacity: 0, duration: 0.5, ease: 'power2.out' });
        };

        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', leave);

        return () => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointermove', move);
          element.removeEventListener('pointerleave', leave);

          gsap.killTweensOf(glow);
          gsap.set(glow, { clearProps: 'opacity' });
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Component className={classes(styles.spotlight, className)} ref={ref} {...rest}>
      <div
        className={styles.spotlightGlow}
        style={cssProps({ glowRadius: radius })}
        ref={glowRef}
        aria-hidden="true"
      />
      {children}
    </Component>
  );
};
