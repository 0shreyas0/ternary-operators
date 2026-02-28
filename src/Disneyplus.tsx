import { useState, useEffect, useRef } from "react";

interface Show {
    id: number;
    name: string;
    category: string;
    badge: string;
    seasons: string;
    tag: string;
    description: string;
    highlights: string[];
    image: string;
    color: string;
}

const SHOWS: Show[] = [
    {
        id: 1,
        name: "The Mandalorian",
        category: "Star Wars",
        badge: "SERIES",
        seasons: "Seasons 1–3",
        tag: "Lucasfilm · Star Wars Universe",
        description:
            "Set in the aftermath of the Galactic Empire's fall, a lone bounty hunter navigates the outer reaches of the galaxy far from the authority of the New Republic. The Mandalorian redefined what Star Wars could be — intimate, cinematic, and anchored by one of fiction's most iconic duos.",
        highlights: ["Pedro Pascal", "Grogu", "Emmy-Winning VFX"],
        image: "https://image.tmdb.org/t/p/original/eU1i6eHXlzMqZIOS1YQUpnD3ZSE.jpg",
        color: "#60A5FA",
    },
    {
        id: 2,
        name: "WandaVision",
        category: "Marvel",
        badge: "SERIES",
        seasons: "Season 1",
        tag: "Marvel Cinematic Universe",
        description:
            "Blending classic sitcom style with MCU scale, WandaVision broke new creative ground. Wanda and Vision living idyllic suburban lives — but the picture-perfect reality is not all it seems. A bold, genre-defying love story unlike anything Marvel has ever made.",
        highlights: ["Elizabeth Olsen", "9 Emmy Nominations", "MCU Phase 4"],
        image: "https://image.tmdb.org/t/p/original/glKDfE6btIRcmfajvtX3UKp3cw9.jpg",
        color: "#C084FC",
    },
    {
        id: 3,
        name: "Loki",
        category: "Marvel",
        badge: "SERIES",
        seasons: "Seasons 1–2",
        tag: "Marvel Cinematic Universe",
        description:
            "The God of Mischief steps into a time-bending adventure through the TVA — the Time Variance Authority. Loki expands the MCU's multiverse narrative while giving Tom Hiddleston his most emotionally layered performance in the role he was born to play.",
        highlights: ["Tom Hiddleston", "Time Variance Authority", "Multiverse Saga"],
        image: "https://image.tmdb.org/t/p/original/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg",
        color: "#34D399",
    },
    {
        id: 4,
        name: "Encanto",
        category: "Disney",
        badge: "FILM",
        seasons: "2021",
        tag: "Walt Disney Animation Studios",
        description:
            "Every Madrigal child is gifted with a unique magical power — every child except Mirabel. A vibrant, heartfelt celebration of family, identity and the magic hidden in ordinary life, powered by Lin-Manuel Miranda's unforgettable songs and Walt Disney Animation's most stunning visuals.",
        highlights: ["Academy Award Winner", "Lin-Manuel Miranda", "Bruno"],
        image: "https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        color: "#FB923C",
    },
    {
        id: 5,
        name: "Andor",
        category: "Star Wars",
        badge: "SERIES",
        seasons: "Seasons 1–2",
        tag: "Lucasfilm · Star Wars Universe",
        description:
            "The most politically ambitious Star Wars story ever told. Andor traces Cassian Andor's transformation from reluctant rebel to revolutionary hero — a slow-burn masterpiece praised as one of the finest television dramas of the decade.",
        highlights: ["Diego Luna", "Tony Gilroy", "Season 2 Streaming"],
        image: "https://image.tmdb.org/t/p/original/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg",
        color: "#F87171",
    },
    {
        id: 6,
        name: "Inside Out 2",
        category: "Pixar",
        badge: "FILM",
        seasons: "2024",
        tag: "Pixar Animation Studios",
        description:
            "Riley is now a teenager, and her mind welcomes a surge of new emotions — Anxiety, Envy, Ennui, and Embarrassment. Inside Out 2 is Pixar at the height of its powers: funny, devastating, and profoundly honest about growing up.",
        highlights: ["$1.7B Box Office", "New Emotions", "Best Animated Film"],
        image: "https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        color: "#FCD34D",
    },
    {
        id: 7,
        name: "Percy Jackson",
        category: "Disney",
        badge: "SERIES",
        seasons: "Seasons 1–2",
        tag: "Disney Original Series",
        description:
            "Percy Jackson discovers he is the son of Poseidon and must prevent a war among the Olympians. Faithful to Rick Riordan's beloved novels, this Disney+ series is a thrilling coming-of-age adventure that finally does justice to the source material fans waited two decades to see.",
        highlights: ["Walker Scobell", "Rick Riordan Approved", "Season 2 Confirmed"],
        image: "https://image.tmdb.org/t/p/original/cNtAslrDHNkCFaKs6tCIButa7af.jpg",
        color: "#38BDF8",
    },
    {
        id: 8,
        name: "Daredevil: Born Again",
        category: "Marvel",
        badge: "SERIES",
        seasons: "Seasons 1–2",
        tag: "Marvel Cinematic Universe",
        description:
            "Matt Murdock, a blind lawyer with heightened abilities, fights the monstrous Kingpin across New York City. Born Again brings Charlie Cox and Vincent D'Onofrio back to their iconic roles in Marvel's most visceral, street-level series yet.",
        highlights: ["Charlie Cox", "Vincent D'Onofrio", "Season 2 Now Streaming"],
        image: "https://image.tmdb.org/t/p/original/mMWBPpB5aAbOlUFRGOCCWCIUkB6.jpg",
        color: "#EF4444",
    },
    {
        id: 9,
        name: "Moana 2",
        category: "Disney",
        badge: "FILM",
        seasons: "2024",
        tag: "Walt Disney Animation Studios",
        description:
            "Moana receives a new call from the ocean and sets sail for the far seas of Oceania joined by an unlikely new crew. Reunited with Maui, she must navigate the waters of a lost Motunui legend. Moana 2 delivers everything that made the original beloved — and more.",
        highlights: ["Auli'i Cravalho", "Dwayne Johnson", "$1B+ Worldwide"],
        image: "https://image.tmdb.org/t/p/original/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
        color: "#2DD4BF",
    },
    {
        id: 10,
        name: "Agatha All Along",
        category: "Marvel",
        badge: "SERIES",
        seasons: "Season 1",
        tag: "Marvel Cinematic Universe",
        description:
            "Released from her prison by a mysterious teen, Agatha Harkness reassembles a coven of witches to journey down the legendary Witches' Road. Kathryn Hahn is electric in Marvel's most wildly creative and rewarding series.",
        highlights: ["Kathryn Hahn", "Witches' Road", "WandaVision Spinoff"],
        image: "https://image.tmdb.org/t/p/original/3GrRgt6CiLIUXOuW2QwUTBqBNqz.jpg",
        color: "#A78BFA",
    },
    {
        id: 11,
        name: "Avengers: Doomsday",
        category: "Marvel",
        badge: "FILM",
        seasons: "Coming 2026",
        tag: "Marvel Cinematic Universe",
        description:
            "The Marvel Cinematic Universe's most anticipated film event arrives in 2026. Avengers: Doomsday brings together every corner of the MCU in an unprecedented convergence — a multiversal threat that will change everything. Stream on Disney+ after its theatrical release.",
        highlights: ["Robert Downey Jr. Returns", "Russo Brothers", "2026 Release"],
        image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        color: "#F43F5E",
    },
    {
        id: 12,
        name: "National Geographic",
        category: "Nat Geo",
        badge: "DOCUMENTARY",
        seasons: "Ongoing",
        tag: "National Geographic · Disney+",
        description:
            "From the deepest oceans to the highest peaks, National Geographic on Disney+ brings our planet's most extraordinary stories to your screen. World-class cinematography, urgent conservation narratives, and breathtaking natural wonders in stunning 4K HDR.",
        highlights: ["4K HDR", "David Attenborough", "Award-Winning Docs"],
        image: "https://image.tmdb.org/t/p/original/sKQMbGPGNpMGkjj8bSfRKMaXMw7.jpg",
        color: "#FBBF24",
    },
];

// ── ThumbImage: thumbnail with fallback ──────────────────────────────────────
function ThumbImage({ show }: { show: Show }) {
    const [src, setSrc] = useState(show.image);
    return (
        <img
            src={src}
            alt={show.name}
            onError={() =>
                setSrc(
                    `https://placehold.co/240x144/0d1117/ffffff?text=${encodeURIComponent(show.name)}`
                )
            }
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
    );
}

// ── ShowImage: full-size hero image with crossfade ───────────────────────────
function ShowImage({ show, active }: { show: Show; active: boolean }) {
    const [src, setSrc] = useState(show.image);
    return (
        <img
            src={src}
            alt={show.name}
            onError={() =>
                setSrc(
                    `https://placehold.co/1200x800/0d1117/ffffff?text=${encodeURIComponent(show.name)}`
                )
            }
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.65s ease, transform 0.9s ease",
                opacity: active ? 1 : 0,
                transform: active ? "scale(1)" : "scale(1.05)",
            }}
        />
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DisneyPlusSection() {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);

    // Derive currently-displayed show from active index
    const show = SHOWS[active];

    const goTo = (i: number) => {
        if (i === active || animating) return;
        setAnimating(true);
        setActive(i);
        setTimeout(() => setAnimating(false), 650);
    };

    const prev = () => goTo((active - 1 + SHOWS.length) % SHOWS.length);
    const next = () => goTo((active + 1) % SHOWS.length);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [active, animating]);

    // ── Drag-to-scroll strip ──────────────────────────────────────────────────
    const stripRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeftRef = useRef(0);
    const isDown = useRef(false);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!stripRef.current) return;
        isDragging.current = false;
        isDown.current = true;
        startX.current = e.pageX - stripRef.current.offsetLeft;
        scrollLeftRef.current = stripRef.current.scrollLeft;
        stripRef.current.style.cursor = "grabbing";
        stripRef.current.style.userSelect = "none";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !stripRef.current) return;
        const x = e.pageX - stripRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        if (Math.abs(walk) > 5) isDragging.current = true;
        stripRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const onMouseUp = () => {
        if (!stripRef.current) return;
        isDown.current = false;
        stripRef.current.style.cursor = "grab";
        stripRef.current.style.userSelect = "";
        setTimeout(() => {
            isDragging.current = false;
        }, 50);
    };

    // Auto-scroll strip to keep active thumb visible
    useEffect(() => {
        if (!stripRef.current) return;
        const thumb = stripRef.current.children[active] as HTMLElement | undefined;
        if (thumb) {
            const strip = stripRef.current;
            const thumbLeft = thumb.offsetLeft;
            const thumbRight = thumbLeft + thumb.offsetWidth;
            const visibleLeft = strip.scrollLeft;
            const visibleRight = visibleLeft + strip.offsetWidth;
            if (thumbLeft < visibleLeft + 40) {
                strip.scrollLeft = thumbLeft - 40;
            } else if (thumbRight > visibleRight - 40) {
                strip.scrollLeft = thumbRight - strip.offsetWidth + 40;
            }
        }
    }, [active]);

    return (
        <section
            style={{
                background: "#020818",
                padding: "80px 0",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                overflow: "hidden",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .badge-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 50px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.03em;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.05);
          white-space: nowrap;
        }

        .img-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          z-index: 10;
        }
        .img-arrow:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-50%) scale(1.08);
        }
        .img-arrow-left  { left: 16px; }
        .img-arrow-right { right: 16px; }

        .dot-nav {
          width: 6px; height: 6px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.2);
        }
        .dot-nav.active-dot { transform: scale(1.5); }
        .dot-nav:hover:not(.active-dot) { background: rgba(255,255,255,0.45); }

        .stream-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 50px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s;
          color: #fff; background: #0063E5;
          box-shadow: 0 4px 20px rgba(0,99,229,0.35);
        }
        .stream-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(0,99,229,0.5);
          background: #1a78ff;
        }

        .thumb-strip::-webkit-scrollbar { display: none; }
        .thumb-strip { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* ── Section header ── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "0 clamp(20px, 5vw, 72px)",
                    marginBottom: 48,
                }}
            >
                <div>
                    <p
                        style={{
                            color: "#818CF8",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            margin: "0 0 10px",
                        }}
                    >
                        Disney+ Streaming
                    </p>
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(26px, 3.5vw, 42px)",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                        }}
                    >
                        Every Universe. One Stream.
                    </h2>
                </div>
                <p
                    style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: 13,
                        lineHeight: 1.75,
                        margin: 0,
                        maxWidth: 360,
                        textAlign: "right",
                    }}
                >
                    Disney, Pixar, Marvel, Star Wars, National Geographic — all in one place.
                    Over 220 million subscribers. Thousands of titles. Endlessly new.
                </p>
            </div>

            {/* ── 2-column layout: image | text ── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 420px",
                    gap: 48,
                    padding: "0 clamp(20px, 5vw, 72px)",
                    alignItems: "center",
                }}
            >
                {/* ── LEFT: Image ── */}
                <div
                    style={{
                        position: "relative",
                        borderRadius: 20,
                        overflow: "hidden",
                        height: 560,
                    }}
                >
                    {SHOWS.map((s, i) => (
                        <ShowImage key={s.id} show={s} active={i === active} />
                    ))}

                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(2,8,24,0.7) 0%, rgba(2,8,24,0.05) 55%, transparent 100%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Disney+ badge top-left */}
                    <div
                        style={{
                            position: "absolute",
                            top: 18,
                            left: 18,
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 8,
                            padding: "6px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                        }}
                    >
                        <div
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                background: "#0063E5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                fontWeight: 900,
                                color: "white",
                            }}
                        >
                            D
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "white", letterSpacing: 1 }}>
                            DISNEY+
                        </span>
                    </div>

                    {/* Content type badge top-right */}
                    <div
                        style={{
                            position: "absolute",
                            top: 18,
                            right: 18,
                            padding: "5px 12px",
                            borderRadius: 6,
                            background: show.color + "33",
                            border: `1px solid ${show.color}66`,
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            color: show.color,
                            textTransform: "uppercase",
                            transition: "all 0.4s ease",
                        }}
                    >
                        {show.badge}
                    </div>

                    {/* Prev / Next arrows */}
                    <button className="img-arrow img-arrow-left" onClick={prev} aria-label="Previous">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M8 1L3 6L8 11"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button className="img-arrow img-arrow-right" onClick={next} aria-label="Next">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M4 1L9 6L4 11"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Bottom: title only */}
                    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                        <div key={`name-${active}`} style={{ animation: "fadeUp 0.45s ease both" }}>
                            <div
                                style={{
                                    fontSize: 9,
                                    fontWeight: 700,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: show.color,
                                    marginBottom: 5,
                                }}
                            >
                                {show.tag}
                            </div>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontWeight: 700,
                                    color: "white",
                                    lineHeight: 1.15,
                                }}
                            >
                                {show.name}
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: "rgba(255,255,255,0.08)",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${((active + 1) / SHOWS.length) * 100}%`,
                                background: show.color,
                                transition: "width 0.55s ease, background 0.55s ease",
                            }}
                        />
                    </div>
                </div>

                {/* ── RIGHT: Text ── */}
                <div
                    key={active}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        animation: "slideIn 0.5s ease both",
                    }}
                >
                    {/* Category + seasons */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 20,
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: show.color,
                                boxShadow: `0 0 10px ${show.color}`,
                            }}
                        />
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: show.color,
                            }}
                        >
                            {show.category} · {show.seasons}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(24px, 3vw, 36px)",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "0 0 16px",
                            lineHeight: 1.1,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {show.name}
                    </h3>

                    {/* Accent line */}
                    <div
                        style={{
                            width: 40,
                            height: 2,
                            borderRadius: 2,
                            background: show.color,
                            marginBottom: 22,
                            transition: "background 0.4s",
                        }}
                    />

                    {/* Description */}
                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 1.85,
                            color: "rgba(255,255,255,0.6)",
                            margin: "0 0 30px",
                        }}
                    >
                        {show.description}
                    </p>

                    {/* Highlights */}
                    <div style={{ marginBottom: 38 }}>
                        <p
                            style={{
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.22)",
                                margin: "0 0 12px",
                            }}
                        >
                            Why Watch
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {show.highlights.map((h) => (
                                <span key={h} className="badge-pill">
                                    <span
                                        style={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            background: show.color,
                                            display: "inline-block",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {h}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="https://www.disneyplus.com"
                        target="_blank"
                        rel="noreferrer"
                        className="stream-btn"
                    >
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 900,
                                flexShrink: 0,
                            }}
                        >
                            D
                        </div>
                        Start Streaming on Disney+
                    </a>

                    {/* Counter */}
                    <div
                        style={{
                            marginTop: 36,
                            paddingTop: 24,
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 30,
                                fontWeight: 800,
                                color: "rgba(255,255,255,0.1)",
                                lineHeight: 1,
                            }}
                        >
                            {String(active + 1).padStart(2, "0")}
                        </span>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>
                            {SHOWS.length} Titles
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Scrollable thumbnail strip ── */}
            <div
                style={{
                    position: "relative",
                    padding: "32px clamp(20px, 5vw, 72px) 0",
                }}
            >
                {/* Fade edges */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 32,
                        bottom: 0,
                        width: "clamp(20px, 5vw, 72px)",
                        background: "linear-gradient(90deg, #020818, transparent)",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 32,
                        bottom: 0,
                        width: "clamp(20px, 5vw, 72px)",
                        background: "linear-gradient(270deg, #020818, transparent)",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                />

                {/* Scrollable row */}
                <div
                    ref={stripRef}
                    style={{
                        display: "flex",
                        gap: 12,
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        paddingBottom: 8,
                        cursor: "grab",
                    }}
                    className="thumb-strip"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                >
                    {SHOWS.map((s, i) => (
                        <div
                            key={s.id}
                            onClick={() => !isDragging.current && goTo(i)}
                            style={{
                                flexShrink: 0,
                                width: 120,
                                height: 72,
                                borderRadius: 10,
                                overflow: "hidden",
                                cursor: "pointer",
                                position: "relative",
                                border: i === active ? `2px solid ${s.color}` : "2px solid transparent",
                                transition:
                                    "border-color 0.3s ease, transform 0.25s ease, opacity 0.3s ease",
                                transform: i === active ? "translateY(-4px) scale(1.04)" : "scale(1)",
                                opacity: i === active ? 1 : 0.5,
                                boxShadow: i === active ? `0 8px 24px ${s.color}44` : "none",
                            }}
                            onMouseEnter={(e) => {
                                if (i !== active) {
                                    (e.currentTarget as HTMLDivElement).style.opacity = "0.85";
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (i !== active) {
                                    (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
                                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                                }
                            }}
                        >
                            <ThumbImage show={s} />
                            {/* Dark overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        i === active
                                            ? "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)"
                                            : "rgba(0,0,0,0.25)",
                                    transition: "background 0.3s",
                                }}
                            />
                            {/* Name label */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 5,
                                    left: 6,
                                    right: 6,
                                    fontSize: 8.5,
                                    fontWeight: 700,
                                    color: i === active ? "#fff" : "rgba(255,255,255,0.6)",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    lineHeight: 1.2,
                                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                    transition: "color 0.3s",
                                }}
                            >
                                {s.name}
                            </div>
                            {/* Active dot */}
                            {i === active && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 6,
                                        right: 6,
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: s.color,
                                        boxShadow: `0 0 6px ${s.color}`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
