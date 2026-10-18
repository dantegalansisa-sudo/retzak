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
    title: 'Evaluación sin costo',
    text: 'Nos envías tu última factura eléctrica y la ubicación. Con eso analizamos tu consumo del último año y el espacio disponible.',
  },
  {
    icon: PencilRuler,
    title: 'Diseñamos y enviamos',
    text: 'Diseñamos en software un sistema a la medida de tu consumo y seleccionamos los equipos entre más de 66 fabricantes.',
  },
  {
    icon: HardHat,
    title: 'Instalación y medidor',
    text: 'Instalamos con precisión y gestionamos ante tu distribuidora el cambio al medidor bidireccional. Trabajamos con todas las EDE.',
  },
  {
    icon: LineChart,
    title: 'Ahorro, monitoreo y soporte',
    text: 'Empiezas a ahorrar desde el primer mes, con monitoreo remoto, mantenimiento y asistencia técnica 24/7.',
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
          <span className="eyebrow">Proceso</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: '¡Cómo funciona!' }, { text: 'En 4 pasos', className: 'text-gold' }]}
          </RevealText>
          <p className="section-lead">
            Solo vendemos proyectos completos: diseño, instalación y servicio. Te acompañamos desde la primera
            evaluación hasta que tu sistema produce energía, y después también.
          </p>
          <MagneticButton href={waLink('Hola Egersa Solar, quiero agendar mi evaluación sin costo.')} className="btn btn--dark btn--lg">
            Solicitar evaluación
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
