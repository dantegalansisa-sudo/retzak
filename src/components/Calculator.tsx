import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Sun, Leaf, PiggyBank, ArrowRight } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { waLink } from '../data/site';

const TARIFF = 12; // RD$/kWh promedio estimado
const SUN_HOURS = 4.8;
const PANEL_KW = 0.55;

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
  const [bill, setBill] = useState(8500);
  const [type, setType] = useState<'hogar' | 'negocio'>('hogar');

  const r = useMemo(() => {
    const coverage = type === 'hogar' ? 0.85 : 0.8;
    const kwhMonth = bill / TARIFF;
    const kwp = Math.max(1.1, (kwhMonth * coverage) / (30 * SUN_HOURS * 0.8));
    const panels = Math.ceil(kwp / PANEL_KW);
    const monthly = bill * coverage;
    const co2 = (kwhMonth * coverage * 12 * 0.62) / 1000;
    return { kwp, panels, monthly, yearly: monthly * 12, co2 };
  }, [bill, type]);

  const min = 2000;
  const max = 150000;
  const pct = ((bill - min) / (max - min)) * 100;

  const message = `Hola Retzak Solar Tech 👋 Quiero una cotización.\n• Tipo: ${type === 'hogar' ? 'Hogar' : 'Negocio'}\n• Factura mensual aprox.: RD$ ${fmt(bill)}\n• Sistema estimado: ${r.kwp.toFixed(1)} kWp (${r.panels} paneles)`;

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
            <p className="calc__lead">Mueve el control con el monto aproximado de tu factura de luz y descubre tu ahorro estimado.</p>

            <div className="calc__toggle" role="radiogroup" aria-label="Tipo de propiedad">
              {(['hogar', 'negocio'] as const).map((t) => (
                <button
                  key={t}
                  role="radio"
                  aria-checked={type === t}
                  className={type === t ? 'is-active' : ''}
                  onClick={() => setType(t)}
                >
                  {type === t && <motion.span layoutId="calcToggle" className="calc__toggle-bg" />}
                  <span className="calc__toggle-label">
                    {t === 'hogar' ? <Home size={18} /> : <Building2 size={18} />}
                    {t === 'hogar' ? 'Hogar' : 'Negocio'}
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
              <span>RD$ 2,000</span>
              <span>RD$ 150,000</span>
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
              Recibir cotización exacta <ArrowRight size={20} />
            </MagneticButton>
            <p className="calc__note">*Valores referenciales. Tu cotización final depende de tu consumo real y tu techo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
