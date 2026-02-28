# 🏰 Disney App — Project Docs

> A reimagined Walt Disney Company homepage as a **magical, immersive storytelling experience**.

---

## 📁 Project Structure

```
src/
├── components/         ← All reusable UI components
│   ├── Navbar.tsx          — Glassmorphic floating nav bar
│   ├── HeroSection.tsx     — Full-screen starfield hero
│   ├── HeroCarousel.tsx    — Animated Disney history carousel
│   ├── FranchiseWorlds.tsx — Interactive franchise universe cards
│   ├── FilmReel.tsx        — Auto-scrolling vintage film strip
│   ├── StoryQuiz.tsx       — Gamified "What's Your Story?" quiz
│   ├── Footer.tsx          — Enchanted map-style footer
│   └── SnowWhitePreloader.tsx — 3D book-flip loading screen
│
├── constants/
│   └── index.ts            — All static data (nav, franchises, films, quiz)
│
├── hooks/
│   ├── useAutoPlay.ts      — Carousel auto-advance hook
│   └── useParallax.ts      — Mouse-position parallax hook
│
├── assets/             ← Static image/SVG assets
├── App.tsx             ← App shell & routing
├── main.tsx            ← Vite entry point
└── index.css           ← Global Tailwind + custom animations
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#020818` (deep navy) |
| Primary Gold | `#fbbf24` → `#f59e0b` |
| Text primary | `white` |
| Text muted | `white/50` |
| Accent 1 (Pixar) | `#67e8f9` cyan |
| Accent 2 (Marvel) | `#fca5a5` rose |
| Accent 3 (Star Wars) | `#818cf8` indigo |
| Radius standard | `rounded-3xl` / `rounded-2xl` |
| Glassmorphism | `bg-white/10 backdrop-blur-xl border border-white/10` |

---

## 🛠️ Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 + Vite 7 |
| Animations | **Framer Motion** (spring physics, AnimatePresence) |
| GSAP | Preloader book-flip only |
| Physics | Matter.js (ice cubes demo) |
| Styling | Tailwind CSS v3 |
| Types | TypeScript |

---

## 🚀 Running Locally

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
```

---

## ✅ What's Done

- [x] Snow White 3D book-flip preloader
- [x] Glassmorphic floating Navbar with mobile menu
- [x] Full-screen starfield Hero section with parallax glow
- [x] Animated + swipeable Disney history carousel
- [x] Franchise World cards (Classic, Pixar, Marvel, Star Wars, Nat Geo)
- [x] Spring-animated detail modal on franchise click
- [x] Auto-scrolling vintage film reel with grain + grayscale hover
- [x] "What's Your Story?" gamified quiz
- [x] Enchanted footer with Disney+ CTA

---

## 🗺️ What to Do Next

### 🔜 Phase 2 — Interactivity
- [ ] Add **character-led navigation** (silhouette icons for each nav item)
- [ ] Wire up **smooth page routing** with React Router
- [ ] Implement **scroll-triggered section reveals** using Framer Motion `useInView`
- [ ] Connect Franchise World cards to real sub-pages (e.g. `/worlds/marvel`)

### 🔜 Phase 3 — Content
- [ ] Replace placeholder Unsplash/Wikipedia images with real Disney press kit assets
- [ ] Add a **"Now Streaming on Disney+"** horizontal scroll section
- [ ] Add a **Parks & Experiences** tease section with 3D card tilt effect
- [ ] Populate quiz result with a proper content recommendation grid

### 🔜 Phase 4 — Polish
- [ ] Add **page transition animations** between routes
- [ ] Implement **reduced-motion** media query support for accessibility
- [ ] Add keyboard navigation support for carousel (arrow keys)
- [ ] Set up SEO with proper `<title>` and `<meta>` tags per section
- [ ] Performance: lazy load images + use `loading="lazy"` on all `<img>`s

### 🧪 Phase 5 — Testing
- [ ] Add Vitest + React Testing Library
- [ ] Write unit tests for hooks (`useAutoPlay`, `useParallax`)
- [ ] Write snapshot tests for key components

---

## 🏗️ Adding a New Component

1. Create `src/components/MyComponent.tsx`
2. If it needs static data, add it to `src/constants/index.ts`
3. If it needs a custom hook, add it to `src/hooks/useMyHook.ts`
4. Import and place it in `App.tsx` in the correct section order
5. Update this README's "What's Done" checklist ✅

---

*Built as part of the IETE design challenge — Reimagine Disney.*
