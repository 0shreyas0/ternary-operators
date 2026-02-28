import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { lenisInstance } from '../../hooks/useLenis';

export const NavMobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const lenis = lenisInstance || window.lenis;
    if (href.startsWith('#')) {
      e.preventDefault();
      onClose();
      const scrollFn = () => {
        if (lenis) {
          lenis.scrollTo(href, { offset: -90, duration: 2.0 });
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      };
      setTimeout(scrollFn, 250); // Small delay to let menu animation start closing
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-black tracking-widest uppercase text-sm transition-all"
            >
              <span>{item.label}</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
