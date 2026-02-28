import { useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { useActiveSection } from '../../hooks/useActiveSection';

export const NavLinks = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { activeSection } = useActiveSection();

  return (
    <ul
      className="hidden md:flex items-center gap-1 group/nav relative"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {NAV_ITEMS.map((item) => {
        // NAV_ITEMS likely has #id as href. Strip `#` to compare with activeSection
        const isActive = activeSection === item.href.replace('#', '');
        return (
          <li key={item.label} className="relative py-2">
            <motion.a
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.label)}
              // The text should be stark white if hovered or active, faint otherwise
              className={`
                relative flex items-center gap-1.5 px-6 py-2 rounded-full
                text-[14px] font-sans font-black tracking-[0.2em] uppercase
                transition-colors duration-500 z-10
                ${(hoveredItem === item.label) || isActive ? 'text-white' : 'text-white/50'}
              `}
            >
              <span className="relative z-20 transition-transform duration-500">
                {item.label}
              </span>

              {/* Active Section Indicator (Scroll Spy) */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/[0.15] backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Hover Indicator */}
              {hoveredItem === item.label && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-white/[0.05] rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
};
