import { useEffect, useRef } from 'react';
import ralphSprite from '../assets/ralph.png';

/**
 * Neko-style Ralph cursor chaser.
 *  - Spawns at top-left corner
 *  - Walks toward the cursor at a constant speed
 *  - Stops (idle frame) when close enough
 *  - Flips horizontally when moving left
 */

// ── Sprite sheet constants (511×692, measured by browser) ────────────────────
const IMG_W = 511;
const IMG_H = 692;
const CELL_W = 64;
const CELL_H = 65;
const ROW_Y = 15;    // first row starts at y=15 in the sheet
const FRAMES = 3;     // cols 0-2: standing, left-walk, right-walk
const FPS = 8;     // walk animation speed

// ── Display ──────────────────────────────────────────────────────────────────
const DISP_W = 80;
const SCALE = DISP_W / CELL_W;                // 1.25
const DISP_H = Math.round(CELL_H * SCALE);     // 81
const BG_W = Math.round(IMG_W * SCALE);       // 639
const BG_H = Math.round(IMG_H * SCALE);       // 865
const BG_Y = -Math.round(ROW_Y * SCALE);      // -19 (crop to row 0)

// ── Neko constants ────────────────────────────────────────────────────────────
const SPEED = 3.5;   // px per frame (~60fps → ~210px/s)
const THRESHOLD = 50;    // stop radius around the cursor (px)

export default function RalphCursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const lastTs = useRef(0);
  // Start Ralph at bottom-left corner
  const pos = useRef({ x: 28, y: window.innerHeight - 28 });
  const mouse = useRef({ x: 28, y: window.innerHeight - 28 }); // begin co-located so he's idle
  const isMoving = useRef(false);
  const goLeft = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const loop = (ts: number) => {
      rafId.current = requestAnimationFrame(loop);

      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > THRESHOLD) {
        // Walk toward cursor at constant speed
        const nx = dx / dist;
        const ny = dy / dist;
        pos.current.x += nx * SPEED;
        pos.current.y += ny * SPEED;
        isMoving.current = true;
        goLeft.current = dx < 0;

        // Advance walk frame
        if (ts - lastTs.current > 1000 / FPS) {
          frameRef.current = (frameRef.current + 1) % FRAMES;
          lastTs.current = ts;
        }
      } else {
        // Idle — freeze on standing frame
        if (isMoving.current) {
          isMoving.current = false;
          frameRef.current = 0;
        }
      }

      const el = elRef.current;
      if (!el) return;

      // Position Ralph's feet at his current location
      const tx = pos.current.x - DISP_W / 2;
      const ty = pos.current.y - DISP_H / 2;
      el.style.transform = `translate(${tx}px, ${ty}px) scaleX(${goLeft.current ? -1 : 1})`;

      // Slide background to current frame
      const bgX = -Math.round(frameRef.current * CELL_W * SCALE);
      el.style.backgroundPosition = `${bgX}px ${BG_Y}px`;
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: DISP_W,
        height: DISP_H,
        pointerEvents: 'none',
        backgroundImage: `url(${ralphSprite})`,
        backgroundSize: `${BG_W}px ${BG_H}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px ${BG_Y}px`,
        imageRendering: 'pixelated',
        willChange: 'transform, background-position',
      }}
    />
  );
}
