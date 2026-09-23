import { useState } from 'react';
import Reveal from './Reveal.jsx';

/**
 * FAQ — accordion pertanyaan yang sering masuk. (EDIT jawabannya!)
 */
const FAQS = [
  {
    q: 'Bisa bantu apa saja?',
    a: 'Landing page, company profile, redesign tampilan website, sampai eksperimen integrasi AI. Untuk proyek sekolah/organisasi juga sering saya bantu.',
  },
  {
    q: 'Berapa lama pengerjaannya?',
    a: 'Landing page sederhana sekitar 1 minggu, tergantung kompleksitas dan kelengkapan konten. Timeline selalu saya sepakati di awal — dan saya pegang.',
  },
  {
    q: 'Berapa biayanya?',
    a: 'Tergantung kebutuhan. Untuk teman, sekolah, atau organisasi sering kali cukup berkah & pengalaman 😄. Ceritakan dulu idemu lewat form kontak — kita diskusikan.',
  },
  {
    q: 'Masih sekolah, bisa serius?',
    a: 'Justru karena masih sekolah saya bisa over-deliver: waktu belajar fleksibel, semangat masih penuh, dan setiap proyek saya perlakukan seperti portofolio — buktinya ada di situs ini.',
  },
  {
    q: 'Tech stack favoritmu?',
    a: 'React + Tailwind CSS untuk frontend, Express + SQLite untuk backend, Figma untuk desain. Sedang menyukai: LLM API & automation.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-5 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="tech-label">FAQ</p>
            <h2 className="font-display mt-4 text-4xl font-medium tracking-[-.01em] sm:text-5xl">
              Sering <span className="font-script text-[1.12em] text-accent">ditanya.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <div
                  className={`overflow-hidden rounded-3xl border bg-white transition-colors ${
                    isOpen ? 'border-accent/40' : 'border-line'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-xs text-ink3">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[15px] font-semibold tracking-tight sm:text-base">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lg transition-transform duration-300 ${
                        isOpen ? 'rotate-45 border-accent bg-accent text-white' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pl-[4.25rem] text-sm leading-relaxed text-ink2">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
