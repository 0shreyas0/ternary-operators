import { motion } from 'framer-motion';
import castleLogo from '../../assets/disney-castle-logo.svg';

export const NavLogo = () => (
  <motion.a
    href="#"
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
