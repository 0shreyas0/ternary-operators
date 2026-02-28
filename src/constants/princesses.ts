// Princess sprite sheet data — 17 chibi princesses in a single row
// Image dimensions: ~340×20px each sprite (approx), adjust SPRITE_W if needed

export const SPRITE_SHEET = '/src/assets/princesssss.png';
export const SPRITE_COUNT = 17;

// Each sprite is 1/17th of the sheet width
// We use background-position to select the right one

export const PRINCESS_DATA = [
  // ── Top row (9 sprites, left → right) ───────────────────────────────────
  { id: 0,  name: 'Snow White',   color: '#e75480' },
  { id: 1,  name: 'Cinderella',   color: '#6fa3ef' },
  { id: 2,  name: 'Alice',        color: '#5bc0de' },
  { id: 3,  name: 'Wendy',       color: '#f5a0c8' },
  { id: 4,  name: 'Aurora',       color: '#c084fc' }, 
  { id: 5,  name: 'Rapunzel',        color: '#2ecc71' },
  { id: 6,  name: 'Ariel',        color: '#f0c040' },
  { id: 7,  name: 'Belle',      color: '#1abc9c' },
  { id: 8,  name: 'Jasmine',   color: '#e67e22' },
  // ── Bottom row (8 sprites, offset-centered) ──────────────────────────────
  { id: 9,  name: 'Pocahontas',    color: '#9b59b6' },
  { id: 10, name: 'Esmeralda',        color: '#e74c3c' },
  { id: 11, name: 'Megara',     color: '#f39c12' }, 
  { id: 12, name: 'Mulan',        color: '#27ae60' },
  { id: 13, name: 'Jane',       color: '#c0392b' }, 
  { id: 14, name: 'Kida',         color: '#3498db' }, 
  { id: 15, name: 'Lilo',        color: '#e74c3c' },
  { id: 16, name: 'Tiana',         color: '#8e44ad' },
];

// Where each princess is hidden — ONE per section
export const HIDDEN_PRINCESSES: Array<{
  id: number;
  sectionId: string;
  x: number; // % from left of parent section
  y: number; // % from top of parent section
  hint: string;
}> = [
  { id: 0,  sectionId: 'hero',      x: 8,   y: 72,  hint: 'In the starfield, near the bottom left...' },
  { id: 1,  sectionId: 'carousel',  x: 88,  y: 20,  hint: 'Peek into the history carousel...' },
  { id: 2,  sectionId: 'worlds',    x: 15,  y: 55,  hint: 'In a world of imagination...' },
  { id: 5,  sectionId: 'filmreel',  x: 20,  y: 60,  hint: 'Hidden in the film grain...' },
  { id: 8,  sectionId: 'footer',    x: 55,  y: 35,  hint: 'In the enchanted footer...' },
];
