# Retzak Solar Tech — Web demo

Landing page demo para **Retzak Solar Tech**, empresa de paneles solares, inversores y baterías de respaldo en República Dominicana.

**Stack:** React + TypeScript + Vite + Framer Motion + Lenis (scroll suave) + Vanilla CSS.

## Secciones

- **Hero**: imagen principal con zoom/parallax al hacer scroll, palabra gigante "RETZAK" animada, widgets de producción en vivo (kW y kWh animados) y banda inferior con mensaje principal y testimonio.
- **Soluciones**: paneles, inversores y baterías con imágenes en parallax.
- **Por qué Retzak**: beneficios y contadores animados.
- **Proceso**: 4 pasos con línea de progreso ligada al scroll.
- **Calculadora de ahorro**: estimado interactivo según la factura mensual; envía el resultado por WhatsApp.
- **Testimonios**, **Preguntas frecuentes**, **CTA final** y **Contacto** (el formulario abre WhatsApp con el mensaje armado).
- Cursor personalizado, botones magnéticos, titulares con efecto reveal, menú móvil animado y botón flotante de WhatsApp.

Contacto configurado en `src/data/site.ts` (WhatsApp / teléfono **809-223-5005**).

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

La carpeta `dist/` queda lista para desplegar (Vercel, Netlify, etc.). En Vercel se detecta automáticamente como proyecto Vite.

## Recursos

- `Retzak_Solar_Tech_Assets/` — imágenes originales y maqueta de referencia.
- `public/images/` — imágenes optimizadas (WebP) usadas por la web.
- Los PNG de la raíz son las maquetas de referencia (PC y móvil).

> Demo: los testimonios, cifras y textos son contenido de ejemplo para presentación al cliente.
