import { useEffect, useRef } from 'react';

/**
 * useAutoPlay
 * Calls `advance()` every `intervalMs`, but pauses when `paused` is true.
 */
export const useAutoPlay = (advance: () => void, intervalMs: number, paused: boolean) => {
  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => advanceRef.current(), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, paused]);
};
