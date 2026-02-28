import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * useLenis
 * Initialises Lenis smooth scrolling for the page.
 * Automatically cleans up on unmount.
 */
export const useLenis = () => {
  useEffect(() => {
    // Prevent the browser from restoring the last scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Also reset native scroll in case it jumped before Lenis took over
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Force Lenis itself to start at the top
    lenis.scrollTo(0, { immediate: true });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
};
