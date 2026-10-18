import { Sun } from 'lucide-react';
import { CLIENTS } from '../data/site';

export default function Marquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div className="marquee">
      <span className="marquee__label">Confían en nosotros</span>
      <div className="marquee__viewport" aria-label={`Clientes: ${CLIENTS.join(', ')}`}>
        <div className="marquee__track" aria-hidden="true">
          {row.map((t, i) => (
            <span key={i} className="marquee__item">
              {t} <Sun size={20} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
