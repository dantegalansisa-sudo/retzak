export const PHONE_DISPLAY = '809-223-5005';
export const PHONE_E164 = '+18092235005';
export const WA_NUMBER = '18092235005';

export const waLink = (text = 'Hola Retzak Solar Tech, quiero una cotización para energía solar.') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Ahorro', href: '#calculadora' },
  { label: 'Contacto', href: '#contacto' },
];
