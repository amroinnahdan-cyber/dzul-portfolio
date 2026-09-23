import { useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';
import { SocialIcons } from './Decor.jsx';

const PHOTO = true; // ✓ foto asli sudah dipasang

const socials = [
  { label: 'GitHub', href: 'https://github.com/amroinnahdan-cyber', icon: SocialIcons.github },
  { label: 'Instagram', href: 'https://instagram.com/dee.zull', icon: SocialIcons.instagram },
  { label: 'WhatsApp', href: 'https://wa.me/6282299225876', icon: SocialIcons.whatsapp },
];

const facts = [
  {
    label: 'SAAT INI',
    value: (
      <>
        Belajar <b className="font-medium text-ink">full-stack development &amp; AI engineering</b> — sambil membangun
        proyek kecil setiap minggu. ↳ didampingi kopi &amp; rasa penasaran.
      </>
    ),
  },
  {
    label: 'PERKAKAS HARIAN',
    value: 'React · Vite · Tailwind CSS · Framer Motion · React Router · Figma · Canva · Git & GitHub · Vercel · REST API',
  },
  {
    label: 'DI LUAR KODING',
    value: 'Ngulik AI & cybersecurity, nonton sci-fi, dan menyimpan ide proyek yang jumlahnya terus bertambah.',
  },
];

/**
 * Tentang — kartu foto (parallax) + cerita + tabel fakta.
 */
export default function About() {
  const imgRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!PHOTO) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const loop = () => {
      const frame = frameRef.current;
      const img = imgRef.current;
      if (frame && img) {
        const r = frame.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          img.style.transform = `translateY(${progress * -7}%) scale(1.1)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="tentang" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-[1fr_1.4fr]">
        {/* kiri — foto */}
        <div className="md:sticky md:top-28">
          <Reveal>
            <div className="relative">
              <div className="tape -left-6 -top-2 -rotate-45" aria-hidden="true" />
                <div className="tape -bottom-2 -right-6 -rotate-12" aria-hidden="true" />
                <div
                ref={frameRef}
                className="relative aspect-[4/5] max-w-sm -rotate-2 overflow-hidden rounded-[36px] border border-line bg-paper2 shadow-[0_30px_80px_rgba(11,18,32,.12)]"
              >
                {PHOTO ? (
                  <img
                    ref={imgRef}
                    src="/dzul.jpg"
                    alt="Foto Dzul Amroin Nahdan"
                    className="h-full w-full object-cover will-change-transform"
                  />
                ) : (
                  <div className="absolute inset-3 grid place-items-center rounded-[28px] border border-dashed border-ink/25 p-6 text-center">
                    <p className="tech-label">SLOT FOTO</p>
                  </div>
                )}
              </div>
              {/* chip nama di atas foto */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full border border-line bg-white/90 py-2 pr-5 pl-2 shadow-sm backdrop-blur">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-bold text-white">D</span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold">Dzul Amroin Nahdan</p>
                  <p className="text-[11px] text-ink3">Frontend Developer</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink2 transition hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <a
              href="/cv-dzul.pdf"
              download
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black2 sm:max-w-sm"
            >
              Unduh CV (PDF) ↓
            </a>
          </Reveal>
        </div>

        {/* kanan — cerita */}
        <div>
          <Reveal delay={80}>
            <p className="tech-label">TENTANG — BUKAN STUDIO, CUMA SAYA</p>
            <h2 className="font-display mt-4 text-3xl font-medium tracking-[-.01em] sm:text-4xl">
              Kenalan sama <span className="font-script text-[1.12em] text-accent">Dzul.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-lg leading-relaxed text-ink2 sm:text-xl">
              Pelajar SMA yang lagi asyik-asiknya{' '}
              <span className="font-medium text-ink">ngulik</span> teknologi — dari web development, UI/UX
              design, sampai artificial intelligence.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink2">
              Sehari-hari saya membangun dan memodifikasi website dengan React, Vite, dan Tailwind CSS, lalu
              merancang tampilannya di Figma. Situs ini kumpulan apa yang saya kerjakan — sekalian berbagi proses
              belajarnya. Senang berkenalan! 🤝
            </p>
          </Reveal>

          <div className="mt-10 space-y-3">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 70}>
                <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
                  <p className="tech-label">{f.label}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink2">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
