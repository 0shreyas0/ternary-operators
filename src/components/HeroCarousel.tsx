import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import posterWalt from '../assets/poster_walt.png';
import posterSteamboat from '../assets/poster_steamboat_willy.png';
import posterSnowWhite from '../assets/poster_snow_white.png';
import posterFrozen from '../assets/poster_frozen.png';
import posterFamily from '../assets/poster_family.png';
import { useSectionObserver } from '../hooks/useActiveSection';
import SplitTextAnim from './SplitTextAnim';

const carouselData = [
  {
    id: 1,
    title: "The Visionary: Walt Disney",
    image: posterWalt,
    content: "Walt Disney's boundless imagination and pioneering spirit laid the foundation for an entertainment empire that would touch the hearts of millions across the globe."
  },
  {
    id: 2,
    title: "The Beginning: Steamboat Willie",
    image: posterSteamboat,
    content: "Steamboat Willie (1928) introduced the world to Mickey Mouse. It was one of the first cartoons with synchronized sound, revolutionizing the animation industry and putting Disney on the map."
  },
  {
    id: 3,
    title: "The Gamble: Snow White",
    image: posterSnowWhite,
    content: "Released in 1937, Snow White and the Seven Dwarfs was dubbed \"Disney's Folly\" during production. It became the first full-length cel animated feature in history — proving critics wrong and founding an empire."
  },
  {
    id: 4,
    title: "The Modern Era: Frozen",
    image: posterFrozen,
    content: "Frozen (2013) brought the classic Disney musical fairy tale into the modern era. Becoming a global cultural phenomenon, it demonstrated the enduring emotional power of Disney's storytelling."
  },
  {
    id: 5,
    title: "Bringing Families Closer",
    image: posterFamily,
    content: "For nearly a century, Disney magic has been bringing families closer together. Through shared stories, unforgettable characters, and shared memories, the Disney legacy continues to create bonds that span generations."
  }
];


const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const HeroCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useSectionObserver('carousel', sectionRef);

  // Fix the modulo for negative numbers to ensure true infinite scroll/loop
  const imageIndex = ((page % carouselData.length) + carouselData.length) % carouselData.length;
  const currentSlide = carouselData[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 3500);

    return () => clearInterval(timer);
  }, [page, isHovered]);

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto my-12 relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-center text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          <SplitTextAnim
            text="The Disney Centennial Journey"
            delay={50}
            duration={1.2}
            ease="power3.out"
            from={{ opacity: 0, y: 15 }}
            to={{ opacity: 1, y: 0 }}
          />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto italic font-serif"
        >
          A voyage through 100 years of enchantment and innovation.
        </motion.p>
      </div>

      <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden rounded-[40px] shadow-2xl bg-[#050a18] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: 2000 }}>

        {/* Background ambient glowing effect based on current slide image (simulated with standard gradient for performance) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2035] via-[#050a18] to-[#12182b] opacity-80" />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              rotateY: { duration: 0.6, ease: "easeInOut" }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-end md:justify-center p-6 md:p-16 cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Full Background Image Section */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Responsive Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a18] via-[#050a18]/70 to-[#050a18]/10 md:bg-gradient-to-r md:from-[#050a18] md:via-[#050a18]/80 md:to-transparent z-10" />
            </div>

            {/* Content Section */}
            <div className="relative z-30 w-full md:w-1/3 text-left">
              <div className="relative z-10 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1 bg-black/40 rounded-full text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md text-amber-300 border border-white/20"
                >
                  Chapter {imageIndex + 1}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 mb-4 drop-shadow-xl leading-tight"
                >
                  {currentSlide.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-gray-200 leading-relaxed drop-shadow-md font-medium"
                >
                  {currentSlide.content}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-6 pointer-events-none z-40 opacity-100 transition-opacity duration-300">
          <button
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white/30 hover:scale-110 active:scale-95 transition-all shadow-lg"
            onClick={() => paginate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white/30 hover:scale-110 active:scale-95 transition-all shadow-lg"
            onClick={() => paginate(1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
          {carouselData.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const direction = i > imageIndex ? 1 : -1;
                setPage([page + (i - imageIndex), direction]);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === imageIndex ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
