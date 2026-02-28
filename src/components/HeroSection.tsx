import { motion } from 'framer-motion';
import disneyLogo from '../assets/disney-logo.svg';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf5]">

      {/* Soft radial glow in the center */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white opacity-80 rounded-full blur-[100px]" />
      </div>

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full px-8 md:px-12 py-6 flex items-center mb-8 border-b border-[#ebd7b2]/30 shadow-sm bg-[#fdfaf5]/80 backdrop-blur-md z-20">

        <div className="flex-1 flex justify-start">
          <div className="text-xl md:text-2xl font-serif font-bold text-[#634e2e] tracking-widest leading-none" style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}>
            DISNEY
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-center gap-10 text-[11px] font-semibold tracking-[0.2em] text-[#8c7b60]">
          <a href="#movies" className="hover:text-[#4a3a1f] transition-colors rounded hover:bg-black/5 px-2 py-1">MOVIES</a>
          <a href="#series" className="hover:text-[#4a3a1f] transition-colors rounded hover:bg-black/5 px-2 py-1">SERIES</a>
          <a href="#parks" className="hover:text-[#4a3a1f] transition-colors rounded hover:bg-black/5 px-2 py-1">PARKS</a>
          <a href="#merch" className="hover:text-[#4a3a1f] transition-colors rounded hover:bg-black/5 px-2 py-1">MERCH</a>
        </div>

        <div className="flex-1 flex justify-end">
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-br from-[#aa833e] via-[#c6a35d] to-[#aa833e] text-white text-[10px] sm:text-xs font-bold tracking-widest shadow-[0_4px_12px_rgba(181,143,68,0.4)] hover:shadow-[0_6px_16px_rgba(181,143,68,0.6)] hover:scale-105 transition-all outline outline-2 outline-offset-1 outline-[#aa833e]/30">
            DISNEY+ ✨
          </button>
        </div>

      </nav>

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
            backgroundImage: 'linear-gradient(135deg, #4a3a1f 0%, #6b522b 30%, #a68444 55%, #cfa861 75%, #4a3a1f 100%)',
          }}
        />




      </div>


    </section>
  );
};
