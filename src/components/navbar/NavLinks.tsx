import { useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { useActiveSection } from '../../hooks/useActiveSection';
import { lenisInstance } from '../../hooks/useLenis';

export const NavLinks = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { activeSection } = useActiveSection();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const lenis = lenisInstance || window.lenis;

    if (href.startsWith('#')) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { 
          offset: -100, 
          duration: 2.0, // Majestic slower scroll
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          onComplete: () => {
            window.history.pushState(null, '', href);
          }
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <ul
      className="hidden md:flex items-center gap-1 group/nav relative"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.href.replace('#', '');
        return (
          <li key={item.label} className="relative py-2">
            <motion.a
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
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
