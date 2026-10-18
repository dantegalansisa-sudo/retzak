import { ArrowUp, BadgeCheck } from 'lucide-react';
import Logo from './Logo';
import { ADDRESS_LINES, CERTIFICATIONS, MAPS_URL, NAV, PHONE_DISPLAY, PHONE_E164, WA_DISPLAY, waLink } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p>
              ¡Energía simple, al alcance de todos! Soluciones de paneles solares para industrias, comercios y residencias
              en toda la República Dominicana desde 2011.
            </p>
            <div className="footer__certs">
              {CERTIFICATIONS.map((c) => (
                <span key={c}>
                  <BadgeCheck size={14} /> {c}
                </span>
              ))}
            </div>
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
            <h4>Servicios</h4>
            <a href="#servicios">Sistema On Grid</a>
            <a href="#servicios">Sistemas aislados</a>
            <a href="#servicios">Sistemas híbridos</a>
            <a href="#servicios">Bombeo solar</a>
            <a href="#servicios">Mantenimientos</a>
            <a href="#servicios">Medición energética</a>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {WA_DISPLAY}
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              {ADDRESS_LINES[0]}, {ADDRESS_LINES[1]}
            </a>
          </div>
        </div>
        <div className="footer__word" aria-hidden="true">
          EGERSA
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Egersa Solar. Todos los derechos reservados.</span>
          <a href="#inicio" className="footer__top-btn" aria-label="Volver arriba">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
