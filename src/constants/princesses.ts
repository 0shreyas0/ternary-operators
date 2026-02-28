// Princess sprite sheet data — 17 chibi princesses in a single row
// Image dimensions: ~340×20px each sprite (approx), adjust SPRITE_W if needed

export const SPRITE_SHEET = "/src/assets/princesssss.png";
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
    // ── Hero section (4 princesses) ─────────────────────────────────────────
    {
        id: 0,
        sectionId: "hero",
        x: 8,
        y: 72,
        hint: "Near the bottom-left of the starfield...",
    },
    {
        id: 1,
        sectionId: "hero",
        x: 91,
        y: 18,
        hint: "High up in the top-right corner...",
    },
    {
        id: 2,
        sectionId: "hero",
        x: 47,
        y: 88,
        hint: "Hiding near the very bottom, center...",
    },
    {
        id: 3,
        sectionId: "hero",
        x: 78,
        y: 55,
        hint: "Somewhere in the right half of the hero...",
    },

    // ── Carousel section (3 princesses) ─────────────────────────────────────
    {
        id: 4,
        sectionId: "carousel",
        x: 5,
        y: 30,
        hint: "Far left, mid-height of the carousel...",
    },
    {
        id: 5,
        sectionId: "carousel",
        x: 88,
        y: 75,
        hint: "Bottom-right of the history reel...",
    },
    {
        id: 6,
        sectionId: "carousel",
        x: 52,
        y: 12,
        hint: "Near the top center of the carousel...",
    },

    // ── Franchise Worlds section (4 princesses) ──────────────────────────────
    {
        id: 7,
        sectionId: "worlds",
        x: 15,
        y: 55,
        hint: "In the left edge of the worlds section...",
    },
    {
        id: 8,
        sectionId: "worlds",
        x: 85,
        y: 20,
        hint: "Top-right corner of the franchise cards...",
    },
    {
        id: 9,
        sectionId: "worlds",
        x: 42,
        y: 80,
        hint: "Near the bottom center of the worlds...",
    },
    {
        id: 10,
        sectionId: "worlds",
        x: 68,
        y: 45,
        hint: "Tucked into the right side, mid-way...",
    },

    // ── Film Reel section (3 princesses) ────────────────────────────────────
    {
        id: 11,
        sectionId: "filmreel",
        x: 7,
        y: 50,
        hint: "Hidden in the film grain on the left...",
    },
    {
        id: 12,
        sectionId: "filmreel",
        x: 55,
        y: 20,
        hint: "Lurking above the film strip...",
    },
    {
        id: 13,
        sectionId: "filmreel",
        x: 92,
        y: 70,
        hint: "Far right, near the bottom of the reel...",
    },

    // ── Footer section (3 princesses) ───────────────────────────────────────
    {
        id: 14,
        sectionId: "footer",
        x: 12,
        y: 40,
        hint: "Left side of the enchanted footer...",
    },
    {
        id: 15,
        sectionId: "footer",
        x: 55,
        y: 65,
        hint: "Center-bottom of the footer...",
    },
    {
        id: 16,
        sectionId: "footer",
        x: 88,
        y: 25,
        hint: "Top-right corner of the footer...",
    },
];
