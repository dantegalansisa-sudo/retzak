import { Sun } from 'lucide-react';

const ITEMS = [
  'Energía limpia',
  'Ahorro real',
  'Respaldo ante apagones',
  'Instalación profesional',
  'Monitoreo 24/7',
  'Soporte local',
  'Hogares y negocios',
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item">
            {t} <Sun size={22} />
          </span>
        ))}
      </div>
    </div>
  );
}
