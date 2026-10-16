import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Wrench, Smartphone, BadgeCheck } from 'lucide-react';
import RevealText from './RevealText';
import AnimatedCounter from './AnimatedCounter';
import { EASINGS, containerVariants, cardVariants, fadeUp } from '../utils/easings';

const POINTS = [
  { icon: BadgeCheck, title: 'Equipos certificados', text: 'Trabajamos con marcas de clase mundial y garantías reales.' },
  { icon: Wrench, title: 'Instalación profesional', text: 'Técnicos especializados y montaje seguro en cualquier techo.' },
  { icon: Smartphone, title: 'Monitoreo inteligente', text: 'Revisa tu producción y ahorro en tiempo real desde tu móvil.' },
  { icon: ShieldCheck, title: 'Soporte local', text: 'Acompañamiento y mantenimiento aquí en República Dominicana.' },
];

const STATS = [
  { value: 7000, prefix: '+', suffix: '', label: 'Sistemas instalados' },
  { value: 90, prefix: 'hasta ', suffix: '%', label: 'Menos en tu factura' },
  { value: 25, prefix: '', suffix: ' años', label: 'Vida útil de paneles' },
  { value: 4.9, prefix: '', suffix: '/5', label: 'Satisfacción de clientes', decimals: 1 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="nosotros" className="section about">
      <div className="container about__grid">
        <motion.div className="about__visual" ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div
            className="about__img"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0 round 32px)' },
              visible: { clipPath: 'inset(0 0% 0 0 round 32px)', transition: { duration: 1.3, ease: EASINGS.premium } },
            }}
          >
            <motion.img src="/images/roof.webp" alt="Instalación de paneles solares Retzak en techo residencial" style={{ y: imgY, scale: 1.2 }} loading="lazy" />
          </motion.div>
          <motion.div className="about__float" style={{ y: cardY }}>
            <span className="live-dot" />
            <div>
              <strong>Ahorro mensual</strong>
              <span>
                RD$ <AnimatedCounter target={18450} />
              </span>
            </div>
          </motion.div>
          <div className="about__sticker" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="circlePath" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#circlePath">ENERGÍA LIMPIA • AHORRO REAL • RETZAK • </textPath>
              </text>
            </svg>
            <span className="about__sticker-sun" />
          </div>
        </motion.div>

        <div className="about__content">
          <span className="eyebrow">Por qué Retzak</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Energía que trabaja' }, { text: 'para ti cada día', className: 'text-gold' }]}
          </RevealText>
          <motion.p className="section-lead" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            En Retzak Solar Tech diseñamos, instalamos y damos soporte a sistemas solares para hogares y negocios en
            toda la República Dominicana. Menos apagones, menos factura y más tranquilidad.
          </motion.p>

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
                <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
