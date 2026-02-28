import { useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';

export const NavLinks = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <ul
      className="hidden md:flex items-center gap-1 group/nav relative"
      onMouseLeave={() => setActiveItem(null)}
    >
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className="relative py-2">
          <motion.a
            href={item.href}
            onMouseEnter={() => setActiveItem(item.label)}
            className={`
              relative flex items-center gap-1.5 px-6 py-2 rounded-full
              text-[14px] font-sans font-black tracking-[0.2em] uppercase
              transition-colors duration-500 z-10
              ${activeItem === item.label ? 'text-white' : 'text-white/50'}
            `}
          >
            <span className="relative z-20 transition-transform duration-500">
              {item.label}
            </span>

            {activeItem === item.label && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/[0.07] backdrop-blur-xl rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.2)] border border-white/10"
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </motion.a>
        </li>
      ))}
    </ul>
  );
};
