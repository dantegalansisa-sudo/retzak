# Egersa Solar — Web demo

Nueva web demo para **Egersa Solar** (egersacaribe.com), empresa de energía solar en República Dominicana desde 2011: sistemas On Grid, aislados, híbridos, bombeo solar, mantenimiento y medición energética para industrias, comercios y residencias.

**Stack:** React + TypeScript + Vite + Framer Motion + Lenis (scroll suave) + CSS.
**Identidad:** azul petróleo `#2F5166` + verde `#4BB37D` (colores de la marca), Montserrat + Inter.

## Secciones

- **Hero** — "EGERSA" gigante animado, contadores en vivo de energía ahorrada y CO₂ evitado (mismos valores para todos los visitantes), +500 instalaciones y certificaciones CNE · ASOFER · INDOCAL.
- **Clientes** — Medtronic, TotalEnergies, Texaco, EcoPetróleo, Banco Popular y más.
- **Servicios** — explorador interactivo con los servicios, beneficios y para quién es cada uno.
- **Nosotros** — historia, misión, visión, valores, diferenciadores y video institucional.
- **Proceso** — 4 pasos (evaluación, diseño, instalación y medidor, soporte).
- **Proyectos** — caso destacado (Estación Total La Aurora) + portafolio filtrable.
- **Calculadora de ahorro** — residencial / comercial / industrial; envía el estimado por WhatsApp.
- **Financiamiento** — condiciones para personas y empresas, bancos aliados, pago de contado y descuento ISR.
- **FAQ** — preguntas reales del cliente (generales y financiamiento).
- **Contacto** — formulario que arma el mensaje con factura y ubicación y lo abre en WhatsApp.

Datos de contacto en `src/data/site.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

`dist/` queda listo para Vercel / Netlify (Vercel lo detecta como proyecto Vite).

## Pendiente de confirmar con el cliente

- Número de WhatsApp (se usa el del centro de contacto 809-732-8579), email, horario y redes.
- Logo oficial en vector (el actual es un logotipo provisional en SVG).
- Fotos reales de instalaciones y datos técnicos por proyecto.
- Cifras del caso destacado, tasas de financiamiento vigentes y testimonios reales.
