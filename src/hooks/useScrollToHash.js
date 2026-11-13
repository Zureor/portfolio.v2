import { useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import { getLenis } from './useSmoothScroll';

export function useScrollToHash() {
  const scrollTimeout = useRef();
  const { asPath, push } = useRouter();
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash, onDone) => {
      const id = hash.split('#')[1];
      const targetElement = document.getElementById(id);
      const route = asPath.split('#')[0];
      const newPath = `${route}#${id}`;

      // Native smooth scrolling fights Lenis, so let Lenis animate when it is running.
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetElement);
      } else {
        targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener('scroll', handleScroll);

          if (window.location.pathname === route) {
            onDone?.();
            push(newPath, null, { scroll: false });
          }
        }, 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout.current);
      };
    },
    [push, reduceMotion, asPath]
  );

  return scrollToHash;
}
