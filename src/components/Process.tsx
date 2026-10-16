import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ClipboardCheck, PencilRuler, HardHat, LineChart } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';
import { EASINGS } from '../utils/easings';

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Evaluación gratuita',
    text: 'Analizamos tu factura eléctrica, tu consumo y tu techo para entender exactamente lo que necesitas.',
  },
  {
    icon: PencilRuler,
    title: 'Diseño a la medida',
    text: 'Dimensionamos paneles, inversor y baterías para maximizar tu ahorro y tu respaldo energético.',
  },
  {
    icon: HardHat,
    title: 'Instalación profesional',
    text: 'Nuestro equipo instala tu sistema de forma limpia, segura y en el menor tiempo posible.',
  },
  {
    icon: LineChart,
    title: 'Monitoreo y soporte',
    text: 'Sigue tu producción en tiempo real y cuenta con soporte local y mantenimiento cuando lo necesites.',
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="proceso" className="section process">
      <div className="container process__grid">
        <div className="process__intro">
          <span className="eyebrow">Cómo funciona</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'De tu factura' }, { text: 'al sol en 4 pasos', className: 'text-gold' }]}
          </RevealText>
          <p className="section-lead">
            Un proceso simple y transparente. Te acompañamos desde la primera visita hasta que tu sistema produce
            energía, y después también.
          </p>
          <MagneticButton href={waLink('Hola Retzak, quiero agendar una evaluación gratuita.')} className="btn btn--dark btn--lg">
            Agenda tu evaluación
          </MagneticButton>
        </div>

        <div className="process__steps" ref={ref}>
          <div className="process__rail" aria-hidden="true">
            <motion.span style={{ scaleY: progress }} />
          </div>
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              className="step"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASINGS.premium }}
            >
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="step__card">
                <span className="icon-bubble icon-bubble--sun">
                  <Icon size={22} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
