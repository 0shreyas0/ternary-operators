import { useState } from 'react';
import disneycastle from '../assets/disney-castle-logo.svg';
import mickeyMouse from '../assets/mickey-mouse-logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphic bar */}
      <div className="mx-4 mt-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
        >
          <img src={disneycastle} alt="Disney" className="h-20 w-auto select-none" />
        </motion.a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <motion.a
                href={item.href}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setActiveItem(item.label)}
                onHoverEnd={() => setActiveItem(null)}
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <AnimatePresence>
                  {activeItem === item.label && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#streaming"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={mickeyMouse} alt="Mickey Mouse" className="h-16 w-16" />
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="mx-4 mt-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-semibold transition-all"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
