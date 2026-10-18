import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Factory, Sun, Leaf, PiggyBank, ArrowRight } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';

const TARIFF = 12; // RD$/kWh promedio estimado
const SUN_HOURS = 4.8;
const PANEL_KW = 0.55;

const TYPES = [
  { id: 'residencial', label: 'Residencial', icon: Home, coverage: 0.9 },
  { id: 'comercial', label: 'Comercial', icon: Building2, coverage: 0.88 },
  { id: 'industrial', label: 'Industrial', icon: Factory, coverage: 0.85 },
] as const;

const fmt = (n: number) => n.toLocaleString('es-DO', { maximumFractionDigits: 0 });

function Rolling({ value, prefix = '' }: { value: string; prefix?: string }) {
  return (
    <span className="rolling">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {prefix}
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Calculator() {
  const [bill, setBill] = useState(12000);
  const [typeIdx, setTypeIdx] = useState(0);
  const type = TYPES[typeIdx];

  const r = useMemo(() => {
    const coverage = type.coverage;
    const kwhMonth = bill / TARIFF;
    const kwp = Math.max(1.1, (kwhMonth * coverage) / (30 * SUN_HOURS * 0.8));
    const panels = Math.ceil(kwp / PANEL_KW);
    const monthly = bill * coverage;
    const co2 = (kwhMonth * coverage * 12 * 0.62) / 1000;
    return { kwp, panels, monthly, yearly: monthly * 12, co2 };
  }, [bill, type]);

  const min = 6000;
  const max = 300000;
  const pct = ((bill - min) / (max - min)) * 100;

  const message = `Hola Egersa Solar, quiero una evaluación sin costo.
• Tipo de proyecto: ${type.label}
• Factura mensual aprox.: RD$ ${fmt(bill)}
• Sistema estimado: ${r.kwp.toFixed(1)} kWp (${r.panels} paneles)`;

  return (
    <section id="calculadora" className="section calc">
      <div className="container">
        <div className="calc__box">
          <div className="calc__glow" aria-hidden="true" />
          <div className="calc__left">
            <span className="eyebrow eyebrow--light">Calculadora de ahorro</span>
            <RevealText tag="h2" className="section-title section-title--light">
              {[{ text: '¿Cuánto podrías' }, { text: 'ahorrar con el sol?', className: 'text-sun' }]}
            </RevealText>
            <p className="calc__lead">Mueve el control con el monto de tu factura de luz. Con energía solar puedes ahorrar hasta el 99%, y el excedente se te paga al final del año.</p>

            <div className="calc__toggle" role="radiogroup" aria-label="Tipo de propiedad">
              {TYPES.map((t, i) => (
                <button
                  key={t.id}
                  role="radio"
                  aria-checked={i === typeIdx}
                  className={i === typeIdx ? 'is-active' : ''}
                  onClick={() => setTypeIdx(i)}
                >
                  {i === typeIdx && <motion.span layoutId="calcToggle" className="calc__toggle-bg" />}
                  <span className="calc__toggle-label">
                    <t.icon size={18} />
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            <label className="calc__label" htmlFor="bill">
              Tu factura mensual
              <strong>
                RD$ <Rolling value={fmt(bill)} />
              </strong>
            </label>
            <input
              id="bill"
              type="range"
              min={min}
              max={max}
              step={500}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="range"
              style={{ ['--pct' as string]: `${pct}%` }}
            />
            <div className="calc__scale">
              <span>RD$ 6,000</span>
              <span>RD$ 300,000+</span>
            </div>
          </div>

          <div className="calc__right">
            <div className="calc__result calc__result--main">
              <span className="calc__result-icon">
                <PiggyBank size={22} />
              </span>
              <span>Ahorro mensual estimado</span>
              <strong>
                RD$ <Rolling value={fmt(r.monthly)} />
              </strong>
              <small>
                ≈ RD$ <Rolling value={fmt(r.yearly)} /> al año
              </small>
            </div>
            <div className="calc__results">
              <div className="calc__result">
                <Sun size={20} />
                <span>Sistema sugerido</span>
                <strong>
                  <Rolling value={r.kwp.toFixed(1)} /> kWp
                </strong>
              </div>
              <div className="calc__result">
                <span className="calc__panel-ico" />
                <span>Paneles aprox.</span>
                <strong>
                  <Rolling value={String(r.panels)} />
                </strong>
              </div>
              <div className="calc__result">
                <Leaf size={20} />
                <span>CO₂ evitado / año</span>
                <strong>
                  <Rolling value={r.co2.toFixed(1)} /> t
                </strong>
              </div>
            </div>
            <MagneticButton href={waLink(message)} className="btn btn--sun btn--lg btn--block">
              Solicitar evaluación sin costo <ArrowRight size={20} />
            </MagneticButton>
            <p className="calc__note">*Valores referenciales. El diseño final depende de tu consumo real, tu ubicación y el tipo de techo. Recomendado para facturas desde RD$6,000/mes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
