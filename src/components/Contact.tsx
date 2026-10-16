import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import RevealText from './RevealText';
import { WhatsAppIcon } from './Icons';
import { PHONE_DISPLAY, PHONE_E164, waLink } from '../data/site';
import { fadeUp } from '../utils/easings';

const INTERESTS = ['Paneles solares', 'Inversor', 'Baterías / Respaldo', 'Sistema completo', 'Mantenimiento'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', city: '', interest: INTERESTS[3], message: '' });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      'Hola Retzak Solar Tech 👋',
      `Mi nombre es ${form.name || '—'}${form.city ? ` (${form.city})` : ''}.`,
      `Me interesa: ${form.interest}.`,
      form.message ? `Mensaje: ${form.message}` : '',
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
            {[{ text: 'Hablemos de' }, { text: 'tu proyecto solar', className: 'text-gold' }]}
          </RevealText>
          <motion.p className="section-lead" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Cuéntanos sobre tu hogar o negocio y un asesor de Retzak te contactará con una propuesta personalizada.
          </motion.p>

          <div className="contact__cards">
            <a href={`tel:${PHONE_E164}`} className="contact__card">
              <span className="icon-bubble icon-bubble--sm">
                <Phone size={20} />
              </span>
              <div>
                <small>Llámanos</small>
                <b>{PHONE_DISPLAY}</b>
              </div>
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="contact__card">
              <span className="icon-bubble icon-bubble--sm icon-bubble--wa">
                <WhatsAppIcon size={20} />
              </span>
              <div>
                <small>WhatsApp</small>
                <b>Escríbenos ahora</b>
              </div>
            </a>
            <div className="contact__card">
              <span className="icon-bubble icon-bubble--sm">
                <MapPin size={20} />
              </span>
              <div>
                <small>Cobertura</small>
                <b>Toda la República Dominicana</b>
              </div>
            </div>
            <div className="contact__card">
              <span className="icon-bubble icon-bubble--sm">
                <Clock size={20} />
              </span>
              <div>
                <small>Horario</small>
                <b>Lun – Sáb · 8:00 a.m. – 6:00 p.m.</b>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          className="form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3>Solicita tu cotización gratis</h3>
          <p>Te respondemos por WhatsApp en minutos.</p>
          <div className="form__row">
            <label className="field">
              <span>Nombre</span>
              <input required value={form.name} onChange={set('name')} placeholder="Tu nombre" autoComplete="name" />
            </label>
            <label className="field">
              <span>Ciudad</span>
              <input value={form.city} onChange={set('city')} placeholder="Ej. Santo Domingo" />
            </label>
          </div>
          <div className="field">
            <span>¿Qué te interesa?</span>
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
              rows={4}
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
