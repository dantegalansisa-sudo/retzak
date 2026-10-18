import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import RevealText from './RevealText';
import { EASINGS } from '../utils/easings';
import { waLink } from '../data/site';

const GROUPS = [
  {
    id: 'generales',
    label: 'Generales',
    items: [
      {
        q: '¿Cuánto puedo ahorrar?',
        a: 'Hasta el 99% de tu factura eléctrica; en algunos casos queda solo el cargo fijo mensual. El ahorro exacto depende de tu consumo y del espacio disponible para los paneles.',
      },
      {
        q: '¿Cuántos paneles necesito?',
        a: 'Depende de tu consumo. Con tu última factura eléctrica y la ubicación del proyecto hacemos un análisis y diseño personalizado sin costo.',
      },
      {
        q: '¿Me pagan la energía que me sobra?',
        a: 'Sí. El excedente que inyectas a la red se paga al final del año, aproximadamente al 75% de su valor (cerca de RD$2.80 por kWh).',
      },
      {
        q: '¿Gestionan el medidor bidireccional?',
        a: 'Sí. Todas nuestras propuestas incluyen la gestión y el cambio del medidor ante la distribuidora. Trabajamos con todas: EDEs, CEPM, CEB, Luz y Fuerza, Casa de Campo, Cap Cana y más.',
      },
      {
        q: '¿Puedo desconectarme de la red o instalar en una finca?',
        a: 'Sí, con un sistema aislado (Off Grid) con baterías. También diseñamos bombeo solar para fincas que hoy dependen de plantas de gasolina.',
      },
      {
        q: '¿Venden paneles individuales?',
        a: 'No. Ofrecemos proyectos completos: diseño, instalación y servicio, para garantizar el rendimiento de tu sistema. Recomendamos instalar con facturas desde RD$6,000 al mes.',
      },
      {
        q: '¿Instalan en todo el país?',
        a: 'Sí, en cualquier parte de la República Dominicana. Nuestras oficinas están en Plaza Tey, Av. República de Colombia 64, Local L-304, Santo Domingo.',
      },
    ],
  },
  {
    id: 'financiamiento',
    label: 'Financiamiento y pagos',
    items: [
      {
        q: '¿Puedo financiar mi sistema solar?',
        a: 'Sí, con los principales bancos del país: Banco Popular Dominicano, Banco BHD y Banreservas. Se financia hasta el 80% del proyecto.',
      },
      {
        q: '¿Qué condiciones tiene el financiamiento?',
        a: 'Personas: tasas desde 12.00% variable y plazo de hasta 60 meses. Empresas: tasas desde 13.00% variable y plazo de hasta 84 meses. Ambas con tasa fija hasta 3 años.',
      },
      {
        q: '¿Qué necesito para solicitar el préstamo?',
        a: 'Formulario de solicitud, cotización del sistema, copia de cédula y los últimos 3 estados de cuenta o una certificación de ingresos. Las empresas presentan además su documentación corporativa.',
      },
      {
        q: '¿Hay gastos legales o penalidades?',
        a: 'No hay gastos legales por contrato y cierre. Incluye seguro de vida deudor (pago único al firmar). La cancelación anticipada no tiene penalidad en préstamos comerciales.',
      },
      {
        q: '¿Cómo es el pago de contado?',
        a: '70% de anticipo, 20% luego de la instalación y 10% tras la instalación del medidor bidireccional.',
      },
      {
        q: '¿Puedo descontar la inversión de impuestos?',
        a: 'Sí. Con la factura de paneles/inversores y la certificación de exención de ISR del suplidor, las personas jurídicas descuentan el 13.33% del ISR proyectado por 3 años. Para personas físicas gestionamos la exención ante la DGII.',
      },
    ],
  },
];

export default function FAQ() {
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const G = GROUPS[group];

  return (
    <section id="faq" className="section faq">
      <div className="container faq__grid">
        <div className="faq__intro">
          <span className="eyebrow">Preguntas frecuentes</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Todo lo que' }, { text: 'quieres saber', className: 'text-gold' }]}
          </RevealText>
          <p className="section-lead">
            ¿Tienes otra pregunta? Escríbenos y un asesor te responde.{' '}
            <a className="link" href={waLink('Hola Egersa Solar, tengo una pregunta.')} target="_blank" rel="noopener noreferrer">
              Hablar con un asesor
            </a>
          </p>
          <div className="faq__tabs" role="tablist">
            {GROUPS.map((g, i) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={i === group}
                className={i === group ? 'is-active' : ''}
                onClick={() => {
                  setGroup(i);
                  setOpen(0);
                }}
              >
                {g.label}
                <span>{g.items.length}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={G.id}
            className="faq__list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASINGS.premium }}
          >
            {G.items.map((f, i) => {
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
