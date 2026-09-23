import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { sendContact } from '../api.js';

const initialForm = { name: '', email: '', message: '' };

/**
 * Kontak — kiri: judul + jalur kontak; kanan: kartu form.
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
    <section id="kontak" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* kiri */}
        <Reveal>
          <div>
            <p className="tech-label">KONTAK — MARI TERHUBUNG</p>
            <h2 className="font-display mt-4 text-4xl font-medium tracking-[-.01em] sm:text-5xl">
              Punya ide? <br />
              <span className="text-accent">Mari bikin.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink2">
              Untuk proyek sekolah, kolaborasi, atau sekadar diskusi soal web &amp; AI — semua jawaban saya bales.
            </p>

            <div className="mt-8 space-y-2.5">
              <a
                href="mailto:amroin.nahdan@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accentsoft text-accent">✉</span>
                amroin.nahdan@gmail.com
              </a>
              <a
                href="https://wa.me/6282299225876"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accentsoft text-accent">💬</span>
                +62 822-9922-5876
              </a>
              <a
                href="https://instagram.com/dee.zull"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accentsoft text-accent">◎</span>
                @dee.zull
              </a>
            </div>
          </div>
        </Reveal>

        {/* kanan — form */}
        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[32px] border border-line bg-white p-6 shadow-[0_24px_70px_rgba(11,18,32,.08)] sm:p-8"
          >
            <p className="tech-label">TINGGALKAN PESAN</p>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
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
              rows={5}
              className={`input mt-3.5 resize-none ${fieldErrors.message ? 'input-error' : ''}`}
              placeholder="Ceritakan idemu... *"
              value={form.message}
              onChange={set('message')}
              maxLength={2000}
            />
            {fieldErrors.message && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.message}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,107,255,.35)] transition hover:bg-accent2 disabled:opacity-60"
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
