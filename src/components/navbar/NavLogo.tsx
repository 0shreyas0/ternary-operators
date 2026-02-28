import { motion } from 'framer-motion';
import castleLogo from '../../assets/disney-castle-logo.svg';
import { lenisInstance } from '../../hooks/useLenis';

export const NavLogo = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    if (lenisInstance) {
      e.preventDefault();
      lenisInstance.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <motion.a
      href="#"
      onClick={handleLogoClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Disney"
      className="select-none"
    >
      <img
        src={castleLogo}
        alt="Disney"
        style={{ height: 44, width: 'auto', filter: 'brightness(0) invert(1)' }}
      />
    </motion.a>
  );
};
