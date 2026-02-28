import { useEffect, useRef } from 'react';
import ralphSprite from '../assets/ralph.png';
import { useGame } from '../hooks/useGame';

// ── Sprite sheet (canvas-measured: 429×581) ───────────────────────────────────
const IMG_W       = 429;
const IMG_H       = 581;
const DISP_W      = 80;

// ── Walk animation (side-walk row Y=15, 3 frames, ~54px cells) ────────────────
const WALK_CELL_W = 54;
const WALK_ROW_Y  = 15;
const WALK_FRAMES = 3;
const WALK_FPS    = 8;
const SCALE       = DISP_W / WALK_CELL_W;
const DISP_H      = Math.round(63 * SCALE);
const BG_W        = Math.round(IMG_W * SCALE);
const BG_H        = Math.round(IMG_H * SCALE);
const WALK_BGY    = -Math.round(WALK_ROW_Y * SCALE);

// ── Neko constants ────────────────────────────────────────────────────────────
const SPEED     = 3.5;
const THRESHOLD = 50;

export default function RalphCursor() {
  const { totalCount, collectedCount } = useGame();
  const remaining = totalCount - collectedCount;

  const containerRef = useRef<HTMLDivElement>(null);
  const spriteRef    = useRef<HTMLDivElement>(null);
  const bubbleRef    = useRef<HTMLDivElement>(null);
  const hideTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const holdTimer    = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const frameRef  = useRef(0);
  const lastTs    = useRef(0);
  const pos       = useRef({ x: 28, y: window.innerHeight - 28 });
  const mouse     = useRef({ x: 28, y: window.innerHeight - 28 });
  const isMoving  = useRef(false);
  const goLeft    = useRef(false);
  const rafId     = useRef(0);

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
    clearTimeout(holdTimer.current);
    clearTimeout(hideTimer.current);
    const b = bubbleRef.current;
    if (!b) return;
    b.style.opacity   = '0';
    b.style.transform = 'translateX(-50%) translateY(-6px) scale(0.9)';
  };

  const startHold = () => {
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(showBubble, 100);
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

      if (dist > THRESHOLD) {
        pos.current.x += (dx / dist) * SPEED;
        pos.current.y += (dy / dist) * SPEED;
        isMoving.current = true;
        goLeft.current   = dx < 0;

        if (ts - lastTs.current > 1000 / WALK_FPS) {
          frameRef.current = (frameRef.current + 1) % WALK_FRAMES;
          lastTs.current   = ts;
        }
      } else {
        if (isMoving.current) {
          isMoving.current = false;
          frameRef.current = 0;
        }
      }

      const container = containerRef.current;
      const sprite    = spriteRef.current;
      if (!container || !sprite) return;

      container.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      sprite.style.transform    = `translateX(-50%) scaleX(${goLeft.current ? -1 : 1})`;

      const bgX = -Math.round(frameRef.current * WALK_CELL_W * SCALE);
      sprite.style.backgroundPosition = `${bgX}px ${WALK_BGY}px`;
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
    <div
      ref={containerRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', width: 0, height: 0 }}
    >
      {/* Speech bubble */}
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
        <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #1a1a2e', margin: '0 auto' }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid #fff', margin: '-14px auto 0' }} />
      </div>

      {/* Ralph sprite */}
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
          backgroundPosition: `0px ${WALK_BGY}px`,
          imageRendering:     'pixelated',
          transform:          'translateX(-50%)',
          willChange:         'transform, background-position',
          pointerEvents:      'auto',
        }}
      />
    </div>
  );
}
