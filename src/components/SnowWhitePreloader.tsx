import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ── Sketch SVG Icons ───────────────────────────────────────────────────────────
const SketchApple = () => (<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M32 10 Q33 5 38 4" /><path d="M33 8 Q40 6 41 13 Q36 13 33 8Z" fill="#a8c090" stroke="#5a7a40" /><path d="M20 20 Q14 20 13 30 Q12 42 20 50 Q25 55 32 52 Q39 55 44 50 Q52 42 51 30 Q50 20 44 20 Q40 16 36 17 Q32 14 28 17 Q24 16 20 20Z" fill="#f0c0b0" /><path d="M22 25 Q20 30 22 35" strokeWidth="1.5" stroke="#fff" opacity="0.7" /><path d="M44 28 Q47 32 44 36" strokeWidth="1.2" /></svg>);
const SketchMirror = () => (<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="32" y1="52" x2="32" y2="62" strokeWidth="2.5" /><path d="M27 62 Q32 60 37 62" /><ellipse cx="32" cy="30" rx="16" ry="22" fill="#e8dcc0" stroke="#8a6d3b" strokeWidth="2.5" /><ellipse cx="32" cy="30" rx="12" ry="18" fill="#d4eaf7" stroke="#8a6d3b" strokeWidth="1" /><path d="M26 22 Q30 28 26 36" strokeWidth="1" stroke="#aac" opacity="0.6" /><path d="M30 20 Q34 26 30 34" strokeWidth="1" stroke="#aac" opacity="0.4" /><path d="M25 10 Q32 6 39 10" strokeWidth="1.5" stroke="#b08d44" /><circle cx="32" cy="8" r="2" fill="#d4af37" stroke="#8a6d3b" strokeWidth="1" /></svg>);
const SketchCottage = () => (<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="32" width="40" height="26" rx="1" fill="#f0e8d4" /><polygon points="8,34 32,10 56,34" fill="#c0785a" stroke="#8a4a2a" strokeWidth="2" /><rect x="40" y="14" width="6" height="12" fill="#c0785a" stroke="#8a4a2a" /><path d="M38 14 Q41 10 48 14" strokeWidth="1.5" /><path d="M27 58 L27 44 Q32 40 37 44 L37 58" fill="#a0784a" stroke="#5a3e1b" /><rect x="14" y="36" width="10" height="10" rx="1" fill="#d4eaf7" /><rect x="40" y="36" width="10" height="10" rx="1" fill="#d4eaf7" /><line x1="19" y1="36" x2="19" y2="46" strokeWidth="1" /><line x1="14" y1="41" x2="24" y2="41" strokeWidth="1" /><line x1="45" y1="36" x2="45" y2="46" strokeWidth="1" /><line x1="40" y1="41" x2="50" y2="41" strokeWidth="1" /><path d="M6 58 Q32 56 58 58" strokeWidth="1.5" /><line x1="6" y1="58" x2="6" y2="40" strokeWidth="1.5" /><ellipse cx="6" cy="36" rx="5" ry="7" fill="#a8c090" stroke="#5a7a40" strokeWidth="1.5" /></svg>);
const SketchCrown = () => (<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 46 L8 28 L20 38 L32 12 L44 38 L56 28 L56 46 Z" fill="#f5d770" stroke="#8a6d3b" strokeWidth="2" /><rect x="8" y="44" width="48" height="8" rx="2" fill="#d4af37" stroke="#8a6d3b" strokeWidth="2" /><circle cx="32" cy="47" r="4" fill="#e05050" stroke="#8a2020" strokeWidth="1.5" /><circle cx="16" cy="47" r="3" fill="#50a0e0" stroke="#205080" strokeWidth="1.2" /><circle cx="48" cy="47" r="3" fill="#50c050" stroke="#206020" strokeWidth="1.2" /><path d="M30 44 Q32 42 34 44" stroke="#fff" strokeWidth="0.8" /><circle cx="32" cy="13" r="2" fill="#fff" stroke="#d4af37" /><circle cx="8" cy="28" r="2" fill="#fff" stroke="#d4af37" /><circle cx="56" cy="28" r="2" fill="#fff" stroke="#d4af37" /></svg>);

const sketchIcons = [SketchApple, SketchMirror, SketchCottage, SketchCrown];

const pageContents = [
    { title: "Chapter I",   subtitle: "The Fairest of Them All",    text: "Deep in the heart of a great forest, there lived a princess with skin as white as snow..." },
    { title: "Chapter II",  subtitle: "The Magic Mirror",           text: "Every morning the Evil Queen would gaze into her enchanted mirror and ask..." },
    { title: "Chapter III", subtitle: "The Cottage in the Woods",   text: "Seven small beds, seven small chairs, and seven tiny bowls upon the table..." },
    { title: "Chapter IV",  subtitle: "True Love's Kiss",           text: "And so they lived, happily ever after, in a kingdom filled with light and song." },
];

const ParchmentTexture = () => (
    <>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(160deg, #f5ead0 0%, #ede0c0 30%, #e8d5a8 60%, #ddc89a 100%)', mixBlendMode: 'multiply', opacity: 0.55 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(101,68,32,0.18) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #6b4423 27px, #6b4423 28px)' }} />
    </>
);

// ── Typed prop interfaces ──────────────────────────────────────────────────────
interface Box3DProps {
    width: number; height: number; depth: number;
    frontContent: React.ReactNode; backContent: React.ReactNode;
    edgeColor?: string; edgeImage?: string;
}

interface FlipPageProps {
    content: typeof pageContents[0];
    iconIndex: number; zPos: number; bgColor?: string;
}

// ── 3D Geometry Engine ────────────────────────────────────────────────────────
const Box3D = ({ width, height, depth, frontContent, backContent, edgeColor = 'transparent', edgeImage = 'none' }: Box3DProps) => {
    const edgeStyle: React.CSSProperties = { background: edgeColor, backgroundImage: edgeImage };
    return (
        <div className="absolute top-0 left-0" style={{ width, height, transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0" style={{ transform: `translateZ(${depth / 2}px)`,              backfaceVisibility: 'hidden' }}>{frontContent}</div>
            <div className="absolute inset-0" style={{ transform: `rotateY(180deg) translateZ(${depth / 2}px)`, backfaceVisibility: 'hidden' }}>{backContent}</div>
            <div className="absolute" style={{ width: depth, height, left: width - depth / 2, top: 0, transform: 'rotateY(90deg)',  ...edgeStyle }} />
            <div className="absolute" style={{ width: depth, height, left: -depth / 2,        top: 0, transform: 'rotateY(-90deg)', ...edgeStyle }} />
            <div className="absolute" style={{ width, height: depth, top: -depth / 2,         left: 0, transform: 'rotateX(90deg)',  ...edgeStyle }} />
            <div className="absolute" style={{ width, height: depth, top: height - depth / 2, left: 0, transform: 'rotateX(-90deg)', ...edgeStyle }} />
        </div>
    );
};

// ── A Single Flippable Page ───────────────────────────────────────────────────
const FlipPage = React.forwardRef<HTMLDivElement, FlipPageProps>(
    ({ content, iconIndex, zPos, bgColor = '#fdfaf5' }, ref) => (
        <div
            ref={ref}
            className="absolute inset-0"
            style={{ transformOrigin: 'left bottom', transformStyle: 'preserve-3d', transform: `translateZ(${zPos}px)` }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 overflow-hidden" style={{ background: bgColor, backfaceVisibility: 'hidden' }}>
                <ParchmentTexture />
                <div className="relative z-10 mb-3">{React.createElement(sketchIcons[iconIndex])}</div>
                <h2 className="relative z-10 font-serif text-[#6b4423] text-base font-bold mb-1 tracking-widest uppercase text-center">{content.title}</h2>
                <div className="relative z-10 w-10 h-px bg-[#b08d44]/60 mb-3" />
                <h3 className="relative z-10 font-serif italic text-[#2d5a27] text-sm mb-3 text-center">{content.subtitle}</h3>
                <p className="relative z-10 text-[#5a3e1b]/70 text-[11px] text-center leading-relaxed font-serif italic max-w-[180px]">{content.text}</p>
            </div>
            <div className="absolute inset-0 overflow-hidden" style={{ transform: 'rotateY(180deg) translateZ(1px)', background: '#ede0c0', backfaceVisibility: 'hidden' }}>
                <ParchmentTexture />
            </div>
        </div>
    )
);

// ── Main Preloader Component ──────────────────────────────────────────────────
const SnowWhitePreloader = ({ onComplete }: { onComplete?: () => void }) => {
    const containerRef  = useRef<HTMLDivElement>(null);
    const bookRef       = useRef<HTMLDivElement>(null);
    const frontCoverRef = useRef<HTMLDivElement>(null);
    const pagesRef      = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => { if (onComplete) onComplete(); }
            });

            tl.fromTo(bookRef.current,
                { rotateX: 30, rotateY: 20, rotateZ: -12, scale: 0.65 },
                { rotateX: 12, rotateY: -5, rotateZ: -2, scale: 1.05, duration: 2, ease: "power2.out" }
            )
            .to(frontCoverRef.current, {
                rotateY: -155, duration: 1.2, ease: "power3.inOut"
            }, "+=0.1")
            .to(pagesRef.current, {
                rotateY: -150, z: 15, rotateX: -8, rotateZ: 4,
                boxShadow: '-10px 20px 30px rgba(0,0,0,0.15)',
                duration: 2.8, stagger: 0.5, ease: "sine.inOut"
            }, "+=0.1")
            .to(bookRef.current, {
                rotateX: 0, rotateY: 0, rotateZ: 0,
                scale: 25, x: '-100%', y: '20%', opacity: 0,
                duration: 1.2, ease: "power2.in"
            }, "-=0.1");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    const bookW = 400, bookH = 560;
    const coverDepth = 12;
    const pageW = 380, pageH = 538;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050a18] overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
                .sw-drop-cap { font-family: 'Great Vibes', cursive; font-size: 64px; color: #dfaa3e; line-height: 0.8; text-shadow: -1px -1px 0px rgba(255,255,255,0.9), 1px 1px 1px rgba(120,70,0,0.8), 2px 3px 4px rgba(0,0,0,0.3); margin: 0 2px; display: inline-block; }
                .sw-small { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; color: #798c61; padding-bottom: 10px; margin-right: 2px; }
                .sw-italic { font-family: 'Playfair Display', serif; font-style: italic; font-size: 16px; color: #798c61; }
                .sw-seven-dwarfs { font-family: 'Cinzel', serif; font-weight: 700; font-size: 30px; color: #798c61; line-height: 1; letter-spacing: 0.05em; text-shadow: 1px 1px 0px rgba(255,255,255,0.8), 0px 1px 2px rgba(0,0,0,0.15); }
            `}</style>

            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_#1e3a8a_0%,_transparent_65%)]" />

            <div style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}>
                <div ref={bookRef} style={{ width: bookW, height: bookH, transformStyle: 'preserve-3d' }}>

                    {/* ── BACK COVER ── */}
                    <div className="absolute" style={{ transform: 'translateZ(-36px)', transformStyle: 'preserve-3d' }}>
                        <Box3D width={bookW} height={bookH} depth={coverDepth} edgeColor="#6b4420"
                            backContent={<div className="w-full h-full bg-[#3d2b0a]" />}
                            frontContent={<div className="w-full h-full bg-[#ede0c0]"><ParchmentTexture /></div>}
                        />
                    </div>

                    {/* ── SOLID SPINE ── */}
                    <div className="absolute flex items-center justify-center" style={{ width: 40, height: bookH, top: 0, left: 0, transformOrigin: 'left center', transform: 'translateZ(4px) rotateY(-90deg)', background: 'linear-gradient(to right, #3b2208 0%, #7a5228 30%, #c9a84c 50%, #7a5228 70%, #3b2208 100%)' }}>
                        <span style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', fontFamily: 'Georgia, serif', fontSize: 10, letterSpacing: '0.3em', color: '#f5d770' }}>SNOW WHITE</span>
                    </div>

                    {/* ── STATIC PAGE BLOCK ── */}
                    <div className="absolute" style={{ top: 8, left: 4, transform: 'translateZ(-21px)', transformStyle: 'preserve-3d' }}>
                        <Box3D width={pageW} height={pageH} depth={20}
                            edgeImage="repeating-linear-gradient(to bottom, #d4c48e 0px, #d4c48e 1px, #e2d5b0 1px, #e2d5b0 2.5px)"
                            backContent={<div className="w-full h-full bg-[#ede0c0]" />}
                            frontContent={<div className="w-full h-full flex flex-col items-center justify-center bg-[#fdfaf5]"><ParchmentTexture /></div>}
                        />
                    </div>

                    {/* ── ANIMATED PAGES ── */}
                    <div className="absolute" style={{ top: 8, left: 4, width: pageW, height: pageH, transformStyle: 'preserve-3d' }}>
                        {[...pageContents].reverse().map((content, reversedI) => {
                            const i = pageContents.length - 1 - reversedI;
                            return (
                                <FlipPage
                                    key={i}
                                    ref={el => { pagesRef.current[i] = el; }}
                                    content={content}
                                    iconIndex={i}
                                    zPos={-4 - (i * 1.5)}
                                    bgColor={i % 2 === 0 ? '#fdfaf5' : '#f7f0e3'}
                                />
                            );
                        })}
                    </div>

                    {/* ── FRONT COVER ── */}
                    <div ref={frontCoverRef} className="absolute origin-left" style={{ width: bookW, height: bookH, transformStyle: 'preserve-3d', zIndex: 50 }}>
                        <Box3D width={bookW} height={bookH} depth={coverDepth} edgeColor="#a07830"
                            backContent={
                                <div className="w-full h-full bg-[#ede0c0] flex items-center justify-center">
                                    <ParchmentTexture />
                                    <span style={{ color: '#c9a84c', fontSize: 28, opacity: 0.3, fontFamily: 'serif' }}>✦</span>
                                </div>
                            }
                            frontContent={
                                <div className="w-full h-full relative overflow-hidden flex flex-col" style={{ background: '#f8f6f0' }}>
                                    <div className="absolute left-0 top-0 bottom-0 w-[20px]" style={{ background: 'linear-gradient(to right, #6b3d08 0%, #d4af37 35%, #f5d770 50%, #c9a84c 70%, #7a5228 100%)', boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.3)' }} />
                                    <div className="absolute" style={{ border: '4px solid #d4af37', top: 16, left: 26, right: 10, bottom: 10, pointerEvents: 'none', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1), 0 0 8px rgba(0,0,0,0.1)' }} />
                                    <div className="absolute" style={{ border: '1px solid rgba(201,168,76,0.6)', top: 24, left: 34, right: 18, bottom: 18, pointerEvents: 'none' }} />
                                    <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '8px 32px 8px 30px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%', lineHeight: 1 }}>
                                            <span className="sw-drop-cap">S</span><span className="sw-small">now</span>
                                            <span className="sw-drop-cap">W</span><span className="sw-small">hite</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '6px', gap: '8px' }}>
                                            <span className="sw-italic">and the</span>
                                            <span className="sw-seven-dwarfs" style={{ fontSize: '22px' }}>SEVEN</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2px' }}>
                                            <span className="sw-seven-dwarfs" style={{ fontSize: '28px' }}>DWARFS</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 30, paddingRight: 12, height: 60, background: 'linear-gradient(135deg, #c49a30 0%, #ebd07a 25%, #f7e2a3 50%, #ebd07a 75%, #c49a30 100%)', borderTop: '3px solid #ab7a1a', boxShadow: '0 -4px 10px rgba(0,0,0,0.1)' }}>
                                        {[...Array(7)].map((_, i) => (
                                            <svg key={i} viewBox="0 0 24 36" width="22" height="34" fill="#8f631a" style={{ opacity: 0.85 }}>
                                                <rect x="5" y="6" width="14" height="7" rx="1" /><path d="M7 6 Q12 0 17 6" />
                                                <ellipse cx="12" cy="19" rx="6" ry="7" fill="#deba7a" stroke="#8f631a" strokeWidth="1" />
                                                <path d="M6 22 Q8 30 12 32 Q16 30 18 22" fill="#f5dfad" stroke="#8f631a" strokeWidth="0.8" />
                                                <circle cx="9.5" cy="17.5" r="1" fill="#4a3010" /><circle cx="14.5" cy="17.5" r="1" fill="#4a3010" />
                                                <ellipse cx="12" cy="20" rx="1.5" ry="1" fill="#c49a50" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            }
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SnowWhitePreloader;