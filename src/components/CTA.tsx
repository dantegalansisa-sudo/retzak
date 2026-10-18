import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Landmark, Headset } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';
import { containerVariants, cardVariants } from '../utils/easings';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.12, 1.2]);

  return (
    <section className="section cta-wrap">
      <div className="container">
        <div className="cta" ref={ref}>
          <motion.img className="cta__bg" src="/images/cta.webp" alt="" style={{ y, scale }} loading="lazy" />
          <div className="cta__veil" />
          <div className="cta__content">
            <span className="eyebrow eyebrow--light">Evaluación sin costo</span>
            <RevealText tag="h2" className="cta__title">
              {[{ text: 'Independencia con' }, { text: 'el poder del sol', className: 'text-sun' }]}
            </RevealText>
            <p>Solicita hoy mismo tu evaluación gratuita y descubre cómo puedes comenzar a ahorrar con energía solar.</p>
            <MagneticButton href={waLink()} className="btn btn--sun btn--lg">
              ¡Solicitar presupuesto! <ArrowRight size={20} />
            </MagneticButton>
          </div>
          <motion.ul
            className="cta__list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Leaf, t: 'Hasta 99% de ahorro' },
              { icon: Landmark, t: 'Financiamiento bancario' },
              { icon: Headset, t: 'Asistencia 24/7' },
            ].map(({ icon: Icon, t }) => (
              <motion.li key={t} variants={cardVariants}>
                <span className="badge-ring badge-ring--light">
                  <Icon size={16} />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
