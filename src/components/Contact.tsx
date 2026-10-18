import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Globe2, Send, ArrowUpRight } from 'lucide-react';
import RevealText from './RevealText';
import { WhatsAppIcon } from './Icons';
import { ADDRESS_LINES, MAPS_URL, PHONE_DISPLAY, PHONE_E164, WA_DISPLAY, waLink } from '../data/site';
import { fadeUp } from '../utils/easings';

const INTERESTS = ['On Grid', 'Aislado / Off Grid', 'Híbrido', 'Bombeo solar', 'Mantenimiento', 'Medición energética'];
const TYPES = ['Residencial', 'Comercial', 'Industrial'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    bill: '',
    type: TYPES[0],
    interest: INTERESTS[0],
    message: '',
  });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      'Hola Egersa Solar, quiero solicitar un presupuesto.',
      `• Nombre: ${form.name || '—'}`,
      form.location ? `• Ubicación del proyecto: ${form.location}` : '',
      `• Tipo: ${form.type}`,
      `• Servicio de interés: ${form.interest}`,
      form.bill ? `• Factura mensual aprox.: RD$ ${form.bill}` : '',
      form.message ? `• Mensaje: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="section contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="eyebrow">Contacto</span>
          <RevealText tag="h2" className="section-title">
            {[{ text: 'Cotiza con' }, { text: 'nosotros', className: 'text-gold' }]}
          </RevealText>
          <motion.p
            className="section-lead"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Para diseñar tu sistema solo necesitamos tu última factura eléctrica y la ubicación del proyecto. Te
            enviamos una propuesta personalizada sin costo.
          </motion.p>

          <div className="contact__cards">
            <a href={`tel:${PHONE_E164}`} className="contact__card">
              <span className="icon-bubble icon-bubble--sm">
                <Phone size={20} />
              </span>
              <div>
                <small>Centro de contacto</small>
                <b>{PHONE_DISPLAY}</b>
              </div>
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="contact__card">
              <span className="icon-bubble icon-bubble--sm icon-bubble--wa">
                <WhatsAppIcon size={20} />
              </span>
              <div>
                <small>WhatsApp</small>
                <b>{WA_DISPLAY}</b>
              </div>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="contact__card contact__card--wide">
              <span className="icon-bubble icon-bubble--sm">
                <MapPin size={20} />
              </span>
              <div>
                <small>Oficinas</small>
                <b>
                  {ADDRESS_LINES[0]}
                  <br />
                  {ADDRESS_LINES[1]}
                </b>
              </div>
              <ArrowUpRight size={18} className="contact__card-go" />
            </a>
            <div className="contact__card contact__card--wide">
              <span className="icon-bubble icon-bubble--sm">
                <Globe2 size={20} />
              </span>
              <div>
                <small>Cobertura</small>
                <b>Toda la República Dominicana · Todas las distribuidoras</b>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          className="form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <h3>¡Solicitar presupuesto!</h3>
          <p>Completa tus datos y te respondemos por WhatsApp.</p>
          <div className="form__row">
            <label className="field">
              <span>Nombre</span>
              <input required value={form.name} onChange={set('name')} placeholder="Tu nombre o empresa" autoComplete="name" />
            </label>
            <label className="field">
              <span>Ubicación del proyecto</span>
              <input value={form.location} onChange={set('location')} placeholder="Ej. Santiago" />
            </label>
          </div>
          <div className="form__row">
            <div className="field">
              <span>Tipo de proyecto</span>
              <div className="chips">
                {TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`chip ${form.type === t ? 'is-active' : ''}`}
                    onClick={() => setForm({ ...form, type: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <label className="field">
              <span>Factura mensual aprox. (RD$)</span>
              <input inputMode="numeric" value={form.bill} onChange={set('bill')} placeholder="Ej. 15,000" />
            </label>
          </div>
          <div className="field">
            <span>Servicio de interés</span>
            <div className="chips">
              {INTERESTS.map((it) => (
                <button
                  type="button"
                  key={it}
                  className={`chip ${form.interest === it ? 'is-active' : ''}`}
                  onClick={() => setForm({ ...form, interest: it })}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            <span>Mensaje (opcional)</span>
            <textarea
              rows={3}
              value={form.message}
              onChange={set('message')}
              placeholder="Cuéntanos sobre tu consumo, tu techo o lo que necesitas…"
            />
          </label>
          <button type="submit" className="btn btn--sun btn--lg btn--block">
            <Send size={18} /> Enviar por WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
}
