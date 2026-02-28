import { useEffect, useRef } from 'react';
import ralphSprite from '../assets/ralph.png';
import { useGame } from '../hooks/useGame';

// ── Sprite sheet constants (canvas-measured: 429×581) ────────────────────
const IMG_W   = 429;
const IMG_H   = 581;
const DISP_W  = 80;

// ── Walk animation (row 0: front-facing, ~54px cell in source) ────────────────
// Keep walk constants that already produce correct output:
const WALK_CELL_W  = 54;             // source px per walk frame
const WALK_ROW_Y   = 15;             // source y of walk row
const WALK_FRAMES  = 3;              // cols 0-2 (front walk subset)
const WALK_FPS     = 8;
const SCALE        = DISP_W / WALK_CELL_W;        // 80/54 ≈ 1.481
const DISP_H       = Math.round(63 * SCALE);       // 93px
const BG_W         = Math.round(IMG_W * SCALE);    // 635
const BG_H         = Math.round(IMG_H * SCALE);    // 860

// ── Wreck animation: exact source frame X positions (canvas-scanned) ──────────
// Row Y=78 in source, 6 frames at x=[1,66,123,183,243,303]
const WRECK_ROW_Y   = 96;
const WRECK_FRAMES  = 6;
const WRECK_FPS     = 6;
const DS            = BG_W / IMG_W;  // actual display scale ≈ 1.481
const WRECK_SRC_X   = [0, 60, 120, 180, 240, 300];  // uniform 60px spacing
// Precompute display-space X and Y offsets for each wreck frame
const WRECK_BGX     = WRECK_SRC_X.map(x => -Math.round(x * DS));
const WRECK_BGY     = -Math.round(WRECK_ROW_Y * DS);

// ── Neko constants ────────────────────────────────────────────────────────────
const SPEED     = 3.5;
const THRESHOLD = 50;

export default function RalphCursor() {
  const { totalCount, collectedCount } = useGame();
  const remaining = totalCount - collectedCount;

  // Refs for the two DOM nodes we animate in the RAF
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteRef    = useRef<HTMLDivElement>(null);
  const bubbleRef    = useRef<HTMLDivElement>(null);
  const hideTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const holdTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const frameRef   = useRef(0);
  const lastTs     = useRef(0);
  const pos        = useRef({ x: 28, y: window.innerHeight - 28 });
  const mouse      = useRef({ x: 28, y: window.innerHeight - 28 });
  const isMoving   = useRef(false);
  const wasIdle    = useRef(true);  // track mode changes to reset frame
  const goLeft     = useRef(false);
  const rafId      = useRef(0);

  const showBubble = () => {
    const b = bubbleRef.current;
    if (!b) return;
    b.style.opacity   = '1';
    b.style.transform = 'translateX(-50%) translateY(0) scale(1)';
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      b.style.opacity   = '0';
      b.style.transform = 'translateX(-50%) translateY(-6px) scale(0.9)';
    }, 4000);
  };

  const hideBubble = () => {
    clearTimeout(holdTimer.current);  // cancel pending hold
    clearTimeout(hideTimer.current);
    const b = bubbleRef.current;
    if (!b) return;
    b.style.opacity   = '0';
    b.style.transform = 'translateX(-50%) translateY(-6px) scale(0.9)';
  };

  const startHold = () => {
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(showBubble, 1000); // show only after 1s hold
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const loop = (ts: number) => {
      rafId.current = requestAnimationFrame(loop);

      const dx   = mouse.current.x - pos.current.x;
      const dy   = mouse.current.y - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const idle = dist <= THRESHOLD;

      // Detect mode switch → reset frame counter
      if (idle !== wasIdle.current) {
        frameRef.current = 0;
        lastTs.current   = ts;
        wasIdle.current  = idle;
      }

      if (!idle) {
        pos.current.x += (dx / dist) * SPEED;
        pos.current.y += (dy / dist) * SPEED;
        isMoving.current = true;
        goLeft.current   = dx < 0;

        if (ts - lastTs.current > 1000 / WALK_FPS) {
          frameRef.current = (frameRef.current + 1) % WALK_FRAMES;
          lastTs.current   = ts;
        }
      } else {
        isMoving.current = false;
        // Wreck animation cycles while idle
        if (ts - lastTs.current > 1000 / WRECK_FPS) {
          frameRef.current = (frameRef.current + 1) % WRECK_FRAMES;
          lastTs.current   = ts;
        }
      }

      const container = containerRef.current;
      const sprite    = spriteRef.current;
      if (!container || !sprite) return;

      // Move whole container
      container.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

      // Flip only the sprite (not the bubble)
      sprite.style.transform = `translateX(-50%) scaleX(${goLeft.current ? -1 : 1})`;

      // Dynamic row + frame
      const bgX  = wasIdle.current
        ? WRECK_BGX[Math.min(frameRef.current, WRECK_FRAMES - 1)]  // exact precomputed wreck X
        : -Math.round(frameRef.current * WALK_CELL_W * SCALE);      // walk grid
      const bgY  = wasIdle.current
        ? WRECK_BGY                                                  // precomputed wreck Y
        : -Math.round(WALK_ROW_Y * SCALE);                          // walk row Y
      sprite.style.backgroundPosition = `${bgX}px ${bgY}px`;
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const allFound  = remaining === 0;
  const bubbleMsg = allFound
    ? `You found them all! Penelope is saved! 🎉`
    : `Help me find the remaining ${remaining} princess${remaining === 1 ? '' : 'es'} so I can save Penelope!`;

  return (
    // Zero-size anchor point — translated by the RAF loop
    <div
      ref={containerRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', width: 0, height: 0 }}
    >
      {/* Speech bubble — hidden by default, reveals on hover / arrival */}
      <div
        ref={bubbleRef}
        style={{
          position:   'absolute',
          bottom:     DISP_H + 10,
          left:       '50%',
          transform:  'translateX(-50%) translateY(-6px) scale(0.9)',
          opacity:    0,
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          background:   '#fff',
          color:        '#1a1a2e',
          fontFamily:   '"Press Start 2P", monospace',
          fontSize:     7,
          lineHeight:   1.4,
          padding:      '6px 14px',
          borderRadius: 6,
          border:       '2px solid #1a1a2e',
          boxShadow:    '3px 3px 0 #1a1a2e',
          maxWidth:     400,
          whiteSpace:   'normal',
          textAlign:    'center',
        }}>
          {bubbleMsg}
        </div>
        {/* Downward pointer triangle */}
        <div style={{
          width:       0,
          height:      0,
          borderLeft:  '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop:   '8px solid #1a1a2e',
          margin:      '0 auto',
        }} />
        <div style={{
          width:       0,
          height:      0,
          borderLeft:  '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop:   '7px solid #fff',
          margin:      '-14px auto 0',
        }} />
      </div>

      {/* Ralph sprite — centered on the anchor point */}
      <div
        ref={spriteRef}
        onMouseEnter={startHold}
        onMouseLeave={hideBubble}
        style={{
          position:           'absolute',
          top:                -DISP_H,
          left:               0,
          width:              DISP_W,
          height:             DISP_H,
          backgroundImage:    `url(${ralphSprite})`,
          backgroundSize:     `${BG_W}px ${BG_H}px`,
          backgroundRepeat:   'no-repeat',
          backgroundPosition: `0px ${-Math.round(WALK_ROW_Y * SCALE)}px`,
          imageRendering:     'pixelated',
          transform:          'translateX(-50%)',
          willChange:         'transform, background-position',
          pointerEvents:      'auto',
        }}
      />
    </div>
  );
}

