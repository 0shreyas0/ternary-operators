import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSectionObserver } from '../hooks/useActiveSection';
import magicKingdomImg from "../assets/magic kingdom.png";
import epcotImg from "../assets/epcot.png";
import animalKingdomImg from "../assets/animal kingdom.png";
import disneylandImg from "../assets/disneyland.png";
import disneylandCaliforniaImg from "../assets/Disney California Adventure.png";
import disneylandParisImg from "../assets/disneyland paris.png";
import waltDisneyStudiosImg from "../assets/Walt Disney Studios Park.png";
import tokyoDisneyImg from "../assets/tokyo disney.png";
import tokyoDisneySeaImg from "../assets/Tokyo DisneySea.png";
import hongKongImg from "../assets/Hong Kong Disneyland.png";
import shanghaiImg from "../assets/Shanghai Disneyland.png";
import bg1 from '../assets/background1.webp';
import CountUp from "./CountUp";

const PARKS = [
  {
    id: 1,
    name: "Magic Kingdom",
    location: "Orlando, Florida, USA",
    flag: "🇺🇸",
    since: "Est. 1971",
    tag: "Walt Disney World Resort",
    description:
      "The most visited theme park on Earth. Home to the iconic Cinderella Castle, Space Mountain, and the parade of your childhood dreams. Magic Kingdom is where Walt's original vision lives in its fullest form — a place where every Main Street stroll feels like the opening scene of a fairy tale.",
    highlights: ["Cinderella Castle", "Space Mountain", "TRON Lightcycle / Run"],
    image: magicKingdomImg,
    fallback: "https://images.unsplash.com/photo-1559752977-e61ea6c6e370?w=1200&q=80",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "EPCOT",
    location: "Orlando, Florida, USA",
    flag: "🇺🇸",
    since: "Est. 1982",
    tag: "Walt Disney World Resort",
    description:
      "Part world's fair, part future utopia. EPCOT invites you to journey through 11 countries in World Showcase, blast into space on Guardians of the Galaxy, and celebrate the ingenuity of humanity across its four interconnected neighbourhoods. Equal parts educational and extraordinary.",
    highlights: ["World Showcase", "Guardians of the Galaxy", "Remy's Ratatouille Adventure"],
    image: epcotImg,
    fallback: "https://images.unsplash.com/photo-1580058572462-98e2c0e0e2f0?w=1200&q=80",
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "Hollywood Studios",
    location: "Orlando, Florida, USA",
    flag: "🇺🇸",
    since: "Est. 1989",
    tag: "Walt Disney World Resort",
    description:
      "Step into the silver screen. From Star Wars: Galaxy's Edge — where you pilot the Millennium Falcon — to Toy Story Land and the terrifying Tower of Terror, Hollywood Studios is a love letter to cinema wrapped in unforgettable adventure.",
    highlights: ["Star Wars: Galaxy's Edge", "Tower of Terror", "Slinky Dog Dash"],
    image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "Animal Kingdom",
    location: "Orlando, Florida, USA",
    flag: "🇺🇸",
    since: "Est. 1998",
    tag: "Walt Disney World Resort",
    description:
      "The largest Disney theme park in the world at 580 acres. Animal Kingdom blends conservation, nature, and storytelling — from the ancient baobab Tree of Life to the bioluminescent wonders of Pandora, Avatar's moon come to life. A park unlike any other on Earth.",
    highlights: ["Pandora – Avatar", "Tree of Life", "Kilimanjaro Safaris"],
    image: animalKingdomImg,
    fallback: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80",
    color: "#10B981",
  },
  {
    id: 5,
    name: "Disneyland Park",
    location: "Anaheim, California, USA",
    flag: "🇺🇸",
    since: "Est. 1955",
    tag: "Disneyland Resort",
    description:
      "Where it all began. On July 17, 1955, Walt Disney opened a park unlike anything the world had seen. Seven decades on, Disneyland California still carries the magic of the original — Sleeping Beauty Castle, the Haunted Mansion, Indiana Jones, and the spirit of Walt himself on every cobblestone.",
    highlights: ["Sleeping Beauty Castle", "Haunted Mansion", "Indiana Jones Adventure"],
    image: disneylandImg,
    fallback: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80",
    color: "#EF4444",
  },
  {
    id: 6,
    name: "Disney California Adventure",
    location: "Anaheim, California, USA",
    flag: "🇺🇸",
    since: "Est. 2001",
    tag: "Disneyland Resort",
    description:
      "A sun-drenched celebration of California culture and Disney storytelling. From the roaring thrills of Radiator Springs Racers on Route 66 to Avengers Campus — where heroes walk among you — DCA is the West Coast's most vibrant theme park experience.",
    highlights: ["Avengers Campus", "Guardians of the Galaxy", "Radiator Springs Racers"],
    image: disneylandCaliforniaImg,
    fallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    color: "#F97316",
  },
  {
    id: 7,
    name: "Disneyland Paris",
    location: "Marne-la-Vallée, France",
    flag: "🇫🇷",
    since: "Est. 1992",
    tag: "Disneyland Paris Resort",
    description:
      "Europe's enchanted kingdom. With a pink-hued castle uniquely designed for Paris's grey skies, a dragon sleeping beneath it, and the fastest Space Mountain in the world, Disneyland Paris fuses classic Disney with distinctly French grandeur. The continent's most visited tourist attraction.",
    highlights: ["Le Château de la Belle au Bois Dormant", "Star Wars Hyperspace Mountain", "Pirates of the Caribbean"],
    image: disneylandParisImg,
    fallback: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
    color: "#EC4899",
  },
  {
    id: 8,
    name: "Walt Disney Studios Park",
    location: "Marne-la-Vallée, France",
    flag: "🇫🇷",
    since: "Est. 2002",
    tag: "Disneyland Paris Resort",
    description:
      "Lights, camera, magic. Sitting beside its sister park, Walt Disney Studios Park celebrates the art of filmmaking with Marvel, Pixar, and Disney characters at the centre of every experience. The ongoing Avengers Campus and Cars Road Trip expansions are making this one of Europe's most exciting parks.",
    highlights: ["Avengers Campus Paris", "The Twilight Zone Tower of Terror", "Ratatouille: The Adventure"],
    image: waltDisneyStudiosImg,
    fallback: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
    color: "#6366F1",
  },
  {
    id: 9,
    name: "Tokyo Disneyland",
    location: "Urayasu, Chiba, Japan",
    flag: "🇯🇵",
    since: "Est. 1983",
    tag: "Tokyo Disney Resort",
    description:
      "The first Disney park outside America — and arguably the most meticulously maintained. Tokyo Disneyland is renowned for its extraordinary cleanliness, impeccable service, and exclusive attractions found nowhere else on Earth. A love letter to the original, perfected by Japanese craftsmanship.",
    highlights: ["Cinderella Castle", "Monsters Inc. Ride & Go Seek", "Pooh's Hunny Hunt"],
    image: tokyoDisneyImg,
    fallback: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&q=80",
    color: "#14B8A6",
  },
  {
    id: 10,
    name: "Tokyo DisneySea",
    location: "Urayasu, Chiba, Japan",
    flag: "🇯🇵",
    since: "Est. 2001",
    tag: "Tokyo Disney Resort",
    description:
      "Consistently ranked the world's most beautiful theme park. Tokyo DisneySea is built around seven nautical-themed 'ports of call', dominated by the awe-inspiring Mt. Prometheus volcano. From Sinbad's Storybook Voyage to the new Fantasy Springs, this is Disney at its most breathtaking.",
    highlights: ["Fantasy Springs", "Journey to the Center of the Earth", "Indiana Jones Adventure"],
    image: tokyoDisneySeaImg,
    fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    color: "#0EA5E9",
  },
  {
    id: 11,
    name: "Hong Kong Disneyland",
    location: "Lantau Island, Hong Kong",
    flag: "🇭🇰",
    since: "Est. 2005",
    tag: "Hong Kong Disneyland Resort",
    description:
      "Intimate, beautiful, and thoughtfully designed with feng shui principles at its heart. Hong Kong Disneyland features one of Disney's most stunning castles and a Marvel-themed area that brings Iron Man, Ant-Man, and the Avengers to life across immersive lands built for the modern fan.",
    highlights: ["Castle of Magical Dreams", "Ant-Man and The Wasp: Nano Battle!", "Mystic Manor"],
    image: hongKongImg,
    fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
    color: "#D946EF",
  },
  {
    id: 12,
    name: "Shanghai Disneyland",
    location: "Pudong, Shanghai, China",
    flag: "🇨🇳",
    since: "Est. 2016",
    tag: "Shanghai Disney Resort",
    description:
      "The newest and most technologically advanced Disney theme park ever built. Shanghai Disneyland's Enchanted Storybook Castle is the largest in any Disney park — soaring 197 feet into the sky. Authentically Disney, distinctly Chinese, and audaciously ambitious in every detail.",
    highlights: ["Enchanted Storybook Castle", "TRON Lightcycle Power Run", "Zootopia Land"],
    image: shanghaiImg,
    fallback: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80",
    color: "#D2042D", // Darkened ruby red
  },
];


// ── Static Background Park Ticket ─────────────────────────────────────────────
const FloatingTicket = ({
  top, left, rotate, parkName, color
}: {
  top: string; left: string;
  rotate: number; parkName: string; color: string;
}) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        rotate,
        zIndex: 0,
        transformOrigin: "center center",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{
        x: [0, 8, -6, 0],
        y: [0, -12, 6, 0],
        rotate: [rotate, rotate + 3, rotate - 2, rotate],
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 16 + Math.random() * 8, // Very slow continuous drift
        repeat: Infinity,
        ease: "easeInOut" 
      }}
      whileHover={{
        scale: 1.04,
        rotate: rotate + 2,
        transition: { duration: 0.3, ease: "easeOut", repeat: 0 },
      }}
      className="pointer-events-auto"
    >
      {/* ── Ticket body: massive rectangle ── */}
      <div style={{
        width: 520,
        height: 200,
        borderRadius: 16,
        background: color,
        boxShadow: `0 20px 50px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.1)`,
        display: "flex",
        overflow: "visible", // so cutouts show up outside properly
        position: "relative",
      }}>

        {/* Left stub (tear zone) */}
        <div style={{
          width: 140,
          borderRight: "4px dashed rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 12px",
          flexShrink: 0,
          background: "rgba(0,0,0,0.02)",
          gap: 12,
          position: "relative",
        }}>
           {/* Left notch circle - match parent background precisely */}
          <div style={{
            position: "absolute",
            left: -20, top: "50%",
            transform: "translateY(-50%)",
            width: 40, height: 40, borderRadius: "50%",
            background: "#020818", 
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)"
          }} />

          {/* Perforation dots */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "rgba(0,0,0,0.1)",
            }} />
          ))}
        </div>

        {/* Main ticket area */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "24px 44px",
          position: "relative",
        }}>
          {/* Scanline texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.02) 4px, rgba(0,0,0,0.02) 6px)",
            pointerEvents: "none",
          }} />

          <div style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
            marginBottom: 8,
          }}>ADMIT ONE</div>

          <div style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: "rgba(0,0,0,0.85)",
            textTransform: "uppercase",
            lineHeight: 1.15,
            paddingBottom: 4,
            width: "100%",
            whiteSpace: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {parkName}
          </div>

          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(0,0,0,0.35)",
            marginTop: 12,
            letterSpacing: "0.15em",
          }}>DISNEY PARKS · VALID FOR ENTRY</div>
        </div>

        {/* Right notch circle */}
        <div style={{
          position: "absolute",
          right: -20, top: "50%",
          transform: "translateY(-50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "#020818", 
          boxShadow: "inset 3px 0 6px rgba(0,0,0,0.4)"
        }} />
      </div>
    </motion.div>
  );
};

// Vintage cream palettes
const TICKET_COLORS = [
  "#FDF5E6", // Old Lace
  "#FAF0E6", // Linen
  "#FFF8DC", // Cornsilk
  "#F5F5DC", // Beige
];

const TICKETS = [
  { top: "5%", left: "5%", rotate: -12, color: TICKET_COLORS[0], parkName: "Magic Kingdom" },
  { top: "25%", left: "65%", rotate: 8, color: TICKET_COLORS[1], parkName: "EPCOT" },
  { top: "45%", left: "10%", rotate: -5, color: TICKET_COLORS[2], parkName: "Disneyland Park" },
  { top: "65%", left: "60%", rotate: 14, color: TICKET_COLORS[3], parkName: "Disney's Animal Kingdom" },
  { top: "82%", left: "5%", rotate: -18, color: TICKET_COLORS[1], parkName: "Tokyo DisneySea" },
  { top: "95%", left: "55%", rotate: 6, color: TICKET_COLORS[0], parkName: "Disneyland Paris Theme Park" }
];

function ParkImage({ park, active }: { park: typeof PARKS[0]; active: boolean }) {
  const [error, setError] = useState(false);

  // If the image prop changes (e.g. from hot reload), reset error state
  useEffect(() => {
    setError(false);
  }, [park.image]);

  return (
    <img
      src={error ? park.fallback : park.image}
      alt={park.name}
      onError={() => setError(true)}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
        transition: "opacity 0.6s ease, transform 0.8s ease",
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(1.04)",
      }}
    />
  );
}

export default function DisneyParksSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  useSectionObserver("parks", sectionRef);

  const goTo = (i: number) => {
    if (i === active || animating) return;
    setAnimating(true);
    setActive(i);
    setTimeout(() => setAnimating(false), 600);
  };

  // Keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goTo(Math.min(active + 1, PARKS.length - 1));
      if (e.key === "ArrowUp") goTo(Math.max(active - 1, 0));
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [active, animating]);

  // Auto-scroll list to keep active item visible — strictly on actual changes
  const prevActive = useRef(active);
  useEffect(() => {
    if (prevActive.current === active) return; // Skip initial render & StrictMode remounts
    const el = itemRefs.current[active];
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    prevActive.current = active;
  }, [active]);

  const park = PARKS[active];

  return (
    <section 
      ref={sectionRef}
      style={{
      backgroundColor: "#21182A",
      padding: "80px 0",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* ── Background Image Layer ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.08,
        filter: "grayscale(100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Ambient floating tickets */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {TICKETS.map((t, i) => (
          <FloatingTicket key={i} {...t} />
        ))}
        {/* Dark dimming overlay to ensure white text remains perfectly legible over bright cream tickets */}
        <div className="absolute inset-0 bg-[#020818]/85 z-10 pointer-events-none" />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 40px; }
        }

        .parks-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 clamp(20px, 5vw, 72px);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .parks-grid {
          display: grid;
          grid-template-columns: 300px 1fr 380px;
          gap: 0;
          padding: 0 clamp(20px, 5vw, 72px);
          min-height: 560px;
          position: relative;
          z-index: 1;
        }

        .parks-left {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.07);
          padding-right: 24px;
        }

        .parks-center {
          position: relative;
          margin: 0 24px;
          border-radius: 20px;
          overflow: hidden;
          min-height: 520px;
        }

        .parks-right {
          border-left: 1px solid rgba(255,255,255,0.07);
          padding-left: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 1150px) {
          .parks-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .parks-left {
            border-right: none;
            padding-right: 0;
            max-height: 400px; /* Constrain list height on mobile */
          }
          .parks-center {
            margin: 0;
            min-height: 480px;
          }
          .parks-right {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(255,255,255,0.07);
            padding-top: 32px;
          }
          .parks-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .parks-header-desc {
            text-align: left !important;
          }
        }

        .parks-list::-webkit-scrollbar { display: none; }
        .parks-list { -ms-overflow-style: none; scrollbar-width: none; }

        .park-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
          border: 1px solid transparent;
        }
        .park-item:hover { background: rgba(255,255,255,0.05); }
        .park-item.active-park {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.1);
        }

        .highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
          white-space: nowrap;
        }

        .visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          color: #020818;
        }
        .visit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        .arrow-nav {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .arrow-nav:hover { background: rgba(255,255,255,0.12); color: white; border-color: rgba(255,255,255,0.3); }
        .arrow-nav:disabled { opacity: 0.2; cursor: default; pointer-events: none; }
      `}</style>

      {/* ── Section header ── */}
      <div className="parks-header">
        <div>
          <p style={{
            color: "#D4AF37",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: "0 0 10px",
          }}>
            The Walt Disney Company
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            <CountUp to={12} duration={0.8} /> Parks. <CountUp to={4} duration={0.8} /> Countries. One Magic.
          </h2>
        </div>
        <p className="parks-header-desc" style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: 13,
          lineHeight: 1.75,
          margin: 0,
          maxWidth: 360,
          textAlign: "right",
        }}>
          From the original Disneyland in California to the towering castles of Shanghai and Tokyo — every park is a world unto itself.
        </p>
      </div>

      {/* ── Main layout ── */}
      <div className="parks-grid">

        {/* ── LEFT: Park list ── */}
        <div className="parks-left">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
              All Locations
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="arrow-nav" disabled={active === 0} onClick={() => goTo(active - 1)}>↑</button>
              <button className="arrow-nav" disabled={active === PARKS.length - 1} onClick={() => goTo(active + 1)}>↓</button>
            </div>
          </div>

          <div
            ref={listRef}
            className="parks-list"
            style={{ overflowY: "auto", flex: 1, paddingRight: 4 }}
          >
            {PARKS.map((p, i) => (
              <div
                key={p.id}
                ref={el => { itemRefs.current[i] = el as HTMLDivElement | null; }}
                className={`park-item ${i === active ? "active-park" : ""}`}
                onClick={() => goTo(i)}
              >
                {/* Number */}
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: i === active ? p.color : "rgba(255,255,255,0.2)",
                  minWidth: 22,
                  transition: "color 0.3s",
                }}>
                  <CountUp from={0} to={i + 1} duration={0.8} padZero />
                </span>

                {/* Name + location */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: i === active ? 700 : 500,
                    color: i === active ? "#fff" : "rgba(255,255,255,0.5)",
                    transition: "color 0.3s, font-weight 0.2s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.3,
                  }}>
                    {p.flag} {p.name}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.25)",
                    marginTop: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {p.location}
                  </div>
                </div>

                {/* Active indicator */}
                {i === active && (
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: p.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${p.color}`,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: Park image ── */}
        <div className="parks-center">
          {PARKS.map((p, i) => (
            <ParkImage key={p.id} park={p} active={i === active} />
          ))}

          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(33,24,42,0.85) 0%, rgba(33,24,42,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Bottom overlay: since + tag */}
          <div style={{
            position: "absolute",
            bottom: 20, left: 20, right: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}>
            <div key={`tag-${active}`} style={{ animation: "fadeUp 0.5s ease both" }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: park.color,
                marginBottom: 4,
              }}>{park.tag}</div>
              <div style={{
                color: "white",
                lineHeight: 1.1,
              }}>{park.name}</div>
            </div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}>Est. <CountUp from={1900} to={parseInt(park.since.replace(/\D/g, ''))} duration={0.8} /></div>
          </div>

          {/* Progress bar */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 2,
            background: "rgba(255,255,255,0.08)",
          }}>
            <div style={{
              height: "100%",
              width: `${((active + 1) / PARKS.length) * 100}%`,
              background: park.color,
              transition: "width 0.5s ease, background 0.5s ease",
            }} />
          </div>
        </div>

        {/* ── RIGHT: Description panel ── */}
        <div
          key={active}
          className="parks-right"
          style={{ animation: "slideRight 0.5s ease both" }}
        >
          {/* Location badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: park.color,
              boxShadow: `0 0 10px ${park.color}`,
            }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: park.color }}>
              {park.location}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 15,
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.65)",
            margin: "0 0 28px",
            fontWeight: 400,
          }}>
            {park.description}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: 36 }}>
            <p style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 12,
            }}>
              Must-Experience
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {park.highlights.map((h) => (
                <span key={h} className="highlight-pill">
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: park.color, display: "inline-block", flexShrink: 0 }} />
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://disneyparks.disney.go.com/disney-vacations/"
            target="_blank"
            rel="noreferrer"
            className="visit-btn"
            style={{ background: park.color, alignSelf: "flex-start", transition: "background 0.4s, transform 0.25s, box-shadow 0.25s" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#020818" strokeWidth="1.5" />
              <path d="M5 8h6M9 6l2 2-2 2" stroke="#020818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Plan Your Visit
          </a>

          {/* Park counter */}
          <div style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>
              {PARKS.length} Parks
            </span>
          </div>
        </div>
      </div>
    </section >
  );
}