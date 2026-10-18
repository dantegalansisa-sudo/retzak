import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Briefcase, Check, Landmark, Receipt, ArrowRight } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';
import { EASINGS, containerVariants, cardVariants } from '../utils/easings';

const PLANS = [
  {
    id: 'personas',
    icon: User,
    label: 'Personas',
    rate: '12.00%',
    term: '60',
    termLabel: 'meses (5 años)',
    points: [
      'Financiamiento de hasta el 80% del proyecto',
      'Tasa fija hasta 3 años',
      'Póliza de seguro individual',
      'Ofertas y descuentos en instalaciones',
    ],
  },
  {
    id: 'empresas',
    icon: Briefcase,
    label: 'Empresas',
    rate: '13.00%',
    term: '84',
    termLabel: 'meses (7 años)',
    points: [
      'Financiamiento de hasta el 80% del proyecto',
      'Tasa fija hasta 3 años',
      'Póliza Seguros Reservas',
      'Sin penalidad por cancelación anticipada',
    ],
  },
];

const BANKS = ['Banco Popular Dominicano', 'Banco BHD', 'Banreservas'];

const CASH = [
  { pct: 70, label: 'Anticipo' },
  { pct: 20, label: 'Luego de la instalación' },
  { pct: 10, label: 'Tras el medidor bidireccional' },
];

export default function Financing() {
  const [plan, setPlan] = useState(0);
  const P = PLANS[plan];

  return (
    <section id="financiamiento" className="section finance">
      <div className="container">
        <div className="finance__head">
          <span className="eyebrow">Financiamiento</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Inicia el camino' }, { text: 'al ahorro hoy', className: 'text-gold' }]}
          </RevealText>
          <p className="section-lead">
            Financia tu sistema solar con los principales bancos del país. El desembolso se paga directo a Egersa, sin
            gastos legales de contrato y cierre.
          </p>
        </div>

        <div className="finance__grid">
          <div className="fplan">
            <div className="fplan__tabs" role="tablist">
              {PLANS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === plan}
                  className={i === plan ? 'is-active' : ''}
                  onClick={() => setPlan(i)}
                >
                  {i === plan && <motion.span layoutId="planBg" className="fplan__bg" />}
                  <span className="fplan__label">
                    <p.icon size={18} /> {p.label}
                  </span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={P.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASINGS.premium }}
              >
                <div className="fplan__figures">
                  <div>
                    <small>Tasas desde</small>
                    <strong>{P.rate}</strong>
                    <span>variable</span>
                  </div>
                  <div>
                    <small>Plazo de hasta</small>
                    <strong>{P.term}</strong>
                    <span>{P.termLabel}</span>
                  </div>
                </div>
                <ul className="fplan__points">
                  {P.points.map((pt) => (
                    <li key={pt}>
                      <Check size={14} /> {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="fplan__banks">
              <Landmark size={18} />
              {BANKS.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
            <MagneticButton
              href={waLink(`Hola Egersa Solar, quiero información sobre el financiamiento para ${P.label.toLowerCase()}.`)}
              className="btn btn--sun btn--lg btn--block"
            >
              Consultar financiamiento <ArrowRight size={20} />
            </MagneticButton>
          </div>

          <motion.div
            className="finance__side"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="fcard" variants={cardVariants}>
              <h3>Pago de contado</h3>
              <p>Pagas por etapas, a medida que avanza tu proyecto.</p>
              <div className="cashbar" aria-hidden="true">
                {CASH.map((c, i) => (
                  <motion.span
                    key={c.label}
                    style={{ flexBasis: `${c.pct}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease: EASINGS.premium }}
                  >
                    {c.pct}%
                  </motion.span>
                ))}
              </div>
              <ul className="cashlist">
                {CASH.map((c) => (
                  <li key={c.label}>
                    <b>{c.pct}%</b> {c.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="fcard fcard--dark" variants={cardVariants}>
              <span className="fcard__icon">
                <Receipt size={22} />
              </span>
              <h3>Descuento en el ISR</h3>
              <p>
                Con la factura de paneles e inversores y la certificación de exención del suplidor, las empresas pueden
                descontar el <b>13.33%</b> del ISR proyectado al cierre del año y por los 2 años siguientes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
