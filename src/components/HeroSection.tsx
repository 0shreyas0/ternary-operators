import { motion } from 'framer-motion';
import disneyLogo from '../assets/disney-logo.svg';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <iframe
          src="https://www.youtube-nocookie.com/embed/k9bUTfFF3_4?autoplay=1&mute=1&end=23&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Disney Hero Background"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.78vh',
            minWidth: '100%',
            height: '56.25vw',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}
        />
      </div>

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-4xl">

        {/* Main wordmark (Masked SVG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, type: 'spring', stiffness: 120 }}
          style={{
            width: '100%',
            height: '110px',
            WebkitMaskImage: `url(${disneyLogo})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            backgroundImage: 'linear-gradient(135deg, #fff 0%, #ffe8a3 40%, #ffd166 70%, #fff 100%)',
          }}
        />

      </div>

    </section>
  );
};
