import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FILM_REEL } from '../constants';
import lionKingImg from '../assets/lionking.png';
import fantasiaImg from '../assets/fantasia.png';
import cinderellaImg from '../assets/cindrella.png';
import toyStoryImg from '../assets/toy story.png';
import frozenImg from '../assets/frozen.png';
import moanaImg from '../assets/Moana.png';
import snowWhiteImg from '../assets/snow white.png';

// Patch Lion King with local asset
const PATCHED_REEL = FILM_REEL.map(f =>
  f.title === 'The Lion King' ? { ...f, image: lionKingImg }
    : f.title === 'Fantasia' ? { ...f, image: fantasiaImg }
      : f.title === 'Cinderella' ? { ...f, image: cinderellaImg }
        : f.title === 'Toy Story' ? { ...f, image: toyStoryImg }
          : f.title === 'Frozen' ? { ...f, image: frozenImg }
            : f.title === 'Moana' ? { ...f, image: moanaImg }
              : f.title === 'Snow White' ? { ...f, image: snowWhiteImg }
                : f
);
const LOOP_ITEMS = [...PATCHED_REEL, ...PATCHED_REEL, ...PATCHED_REEL];

export const FilmReel = () => {
  const reelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-28 bg-[#010610] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3"
        >
          ✦ A Century of Cinema ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-serif font-bold text-white"
        >
          The Magic on Film
        </motion.h2>
      </div>

      {/* Film strip border top */}
      <div className="w-full h-8 flex items-center mb-1" style={{
        background: 'repeating-linear-gradient(90deg, #111 0px, #111 30px, #1a1a1a 30px, #1a1a1a 40px)',
        borderTop: '3px solid #222', borderBottom: '3px solid #222'
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-6 h-4 mx-2 rounded-sm bg-black border border-[#333]" />
        ))}
      </div>

      {/* Scrolling poster reel */}
      <div className="relative overflow-hidden" ref={reelRef}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#010610] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#010610] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 py-4 px-4"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {LOOP_ITEMS.map((film, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -8, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex-shrink-0 w-48 md:w-56 rounded-2xl overflow-hidden border-2 border-[#333] shadow-xl cursor-pointer group"
              style={{ height: 320 }}
            >
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              {/* Grain overlay */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
              />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-4xl font-extrabold leading-tight drop-shadow-lg">{film.title}</p>
                <p className="text-amber-400 text-base font-extrabold mt-1">{film.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Film strip border bottom */}
      <div className="w-full h-8 flex items-center mt-1" style={{
        background: 'repeating-linear-gradient(90deg, #111 0px, #111 30px, #1a1a1a 30px, #1a1a1a 40px)',
        borderTop: '3px solid #222', borderBottom: '3px solid #222'
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-6 h-4 mx-2 rounded-sm bg-black border border-[#333]" />
        ))}
      </div>
    </section>
  );
};
