import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sun, Zap, BatteryCharging, Check } from 'lucide-react';
import RevealText from './RevealText';
import { containerVariants, cardVariants } from '../utils/easings';
import { waLink } from '../data/site';

const SOLUTIONS = [
  {
    icon: Sun,
    title: 'Paneles Solares',
    text: 'Alta eficiencia y máximo rendimiento.',
    img: '/images/paneles.webp',
    points: ['Módulos monocristalinos de alta eficiencia', 'Diseño a la medida de tu techo', 'Garantía de producción a largo plazo'],
  },
  {
    icon: Zap,
    title: 'Inversores',
    text: 'Mayor control y estabilidad.',
    img: '/images/inversor.webp',
    points: ['Inversores híbridos y on-grid', 'Monitoreo en tiempo real desde tu móvil', 'Protección para tus equipos'],
  },
  {
    icon: BatteryCharging,
    title: 'Baterías / Respaldo',
    text: 'Energía cuando más la necesitas.',
    img: '/images/bateria.webp',
    points: ['Respaldo automático ante apagones', 'Baterías de litio de larga vida', 'Autonomía para hogar o negocio'],
  },
];

function SolutionCard({ s }: { s: (typeof SOLUTIONS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const Icon = s.icon;
  return (
    <motion.article
      ref={ref}
      className="sol-card"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      data-cursor
    >
      <div className="sol-card__media">
        <motion.img src={s.img} alt={s.title} style={{ y, scale: 1.18 }} loading="lazy" />
      </div>
      <span className="sol-card__icon">
        <Icon size={20} />
      </span>
      <div className="sol-card__body">
        <div className="sol-card__head">
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
          <a
            className="sol-card__go"
            href={waLink(`Hola Retzak, quiero información sobre ${s.title.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${s.title}`}
          >
            <ArrowRight size={20} />
          </a>
        </div>
        <ul className="sol-card__points">
          {s.points.map((p) => (
            <li key={p}>
              <Check size={14} /> {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Solutions() {
  return (
    <section id="soluciones" className="section solutions">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nuestras soluciones</span>
            <RevealText tag="h2" className="section-title">
              {[{ text: 'Tecnología solar' }, { text: 'a tu medida' }]}
            </RevealText>
          </div>
          <a href="#calculadora" className="btn btn--outline">
            Calcula tu ahorro <ArrowUpRight size={18} />
          </a>
        </div>

        <motion.div
          className="sol-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SOLUTIONS.map((s) => (
            <SolutionCard key={s.title} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
