export const BRAND = 'Egersa Solar';

export const PHONE_DISPLAY = '809-732-8579';
export const PHONE_E164 = '+18097328579';
// The current site lists no WhatsApp line; the contact-center number is used until the client confirms one.
export const WA_NUMBER = '18097328579';

export const ADDRESS_LINES = ['Plaza Tey, Av. República de Colombia 64', 'Local L-304, Piso 3, Santo Domingo'];
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Plaza Tey, Av. República de Colombia 64, Santo Domingo, República Dominicana');

export const YOUTUBE_ID = 'VhBl3dHT5SY';

export const waLink = (text = 'Hola Egersa Solar, quiero solicitar una evaluación sin costo para energía solar.') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Financiamiento', href: '#financiamiento' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export const CERTIFICATIONS = ['CNE', 'ASOFER', 'INDOCAL'];

export const CLIENTS = [
  'Medtronic',
  'TotalEnergies',
  'Texaco',
  'EcoPetróleo',
  'Banco Popular',
  'MSC Logistic',
  'Hotel Copa Caribe',
  'Ferrecentro Hernández',
  'Clínica Arache Pouriet',
  'IRMIE',
];
