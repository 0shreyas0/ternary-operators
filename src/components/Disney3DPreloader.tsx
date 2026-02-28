import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// ── Sketch SVG Icons ──────────────────────────────────────────────────────────
const SketchApple = () => (
  <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 10 Q33 5 38 4" /><path d="M33 8 Q40 6 41 13 Q36 13 33 8Z" fill="#a8c090" stroke="#5a7a40" />
    <path d="M20 20 Q14 20 13 30 Q12 42 20 50 Q25 55 32 52 Q39 55 44 50 Q52 42 51 30 Q50 20 44 20 Q40 16 36 17 Q32 14 28 17 Q24 16 20 20Z" fill="#f0c0b0" />
    <path d="M22 25 Q20 30 22 35" strokeWidth="1.5" stroke="#fff" opacity="0.7" /><path d="M44 28 Q47 32 44 36" strokeWidth="1.2" />
  </svg>
);
const SketchMirror = () => (
  <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="32" y1="52" x2="32" y2="62" strokeWidth="2.5" /><path d="M27 62 Q32 60 37 62" />
    <ellipse cx="32" cy="30" rx="16" ry="22" fill="#e8dcc0" stroke="#8a6d3b" strokeWidth="2.5" />
    <ellipse cx="32" cy="30" rx="12" ry="18" fill="#d4eaf7" stroke="#8a6d3b" strokeWidth="1" />
    <path d="M26 22 Q30 28 26 36" strokeWidth="1" stroke="#aac" opacity="0.6" />
    <path d="M25 10 Q32 6 39 10" strokeWidth="1.5" stroke="#b08d44" /><circle cx="32" cy="8" r="2" fill="#d4af37" stroke="#8a6d3b" strokeWidth="1" />
  </svg>
);
const SketchCottage = () => (
  <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="32" width="40" height="26" rx="1" fill="#f0e8d4" />
    <polygon points="8,34 32,10 56,34" fill="#c0785a" stroke="#8a4a2a" strokeWidth="2" />
    <rect x="40" y="14" width="6" height="12" fill="#c0785a" stroke="#8a4a2a" />
    <path d="M27 58 L27 44 Q32 40 37 44 L37 58" fill="#a0784a" stroke="#5a3e1b" />
    <rect x="14" y="36" width="10" height="10" rx="1" fill="#d4eaf7" /><rect x="40" y="36" width="10" height="10" rx="1" fill="#d4eaf7" />
    <line x1="19" y1="36" x2="19" y2="46" strokeWidth="1" /><line x1="14" y1="41" x2="24" y2="41" strokeWidth="1" />
    <ellipse cx="6" cy="36" rx="5" ry="7" fill="#a8c090" stroke="#5a7a40" strokeWidth="1.5" />
  </svg>
);
const SketchCrown = () => (
  <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="#5a3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 46 L8 28 L20 38 L32 12 L44 38 L56 28 L56 46 Z" fill="#f5d770" stroke="#8a6d3b" strokeWidth="2" />
    <rect x="8" y="44" width="48" height="8" rx="2" fill="#d4af37" stroke="#8a6d3b" strokeWidth="2" />
    <circle cx="32" cy="47" r="4" fill="#e05050" stroke="#8a2020" strokeWidth="1.5" />
    <circle cx="16" cy="47" r="3" fill="#50a0e0" stroke="#205080" strokeWidth="1.2" />
    <circle cx="48" cy="47" r="3" fill="#50c050" stroke="#206020" strokeWidth="1.2" />
    <circle cx="32" cy="13" r="2" fill="#fff" stroke="#d4af37" /><circle cx="8" cy="28" r="2" fill="#fff" stroke="#d4af37" /><circle cx="56" cy="28" r="2" fill="#fff" stroke="#d4af37" />
  </svg>
);

const sketchIcons = [SketchApple, SketchMirror, SketchCottage, SketchCrown];

const pageContents = [
  { title: 'Chapter I',   subtitle: 'The Fairest of Them All',   text: 'Deep in the heart of a great forest, there lived a princess with skin as white as snow, lips red as the rose, and hair black as ebony...' },
  { title: 'Chapter II',  subtitle: 'The Magic Mirror',           text: 'Every morning the Evil Queen would gaze into her enchanted mirror and ask — "Magic Mirror on the wall, who is the fairest one of all?"' },
  { title: 'Chapter III', subtitle: 'The Cottage in the Woods',   text: 'Seven small beds, seven small chairs, and seven tiny bowls upon the table. Everything was so neat and clean it sparkled.' },
  { title: 'Chapter IV',  subtitle: "True Love's Kiss",           text: 'And so they lived, happily ever after, in a kingdom filled with light and song, where kindness always triumphed.' },
];

// ── Parchment Texture Layer ───────────────────────────────────────────────────
const ParchmentTexture = () => (
  <>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(160deg, #f5ead0 0%, #ede0c0 30%, #e8d5a8 60%, #ddc89a 100%)', mixBlendMode: 'multiply', opacity: 0.45 }} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(101,68,32,0.12) 100%)' }} />
    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #6b4423 27px, #6b4423 28px)' }} />
  </>
);

// ── Page Content Layout ───────────────────────────────────────────────────────
const PageFace = React.forwardRef<HTMLDivElement, { content: typeof pageContents[0]; iconIndex: number; bgColor?: string }>(
  ({ content, iconIndex, bgColor = '#fdfaf5' }, ref) => {
    const Icon = sketchIcons[iconIndex];
    return (
      <div ref={ref} className="absolute inset-0 flex flex-col items-center justify-start overflow-hidden" style={{ background: bgColor, backfaceVisibility: 'hidden' }}>
        <ParchmentTexture />
        <div className="relative z-10 w-full flex flex-col items-center px-10 pt-12 pb-8 gap-3">
          <div className="opacity-90"><Icon /></div>
          <h2 style={{ display: 'flex', alignItems: 'baseline', gap: '8px', lineHeight: 1.1 }}>
            <span className="sw-chapter-title-word">{content.title.split(' ')[0]}</span>
            <span className="sw-chapter-numeral">{content.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(to right, transparent, #b08d44, transparent)' }} />
          <h3 className="sw-chapter-subtitle">{content.subtitle}</h3>
          <p className="sw-chapter-text">{content.text}</p>
        </div>
      </div>
    );
  }
);

// ── A Single Flippable Page ───────────────────────────────────────────────────
const FlipPage = React.forwardRef<HTMLDivElement, {
  frontContent: typeof pageContents[0];
  backContent: typeof pageContents[0];
  frontIcon: number;
  backIcon: number;
  zPos: number;
  bgFront?: string;
  bgBack?: string;
}>(({ frontContent, backContent, frontIcon, backIcon, zPos, bgFront, bgBack }, ref) => (
  <div
    ref={ref}
    className="absolute inset-0"
    style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', transform: `translateZ(${zPos}px)` }}
  >
    {/* Front face */}
    <PageFace content={frontContent} iconIndex={frontIcon} bgColor={bgFront} />
    {/* Back face */}
    <div className="absolute inset-0" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
      <PageFace content={backContent} iconIndex={backIcon} bgColor={bgBack} />
    </div>
  </div>
));

// ── Main Preloader ────────────────────────────────────────────────────────────
const SnowWhitePreloader = ({ onComplete }: { onComplete?: () => void }) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const bookRef       = useRef<HTMLDivElement>(null);
  const frontCoverRef = useRef<HTMLDivElement>(null);
  const page1Ref      = useRef<HTMLDivElement>(null);
  const page2Ref      = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete?.();
        },
      });

      // 1. Float the book in from out of frame
      tl.fromTo(
        bookRef.current,
        { rotateX: 35, rotateY: 25, rotateZ: -14, scale: 0.55, opacity: 0 },
        { rotateX: 12, rotateY: -5, rotateZ: -2, scale: 1.05, opacity: 1, duration: 1.6, ease: 'power2.out' }
      );

      // 2. Open the front cover
      tl.to(frontCoverRef.current, { rotateY: -160, duration: 1.3, ease: 'power3.inOut' }, '+=0.2');

      // 3. Flip page 1
      tl.to(page1Ref.current, {
        rotateY: -160, z: 12, rotateX: -6, rotateZ: 3,
        duration: 2.2, ease: 'sine.inOut',
      }, '+=0.15');

      // 4. Flip page 2
      tl.to(page2Ref.current, {
        rotateY: -160, z: 10, rotateX: -5, rotateZ: 2,
        duration: 2.0, ease: 'sine.inOut',
      }, '-=1.5');

      // 5. Final zoom into the book
      tl.to(bookRef.current, {
        rotateX: 0, rotateY: 0, rotateZ: 0,
        scale: 28, x: '-60%', y: '30%', opacity: 0,
        duration: 1.1, ease: 'power2.in',
      }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  const bookW = 420, bookH = 580;
  const coverDepth = 14;
  const pageW = bookW - 12, pageH = bookH - 24;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden" style={{ background: '#050a18' }}>
      {/* load fonts and utility classes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

        .sw-chapter-title-word {
          font-family: 'UnifrakturMaguntia', cursive;
          font-size: 26px;
          color: #5a3010;
          line-height: 1.1;
          letter-spacing: 0.02em;
        }
        .sw-chapter-numeral {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          font-weight: 700;
          color: #8a5c20;
          letter-spacing: 0.12em;
        }
        .sw-chapter-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 15px;
          color: #2d5a27;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .sw-chapter-text {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          color: rgba(90,62,27,0.82);
          line-height: 1.7;
          text-align: center;
          max-width: 220px;
          font-style: italic;
        }
        .sw-cover-title {
          font-family: 'UnifrakturMaguntia', cursive;
          font-size: 68px;
          color: #D4AF37;
          line-height: 0.95;
          text-align: center;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.2);
          letter-spacing: 0.01em;
        }
        .sw-cover-sub {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
          color: #b08d44;
          letter-spacing: 0.15em;
          text-align: center;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .sw-cover-and {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-style: italic;
          color: #a07830;
        }
      `}</style>

      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.25) 0%, transparent 70%)' }} />

      {/* Perspective wrapper */}
      <div style={{ perspective: '2400px', transformStyle: 'preserve-3d' }}>
        <div ref={bookRef} style={{ width: bookW, height: bookH, transformStyle: 'preserve-3d', position: 'relative' }}>

          {/* ── BACK COVER ── */}
          <div className="absolute" style={{ width: bookW, height: bookH, transform: `translateZ(-${coverDepth * 2 + 4}px)`, background: 'linear-gradient(135deg, #2a1a04 0%, #3d2b0a 60%, #1a0e02 100%)', borderRadius: 2, boxShadow: '-8px 0 20px rgba(0,0,0,0.6)' }} />

          {/* ── SPINE ── */}
          <div className="absolute flex items-center justify-center" style={{
            width: coverDepth * 2, height: bookH, top: 0, left: 0,
            transformOrigin: 'left center',
            transform: `translateX(-${coverDepth}px) rotateY(-90deg) translateZ(-${coverDepth}px)`,
            background: 'linear-gradient(to right, #2a1508 0%, #7a5228 25%, #d4af37 50%, #7a5228 75%, #2a1508 100%)',
          }}>
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.4em', color: '#f5d770', opacity: 0.9 }}>SNOW WHITE</span>
          </div>

          {/* ── PAGE BLOCK ── */}
          <div className="absolute" style={{ width: pageW, height: pageH, top: 12, left: 6, transform: `translateZ(-${coverDepth + 4}px)`, background: 'repeating-linear-gradient(to bottom, #e8d8a0 0px, #e8d8a0 1px, #f5ecd5 1px, #f5ecd5 3px)', boxShadow: 'inset -8px 0 14px rgba(0,0,0,0.08)' }} />

          {/* ── FLIPPING PAGES ── */}
          <div className="absolute" style={{ width: pageW, height: pageH, top: 12, left: 6, transformStyle: 'preserve-3d' }}>
            {/* Page 2 (bottom, flips last) */}
            <FlipPage
              ref={page2Ref}
              frontContent={pageContents[2]} frontIcon={2}
              backContent={pageContents[3]} backIcon={3}
              zPos={-6} bgFront="#f7f0e3" bgBack="#fdfaf5"
            />
            {/* Page 1 (top, flips first) */}
            <FlipPage
              ref={page1Ref}
              frontContent={pageContents[0]} frontIcon={0}
              backContent={pageContents[1]} backIcon={1}
              zPos={-2} bgFront="#fdfaf5" bgBack="#f7f0e3"
            />
          </div>

          {/* ── FRONT COVER ── */}
          <div
            ref={frontCoverRef}
            className="absolute"
            style={{ width: bookW, height: bookH, transformStyle: 'preserve-3d', transformOrigin: 'left center', zIndex: 50 }}
          >
            {/* Front face */}
            <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: '#f8f6f0', backfaceVisibility: 'hidden', borderRadius: 2, boxShadow: '8px 0 24px rgba(0,0,0,0.4)' }}>
              {/* Gold spine strip */}
              <div className="absolute left-0 top-0 bottom-0 w-5" style={{ background: 'linear-gradient(to right, #5a2e04 0%, #c9a84c 50%, #7a5228 100%)' }} />
              {/* Outer gold border */}
              <div className="absolute" style={{ border: '5px solid #d4af37', top: 14, left: 28, right: 10, bottom: 10, pointerEvents: 'none', boxShadow: 'inset 0 0 10px rgba(212,175,55,0.12)' }} />
              {/* Inner gold border */}
              <div className="absolute" style={{ border: '1.5px solid rgba(201,168,76,0.5)', top: 24, left: 38, right: 20, bottom: 20, pointerEvents: 'none' }} />
              
              {/* Title area */}
              <div className="flex-1 flex flex-col items-center justify-center gap-2" style={{ padding: '20px 40px 10px 36px' }}>
                <div className="sw-cover-title">Snow White</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="sw-cover-and">and the</span>
                </div>
                <div className="sw-cover-sub">SEVEN DWARFS</div>
              </div>

              {/* Dwarf Frieze */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 32, paddingRight: 14, height: 64, background: 'linear-gradient(135deg, #c49a30 0%, #ebd07a 25%, #f7e2a3 50%, #ebd07a 75%, #c49a30 100%)', borderTop: '3px solid #ab7a1a' }}>
                {[...Array(7)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 36" width="20" height="32" fill="#8f631a" style={{ opacity: 0.85 }}>
                    <rect x="5" y="6" width="14" height="7" rx="1" /><path d="M7 6 Q12 0 17 6" />
                    <ellipse cx="12" cy="19" rx="6" ry="7" fill="#deba7a" stroke="#8f631a" strokeWidth="1" />
                    <path d="M6 22 Q8 30 12 32 Q16 30 18 22" fill="#f5dfad" stroke="#8f631a" strokeWidth="0.8" />
                    <circle cx="9.5" cy="17.5" r="1" fill="#4a3010" /><circle cx="14.5" cy="17.5" r="1" fill="#4a3010" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Back face (inside of cover) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateY(180deg)', background: '#ede0c0', backfaceVisibility: 'hidden' }}>
              <ParchmentTexture />
              <span style={{ color: '#c9a84c', fontSize: 40, opacity: 0.2, fontFamily: 'serif' }}>✦</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 w-full text-center pointer-events-none">
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.5em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase' }}>
          Preparing Your Story...
        </p>
      </div>
    </div>
  );
};

export default SnowWhitePreloader;
