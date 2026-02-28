import { useState } from 'react';
import { NavLogo } from './navbar/NavLogo';
import { NavLinks } from './navbar/NavLinks';
import { NavMobileMenu } from './navbar/NavMobileMenu';
import mickeyMouse from '../assets/mickey-mouse-logo.png';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Glassmorphic bar — logo left | links center | mickey right */}
      <div className="mx-auto max-w-fit mt-6 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-8 py-2 flex items-center gap-12 pointer-events-auto">

        {/* Left — Castle logo */}
        <div className="flex items-center">
          <NavLogo />
        </div>

        {/* Center — Nav links */}
        <div className="flex justify-center">
          <NavLinks />
        </div>

        {/* Right — Mickey + hamburger */}
        <div className="flex items-center justify-end gap-3">
          <motion.a
            href="#streaming"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <img src={mickeyMouse} alt="Disney+" className="h-12 w-12" />
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <NavMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.nav>
  );
};
