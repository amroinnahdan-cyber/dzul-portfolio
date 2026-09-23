import Reveal from './Reveal.jsx';
import { ArrowCurve } from './Doodles.jsx';

/**
 * Catatan Belajar — bukti "satu proyek/minggu": kartu catatan
 * bergaya sticky-note ditempel washi tape. (EDIT isi catatannya!)
 */
const NOTES = [
  {
    date: 'MINGGU #12',
    tag: 'FRONTEND',
    title: 'Tailwind v4 itu lain rasanya',
    desc: 'Migrasi styling portofolio ke Tailwind v4 — token warna & font lewat @theme, tanpa file config. Grid spacing jadi bebas.',
  },
  {
    date: 'MINGGU #11',
    tag: 'BACKEND',
    title: 'API pertama + SQLite',
    desc: 'Express + better-sqlite3: endpoint proyek, form kontak dengan validasi & rate-limit. Ternyata backend itu melatih ketelitian.',
  },
  {
    date: 'MINGGU #10',
    tag: 'AI',
    title: 'Prompt itu skill',
    desc: 'Latih JARVIS mengikuti konteks percakapan. Pelajaran: instruksi yang spesifik + contoh = jawaban 10x lebih akurat.',
  },
  {
    date: 'MINGGU #09',
    tag: 'PERFORMA',
    title: 'Lighthouse 95+',
    desc: 'Kompres gambar, font variable, lazy-load. Skor hijau semua — website cepat itu fitur, bukan bonus.',
  },
];

export default function Notes() {
  return (
    <section id="catatan" className="border-t border-line px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tech-label">CATATAN BELAJAR</p>
              <h2 className="font-display mt-4 text-4xl font-medium tracking-[-.01em] sm:text-5xl">
                Bukti tiap <span className="font-script text-[1.12em] text-accent">minggu.</span>
              </h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-ink3">
              dipelajari, dicatat, dibagikan <ArrowCurve className="w-8 text-accent/70" />
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NOTES.map((n, i) => (
            <Reveal key={n.date} delay={i * 70}>
              <div
                className={`relative h-full rounded-[22px] border border-line bg-white p-5 pt-7 shadow-[0_14px_40px_rgba(11,18,32,.06)] transition duration-300 hover:-translate-y-1 hover:rotate-0 ${
                  i % 2 ? 'rotate-[1.4deg]' : '-rotate-[1.4deg]'
                }`}
              >
                {/* washi tape */}
                <span className="tape !left-1/2 !top-[-10px] !w-16 !-translate-x-1/2 !rotate-[-4deg]" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span className="tech-label text-[9px]!">{n.date}</span>
                  <span className="rounded-full bg-accentsoft px-2 py-0.5 text-[9px] font-bold text-accent">{n.tag}</span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-snug tracking-tight">{n.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink2">{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
