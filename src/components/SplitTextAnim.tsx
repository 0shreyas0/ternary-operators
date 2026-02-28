import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitTextAnim({
  text,
  className = '',
  delay = 50,
  duration = 0.5,
  ease = 'power2.out',
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = 'left',
  onLetterAnimationComplete,
  showCallback = false
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('.split-item');
      if (!elements || elements.length === 0) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        onEnter: () => {
          gsap.fromTo(elements, 
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              onComplete: () => {
                setHasAnimated(true);
                if (onLetterAnimationComplete) {
                  onLetterAnimationComplete();
                  if (showCallback) console.log('Animation Complete');
                }
              }
            }
          );
        },
        once: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, [hasAnimated, threshold, delay, duration, ease, onLetterAnimationComplete, showCallback]); // Stabilized dependencies

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  return (
    <div 
      ref={containerRef} 
      className={`split-text-container ${className}`}
      style={{ 
        textAlign,
        display: 'inline-block',
        width: '100%'
      }}
    >
      {items.map((item, i) => (
        <span 
          key={i} 
          className="split-item" 
          style={{ 
            display: 'inline-block', 
            whiteSpace: item === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity'
          }}
        >
          {item}{splitType === 'words' && i < items.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  );
}
