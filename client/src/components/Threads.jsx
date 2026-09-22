import Reveal from './Reveal.jsx';
import { ArrowUpRight } from './Decor.jsx';

/**
 * Fokus — "core threads" ala Sutera: baris editorial bernomor,
 * bukan grid kartu. Hover: latar berubah + panah muncul.
 */
const THREADS = [
  {
    num: '01',
    tag: 'WEB',
    color: 'bg-bluesoft',
    title: 'Web Development',
    desc: 'Website modern & interaktif dengan React, Vite, dan Tailwind CSS — cepat, responsif, di semua layar.',
  },
  {
    num: '02',
    tag: 'VISUAL',
    color: 'bg-lavender',
    title: 'UI/UX Design',
    desc: 'Antarmuka bersih yang berpusat pada pengguna — wireframe sampai final design di Figma & Canva.',
  },
  {
    num: '03',
    tag: 'AI',
    color: 'bg-peach',
    title: 'AI & Automation',
    desc: 'AI agents, LLM integration, API & otomasi — dari crypto monitor sampai asisten ala JARVIS.',
  },
  {
    num: '04',
    tag: 'RISET',
    color: 'bg-greensf/70',
    title: 'Eksperimen & Keamanan',
    desc: 'Cybersecurity, computer vision, IoT — dijelajahi lewat eksperimen dan proyek nyata.',
  },
];

export default function Threads() {
  return (
    <section id="fokus" className="px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tech-label">CORE THREADS</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Inti <span className="font-serif font-light italic">kerjaku.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-ink3">Empat area yang paling sering main di kepala saya ↴</p>
          </div>
        </Reveal>

        <div className="mt-14">
          {THREADS.map((t, i) => (
            <Reveal key={t.num} delay={i * 60}>
              <div className="group grid grid-cols-[52px_1fr_auto] items-center gap-4 border-t border-line px-2 py-8 transition-colors duration-300 last:border-b hover:bg-paper2 sm:grid-cols-[80px_1fr_auto] sm:gap-8 sm:px-4 sm:py-10">
                <span className="font-serif text-lg font-light italic text-ink3 transition group-hover:text-ink sm:text-xl">
                  {t.num}
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink2">{t.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`tech-label hidden rounded-full px-3 py-1.5 text-[9px]! text-ink ${t.color} sm:inline-block`}>
                    {t.tag}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line opacity-0 transition duration-300 group-hover:bg-ink group-hover:text-paper sm:group-hover:opacity-100">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
