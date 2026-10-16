import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Zap, Sun, Leaf, Settings, ShieldCheck, Gem, BarChart3, Star } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';
import { EASINGS } from '../utils/easings';

const WORD = 'RETZAK'.split('');

function useLiveKw() {
  const [kw, setKw] = useState(24.8);
  const [bars, setBars] = useState([0.28, 0.4, 0.52, 0.62, 0.74, 0.86, 1]);
  useEffect(() => {
    const id = setInterval(() => {
      setKw((v) => Math.min(25.6, Math.max(23.9, +(v + (Math.random() - 0.5) * 0.5).toFixed(1))));
      setBars((b) => b.map((h, i) => Math.min(1, Math.max(0.2, (i + 2.2) / 8.2 + (Math.random() - 0.5) * 0.14 + h * 0))));
    }, 1600);
    return () => clearInterval(id);
  }, []);
  return { kw, bars };
}

function useTodayKwh() {
  const [kwh, setKwh] = useState(142);
  useEffect(() => {
    const id = setInterval(() => setKwh((v) => +(v + 0.1).toFixed(1)), 3200);
    return () => clearInterval(id);
  }, []);
  return kwh;
}

const floatAnim = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
});

function Widgets() {
  const { kw, bars } = useLiveKw();
  const kwh = useTodayKwh();
  return (
    <div className="hero__widgets">
      <motion.div
        className="widget widget--installed"
        initial={{ opacity: 0, x: 40, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASINGS.premium }}
      >
        <motion.div className="widget__inner" {...floatAnim(0)}>
          <div className="widget__thumb">
            <img src="/images/casa-detalle.webp" alt="" />
            <span className="widget__bolt">
              <Zap size={14} fill="currentColor" />
            </span>
          </div>
          <div>
            <strong className="widget__big">+7K</strong>
            <span className="widget__label">Sistemas instalados en todo el país</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="widget-stack"
        initial={{ opacity: 0, x: 40, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.3, ease: EASINGS.premium }}
      >
        <motion.div className="widget-stack__inner" {...floatAnim(1.2)}>
          <div className="widget widget--live">
            <div className="widget__head">
              <span className="live-dot" /> Producción en vivo
              <span className="widget__muted hide-sm">En tiempo real</span>
            </div>
            <div className="widget__row">
              <div className="bars" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.span key={i} animate={{ scaleY: h }} transition={{ duration: 0.9, ease: EASINGS.smooth }} />
                ))}
              </div>
              <div>
                <strong className="widget__big widget__big--light">{kw.toFixed(1)} kW</strong>
                <span className="widget__label widget__label--light">Generando ahora</span>
              </div>
            </div>
          </div>
          <div className="widget widget--today">
            <div className="widget__head widget__head--dark">
              <Zap size={16} fill="currentColor" /> Energía de hoy
            </div>
            <strong className="widget__big">{kwh.toFixed(0)} kWh</strong>
            <span className="widget__label widget__label--dark">Energía limpia generada</span>
            <svg className="spark" viewBox="0 0 140 70" aria-hidden="true">
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".55" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M4 62 L30 46 L52 52 L78 34 L100 40 L134 8 L134 70 L4 70 Z"
                fill="url(#sparkFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
              />
              <motion.path
                d="M4 62 L30 46 L52 52 L78 34 L100 40 L134 8"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.6, duration: 1.6, ease: EASINGS.smooth }}
              />
              {[
                [30, 46],
                [78, 34],
                [100, 40],
                [134, 8],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="3.6"
                  fill="#F5B000"
                  stroke="#fff"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + i * 0.25, type: 'spring', stiffness: 300 }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
        <img className="widget-stack__device" src="/images/inversor.webp" alt="" />
      </motion.div>
    </div>
  );
}

function HeroDock() {
  return (
    <motion.div
      className="dock"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.9, ease: EASINGS.premium }}
    >
      <svg className="dock__shape" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 140 Q0 80 60 80 L340 80 Q378 80 396 48 L410 24 Q424 0 462 0 L978 0 Q1016 0 1030 24 L1044 48 Q1062 80 1100 80 L1380 80 Q1440 80 1440 140 L1440 320 L0 320 Z" />
      </svg>
      <div className="dock__grid container">
        <div className="dock__col dock__col--left">
          <div className="dock__icons">
            <span className="icon-bubble icon-bubble--sun">
              <Sun size={24} />
            </span>
            <span className="icon-bubble">
              <Leaf size={22} />
            </span>
            <span className="icon-bubble">
              <Settings size={22} />
            </span>
          </div>
          <h3>Eficiencia, respaldo y durabilidad</h3>
          <p>Tecnología solar de alto rendimiento para un futuro más limpio y rentable en la República Dominicana.</p>
          <span className="gold-rule" />
        </div>

        <div className="dock__col dock__col--center">
          <span className="eyebrow eyebrow--center">República Dominicana más solar</span>
          <h2 className="dock__title">
            Energía hoy,
            <span className="text-gold">ahorro para mañana</span>
          </h2>
          <MagneticButton href={waLink()} className="btn btn--sun btn--lg">
            Empieza hoy <ArrowRight size={20} />
          </MagneticButton>
          <div className="dock__badges">
            <span>
              <i className="badge-ring">
                <Leaf size={14} />
              </i>
              <b>Ahorra</b>
              <small>desde el primer mes</small>
            </span>
            <span>
              <i className="badge-ring">
                <ShieldCheck size={14} />
              </i>
              <b>Respaldo</b>
              <small>y soporte local</small>
            </span>
            <span>
              <i className="badge-ring">
                <Gem size={14} />
              </i>
              <b>Tecnología</b>
              <small>de clase mundial</small>
            </span>
          </div>
        </div>

        <div className="dock__col dock__col--right">
          <h3>Lo que dicen nuestros clientes</h3>
          <div className="stars" aria-label="5 de 5 estrellas">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="dock__quote">
            “Excelente servicio, instalación profesional y un ahorro real en nuestra factura eléctrica. Totalmente
            recomendados.”
          </p>
          <div className="dock__author">
            <span>María Fernández — Santo Domingo</span>
            <strong>4.9 / 5</strong>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const STRIP = [
  { icon: Leaf, title: 'Ahorro real', text: 'Desde el primer mes' },
  { icon: ShieldCheck, title: 'Respaldo', text: 'Energía siempre disponible' },
  { icon: BarChart3, title: 'Monitoreo', text: 'En tiempo real desde tu móvil' },
  { icon: Gem, title: 'Alta durabilidad', text: 'Tecnología de clase mundial' },
];

function HeroStrip() {
  return (
    <motion.div
      className="strip"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASINGS.premium }}
    >
      {STRIP.map(({ icon: Icon, title, text }) => (
        <div key={title} className="strip__item">
          <span className="icon-bubble icon-bubble--sm">
            <Icon size={20} />
          </span>
          <b>{title}</b>
          <small>{text}</small>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const bgScale = useTransform(smooth, [0, 1], [1.04, 1.22]);
  const bgY = useTransform(smooth, [0, 1], [0, 140]);
  const wordY = useTransform(smooth, [0, 1], [0, -160]);
  const wordOpacity = useTransform(smooth, [0, 0.6], [1, 0]);
  const contentY = useTransform(smooth, [0, 1], [0, 90]);

  return (
    <section id="inicio" className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ scale: bgScale, y: bgY }}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.webp" type="image/webp" />
          <source srcSet="/images/hero.webp" type="image/webp" />
          <motion.img
            src="/images/hero.jpg"
            alt="Casa moderna con paneles solares Retzak frente al mar al atardecer"
            initial={{ scale: 1.15, filter: 'blur(12px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: EASINGS.smooth }}
          />
        </picture>
      </motion.div>
      <div className="hero__veil" />

      <motion.div className="hero__word" style={{ y: wordY, opacity: wordOpacity }} aria-hidden="true">
        {WORD.map((l, i) => (
          <span key={i} className="hero__word-mask">
            <motion.span
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.3, delay: 0.35 + i * 0.08, ease: EASINGS.cinematic }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.div>

      <motion.div className="hero__grid container" style={{ y: contentY }}>
        <motion.div
          className="hero__card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASINGS.premium }}
        >
          <span className="eyebrow show-md">República Dominicana más solar</span>
          <RevealText tag="h1" immediate delay={1} className="hero__title hide-md">
            {[{ text: 'Energía limpia,' }, { text: 'ahorro real' }]}
          </RevealText>
          <RevealText tag="h1" immediate delay={0.9} className="hero__title show-md">
            {[{ text: 'Energía solar inteligente' }, { text: 'para tu hogar', className: 'text-gold' }]}
          </RevealText>
          <p className="hero__lead">
            Soluciones de paneles solares e inversores para hogares y negocios en toda la República Dominicana.
          </p>
          <div className="hero__actions">
            <span className="hide-md">
              <MagneticButton href="#soluciones" className="btn btn--sun btn--lg">
                Explorar soluciones <ArrowRight size={20} />
              </MagneticButton>
            </span>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--sun btn--lg show-md">
              Solicita cotización <ArrowRight size={20} />
            </a>
            <a href="#nosotros" className="btn btn--ghost btn--lg show-md">
              Ver proyectos
              <span className="play">
                <Play size={12} fill="currentColor" />
              </span>
            </a>
          </div>
        </motion.div>

        <Widgets />
      </motion.div>

      <HeroDock />
      <HeroStrip />
    </section>
  );
}
