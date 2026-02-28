// ── Navigation Items ───────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Movies", emoji: "🎬", href: "#filmreel" },
  { label: "Parks", emoji: "🏰", href: "#parks" },
  { label: "Disney+", emoji: "✨", href: "#streaming" },
  { label: "Merch", emoji: "🎁", href: "#merch" },
];

// ── Franchise Worlds ───────────────────────────────────────────────────────
export const FRANCHISE_WORLDS = [
  {
    id: "classic",
    name: "Classic Disney",
    tagline: "Where magic was born",
    description: "From Snow White to The Lion King — the timeless tales that built a kingdom.",
    gradient: "from-amber-900 via-amber-700 to-yellow-600",
    accentColor: "#f5d770",
    emoji: "👑",
    image: "https://m.media-amazon.com/images/M/MV5BOTc1YzZiZW8tZDk4NC00ODVhLWJhNWMtMDg5MDQ0YzliNDY4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    year: "Since 1937",
  },
  {
    id: "pixar",
    name: "Pixar",
    tagline: "Emotional stories, infinite worlds",
    description: "Toy Story, Inside Out, Soul — stories that make adults cry and children laugh.",
    gradient: "from-blue-900 via-blue-700 to-cyan-500",
    accentColor: "#67e8f9",
    emoji: "🌟",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    year: "Since 1995",
  },
  {
    id: "marvel",
    name: "Marvel",
    tagline: "The universe awaits",
    description: "Earth's mightiest heroes — from Iron Man to the Multiverse.",
    gradient: "from-red-900 via-red-700 to-rose-500",
    accentColor: "#fca5a5",
    emoji: "⚡",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
    year: "Since 2008",
  },
  {
    id: "starwars",
    name: "Star Wars",
    tagline: "A galaxy far, far away",
    description: "The Force, the Sith, the Rebellion — an epic saga spanning generations.",
    gradient: "from-slate-900 via-slate-700 to-indigo-800",
    accentColor: "#818cf8",
    emoji: "🌌",
    image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=800&q=80",
    year: "Since 1977",
  },
  {
    id: "natgeo",
    name: "Nat Geo",
    tagline: "Our world, limitlessly explored",
    description: "Adventure, discovery, and breathtaking stories from the natural world.",
    gradient: "from-yellow-900 via-yellow-700 to-lime-600",
    accentColor: "#fde047",
    emoji: "🌍",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1200",
    year: "Since 1888",
  },
];

// ── Film Reel Posters — TMDB image CDN (no hotlink restrictions) ───────────
export const FILM_REEL = [
  { title: "Snow White", year: 1937, image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&q=80" },
  { title: "Fantasia", year: 1940, image: "https://images.unsplash.com/photo-1511735111819-9a3efd16f78e?w=400&q=80" },
  { title: "Cinderella", year: 1950, image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80" },
  { title: "The Lion King", year: 1994, image: "https://images.unsplash.com/photo-1534361960057-19f073edb0d3?w=400&q=80" },
  { title: "Toy Story", year: 1995, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { title: "Frozen", year: 2013, image: "https://images.unsplash.com/photo-1548366086-7f1b76106622?w=400&q=80" },
  { title: "Moana", year: 2016, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
];

// ── Story Quiz Options ─────────────────────────────────────────────────────
export const QUIZ_OPTIONS = [
  { label: "Adventure", emoji: "⚔️", gradient: "from-orange-500 to-red-600", world: "Star Wars" },
  { label: "Magic", emoji: "✨", gradient: "from-purple-500 to-pink-500", world: "Classic Disney" },
  { label: "Laughter", emoji: "😂", gradient: "from-yellow-400 to-orange-500", world: "Pixar" },
  { label: "Wonder", emoji: "🌍", gradient: "from-green-500 to-teal-500", world: "Nat Geo" },
];
