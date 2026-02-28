import { motion } from 'framer-motion';
import disneyLogo from '../assets/disney-logo.svg';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf5]">



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
