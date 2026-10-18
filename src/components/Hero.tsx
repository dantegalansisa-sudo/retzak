import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Leaf,
  HardHat,
  Gauge,
  Headset,
  Percent,
  Landmark,
  ClipboardCheck,
  BadgeCheck,
  Building2,
  Zap,
} from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { CERTIFICATIONS, waLink } from '../data/site';
import { EASINGS } from '../utils/easings';

const WORD = 'EGERSA'.split('');

// Same totals for every visitor: counters grow from a fixed reference point instead of per-browser storage.
const BASE_TIME = Date.parse('2026-10-17T00:00:00-04:00');
const BASE_KWH = 276_450_000;
const KWH_PER_SECOND = 1.2;
const CO2_PER_KWH = 162_939_600 / 276_450_000;

function useLiveTotals() {
  const calc = () => {
    const kwh = BASE_KWH + Math.max(0, (Date.now() - BASE_TIME) / 1000) * KWH_PER_SECOND;
    return { kwh, co2: kwh * CO2_PER_KWH };
  };
  const [totals, setTotals] = useState(calc);
  const [bars, setBars] = useState([0.28, 0.4, 0.52, 0.62, 0.74, 0.86, 1]);
  useEffect(() => {
    const id = setInterval(() => setTotals(calc()), 1000);
    const bid = setInterval(
      () => setBars((b) => b.map((_, i) => Math.min(1, Math.max(0.2, (i + 2.2) / 8.2 + (Math.random() - 0.5) * 0.14)))),
      1600,
    );
    return () => {
      clearInterval(id);
      clearInterval(bid);
    };
  }, []);
  return { ...totals, bars };
}

const fmt = (n: number) => Math.floor(n).toLocaleString('es-DO');

const floatAnim = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
});

function Widgets() {
  const { kwh, co2, bars } = useLiveTotals();
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
            <strong className="widget__big">+500</strong>
            <span className="widget__label">Instalaciones industriales, comerciales y residenciales</span>
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
              <span className="live-dot" /> Energía ahorrada
              <span className="widget__muted hide-sm">En vivo</span>
            </div>
            <div className="widget__row">
              <div className="bars" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.span key={i} animate={{ scaleY: h }} transition={{ duration: 0.9, ease: EASINGS.smooth }} />
                ))}
              </div>
              <div>
                <strong className="widget__big widget__big--light widget__big--num">{fmt(kwh)}</strong>
                <span className="widget__label widget__label--light">kWh generados por nuestros clientes</span>
              </div>
            </div>
          </div>
          <div className="widget widget--today">
            <div className="widget__head widget__head--dark">
              <Leaf size={16} /> CO₂ evitado
            </div>
            <strong className="widget__big widget__big--num">{fmt(co2)}</strong>
            <span className="widget__label widget__label--dark">kg de emisiones que no llegaron al aire</span>
            <svg className="spark" viewBox="0 0 140 70" aria-hidden="true">
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".5" />
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
                  fill="#2F5166"
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
              <HardHat size={22} />
            </span>
            <span className="icon-bubble">
              <Gauge size={22} />
            </span>
            <span className="icon-bubble">
              <Headset size={22} />
            </span>
          </div>
          <h3>Especialistas, precisión y asistencia 24/7</h3>
          <p>Eficiencia operativa en cada instalación, con equipos seleccionados entre más de 66 fabricantes.</p>
          <span className="gold-rule" />
        </div>

        <div className="dock__col dock__col--center">
          <span className="eyebrow eyebrow--center">Energía simple, al alcance de todos</span>
          <h2 className="dock__title">
            ¡Ahorre dinero,
            <span className="text-gold">ahorre medio ambiente!</span>
          </h2>
          <MagneticButton href={waLink('Hola Egersa Solar, quiero solicitar un presupuesto.')} className="btn btn--sun btn--lg">
            Solicitar presupuesto <ArrowRight size={20} />
          </MagneticButton>
          <div className="dock__badges">
            <span>
              <i className="badge-ring">
                <Percent size={14} />
              </i>
              <b>Hasta 99%</b>
              <small>de ahorro en factura</small>
            </span>
            <span>
              <i className="badge-ring">
                <Landmark size={14} />
              </i>
              <b>Financiamiento</b>
              <small>con bancos líderes</small>
            </span>
            <span>
              <i className="badge-ring">
                <ClipboardCheck size={14} />
              </i>
              <b>Evaluación</b>
              <small>sin costo</small>
            </span>
          </div>
        </div>

        <div className="dock__col dock__col--right">
          <h3>Certificaciones y afiliaciones</h3>
          <div className="cert-row">
            {CERTIFICATIONS.map((c) => (
              <span key={c} className="cert">
                <BadgeCheck size={16} /> {c}
              </span>
            ))}
          </div>
          <p className="dock__quote">
            Respaldados por las instituciones del sector energético dominicano y por más de una década de proyectos
            exitosos.
          </p>
          <div className="dock__author">
            <span>Desde 2011 · Santo Domingo</span>
            <strong>+500</strong>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const STRIP = [
  { icon: Percent, title: 'Hasta 99%', text: 'De ahorro en tu factura' },
  { icon: Headset, title: 'Asistencia', text: 'Soporte técnico 24/7' },
  { icon: Building2, title: '+500', text: 'Instalaciones en RD' },
  { icon: Landmark, title: 'Financiamiento', text: 'Hasta 84 meses' },
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
            alt="Casa moderna con sistema de paneles solares en República Dominicana al atardecer"
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
          <span className="eyebrow show-md">Desde 2011 · República Dominicana</span>
          <RevealText tag="h1" immediate delay={1} className="hero__title hide-md">
            {[{ text: 'Energía simple,' }, { text: 'al alcance de todos' }]}
          </RevealText>
          <RevealText tag="h1" immediate delay={0.9} className="hero__title show-md">
            {[{ text: 'Bienvenidos a' }, { text: 'Egersa Solar', className: 'text-gold' }]}
          </RevealText>
          <p className="hero__lead">
            Ayudamos a industrias, comercios y residencias a ser más sostenibles y rentables a través del ahorro
            energético con paneles solares.
          </p>
          <div className="hero__actions">
            <span className="hide-md">
              <MagneticButton href={waLink()} className="btn btn--sun btn--lg">
                Evaluación sin costo <ArrowRight size={20} />
              </MagneticButton>
            </span>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--sun btn--lg show-md">
              Evaluación sin costo <ArrowRight size={20} />
            </a>
            <a href="#servicios" className="btn btn--ghost btn--lg show-md">
              Ver servicios
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
