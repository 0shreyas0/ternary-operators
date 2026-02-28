import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../hooks/useGame';
import { PRINCESS_DATA } from '../constants/princesses';
import { PrincessSprite } from './PrincessSprite';

interface HiddenPrincessProps {
  id: number;           // princess index 0–16
  x: number;           // % from left of parent section
  y: number;           // % from top of parent section
}

/**
 * HiddenPrincess
 * An absolutely-positioned, hidden collectible sprite.
 * It wiggles subtly to hint at its presence, and explodes with
 * a bouncy spring animation when clicked.
 */
export const HiddenPrincess = ({ id, x, y }: HiddenPrincessProps) => {
  const { collect, collected } = useGame();
  const isCollected = collected.has(id);
  const princess = PRINCESS_DATA[id];
  const [showBurst, setShowBurst] = useState(false);
  const hasTriggered = useRef(false);

  const handleClick = () => {
    if (isCollected || hasTriggered.current) return;
    hasTriggered.current = true;
    setShowBurst(true);
    collect(id);
    setTimeout(() => setShowBurst(false), 900);
  };

  return (
    <div
      className="absolute z-[99999] pointer-events-auto select-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Main sprite — always rendered but fades after collection */}
      <motion.div
        onClick={handleClick}
        className="cursor-pointer relative"
        // Subtle idle wiggle to hint at presence
        animate={isCollected
          ? { scale: 0, opacity: 0 }
          : {
            y: [0, -4, 0, 4, 0],
            rotate: [0, -3, 0, 3, 0],
          }
        }
        transition={isCollected
          ? { duration: 0.4, type: 'spring' }
          : { repeat: Infinity, duration: 3 + (id * 0.3), ease: 'easeInOut' }
        }
        whileHover={isCollected ? {} : { scale: 1.3, filter: 'brightness(1.4)' }}
        whileTap={isCollected ? {} : { scale: 0.9 }}
      >
        <PrincessSprite spriteIndex={id} displayWidth={30} />

        {/* Sparkle dots around sprite on hover */}
        {!isCollected && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: princess.color,
                  top: `${[0, 100, 0, 100][i]}%`,
                  left: `${[0, 0, 100, 100][i]}%`,
                }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Collect burst particles */}
      <AnimatePresence>
        {showBurst && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{ background: princess.color, top: '50%', left: '50%' }}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos(rad) * 50,
                    y: Math.sin(rad) * 50,
                    scale: 0,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              );
            })}
            {/* Big ring flash */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                top: '50%', left: '50%',
                border: `3px solid ${princess.color}`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 80, height: 80, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
