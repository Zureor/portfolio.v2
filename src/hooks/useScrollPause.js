import { useEffect, useState } from 'react';

// Shared across components: one scroll listener, one timer.
const PAUSE_MS = 250;
const listeners = new Set();
let paused = false;
let timer;

const set = value => {
  if (paused === value) return;
  paused = value;
  listeners.forEach(listener => listener(value));
};

const onScroll = () => {
  set(false);
  clearTimeout(timer);
  timer = setTimeout(() => set(true), PAUSE_MS);
};

/**
 * True while the visitor has scrolled at least once and is now holding still. A
 * moment to do main-thread work (mounting a WebGL scene) that would jitter mid-scroll.
 * Stays false until the first scroll, so page load is unaffected.
 */
export function useScrollPause() {
  const [value, setValue] = useState(paused);

  useEffect(() => {
    if (!listeners.size) window.addEventListener('scroll', onScroll, { passive: true });
    listeners.add(setValue);
    return () => {
      listeners.delete(setValue);
      if (!listeners.size) window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return value;
}
