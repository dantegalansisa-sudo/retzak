import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import { NAV, PHONE_DISPLAY, PHONE_E164, waLink } from '../data/site';
import { EASINGS } from '../utils/easings';
import { WhatsAppIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASINGS.premium, delay: 0.2 }}
      >
        <div className="nav__inner container">
          <a href="#inicio" className="nav__logo" aria-label="Egersa Solar — inicio">
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Principal">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="nav__link">
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <MagneticButton href={waLink()} className="btn btn--sun nav__cta">
              <span className="hide-sm">Solicitar presupuesto</span>
              <span className="show-sm">
                <WhatsAppIcon size={18} /> Cotizar
              </span>
              <ArrowRight size={18} className="hide-sm" />
            </MagneticButton>
            <button
              className="nav__burger"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: EASINGS.premium }}
          >
            <nav className="menu__links">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASINGS.premium }}
                >
                  <span className="menu__num">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`tel:${PHONE_E164}`} className="menu__phone">
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--sun btn--block">
                <WhatsAppIcon size={20} /> Escríbenos por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
