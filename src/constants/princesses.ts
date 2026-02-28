import spriteSheetImg from '../assets/princesssss.png';

// Princess sprite sheet data — 17 chibi princesses in a single row
// Image dimensions: ~340×20px each sprite (approx), adjust SPRITE_W if needed

export const SPRITE_SHEET = spriteSheetImg;
export const SPRITE_COUNT = 17;

// Each sprite is 1/17th of the sheet width
// We use background-position to select the right one

export const PRINCESS_DATA = [
    // ── Top row (9 sprites, left → right) ───────────────────────────────────
    { id: 0, name: "Snow White", color: "#e75480" },
    { id: 1, name: "Cinderella", color: "#6fa3ef" },
    { id: 2, name: "Alice", color: "#5bc0de" },
    { id: 3, name: "Wendy", color: "#f5a0c8" },
    { id: 4, name: "Aurora", color: "#c084fc" },
    { id: 5, name: "Rapunzel", color: "#2ecc71" },
    { id: 6, name: "Ariel", color: "#f0c040" },
    { id: 7, name: "Belle", color: "#1abc9c" },
    { id: 8, name: "Jasmine", color: "#e67e22" },
    // ── Bottom row (8 sprites, offset-centered) ──────────────────────────────
    { id: 9, name: "Pocahontas", color: "#9b59b6" },
    { id: 10, name: "Esmeralda", color: "#e74c3c" },
    { id: 11, name: "Megara", color: "#f39c12" },
    { id: 12, name: "Mulan", color: "#27ae60" },
    { id: 13, name: "Jane", color: "#c0392b" },
    { id: 14, name: "Kida", color: "#3498db" },
    { id: 15, name: "Lilo", color: "#e74c3c" },
    { id: 16, name: "Tiana", color: "#8e44ad" },
];

// Where each princess is hidden — spread across ALL sections
export const HIDDEN_PRINCESSES: Array<{
    id: number;
    sectionId: string;
    x: number; // % from left of parent section
    y: number; // % from top of parent section
    hint: string;
}> = [
    // ── Hero section (3 princesses) ─────────────────────────────────────────
    {
        id: 0,
        sectionId: "hero",
        x: 12,
        y: 65,
        hint: "Near the bottom-left of the starfield...",
    },
    {
        id: 1,
        sectionId: "hero",
        x: 88,
        y: 22,
        hint: "High up in the top-right corner...",
    },
    {
        id: 2,
        sectionId: "hero",
        x: 45,
        y: 85,
        hint: "Hiding near the very bottom center...",
    },

    // ── Carousel section (2 princesses) ─────────────────────────────────────
    {
        id: 3,
        sectionId: "carousel",
        x: 8,
        y: 40,
        hint: "Far left of the history reel...",
    },
    {
        id: 4,
        sectionId: "carousel",
        x: 92,
        y: 70,
        hint: "Bottom-right of the carousel...",
    },

    // ── Franchise Worlds section (2 princesses) ──────────────────────────────
    {
        id: 5,
        sectionId: "worlds",
        x: 18,
        y: 60,
        hint: "In the left edge of the worlds section...",
    },
    {
        id: 6,
        sectionId: "worlds",
        x: 82,
        y: 15,
        hint: "Top-right corner of the franchise cards...",
    },

    // ── Film Reel section (2 princesses) ────────────────────────────────────
    {
        id: 7,
        sectionId: "filmreel",
        x: 10,
        y: 45,
        hint: "Hidden in the film grain on the left...",
    },
    {
        id: 8,
        sectionId: "filmreel",
        x: 90,
        y: 25,
        hint: "Lurking above the film strip on the right...",
    },

    // ── Parks/Footer section (2 princesses) ──────────────────────────────────
    {
        id: 9,
        sectionId: "footer",
        x: 15,
        y: 75,
        hint: "Left side of the enchanted footer...",
    },
    {
        id: 10,
        sectionId: "footer",
        x: 85,
        y: 35,
        hint: "Top-right corner of the footer area...",
    },

    // ── Streaming section (3 princesses) ────────────────────────────────────
    {
        id: 11,
        sectionId: "streaming",
        x: 5,
        y: 20,
        hint: "Top left corner of the streaming world...",
    },
    {
        id: 12,
        sectionId: "streaming",
        x: 95,
        y: 80,
        hint: "Deep in the bottom right of Disney+...",
    },
    {
        id: 13,
        sectionId: "streaming",
        x: 50,
        y: 95,
        hint: "Hiding at the very bottom of the stream...",
    },

    // ── Merch section (3 princesses) ────────────────────────────────────────
    {
        id: 14,
        sectionId: "merch",
        x: 10,
        y: 85,
        hint: "Bottom left of the toy shop...",
    },
    {
        id: 15,
        sectionId: "merch",
        x: 90,
        y: 15,
        hint: "High on the top right shelf...",
    },
    {
        id: 16,
        sectionId: "merch",
        x: 48,
        y: 50,
        hint: "Right in the middle of the merchandise...",
    },
];
