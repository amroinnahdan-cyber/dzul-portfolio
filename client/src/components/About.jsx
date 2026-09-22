import { useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';
import { SocialIcons } from './Decor.jsx';

/* ═══════════════════════════════════════════════════════════════
   FOTO PRIBADI — ganti begitu foto tersedia:
   1. letakkan foto di: client/public/dzul.jpg
   2. ubah PHOTO = true
   (kalau false → tampil "slot foto" yang tetap terlihat disengaja)
   ═══════════════════════════════════════════════════════════════ */
const PHOTO = false;

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
 * Tentang — kolom kiri lengket: judul + foto (parallax) + sosial.
 * Kolom kanan: cerita + tabel fakta.
 */
export default function About() {
  const imgRef = useRef(null);
  const frameRef = useRef(null);

  // parallax: gambar bergeser halus di dalam bingkainya
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
          img.style.transform = `translateY(${progress * -8}%) scale(1.12)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="tentang" className="border-t border-line px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.5fr]">
        {/* kiri — lengket */}
        <div className="self-start md:sticky md:top-28">
          <Reveal>
            <p className="tech-label">TENTANG</p>
            <h2 className="mt-5 font-serif text-3xl font-light leading-snug sm:text-4xl">
              Bukan studio — <br />
              <span className="italic">cuma saya.</span>
            </h2>
          </Reveal>

          {/* foto / slot foto */}
          <Reveal delay={120}>
            <div
              ref={frameRef}
              className="relative mt-8 aspect-[4/5] max-w-sm overflow-hidden rounded-[36px] border border-line bg-paper2"
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
                  <div>
                    <span className="font-serif text-3xl font-light italic text-ink3">✦</span>
                    <p className="tech-label mt-3">SLOT FOTO</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink3">
                      fotomu akan tampil di sini — kirim ke assistant, sisanya otomatis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink2 transition hover:border-ink hover:text-ink"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* kanan — cerita */}
        <div>
          <Reveal delay={100}>
            <p className="text-xl leading-relaxed text-ink2 sm:text-2xl">
              Saya <b className="font-medium text-ink">Dzul</b>, pelajar SMA yang lagi asyik-asiknya{' '}
              <span className="font-serif italic text-ink3">ngulik</span> teknologi — dari web development, UI/UX
              design, sampai artificial intelligence.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink2 sm:text-base">
              Sehari-hari saya membangun dan memodifikasi website dengan React, Vite, dan Tailwind CSS, lalu
              merancang tampilannya di Figma. Situs ini kumpulan apa yang saya kerjakan — sekalian berbagi proses
              belajarnya. Senang berkenalan! 🤝
            </p>
          </Reveal>

          <div className="mt-12">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 70}>
                <div className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[180px_1fr] sm:gap-6">
                  <span className="tech-label pt-1">{f.label}</span>
                  <p className="text-[15px] leading-relaxed text-ink2">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
