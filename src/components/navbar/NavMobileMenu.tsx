import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';

export const NavMobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
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
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-black tracking-widest uppercase text-sm transition-all"
          >
            <span>{item.label}</span>
          </a>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);
