import { useIsPresent } from 'framer-motion';
import { useRouter } from 'next/router';
import { getLenis } from 'hooks/useSmoothScroll';
import { useEffect } from 'react';

// Jump instantly, cancelling any Lenis momentum left over from the previous page.
const jumpTo = y => {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
};

// Custom scroll restoration to avoid jank during page transitions
export const ScrollRestore = () => {
  const isPresent = useIsPresent();
  const { asPath, beforePopState } = useRouter();

  useEffect(() => {
    // Opt out of native scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  // Prevent insta-scroll on browser back button
  useEffect(() => {
    beforePopState(state => {
      state.options.scroll = false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll restoration
  useEffect(() => {
    if (!isPresent) return;
    const hash = asPath.split('#')[1];
    const targetElement = document.getElementById(hash);

    if (hash && targetElement) {
      // If there's a hash in the url and a matching element
      // id, scroll to and focus it
      // Page position, not offsetTop (which is relative to the nearest positioned parent).
      jumpTo(targetElement.getBoundingClientRect().top + window.scrollY);
      targetElement.focus({ preventScroll: true });
    } else {
      jumpTo(0);
      document.body.focus({ preventScroll: true });
    }
  }, [asPath, isPresent]);
};
