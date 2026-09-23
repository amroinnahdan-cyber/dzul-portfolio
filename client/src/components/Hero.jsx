import { wibGreeting } from '../utils.js';
import { useEffect, useState } from 'react';
import { scrollToHash } from '../utils.js';
import Pin from './Pin.jsx';
import { Squiggle } from './Doodles.jsx';

/* ═══════════════════════════════════════════════════════
   Kata bertumpuk ala poster "Shoot. Edit. Deliver. Repeat."
   + pill biru yang menimpa tiap baris.
   ═══════════════════════════════════════════════════════ */
const WORDS = [
  { word: 'Ngoding.', pill: 'React · Vite · Tailwind', pillPos: 'right-[2%] top-1/2 -translate-y-[130%] rotate-[-3deg]', icon: '⚡', iconPos: '-left-1 -top-4' },
  { word: 'Desain.', pill: 'UI/UX · Figma', pillPos: 'right-[10%] top-1/2 -translate-y-[120%] rotate-[2.5deg]', icon: '🎨', iconPos: '-right-2 -top-5' },
  { word: 'Deploy.', pill: 'Vercel · GitHub', pillPos: 'right-[4%] top-1/2 -translate-y-[125%] rotate-[-2deg]', icon: '🚀', iconPos: '-left-2 -top-4' },
  { word: 'Ulangi.', pill: 'Satu proyek / minggu', pillPos: 'right-[14%] top-1/2 -translate-y-[130%] rotate-[3deg]', icon: null, iconPos: '' },
];

function StackLine({ item, index }) {
  return (
    <span className="relative block">
      {/* kata raksasa */}
      <span className="font-display inline-block leading-[0.98] tracking-[-.015em]">{item.word}</span>

      {/* pill biru menimpa (ala poster) */}
      <span
        className={`absolute z-10 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-[9px] font-bold text-white shadow-[0_8px_24px_rgba(47,107,255,.4)] sm:px-4 sm:py-2 sm:text-xs ${item.pillPos}`}
      >
        {item.pill}
      </span>

      {/* ikon kecil melayang */}
      {item.icon && (
        <span className={`absolute hidden animate-float text-3xl lg:block xl:text-4xl ${item.iconPos}`} style={{ animationDelay: `${index * 0.9}s` }}>
          {item.icon}
        </span>
      )}
    </span>
  );
}

/* --- kartu mockup melayang ala moodboard (dengan pushpin) --- */

function CardProject() {
  return (
    <div className="absolute left-0 top-6 w-56 -rotate-[4deg] rounded-3xl border border-line bg-white p-3.5 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float sm:w-64">
      <Pin className="absolute -top-4 left-1/2 z-10 w-8 -translate-x-1/2" />
      <div className="flex items-center gap-3">
        <img src="/projects/studio-elevate.png" alt="" className="h-12 w-12 rounded-2xl object-cover" />
        <div>
          <p className="text-[13px] font-semibold">Studio Elevate</p>
          <p className="text-xs text-ink3">Landing page · 2025</p>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="rounded-full bg-accentsoft px-2.5 py-1 text-[10px] font-medium text-accent">React</span>
        <span className="rounded-full bg-paper2 px-2.5 py-1 text-[10px] font-medium text-ink2">UI/UX</span>
      </div>
    </div>
  );
}

function CardStat() {
  return (
    <div className="absolute right-0 top-36 w-48 rotate-[3deg] rounded-3xl border border-line bg-white p-4 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float-late sm:top-44 sm:w-56">
      <Pin className="absolute -top-4 left-1/2 z-10 w-8 -translate-x-1/2" />
      <p className="tech-label text-[9px]!">AKTIVITAS MINGGU INI</p>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[38, 62, 45, 80, 56, 92, 70].map((h, i) => (
          <div key={i} className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-accent' : 'bg-accentsoft'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="mt-2.5 text-[13px] font-semibold">
        6 proyek <span className="font-normal text-ink3">selesai ✦</span>
      </p>
    </div>
  );
}

function CardChat() {
  return (
    <div className="absolute bottom-0 left-4 w-52 -rotate-[2.5deg] rounded-3xl border border-line bg-white p-4 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float sm:left-10">
      <Pin className="absolute -top-4 left-1/2 z-10 w-8 -translate-x-1/2" />
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <p className="text-xs font-medium text-ink2">Terbuka untuk proyek</p>
      </div>
      <p className="mt-2.5 rounded-2xl rounded-bl-md bg-paper2 px-3 py-2 text-xs leading-relaxed text-ink2">
        "Halo! Bisa bantu bikin website?" 👋
      </p>
    </div>
  );
}

/**
 * Hero — gabungan 2 referensi: kata bertumpuk + pill menimpa (poster
 * Shoot.Edit.Deliver) × kartu pushpin melayang (moodboard).
 */
export default function Hero() {
  const [greet, setGreet] = useState('');
  useEffect(() => {
    setGreet(wibGreeting());
    const id = setInterval(() => setGreet(wibGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="beranda" className="bg-glow px-5 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        {/* kiri — poster kata bertumpuk */}
        <div>
          <div className="mask-line d1">
            <span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink2 shadow-sm">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {greet || 'Halo!'} — pelajar SMA, Indonesia 🇮🇩
              </span>
            </span>
          </div>

          <h1 className="mask-line d2 mt-8">
            <span className="block text-[17vw] font-semibold sm:text-6xl xl:text-[5.2rem]">
              {WORDS.map((w, i) => (
                <StackLine key={w.word} item={w} index={i} />
              ))}
            </span>
          </h1>

          <p className="mask-line d3 mt-9">
            <span className="block max-w-md text-[15px] leading-relaxed text-ink2 sm:text-base">
              Saya <b className="font-medium text-ink">Dzul Amroin Nahdan</b> — membangun{' '}
              <b className="font-medium text-ink">web</b>, merancang{' '}
              <b className="font-medium text-ink">pengalaman</b>, dan mengeksplorasi{' '}
              <b className="font-medium text-ink">AI</b>.
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToHash('#proyek')}
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,107,255,.35)] transition hover:-translate-y-0.5 hover:bg-accent2"
            >
              Lihat Proyek ↓
            </button>
            <button
              onClick={() => scrollToHash('#kontak')}
              className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-medium transition hover:border-ink"
            >
              Hubungi Saya
            </button>
            <span className="font-script text-2xl text-accent">let's roll →</span>
          </div>
        </div>

        {/* kanan — kolase kartu pushpin */}
        <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[460px]">
          <div className="absolute inset-0 rounded-[48px] bg-accentsoft/60 blur-2xl" aria-hidden="true" />
          <CardProject />
          <CardStat />
          <CardChat />
        </div>
      </div>
    </section>
  );
}
