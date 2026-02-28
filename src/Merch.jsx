import { useState, useRef } from "react";
import bg3 from './assets/background3.jpg';
import CountUp from "./components/CountUp";
import { useSectionObserver } from './hooks/useActiveSection';

/* ─── Catalogue ─────────────────────────────────────────────────────────── */
const MERCH = [
    {
        id: 1,
        category: "Dolls",
        badge: "NEW ARRIVALS",
        title: "Disney Princess Dolls",
        subtitle: "Fashion & Fantasy",
        price: "From $19.99",
        description:
            "Step into a world of enchantment with our Disney Princess doll collection. From Cinderella's glittering gown to Moana's ocean spirit, every doll is hand-finished with couture-level detail — available in classic, fashion and poseable styles.",
        tags: ["Cinderella", "Moana", "Ariel"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061057004045?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/toys/dolls-and-plush/dolls/",
    },
    {
        id: 2,
        category: "Limited Edition",
        badge: "SELLING FAST",
        title: "Limited Edition Collectibles",
        subtitle: "Exclusive · Numbered",
        price: "From $49.99",
        description:
            "Own a piece of Disney history. Our limited-edition collectibles are individually numbered, artist-signed and produced in strictly controlled quantities — from shimmering castle figurines to 100th-anniversary pin sets.",
        tags: ["Numbered Runs", "Artist Series", "Anniversary"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/400171536174?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/collections/limited-edition/",
    },
    {
        id: 3,
        category: "Action Figures",
        badge: "FAN FAVOURITE",
        title: "Marvel & Star Wars Figures",
        subtitle: "Poseable · Detailed",
        price: "From $14.99",
        description:
            "Premium articulated action figures from across the Marvel Universe and a galaxy far, far away. Iron Man, The Mandalorian, Darth Vader — each ships with authentic accessories and display-ready packaging.",
        tags: ["Iron Man", "The Mandalorian", "Darth Vader"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061056802701?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/toys/action-figures-and-playsets/",
    },
    {
        id: 4,
        category: "Plushies",
        badge: "BESTSELLER",
        title: "Plush Pals Collection",
        subtitle: "Huggable · Adorable",
        price: "From $12.99",
        description:
            "Soft, squeezable and impossibly cute. From the iconic Stitch to precious Grogu, each plushie is crafted from premium materials for maximum snuggle-ability. Perfect for gifting at any age.",
        tags: ["Grogu", "Stitch", "Winnie the Pooh"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061054939849?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/toys/dolls-and-plush/plush/",
    },
    {
        id: 5,
        category: "Apparel",
        badge: "TRENDING",
        title: "Disney Fashion & Apparel",
        subtitle: "Wear the Magic",
        price: "From $24.99",
        description:
            "From cosy Stitch loungewear and vintage Mickey tees to sleek Marvel hoodies and Star Wars jackets — our fashion line blends streetwear aesthetics with timeless Disney magic, in sizes for everyone.",
        tags: ["Hoodies", "Tees", "Loungewear"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061057188985?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/apparel/",
    },
    {
        id: 6,
        category: "Accessories",
        badge: "NEW IN",
        title: "Bags, Pins & Jewellery",
        subtitle: "Styled · Playful",
        price: "From $9.99",
        description:
            "Complete your Disney look with our iconic accessories. Enamel pins, charm bracelets, mini backpacks and trading pins beloved by collectors worldwide — mix and match to build a look as unique as your favourite story.",
        tags: ["Enamel Pins", "Charm Bracelets", "Mini Bags"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061057121302?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/accessories/",
    },
    {
        id: 7,
        category: "Home & Living",
        badge: "POPULAR",
        title: "Disney Home Collection",
        subtitle: "Décor · Kitchenware",
        price: "From $15.99",
        description:
            "From Mickey-shaped waffle makers and character mugs to enchanting wall art and plush throw pillows, our Home Collection transforms everyday spaces into something truly magical. Every room deserves a little pixie dust.",
        tags: ["Kitchenware", "Wall Décor", "Mugs"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061057059267?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/home/",
    },
    {
        id: 8,
        category: "LEGO Sets",
        badge: "EXCLUSIVE",
        title: "Disney × LEGO",
        subtitle: "Build the Magic",
        price: "From $39.99",
        description:
            "Build iconic Disney landmarks brick by brick. Cinderella's Castle, the Millennium Falcon, the Avengers Tower — these certified collector sets are as satisfying to build as they are stunning to display.",
        tags: ["Cinderella's Castle", "Millennium Falcon", "Haunted Mansion"],
        image: "https://cdn1.shopdisney.com/is/image/DisneyShopping/3061056873497?$full$&fmt=webp",
        imgAlt: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
        shopUrl: "https://www.shopdisney.com/brands/lego/",
    },
];

const BLUE = "#0063E5";

/* ─── Card ──────────────────────────────────────────────────────────────── */
function MerchCard({ item, isSelected, anySelected, onSelect }) {
    const [imgSrc, setImgSrc] = useState(item.image);

    return (
        <div
            onClick={() => onSelect(isSelected ? null : item.id)}
            style={{
                /* ── Fixed size for ALL cards ── */
                flexShrink: 0,
                width: 272,
                borderRadius: 16,
                overflow: "hidden",
                background: "#0a101e",
                border: isSelected
                    ? "1.5px solid rgba(255,255,255,0.18)"
                    : "1.5px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                zIndex: isSelected ? 10 : 1,

                /* ── Selected: scale up + deep shadow; resting: subtle shadow ── */
                transform: isSelected
                    ? "scale(1.07) translateY(-10px)"
                    : "scale(1) translateY(0)",
                boxShadow: isSelected
                    ? "0 40px 80px rgba(0,0,0,0.85), 0 16px 32px rgba(0,0,0,0.65)"
                    : "0 4px 16px rgba(0,0,0,0.5)",

                /* ── Dim un-selected cards when something IS selected ── */
                opacity: anySelected && !isSelected ? 0.42 : 1,

                transition: [
                    "transform 0.36s cubic-bezier(.34,1.4,.64,1)",
                    "box-shadow 0.36s ease",
                    "opacity 0.3s ease",
                    "border-color 0.3s ease",
                ].join(", "),
            }}
        >
            {/* ══ TEXT BLOCK ═══════════════════════════════════════════════════ */}
            <div style={{ padding: "20px 20px 16px" }}>

                {/* Badge + category row */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                }}>
                    <span style={{
                        fontSize: 8.5,
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: BLUE,
                        background: "rgba(0,99,229,0.12)",
                        border: "1px solid rgba(0,99,229,0.3)",
                        borderRadius: 4,
                        padding: "3px 9px",
                    }}>
                        {item.badge}
                    </span>
                    <span style={{
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.28)",
                    }}>
                        {item.category}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#fff",
                    margin: "0 0 3px",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                }}>
                    {item.title}
                </h3>

                {/* Subtitle */}
                <p style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.32)",
                    fontWeight: 500,
                    margin: "0 0 13px",
                    letterSpacing: "0.02em",
                }}>
                    {item.subtitle}
                </p>

                {/* Divider */}
                <div style={{
                    height: 1,
                    background: "rgba(255,255,255,0.07)",
                    marginBottom: 13,
                }} />

                {/* Tags */}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {item.tags.map((tag) => (
                        <span key={tag} style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.4)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 4,
                            padding: "2px 8px",
                            whiteSpace: "nowrap",
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* ══ IMAGE BLOCK ══════════════════════════════════════════════════ */}
            <div style={{
                position: "relative",
                width: "100%",
                height: 200,
                overflow: "hidden",
                flexShrink: 0,
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
                <img
                    src={imgSrc}
                    alt={item.title}
                    onError={() => setImgSrc(item.imgAlt)}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease, filter 0.4s ease",
                        transform: isSelected ? "scale(1.06)" : "scale(1)",
                        filter: isSelected ? "brightness(0.32)" : "brightness(0.88)",
                    }}
                />

                {/* Top vignette so image blends into card body */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 36,
                    background: "linear-gradient(to bottom, #0a101e 0%, transparent 100%)",
                    pointerEvents: "none",
                }} />

                {/* ── RESTING: price strip ────────────────────── */}
                <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "32px 16px 14px",
                    background: "linear-gradient(to top, rgba(10,16,30,0.96) 0%, transparent 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "opacity 0.28s ease",
                    opacity: isSelected ? 0 : 1,
                    pointerEvents: isSelected ? "none" : "auto",
                }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
                        {item.price}
                    </span>
                    <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.04em",
                    }}>
                        Tap to explore
                    </span>
                </div>

                {/* ── SELECTED: description panel slides up ── */}
                <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "14px 16px 16px",
                    background: "rgba(6, 10, 22, 0.97)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    transform: isSelected ? "translateY(0)" : "translateY(105%)",
                    transition: "transform 0.38s cubic-bezier(.22,1,.36,1)",
                }}>
                    <p style={{
                        fontSize: 12,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.72)",
                        margin: "0 0 14px",
                    }}>
                        {item.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#fff",
                            whiteSpace: "nowrap",
                        }}>
                            {item.price}
                        </span>
                        <a
                            href={item.shopUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="liquid-glass-sm"
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                padding: "9px 0",
                                borderRadius: 6,
                                fontSize: 10.5,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                        >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="6" x2="21" y2="6"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M16 10a4 4 0 01-8 0"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Get Your Fave Merch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function MerchSection() {
    const [selected, setSelected] = useState(null);
    const stripRef = useRef(null);
    const sectionRef = useRef(null);
    const isDragging = useRef(false);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeftRef = useRef(0);

    useSectionObserver("merch", sectionRef);

    const anySelected = selected !== null;

    /* Drag-to-scroll */
    const onMouseDown = (e) => {
        if (!stripRef.current) return;
        isDown.current = true;
        isDragging.current = false;
        startX.current = e.pageX - stripRef.current.offsetLeft;
        scrollLeftRef.current = stripRef.current.scrollLeft;
        stripRef.current.style.cursor = "grabbing";
    };
    const onMouseMove = (e) => {
        if (!isDown.current || !stripRef.current) return;
        const x = e.pageX - stripRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.6;
        if (Math.abs(walk) > 5) isDragging.current = true;
        stripRef.current.scrollLeft = scrollLeftRef.current - walk;
    };
    const onMouseUp = () => {
        if (!stripRef.current) return;
        isDown.current = false;
        stripRef.current.style.cursor = "grab";
        setTimeout(() => { isDragging.current = false; }, 50);
    };

    const scrollBy = (dir) => {
        if (!stripRef.current) return;
        stripRef.current.scrollBy({ left: dir * 310, behavior: "smooth" });
    };

    return (
        <section ref={sectionRef} style={{
            backgroundColor: "transparent",
            padding: "80px 0 96px",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            overflow: "hidden",
            position: "relative",
        }}>
            {/* ── Background Image Layers ── */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${bg3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.1,
                filter: "grayscale(100%)",
                pointerEvents: "none",
                zIndex: 0,
            }} />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        .merch-strip::-webkit-scrollbar { display: none; }
        .merch-strip { -ms-overflow-style: none; scrollbar-width: none; }

        .m-nav {
          width: 40px; height: 40px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .m-nav:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.22);
          color: #fff;
        }

        /* ── iOS-style liquid glass button ── */
        .liquid-glass {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(28px) saturate(180%) brightness(1.15);
          -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.15);
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.45),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            inset 1px 0 0 rgba(255,255,255,0.08),
            inset -1px 0 0 rgba(255,255,255,0.08),
            0 8px 32px rgba(0,0,0,0.35);
          color: rgba(255,255,255,0.92);
          transition: all 0.22s ease;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(
            160deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 60%,
            transparent 100%
          );
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
        }
        .liquid-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            ellipse at 50% 0%,
            rgba(255,255,255,0.12) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 2;
        }
        .liquid-glass > * { position: relative; z-index: 3; }
        .liquid-glass:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.42);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.55),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            inset 1px 0 0 rgba(255,255,255,0.1),
            inset -1px 0 0 rgba(255,255,255,0.1),
            0 12px 40px rgba(0,0,0,0.45);
          color: #fff;
        }

        /* smaller pill variant used inside card */
        .liquid-glass-sm {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.24);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.38),
            inset 0 -1px 0 rgba(0,0,0,0.14),
            0 4px 16px rgba(0,0,0,0.3);
          color: rgba(255,255,255,0.88);
          transition: all 0.2s ease;
        }
        .liquid-glass-sm::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 100%);
          border-radius: inherit; pointer-events: none; z-index: 1;
        }
        .liquid-glass-sm > * { position: relative; z-index: 2; }
        .liquid-glass-sm:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.38);
          color: #fff;
        }

        .merch-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 clamp(20px, 5vw, 72px);
          margin-bottom: 44px;
        }

        .merch-stats {
          display: flex;
          justify-content: center;
          gap: clamp(24px, 6vw, 72px);
          padding: 40px clamp(20px, 5vw, 72px) 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        @media (max-width: 768px) {
          .merch-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .merch-header-desc {
            max-width: 100% !important;
          }
          .merch-stats {
            flex-wrap: wrap;
            row-gap: 32px;
          }
          .merch-stats > div {
            flex: 1 1 40%;
            min-width: 120px;
          }
        }
      `}</style>

            {/* ── Header ────────────────────────────────────────────────────── */}
            <div className="merch-header">

                <div>
                    <p style={{
                        color: "#818CF8", fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.28em", textTransform: "uppercase",
                        margin: "0 0 10px",
                    }}>
                        ShopDisney
                    </p>
                    <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(26px, 3.5vw, 42px)",
                        fontWeight: 700, color: "#ffffff",
                        margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1,
                    }}>
                        Magic You Can Hold.
                    </h2>
                    <p className="merch-header-desc" style={{
                        marginTop: 8, fontSize: 13, lineHeight: 1.7,
                        color: "rgba(255,255,255,0.3)", maxWidth: 380,
                    }}>
                        Official Disney merchandise — dolls, plushies, collectibles & more.{" "}
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Click any card to explore.</span>
                    </p>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button className="m-nav" onClick={() => scrollBy(-1)} aria-label="Previous">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="m-nav" onClick={() => scrollBy(1)} aria-label="Next">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <a
                        href="https://www.shopdisney.com"
                        target="_blank"
                        rel="noreferrer"
                        className="liquid-glass"
                        style={{
                            marginLeft: 6,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "9px 20px",
                            borderRadius: 8,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                    >
                        Shop All
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor"
                                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

            </div>

            {/* ── Carousel ──────────────────────────────────────────────────── */}
            <div style={{ position: "relative" }}>
                {/* Left fade */}
                <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: "clamp(20px, 5vw, 72px)",
                    background: "linear-gradient(90deg, #21182A 0%, transparent 100%)",
                    pointerEvents: "none", zIndex: 20,
                }} />
                {/* Right fade */}
                <div style={{
                    position: "absolute", right: 0, top: 0, bottom: 0,
                    width: "clamp(20px, 5vw, 72px)",
                    background: "linear-gradient(270deg, #21182A 0%, transparent 100%)",
                    pointerEvents: "none", zIndex: 20,
                }} />

                <div
                    ref={stripRef}
                    className="merch-strip"
                    style={{
                        display: "flex",
                        gap: 16,
                        overflowX: "auto",
                        padding: "16px clamp(20px, 5vw, 72px) 40px",
                        cursor: "grab",
                        /* Give cards vertical room to scale without clipping */
                        paddingTop: 24,
                        paddingBottom: 48,
                        alignItems: "flex-start",
                    }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                >
                    {MERCH.map((item) => (
                        <MerchCard
                            key={item.id}
                            item={item}
                            isSelected={selected === item.id}
                            anySelected={anySelected}
                            onSelect={(id) => { if (!isDragging.current) setSelected(id); }}
                        />
                    ))}
                </div>
            </div>

            {/* ── Stats bar ─────────────────────────────────────────────────── */}
            <div className="merch-stats">
                {[
                    { value: <><CountUp from={0} to={50000} duration={0.8} separator="," />+</>, label: "Products" },
                    { value: <CountUp from={0} to={195} duration={0.8} />, label: "Countries" },
                    { value: <><CountUp from={0} to={100} duration={0.8} />%</>, label: "Official & Licensed" },
                    { value: "Free", label: "Returns on $75+" },
                ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                        <div style={{
                            fontSize: "clamp(20px, 2.5vw, 28px)",
                            fontWeight: 800, color: "#fff",
                            letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 5,
                        }}>
                            {s.value}
                        </div>
                        <div style={{
                            fontSize: 10.5, fontWeight: 600,
                            color: "rgba(255,255,255,0.25)",
                            letterSpacing: "0.07em", textTransform: "uppercase",
                        }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
