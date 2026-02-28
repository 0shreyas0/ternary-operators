import type React from 'react';

/**
 * PrincessSprite
 *
 * Sprite sheet: princesssss.png — 351 × 126 px
 * Layout: 2 rows
 *   Row 0 (top):    9 sprites, x starts at 0
 *   Row 1 (bottom): 8 sprites, centered → x starts at (351 - 8×39) / 2 = 19.5 px
 *
 * Cell size: 39 × 63 px (native)
 *
 * `displayWidth` – desired rendered width in px (height auto-scales)
 * `cropHeight`   – optional clip height (shows top portion of sprite)
 */

const SHEET_W = 351;
const SHEET_H = 126;

// Grid layout
const COLS_TOP = 9;
const ROWS     = 2;

const CELL_W_NATIVE = SHEET_W / COLS_TOP;           // 39 px
const CELL_H_NATIVE = SHEET_H / ROWS;               // 63 px

// Bottom row: 8 sprites centered in the 351 px sheet width
const COLS_BOT    = 8;
const BOT_OFFSET_X = (SHEET_W - COLS_BOT * CELL_W_NATIVE) / 2; // 19.5 px

/** Given a 0-based sprite index (0–16), returns its native (x, y) top-left in the sheet */
const getSpriteOrigin = (index: number): { x: number; y: number } => {
  if (index < COLS_TOP) {
    // Top row
    return { x: index * CELL_W_NATIVE, y: 0 };
  } else {
    // Bottom row
    const col = index - COLS_TOP;
    return { x: BOT_OFFSET_X + col * CELL_W_NATIVE, y: CELL_H_NATIVE };
  }
};

interface PrincessSpriteProps {
  spriteIndex:   number;          // 0 – 16
  displayWidth?: number;          // target rendered width in px (default 39, = native)
  cropHeight?:   number;          // clip height; if omitted, full cell height shown
  grayscale?:    boolean;
  className?:    string;
  style?:        React.CSSProperties;
}

export const PrincessSprite = ({
  spriteIndex,
  displayWidth = CELL_W_NATIVE,
  cropHeight,
  grayscale = false,
  className = '',
  style = {},
}: PrincessSpriteProps) => {
  const scale = displayWidth / CELL_W_NATIVE;

  const scaledSheetW = SHEET_W * scale;
  const scaledSheetH = SHEET_H * scale;

  const { x, y } = getSpriteOrigin(spriteIndex);
  const bgX = -(x * scale);
  const bgY = -(y * scale);

  const displayH = cropHeight ?? (CELL_H_NATIVE * scale);

  return (
    <div
      className={`flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width:              displayWidth,
        height:             displayH,
        backgroundImage:    `url('/src/assets/princesssss.png')`,
        backgroundSize:     `${scaledSheetW}px ${scaledSheetH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat:   'no-repeat',
        imageRendering:     'pixelated',
        filter:  grayscale ? 'grayscale(1) brightness(0.45)' : 'none',
        transition: 'filter 0.4s ease',
        ...style,
      }}
      aria-label={`Princess sprite ${spriteIndex}`}
    />
  );
};
