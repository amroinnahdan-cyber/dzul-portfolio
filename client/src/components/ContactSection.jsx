import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { sendContact } from '../api.js';
import { scrollToHash } from '../utils.js';

const initialForm = { name: '', email: '', message: '' };

/**
 * Kontak — email raksasa + pil sosial + form dengan error per-field.
 */
export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');
    setFieldErrors({});
    try {
      const res = await sendContact(form);
      setStatus('success');
      setFeedback(res.message || 'Pesan terkirim!');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setFieldErrors(err.fields || {});
      setFeedback(err.message || 'Gagal mengirim pesan.');
    }
  }

  return (
    <section id="kontak" className="border-t border-line px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="tech-label">KONTAK — MARI TERHUBUNG</p>
          <h2 className="mt-8 font-sans text-5xl font-semibold tracking-tight sm:text-7xl">
            Punya ide? <br />
            <span className="font-serif font-light italic">Mari bikin.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="mailto:amroin.nahdan@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition hover:bg-black2 sm:text-base"
            >
              ✉ amroin.nahdan@gmail.com
            </a>
            <a
              href="https://wa.me/6282299225876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-medium transition hover:border-ink"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/dee.zull"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-medium transition hover:border-ink"
            >
              @dee.zull
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <form onSubmit={handleSubmit} className="mt-16 max-w-lg space-y-3.5" noValidate>
            <p className="tech-label">ATAU TINGGALKAN PESAN</p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <input
                  className={`input ${fieldErrors.name ? 'input-error' : ''}`}
                  placeholder="Nama kamu *"
                  value={form.name}
                  onChange={set('name')}
                  maxLength={100}
                />
                {fieldErrors.name && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  className={`input ${fieldErrors.email ? 'input-error' : ''}`}
                  placeholder="Email kamu *"
                  value={form.email}
                  onChange={set('email')}
                />
                {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>
            </div>
            <textarea
              rows={4}
              className={`input resize-none ${fieldErrors.message ? 'input-error' : ''}`}
              placeholder="Ceritakan idemu... *"
              value={form.message}
              onChange={set('message')}
              maxLength={2000}
            />
            {fieldErrors.message && <p className="text-xs text-red-500">{fieldErrors.message}</p>}

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full border border-ink px-7 py-3 text-sm font-medium transition hover:bg-ink hover:text-paper disabled:opacity-60"
              >
                {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
              {feedback && (
                <p role="status" className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {status === 'success' ? '✓ ' : '✕ '}
                  {feedback}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
