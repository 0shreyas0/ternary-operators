import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';

export const NavLinks = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ul className="hidden md:flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          <motion.a
            href={item.href}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setActiveItem(item.label)}
            onHoverEnd={() => setActiveItem(null)}
            className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-lg font-sans font-black tracking-widest uppercase text-white/80 hover:text-white transition-colors"
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
  );
};
