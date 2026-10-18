import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fuel, Building2, Factory, HeartPulse, Home, MapPin, Zap, PlugZap, Layers, Quote, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import RevealText from './RevealText';
import { EASINGS } from '../utils/easings';
import { waLink } from '../data/site';

type Cat = 'estaciones' | 'comercios' | 'industria' | 'hoteles' | 'residencias';

const CATS: { id: Cat | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'industria', label: 'Industria' },
  { id: 'estaciones', label: 'Estaciones' },
  { id: 'comercios', label: 'Comercios' },
  { id: 'hoteles', label: 'Hoteles y salud' },
  { id: 'residencias', label: 'Residencias' },
];

const ICONS: Record<Cat, LucideIcon> = {
  estaciones: Fuel,
  comercios: Building2,
  industria: Factory,
  hoteles: HeartPulse,
  residencias: Home,
};

const PROJECTS: { name: string; cat: Cat }[] = [
  { name: 'Medtronic', cat: 'industria' },
  { name: 'MSC Logistic', cat: 'industria' },
  { name: 'Empresa Pesquera', cat: 'industria' },
  { name: 'IRMIE', cat: 'industria' },
  { name: 'Estación Total La Aurora', cat: 'estaciones' },
  { name: 'Bomba Total Carretera Mella', cat: 'estaciones' },
  { name: 'Texaco Río Dulce', cat: 'estaciones' },
  { name: 'Eco Petróleo Principal', cat: 'estaciones' },
  { name: 'Eco Petróleo Malecón', cat: 'estaciones' },
  { name: 'Eco Petróleo Autovía del Este', cat: 'estaciones' },
  { name: 'Ferretería Hernández', cat: 'comercios' },
  { name: 'Repuestos Vásquez', cat: 'comercios' },
  { name: 'Repuestos Rap', cat: 'comercios' },
  { name: 'Hotel Copa Caribe', cat: 'hoteles' },
  { name: 'Leland Hotel Monterio', cat: 'hoteles' },
  { name: 'Clínica Arache Pouriet', cat: 'hoteles' },
  { name: 'Proyectos residenciales', cat: 'residencias' },
];

const CATEGORY_LABEL: Record<Cat, string> = {
  estaciones: 'Estación de combustible',
  comercios: 'Comercio',
  industria: 'Industria',
  hoteles: 'Hotelería y salud',
  residencias: 'Residencial',
};

export default function Projects() {
  const [cat, setCat] = useState<Cat | 'todos'>('todos');
  const [expanded, setExpanded] = useState(false);
  const full = useMemo(() => (cat === 'todos' ? PROJECTS : PROJECTS.filter((p) => p.cat === cat)), [cat]);
  const list = expanded ? full : full.slice(0, 10);

  return (
    <section id="proyectos" className="section projects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Proyectos</span>
            <RevealText tag="h2" className="section-title">
              {[{ text: 'Energía que ya' }, { text: 'mueve a RD', className: 'text-gold' }]}
            </RevealText>
          </div>
          <p className="section-lead section-lead--side">
            Más de 500 instalaciones en industrias, estaciones de combustible, comercios, hoteles, clínicas y hogares.
          </p>
        </div>

        <div className="projects__grid">
          <motion.article
            className="case"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASINGS.premium }}
          >
            <div className="case__media">
              <img src="/images/hero.webp" alt="Sistema solar instalado por Egersa Solar" loading="lazy" />
              <span className="case__tag">Proyecto destacado</span>
            </div>
            <div className="case__body">
              <small>Estación Total La Aurora · Alberto Núñez</small>
              <h3>20 kWp inyectando energía a la red</h3>
              <div className="case__specs">
                <span>
                  <Zap size={16} /> <b>20 kWp</b> Potencia
                </span>
                <span>
                  <PlugZap size={16} /> <b>Inyección</b> a red
                </span>
                <span>
                  <Layers size={16} /> <b>Aluzinc</b> Techo
                </span>
                <span>
                  <MapPin size={16} /> <b>Autopista</b> 6 de Noviembre
                </span>
              </div>
              <div className="case__saving">
                <span>Ahorro mensual reportado</span>
                <strong>RD$105,416</strong>
              </div>
            </div>
          </motion.article>

          <div className="projects__list">
            <div className="filters" role="tablist" aria-label="Filtrar proyectos">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={cat === c.id}
                  className={`filter ${cat === c.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setCat(c.id);
                    setExpanded(false);
                  }}
                >
                  {cat === c.id && <motion.span layoutId="filterBg" className="filter__bg" />}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
            <motion.ul className="plist" layout>
              <AnimatePresence mode="popLayout">
                {list.map((p) => {
                  const Icon = ICONS[p.cat];
                  return (
                    <motion.li
                      key={p.name}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.35 }}
                      className="pitem"
                    >
                      <span className="pitem__icon">
                        <Icon size={18} />
                      </span>
                      <span className="pitem__text">
                        <b>{p.name}</b>
                        <small>{CATEGORY_LABEL[p.cat]}</small>
                      </span>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
            {full.length > list.length && (
              <button className="plist__more" onClick={() => setExpanded(true)}>
                Ver los {full.length} proyectos
              </button>
            )}

            <figure className="pquote">
              <Quote size={28} />
              <blockquote>
                “Egersa ha sido, sin duda, la mejor empresa con la que hemos trabajado. Su atención al detalle y el
                soporte al cliente fueron increíbles durante todo el proceso.”
              </blockquote>
              <figcaption>
                Cliente Egersa Solar
                <a
                  href={waLink('Hola Egersa Solar, me gustaría un proyecto como los que han realizado.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero mi proyecto <ArrowUpRight size={16} />
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
