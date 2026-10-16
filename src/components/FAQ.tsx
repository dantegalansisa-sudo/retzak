import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import RevealText from './RevealText';
import { EASINGS } from '../utils/easings';

const FAQS = [
  {
    q: '¿Cuánto puedo ahorrar con paneles solares?',
    a: 'Dependiendo de tu consumo y del tamaño del sistema, muchos clientes reducen su factura eléctrica entre un 70% y un 90%. En la evaluación gratuita te damos un estimado exacto para tu caso.',
  },
  {
    q: '¿Qué pasa cuando hay apagones?',
    a: 'Con un inversor híbrido y baterías de respaldo, tu casa o negocio sigue funcionando automáticamente durante los apagones, sin ruido y sin combustible.',
  },
  {
    q: '¿Cuánto tiempo toma la instalación?',
    a: 'Una instalación residencial típica se completa en pocos días una vez aprobado el diseño. Te acompañamos también en los trámites de medición neta con la distribuidora.',
  },
  {
    q: '¿Qué mantenimiento necesita el sistema?',
    a: 'Muy poco: limpieza periódica de los paneles y una revisión preventiva. Además, con el monitoreo en tiempo real detectamos cualquier anomalía a tiempo.',
  },
  {
    q: '¿Trabajan en todo el país?',
    a: 'Sí. Instalamos sistemas para hogares y negocios en toda la República Dominicana: Santo Domingo, Santiago, el Este, el Sur y más.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq">
      <div className="container faq__grid">
        <div>
          <span className="eyebrow">Preguntas frecuentes</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Todo lo que' }, { text: 'quieres saber', className: 'text-gold' }]}
          </RevealText>
          <p className="section-lead">¿Tienes otra pregunta? Escríbenos por WhatsApp y te respondemos en minutos.</p>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq__q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span>{f.q}</span>
                  <motion.span className="faq__icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35 }}>
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASINGS.premium }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
