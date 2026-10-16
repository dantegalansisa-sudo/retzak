import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealText from './RevealText';
import { EASINGS } from '../utils/easings';

const REVIEWS = [
  {
    name: 'María Fernández',
    place: 'Santo Domingo',
    text: 'Excelente servicio, instalación profesional y un ahorro real en nuestra factura eléctrica. Totalmente recomendados.',
    photo: '/images/cliente.webp',
    tag: 'Hogar · 6.6 kWp',
  },
  {
    name: 'José Ramírez',
    place: 'Santiago',
    text: 'Con el sistema de baterías ya no nos afectan los apagones. El equipo fue puntual, limpio y nos explicó todo.',
    tag: 'Hogar · Respaldo',
  },
  {
    name: 'Colmado La Esquina',
    place: 'La Romana',
    text: 'Nuestra factura del negocio bajó muchísimo desde el primer mes. La inversión se está pagando sola.',
    tag: 'Negocio · 12 kWp',
  },
  {
    name: 'Laura Peña',
    place: 'Punta Cana',
    text: 'Me encanta ver la producción en vivo desde el celular. Atención rápida y muy profesional.',
    tag: 'Villa · Monitoreo',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const id = setTimeout(() => go(1), 6500);
    return () => clearTimeout(id);
  }, [i]);

  const r = REVIEWS[i];

  return (
    <section className="section reviews">
      <div className="container reviews__grid">
        <div className="reviews__intro">
          <span className="eyebrow">Testimonios</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Lo que dicen' }, { text: 'nuestros clientes', className: 'text-gold' }]}
          </RevealText>
          <div className="reviews__score">
            <strong>4.9</strong>
            <div>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={20} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span>Calificación promedio de nuestros clientes</span>
            </div>
          </div>
          <div className="reviews__nav">
            <button onClick={() => go(-1)} aria-label="Testimonio anterior">
              <ChevronLeft size={22} />
            </button>
            <button onClick={() => go(1)} aria-label="Siguiente testimonio">
              <ChevronRight size={22} />
            </button>
            <div className="reviews__dots">
              {REVIEWS.map((_, k) => (
                <span key={k} className={k === i ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        </div>

        <div className="reviews__stage">
          <img src="/images/hero.webp" alt="" className="reviews__bg" loading="lazy" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              className="review"
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, rotate: dir * 1.5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: dir * -60, rotate: dir * -1.5 }}
              transition={{ duration: 0.6, ease: EASINGS.premium }}
            >
              <Quote className="review__quote" size={48} />
              <div className="stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                {r.photo ? (
                  <img src={r.photo} alt={r.name} />
                ) : (
                  <span className="review__avatar">
                    {r.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                )}
                <div>
                  <b>{r.name}</b>
                  <span>{r.place}</span>
                </div>
                <em>{r.tag}</em>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
