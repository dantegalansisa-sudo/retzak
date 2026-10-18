import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, PlugZap, BatteryCharging, Repeat, Droplets, Wrench, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { EASINGS } from '../utils/easings';
import { waLink } from '../data/site';

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  summary: string;
  img: string;
  highlights: string[];
  benefits: string[];
  ideal: string;
}

const SERVICES: Service[] = [
  {
    id: 'ongrid',
    icon: PlugZap,
    title: 'Sistema On Grid',
    short: 'Conectado a la red',
    summary:
      'Se integra con la red eléctrica existente para aprovechar la energía solar de forma eficiente y reducir significativamente tus facturas.',
    img: '/images/roof.webp',
    highlights: ['Ahorro en facturas', 'Venta de excedente', 'Retorno de inversión'],
    benefits: [
      'Reducción de costos energéticos desde el primer mes',
      'La energía que no consumes se acredita y se paga al final del año',
      'Bajo mantenimiento y larga vida útil',
      'Acceso a incentivos fiscales vigentes en RD',
    ],
    ideal: 'Residencias, comercios e industrias conectadas a la distribuidora.',
  },
  {
    id: 'offgrid',
    icon: BatteryCharging,
    title: 'Sistemas Aislados',
    short: 'Off Grid · con baterías',
    summary:
      'Soluciones autónomas, sin conexión a la red pública, que almacenan energía en baterías. También diseñamos sistemas aislados enfocados en ahorro.',
    img: '/images/bateria.webp',
    highlights: ['Suministro continuo', 'Ahorro a largo plazo', 'Sostenibilidad'],
    benefits: [
      'Independencia energética total',
      'Fiabilidad ante cortes de energía',
      'Adaptable y escalable, de casas a industrias',
      'Ideal para fincas y zonas sin servicio eléctrico',
    ],
    ideal: 'Viviendas rurales, granjas, fincas y empresas.',
  },
  {
    id: 'hibrido',
    icon: Repeat,
    title: 'Sistemas Híbridos',
    short: 'Red + baterías',
    summary:
      'Combinan lo mejor de ambos mundos: conexión a la red y respaldo en baterías que almacenan el excedente para cuando más lo necesitas.',
    img: '/images/inversor.webp',
    highlights: ['Flexibilidad energética', 'Eficiencia optimizada', 'Resiliencia'],
    benefits: [
      'Máxima flexibilidad de uso',
      'Respaldo automático ante apagones',
      'Almacenamiento del excedente generado',
      'Reducción de costos y mayor sostenibilidad',
    ],
    ideal: 'Residencias, negocios y fábricas.',
  },
  {
    id: 'bombeo',
    icon: Droplets,
    title: 'Bombeo Solar',
    short: 'Agua con energía del sol',
    summary:
      'Energía fotovoltaica para bombear agua desde pozos, ríos o lagos hacia riego, tanques o consumo directo, sin depender de combustible.',
    img: '/images/cta.webp',
    highlights: ['Eficiencia energética', 'Fiabilidad', 'Cero emisiones'],
    benefits: [
      'Reduce costos operativos frente a plantas de combustible',
      'Independiente de la red eléctrica',
      'Durable y de bajo mantenimiento',
      'Diseño según capacidad de la bomba, voltaje y horas de uso',
    ],
    ideal: 'Agricultura, riego y agua potable comunitaria.',
  },
  {
    id: 'mantenimiento',
    icon: Wrench,
    title: 'Mantenimientos',
    short: 'Rendimiento y longevidad',
    summary:
      'Mantenimiento profesional para que tu sistema rinda al máximo durante toda su vida útil, con monitoreo y soporte técnico.',
    img: '/images/paneles.webp',
    highlights: ['Longevidad del sistema', 'Ahorro máximo', 'Tranquilidad'],
    benefits: [
      'Inspección, evaluación y limpieza de paneles',
      'Pruebas de inversores, controladores y baterías',
      'Optimización, reparaciones y sustituciones',
      'Monitoreo remoto y asesoría técnica',
    ],
    ideal: 'Cualquier sistema solar instalado, propio o de terceros.',
  },
  {
    id: 'medicion',
    icon: Activity,
    title: 'Medición Energética',
    short: 'Datos en tiempo real',
    summary:
      'Medición avanzada para monitorear y analizar consumo y producción, con informes que te ayudan a tomar mejores decisiones.',
    img: '/images/casa-detalle.webp',
    highlights: ['Datos precisos', 'Monitoreo en tiempo real', 'Ahorro económico'],
    benefits: [
      'Instalación de medidores y monitoreo continuo',
      'Análisis de datos e informes personalizados',
      'Asesoría en eficiencia energética',
      'Integración con tus sistemas existentes',
    ],
    ideal: 'Industrias y comercios que quieren controlar su energía.',
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section id="servicios" className="section solutions">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nuestros servicios</span>
            <RevealText tag="h2" className="section-title">
              {[{ text: 'Una solución solar' }, { text: 'para cada necesidad', className: 'text-gold' }]}
            </RevealText>
          </div>
          <p className="section-lead section-lead--side">
            Proyectos completos: diseño, instalación y servicio para industrias, comercios y residencias.
          </p>
        </div>

        <div className="svc">
          <div className="svc__tabs" role="tablist" aria-label="Servicios">
            {SERVICES.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={i === active}
                  className={`svc__tab ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {i === active && <motion.span layoutId="svcActive" className="svc__tab-bg" />}
                  <span className="svc__tab-icon">
                    <Icon size={20} />
                  </span>
                  <span className="svc__tab-text">
                    <b>{item.title}</b>
                    <small>{item.short}</small>
                  </span>
                  <span className="svc__tab-num">{String(i + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          <div className="svc__panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                className="svc__content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASINGS.premium }}
              >
                <motion.div
                  className="svc__media"
                  initial={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0 round 24px)' }}
                  transition={{ duration: 0.9, ease: EASINGS.premium }}
                >
                  <motion.img
                    src={s.img}
                    alt={s.title}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1.04 }}
                    transition={{ duration: 1.4, ease: EASINGS.smooth }}
                  />
                  <div className="svc__chips">
                    {s.highlights.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                </motion.div>
                <div className="svc__body">
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <ul>
                    {s.benefits.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
                      >
                        <Check size={14} /> {b}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="svc__foot">
                    <span>
                      <small>Ideal para</small>
                      {s.ideal}
                    </span>
                    <MagneticButton
                      href={waLink(`Hola Egersa Solar, quiero información sobre: ${s.title}.`)}
                      className="btn btn--sun"
                    >
                      Cotizar <ArrowRight size={18} />
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
