import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
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

/** Map scroll progress to a y position that rests on each step for a moment, then glides to the next. */
function piecewise(v: number, stops: { t: number; y: number }[], hold = 0.07) {
  if (!stops.length) return 0;
  if (v <= stops[0].t + hold) return stops[0].y;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    const from = a.t + hold;
    const to = b.t - hold;
    if (v < to) {
      if (v <= from) return a.y;
      const k = (v - from) / (to - from);
      const eased = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      return a.y + (b.y - a.y) * eased;
    }
    if (v <= b.t + hold) return b.y;
  }
  return stops[stops.length - 1].y;
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<{ t: number; y: number }[]>([]);
  const [active, setActive] = useState(0);
  const [docked, setDocked] = useState(true);

  // progress = where the "reading line" (55% of the viewport) sits inside the steps column
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 55%', 'end 55%'] });
  const rawY = useTransform(scrollYProgress, (v) => piecewise(v, stopsRef.current));
  const y = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.6 });
  const rotate = useTransform(y, (v) => {
    const st = stopsRef.current;
    if (st.length < 2) return 0;
    return ((v - st[0].y) / (st[st.length - 1].y - st[0].y)) * 180;
  });
  const fill = useTransform(y, (v) => {
    const h = ref.current?.offsetHeight ?? 1;
    return Math.min(1, Math.max(0, v / h));
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight || 1;
      stopsRef.current = [...el.querySelectorAll<HTMLElement>('.step')].map((step) => {
        const num = step.querySelector<HTMLElement>('.step__num')!;
        const cy = step.offsetTop + num.offsetTop + num.offsetHeight / 2;
        return { t: cy / h, y: cy };
      });
      rawY.set(piecewise(scrollYProgress.get(), stopsRef.current));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [rawY, scrollYProgress]);

  useMotionValueEvent(y, 'change', (v) => {
    const st = stopsRef.current;
    if (!st.length) return;
    let best = 0;
    st.forEach((s, i) => {
      if (Math.abs(s.y - v) < Math.abs(st[best].y - v)) best = i;
    });
    setActive(best);
    setDocked(Math.abs(st[best].y - v) < 6);
  });

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
            <motion.span style={{ scaleY: fill }} />
          </div>

          <motion.div className={`hexpanel ${docked ? 'is-docked' : ''}`} style={{ y }} aria-hidden="true">
            <motion.span
              className="hexpanel__glow"
              key={`glow-${active}`}
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <motion.img src="/images/panel-hex.webp" alt="" className="hexpanel__img" style={{ rotate }} />
            <span className="hexpanel__num">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              className={`step ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
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
