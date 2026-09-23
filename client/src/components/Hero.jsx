import { wibGreeting } from '../utils.js';
import { useEffect, useState } from 'react';
import { scrollToHash } from '../utils.js';

/* --- kartu mockup melayang ala referensi SaaS --- */

function CardProject() {
  return (
    <div className="absolute left-0 top-6 w-56 rounded-3xl border border-line bg-white p-3.5 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float sm:w-64">
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
    <div className="absolute right-0 top-36 w-48 rounded-3xl border border-line bg-white p-4 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float-late sm:top-44 sm:w-56">
      <p className="tech-label text-[9px]!">AKTIVITAS MINGGU INI</p>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[38, 62, 45, 80, 56, 92, 70].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-accent' : 'bg-accentsoft'}`}
            style={{ height: `${h}%` }}
          />
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
    <div className="absolute bottom-0 left-4 w-52 rounded-3xl border border-line bg-white p-4 shadow-[0_20px_60px_rgba(11,18,32,.1)] animate-float sm:left-10">
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
 * Hero — clean SaaS ala referensi: kiri teks + CTA pill,
 * kanan kolase kartu UI melayang.
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
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        {/* kiri — teks */}
        <div>
          <div className="mask-line d1">
            <span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink2 shadow-sm">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {greet || 'Halo!'} — pelajar SMA, Indonesia 🇮🇩
              </span>
            </span>
          </div>

          <h1 className="mask-line d2 mt-6">
            <span className="block text-5xl leading-[1.05] font-extrabold tracking-[-.035em] sm:text-6xl xl:text-7xl">
              Web yang <span className="text-accent">rapi</span>,
              <br />
              desain yang <span className="text-accent">nyaman.</span>
            </span>
          </h1>

          <p className="mask-line d3 mt-6">
            <span className="block max-w-md text-[15px] leading-relaxed text-ink2 sm:text-base">
              Saya <b className="font-medium text-ink">Dzul Amroin Nahdan</b> — membangun{' '}
              <b className="font-medium text-ink">web</b>, merancang{' '}
              <b className="font-medium text-ink">pengalaman</b>, dan mengeksplorasi{' '}
              <b className="font-medium text-ink">AI</b>. Satu proyek kecil setiap minggu.
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
          </div>

          {/* chips keahlian */}
          <div className="mt-10 flex flex-wrap gap-2">
            {['Frontend Developer', 'UI/UX Enthusiast', 'AI Learner'].map((c) => (
              <span key={c} className="rounded-full bg-paper2 px-4 py-2 text-xs font-medium text-ink2">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* kanan — kolase kartu melayang */}
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
