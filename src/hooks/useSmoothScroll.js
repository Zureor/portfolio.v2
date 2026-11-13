import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis = null;

/** The running Lenis instance, or null when smooth scrolling is off. */
export const getLenis = () => lenis;

/**
 * Inertia scrolling for mouse wheels and trackpads. Touch keeps native
 * scrolling (Lenis default), and it stays off for reduced-motion users.
 */
export function useSmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    lenis = new Lenis({ autoRaf: true });

    return () => {
      lenis.destroy();
      lenis = null;
    };
  }, [reduceMotion]);
}
