import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { NAV, PHONE_DISPLAY, PHONE_E164, waLink } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p>Energía limpia, ahorro real. Paneles solares, inversores y baterías para hogares y negocios en toda la República Dominicana.</p>
          </div>
          <div className="footer__col">
            <h4>Navegación</h4>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <h4>Soluciones</h4>
            <a href="#soluciones">Paneles solares</a>
            <a href="#soluciones">Inversores</a>
            <a href="#soluciones">Baterías / Respaldo</a>
            <a href="#proceso">Mantenimiento</a>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <span>República Dominicana</span>
          </div>
        </div>
        <div className="footer__word" aria-hidden="true">
          RETZAK
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Retzak Solar Tech. Todos los derechos reservados.</span>
          <a href="#inicio" className="footer__top-btn" aria-label="Volver arriba">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
