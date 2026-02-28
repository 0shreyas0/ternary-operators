import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeroCarousel } from './components/HeroCarousel';
import FranchiseWorlds from './components/FranchiseWorlds';
import { FilmReel } from './components/FilmReel';
// @ts-ignore
import Footer from './components/parks';
import DisneyPlusSection from './Disneyplus';
// @ts-ignore
import MerchSection from './Merch';
import { SiteFooter } from './components/SiteFooter';
import { lazy, Suspense } from 'react';
const Disney3DPreloader = lazy(() => import('./components/Disney3DPreloader'));
import { HiddenPrincess } from './components/HiddenPrincess';
import { CollectionHUD } from './components/CollectionHUD';
import { GameProvider } from './hooks/useGame';
import { ActiveSectionProvider } from './hooks/useActiveSection';
import { HIDDEN_PRINCESSES } from './constants/princesses';
import { useLenis } from './hooks/useLenis';
import RalphCursor from './components/RalphCursor';
import './index.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useLenis();

  // Every time the preloader finishes and the real content mounts,
  // slam the scroll back to the very top before the browser can settle.
  useEffect(() => {
    if (!preloaderDone) return;
    // Synchronous reset so it happens before the next paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [preloaderDone]);

  // Group hidden princesses by section for easy placement
  const bySection = (sectionId: string) =>
    HIDDEN_PRINCESSES.filter(p => p.sectionId === sectionId);

  return (
    <GameProvider>
      <ActiveSectionProvider>
        <div className="w-full min-h-screen bg-[#020818] overflow-x-hidden">
          {/* Preloader — Snow White book animation */}
          {!preloaderDone && (
            <Suspense fallback={<div className="fixed inset-0 bg-[#050a18]" />}>
              <Disney3DPreloader onComplete={() => setPreloaderDone(true)} />
            </Suspense>
          )}

          {preloaderDone && (
            <div className="animate-fade-in">
              {/* Ralph chaser — only shown on the main site */}
              <RalphCursor />
              {/* Floating glassmorphic navbar */}
              <Navbar />

              {/* 1 ── Full-screen hero with starfield + parallax */}
              <section id="hero" className="relative">
                <HeroSection />
                {bySection('hero').map(p => (
                  <HiddenPrincess key={p.id} id={p.id} x={p.x} y={p.y} />
                ))}
              </section>

              {/* 2 ── Disney history carousel */}
              <section id="carousel" className="relative scroll-mt-20">
                <HeroCarousel />
                {bySection('carousel').map(p => (
                  <HiddenPrincess key={p.id} id={p.id} x={p.x} y={p.y} />
                ))}
              </section>

              {/* 3 ── Franchise universe cards */}
              <section id="worlds" className="relative">
                <FranchiseWorlds />
                {bySection('worlds').map(p => (
                  <HiddenPrincess key={p.id} id={p.id} x={p.x} y={p.y} />
                ))}
              </section>

              {/* 4 ── Scrolling film reel */}
              <section id="filmreel" className="relative scroll-mt-24">
                <FilmReel />
                {bySection('filmreel').map(p => (
                  <HiddenPrincess key={p.id} id={p.id} x={p.x} y={p.y} />
                ))}
              </section>

              {/* 5 ── Parks section */}
              <section id="footer" className="relative scroll-mt-24">
                <div id="parks" />
                <Footer />
                {bySection('footer').map(p => (
                  <HiddenPrincess key={p.id} id={p.id} x={p.x} y={p.y} />
                ))}
              </section>

              {/* 6 ── Disney+ Streaming section */}
              <section id="streaming" className="relative">
                <DisneyPlusSection />
              </section>

              {/* 7 ── Merch section */}
              <section id="merch" className="relative">
                <MerchSection />
              </section>

              {/* 8 ── Site footer */}
              <SiteFooter />

              {/* ── Fixed Collection HUD (always visible) ── */}
              <CollectionHUD />
            </div>
          )}
        </div>
      </ActiveSectionProvider>
    </GameProvider>
  );
}

export default App;
