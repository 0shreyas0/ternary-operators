import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { PRINCESS_DATA } from '../constants/princesses';
import { PrincessSprite } from './PrincessSprite';

/**
 * CollectionHUD
 * A fixed bottom-right widget that shows:
 * - Progress counter
 * - Expandable grid of all 17 princesses (grayscale if not yet found)
 * - Toast notification when a new princess is collected
 */
export const CollectionHUD = () => {
  const { collected, lastCollected, collectedCount, totalCount, isComplete } = useGame();
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Auto-dismiss the hint after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const progress = (collectedCount / totalCount) * 100;

  return (
    <>
      {/* ── Collect Toast ── */}
      <AnimatePresence>
        {lastCollected && (
          <motion.div
            key={lastCollected.collectedAt}
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            exit={{ opacity: 0, x: 80, scale: 0.8 }}
            className="fixed bottom-24 right-4 z-[200] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl bg-black/70"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <PrincessSprite spriteIndex={lastCollected.id} displayWidth={22} cropHeight={40} />
            </motion.div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: lastCollected.color }}>
                Found!
              </p>
              <p className="text-white font-bold text-sm">{lastCollected.name}</p>
              <p className="text-white/50 text-[10px]">{collectedCount} / {totalCount} collected</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HUD Button + Panel ── */}
      <div className="fixed bottom-4 right-4 z-[199]">

        {/* Hint tooltip */}
        <AnimatePresence>
          {showHint && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="absolute bottom-16 right-0 mb-1 w-52 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.2)] px-4 py-3 text-center pointer-events-none"
            >
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 right-5 w-3 h-3 bg-black/80 border-r border-b border-amber-400/30 rotate-45" />
              <motion.p
                animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                className="font-bold text-sm mb-1"
                style={{
                  background: 'linear-gradient(90deg, #fbbf24 0%, #fff7ae 30%, #f472b6 50%, #fff7ae 70%, #fbbf24 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ✨ Hidden Princess Hunt!
              </motion.p>
              <p className="text-white/60 text-[11px] leading-snug">
                Explore the page to find hidden princesses scattered throughout!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="mb-3 w-80 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-2xl p-5 max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-sm">Princess Collection</h3>
                  <p className="text-white/40 text-xs">{collectedCount} of {totalCount} found</p>
                </div>
                {isComplete && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl"
                  >
                    👑
                  </motion.div>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/10 rounded-full mb-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>

              {/* Sprite grid */}
              <div className="flex flex-wrap gap-2 justify-center">
                {PRINCESS_DATA.map((p) => {
                  const found = collected.has(p.id);
                  // displayWidth=44 → each sprite is 44px wide × ~268px tall natively.
                  // We crop it to 80px height (showing the full chibi body).
                  return (
                    <motion.div
                      key={p.id}
                      whileHover={{ scale: 1.12 }}
                      title={found ? p.name : '???'}
                      className="relative flex flex-col items-center gap-1 cursor-default"
                    >
                      <div
                        className={`rounded-xl overflow-hidden border ${found ? 'border-white/20' : 'border-white/5'}`}
                        style={{ background: found ? `${p.color}18` : 'rgba(255,255,255,0.03)' }}
                      >
                        <PrincessSprite
                          spriteIndex={p.id}
                          displayWidth={38}
                          cropHeight={68}
                          grayscale={!found}
                        />
                      </div>
                      <p className={`text-[8px] text-center leading-none truncate w-full px-0.5 ${found ? 'text-white/60' : 'text-white/20'}`}>
                        {found ? p.name.split(' ')[0] : '?'}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center py-3 rounded-2xl bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-amber-400/20"
                >
                  <p className="text-amber-300 font-bold text-sm">✨ Royal Court Complete! ✨</p>
                  <p className="text-white/50 text-xs mt-1">You found every princess!</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93, rotate: -5 }}
          className="w-14 h-14 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden"
          style={{ boxShadow: collectedCount > 0 ? '0 0 20px rgba(251,191,36,0.3)' : undefined }}
        >
          {/* Mini progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="28" cy="28" r="24" fill="none"
              stroke="url(#hudGrad)" strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="hudGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
          {/* Princess icon from sheet */}
          <PrincessSprite spriteIndex={0} displayWidth={16} cropHeight={28} />
        </motion.button>
      </div>
    </>
  );
};
