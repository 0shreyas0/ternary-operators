import { useState, useRef } from "react";
import CountUp from "./CountUp";
import { useSectionObserver } from '../hooks/useActiveSection';

const CARDS = [
  {
    id: "movies",
    label: "Movies",
    headline: "Stories on the Big Screen",
    tagline: "From animated classics to Marvel blockbusters — cinema magic for every generation.",
    description: "Experience the full power of Disney storytelling in theatres worldwide. From timeless animation to MCU epics, Star Wars adventures, and Pixar masterpieces — every frame is crafted to move you.",
    accentColor: "#D4AF37",
    emoji: "",
    cta: "Explore Films",
    image: "https://thewaltdisneycompany.com/app/uploads/2026/01/Avengers_Doomsday_Teaser-A_1830_Fin16_Digital_Mech1-414x614.jpg",
    gradient: "from-amber-900/80 via-amber-800/30 to-transparent",
    statNum: 100,
    statSuffix: "+ Years of Film",
  },
  {
    id: "parks",
    label: "Parks",
    headline: "Where Magic Comes Alive",
    tagline: "Step into a world where fantasy is real and every corner holds wonder.",
    description: "12 theme parks across 6 countries. From Walt Disney World to Disneyland Paris, Tokyo Disney and beyond — our parks are where imagination has no limits and dreams truly come to life.",
    accentColor: "#60A5FA",
    emoji: "",
    cta: "Plan Your Visit",
    image: "https://thewaltdisneycompany.com/app/uploads/2023/10/main-street-balloons-768x400.png",
    gradient: "from-blue-900/80 via-blue-800/30 to-transparent",
    statNum: 12,
    statSuffix: " Parks Worldwide",
  },
  {
    id: "disneyplus",
    label: "Disney+",
    headline: "Stream Every Universe",
    tagline: "Disney, Pixar, Marvel, Star Wars, National Geographic — all in one place.",
    description: "Over 220 million subscribers. Access thousands of movies, series, shorts and originals. Disney+ brings every world home — from classic fairytales to brand-new originals made exclusively for you.",
    accentColor: "#818CF8",
    emoji: "",
    cta: "Start Streaming",
    image: "https://thewaltdisneycompany.com/app/uploads/2025/12/Brands-Graphic-768x432.jpg",
    gradient: "from-indigo-900/80 via-indigo-800/30 to-transparent",
    statNum: 220,
    statSuffix: "M+ Subscribers",
  },
  {
    id: "merch",
    label: "Merch",
    headline: "Wear Your Magic",
    tagline: "Bring the magic home. Apparel, collectibles, toys and more for every fan.",
    description: "From limited-edition figurines to everyday apparel, Disney merchandise lets you carry your favourite worlds wherever you go. Shop iconic characters, park-exclusive pieces and premium collectibles.",
    accentColor: "#F472B6",
    emoji: "",
    cta: "Shop Now",
    image: "https://thewaltdisneycompany.com/app/uploads/2026/01/ZTA2_Teaser_2nd_Knot_1s_v5.0_Mech3-414x614.jpg",
    gradient: "from-pink-900/80 via-pink-800/30 to-transparent",
    statNum: 1000,
    statSuffix: "+ Products",
  },
];

export default function DisneyWorldCards() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useSectionObserver('worlds', sectionRef);

  const selectedCard = CARDS.find((c) => c.id === selected);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        padding: "96px 16px",
        background: "#020818",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85) translateY(32px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .dw-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          flex: 1;
          min-width: 0;
        }
        .dw-card:hover {
          transform: scale(1.04) translateY(-6px);
          box-shadow: 0 28px 60px rgba(0,0,0,0.5);
        }
        .dw-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease, transform 0.7s ease;
          opacity: 0.45;
        }
        .dw-card:hover .dw-card-img {
          opacity: 0.65;
          transform: scale(1.08);
        }
        .dw-tagline {
          display: none;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          margin-top: 6px;
        }
        .dw-card:hover .dw-tagline { display: block; animation: fadeIn 0.3s ease; }

        .dw-accent-line {
          height: 2px;
          border-radius: 99px;
          margin-top: 12px;
          transform-origin: left;
          animation: lineGrow 0.6s ease 0.2s both;
        }

        .dw-modal-backdrop {
          position: fixed; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center; padding: 16px;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.25s ease;
        }
        .dw-modal {
          position: relative;
          max-width: 480px; width: 100%;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          animation: scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .dw-close {
          position: absolute; top: 16px; right: 16px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: none; cursor: pointer; color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          transition: background 0.2s;
          z-index: 2;
        }
        .dw-close:hover { background: rgba(255,255,255,0.22); }

        .dw-cta-btn {
          display: inline-block;
          margin-top: 24px;
          padding: 11px 26px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          color: #000;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .dw-cta-btn:hover { transform: scale(1.05); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
      `}</style>

      {/* ── Section header ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        maxWidth: 1280,
        margin: "0 auto 40px",
        flexWrap: "wrap",
        gap: 16,
        animation: "fadeUp 0.6s ease both",
      }}>
        <div>
          <p style={{
            color: "#D4AF37",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 10,
            margin: "0 0 10px",
          }}>
            The Walt Disney Company
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', 'Palatino Linotype', Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Everything Disney, In One Place
          </h2>
        </div>
        <p style={{
          color: "rgba(255,255,255,0.38)",
          fontSize: 13.5,
          lineHeight: 1.75,
          margin: 0,
          maxWidth: 380,
          textAlign: "right",
        }}>
          From the silver screen to theme parks, streaming to collectibles — explore every dimension of the world's most beloved entertainment company.
        </p>
      </div>

      {/* ── Card grid ── */}
      <div style={{
        display: "flex",
        gap: 16,
        maxWidth: 1280,
        margin: "0 auto",
        flexWrap: "wrap",
      }}>
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="dw-card"
            style={{
              height: 380,
              animation: "fadeUp 0.6s ease both",
              animationDelay: `${0.1 + i * 0.1}s`,
              borderColor: hovered === card.id ? `${card.accentColor}55` : "rgba(255,255,255,0.08)",
            }}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(card.id)}
          >
            {/* Background image */}
            <div style={{ position: "absolute", inset: 0 }}>
              <img
                src={card.image}
                alt={card.label}
                className="dw-card-img"
              />
              {/* Color gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)`,
              }} />
              {/* Accent tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${card.accentColor}22 0%, transparent 60%)`,
                opacity: hovered === card.id ? 1 : 0,
                transition: "opacity 0.4s ease",
              }} />
            </div>

            {/* Card content */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              padding: "24px 22px",
            }}>
              {/* Accent label */}
              <div style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: card.accentColor,
                marginBottom: 6,
              }}>
                <CountUp from={0} to={card.statNum} duration={0.8} separator="," />{card.statSuffix}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 4px",
                lineHeight: 1.2,
              }}>
                {card.label}
              </h3>

              {/* Tagline — shows on hover */}
              <p className="dw-tagline">{card.tagline}</p>

              {/* Accent line */}
              {hovered === card.id && (
                <div
                  className="dw-accent-line"
                  style={{ background: card.accentColor, width: "100%" }}
                />
              )}
            </div>

            {/* Hover glow border */}
            {hovered === card.id && (
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: 24,
                boxShadow: `inset 0 0 0 1.5px ${card.accentColor}66`,
                pointerEvents: "none",
                animation: "fadeIn 0.2s ease",
              }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {selected && selectedCard && (
        <div className="dw-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="dw-modal" onClick={(e) => e.stopPropagation()}>
            {/* Hero image */}
            <div style={{ position: "relative", height: 200 }}>
              <img
                src={selectedCard.image}
                alt={selectedCard.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, #0a0a1a 0%, transparent 60%)`,
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${selectedCard.accentColor}33 0%, transparent 50%)`,
              }} />
            </div>

            {/* Modal body */}
            <div style={{ background: "#0a0a1a", padding: "28px 32px 36px" }}>
              <button className="dw-close" onClick={() => setSelected(null)}>✕</button>

              <div style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: selectedCard.accentColor,
                marginBottom: 8,
              }}>
                <CountUp from={0} to={selectedCard.statNum} duration={0.8} separator="," startWhen={!!selected} />{selectedCard.statSuffix}
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 30,
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 12px",
                lineHeight: 1.15,
              }}>
                {selectedCard.headline}
              </h3>

              <p style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 14,
                lineHeight: 1.75,
                margin: 0,
              }}>
                {selectedCard.description}
              </p>

              <button
                className="dw-cta-btn"
                style={{ background: selectedCard.accentColor }}
                onClick={() => setSelected(null)}
              >
                {selectedCard.cta} →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}