import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Users, Gauge, Crosshair, Headset, Play, X, Target, Eye, HeartHandshake } from 'lucide-react';
import RevealText from './RevealText';
import AnimatedCounter from './AnimatedCounter';
import { EASINGS, containerVariants, cardVariants, fadeUp } from '../utils/easings';
import { YOUTUBE_ID } from '../data/site';

const POINTS = [
  { icon: Users, title: 'Profesionales especialistas', text: 'Ingenieros y técnicos dedicados a la energía solar.' },
  { icon: Gauge, title: 'Eficiencia operativa', text: 'Procesos claros desde el diseño hasta la puesta en marcha.' },
  { icon: Crosshair, title: 'Precisión en instalaciones', text: 'Diseño en software y montaje cuidado en cada techo.' },
  { icon: Headset, title: 'Asistencia 24/7', text: 'Soporte técnico, mantenimiento y consultoría continua.' },
];

const PILLARS = [
  {
    id: 'mision',
    icon: Target,
    label: 'Misión',
    text: 'Brindar soluciones innovadoras, sostenibles y de alta calidad en las que nuestros clientes confíen y seamos para ellos la opción preferida, fomentando el uso de energía renovable con las mejores condiciones del mercado.',
  },
  {
    id: 'vision',
    icon: Eye,
    label: 'Visión',
    text: 'Ser la empresa líder reconocida por impulsar la energía renovable a nivel nacional y referencia en soluciones de energía limpia en la República Dominicana para el año 2030.',
  },
  {
    id: 'valores',
    icon: HeartHandshake,
    label: 'Valores',
    text: 'Integridad · Trabajo en equipo · Calidad del servicio · Compromiso',
  },
];

const STATS = [
  { value: 500, prefix: '+', suffix: '', label: 'Instalaciones realizadas' },
  { value: 66, prefix: '+', suffix: '', label: 'Fabricantes de equipos' },
  { value: 99, prefix: 'hasta ', suffix: '%', label: 'De ahorro en factura' },
  { value: 15, prefix: '', suffix: ' años', label: 'De experiencia en RD' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [pillar, setPillar] = useState(0);
  const [video, setVideo] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const P = PILLARS[pillar];

  return (
    <section id="nosotros" className="section about">
      <div className="container about__grid">
        <motion.div
          className="about__visual"
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="about__img"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0 round 32px)' },
              visible: { clipPath: 'inset(0 0% 0 0 round 32px)', transition: { duration: 1.3, ease: EASINGS.premium } },
            }}
          >
            <motion.img
              src="/images/roof.webp"
              alt="Instalación de paneles solares Egersa Solar en techo residencial"
              style={{ y: imgY, scale: 1.2 }}
              loading="lazy"
            />
          </motion.div>
          <motion.button className="about__video" style={{ y: cardY }} onClick={() => setVideo(true)} data-cursor>
            <span className="about__video-thumb">
              <img src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="about__video-play">
                <Play size={16} fill="currentColor" />
              </span>
            </span>
            <span>
              <strong>Conoce Egersa Solar</strong>
              <small>Ver video</small>
            </span>
          </motion.button>
          <div className="about__sticker" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="circlePath" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#circlePath">ENERGÍA LIMPIA • EGERSA SOLAR • DESDE 2011 • </textPath>
              </text>
            </svg>
            <span className="about__sticker-year">2011</span>
          </div>
        </motion.div>

        <div className="about__content">
          <span className="eyebrow">Nosotros</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Pioneros en' }, { text: 'energía limpia', className: 'text-gold' }]}
          </RevealText>
          <motion.p
            className="section-lead"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Egersa Solar nació en 2011 de la mano de un equipo apasionado por la energía renovable, con el propósito de
            revolucionar la manera en que la República Dominicana aprovecha sus recursos energéticos. Hoy, además de
            instalar, ofrecemos mantenimiento y consultoría.
          </motion.p>

          <div className="pillars">
            <div className="pillars__tabs" role="tablist">
              {PILLARS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === pillar}
                  className={i === pillar ? 'is-active' : ''}
                  onClick={() => setPillar(i)}
                >
                  {i === pillar && <motion.span layoutId="pillarBg" className="pillars__bg" />}
                  <span className="pillars__label">
                    <p.icon size={16} /> {p.label}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={P.id}
                className="pillars__text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {P.text}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            className="about__points"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {POINTS.map(({ icon: Icon, title, text }) => (
              <motion.div key={title} className="point" variants={cardVariants}>
                <span className="icon-bubble icon-bubble--sm">
                  <Icon size={20} />
                </span>
                <div>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container">
        <motion.div
          className="stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.div key={s.label} className="stat" variants={cardVariants}>
              <strong>
                <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {video && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideo(false)}
          >
            <motion.div
              className="modal__box"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.5, ease: EASINGS.premium }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Egersa Solar"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <button className="modal__close" onClick={() => setVideo(false)} aria-label="Cerrar video">
                <X size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
