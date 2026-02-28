import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global Lenis instance for programmatic scrolling
 */
export let lenisInstance: Lenis | null = null;
declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

export const useLenis = () => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;
    window.lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Initial top reset
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 50);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      window.lenis = null;
    };
  }, []);
};
