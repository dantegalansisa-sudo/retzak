import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from './Icons';
import { waLink } from '../data/site';

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Escríbenos por WhatsApp"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <span className="wa-float__pulse" />
          <WhatsAppIcon size={28} />
          <span className="wa-float__tip">Evaluación sin costo</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
