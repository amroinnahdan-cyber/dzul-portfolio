import Reveal from './Reveal.jsx';

/**
 * Perjalanan — timeline belajar. (EDIT teks di bawah sesuai ceritamu!)
 */
const MILESTONES = [
  {
    year: '2023',
    title: 'Iseng buka source code',
    desc: 'Pertama kali lihat "Inspect Element" di sebuah website — ternyata semua yang tampil di layar bisa dibaca dan diubah. Dari situ ketagihan.',
  },
  {
    year: '2024',
    title: 'HTML, CSS, proyek pertama',
    desc: 'Belajar otodidak dari dokumentasi & YouTube. Proyek serius pertama: landing page Studio Elevate — dan sadar desain sama pentingnya dengan kode.',
  },
  {
    year: '2025',
    title: 'Era React & UI/UX',
    desc: 'Pindah ke React + Tailwind, belajar Figma untuk merancang dulu sebelum ngoding. Lahir OMEN Crypto Monitor dan God\'s Eye View.',
  },
  {
    year: '2026',
    title: 'AI, full-stack, dan situs ini',
    desc: 'Membangun asisten AI ala JARVIS, belajar backend Express + SQLite, lalu merakit portofolio ini dari nol. Satu proyek kecil setiap minggu — terus dicatat di bawah. ↓',
  },
];

export default function Journey() {
  return (
    <section id="perjalanan" className="border-t border-line px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="tech-label">PERJALANAN</p>
            <h2 className="font-display mt-4 text-4xl font-medium tracking-[-.01em] sm:text-5xl">
              Dari iseng, jadi <span className="font-script text-[1.12em] text-accent">kebiasaan.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* garis vertikal putus-putus */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px border-l-2 border-dashed border-ink/15 sm:left-1/2" aria-hidden="true" />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 60}>
                <div className={`relative flex gap-6 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:pl-10' : 'sm:pr-10 sm:text-right'}`}>
                  {/* titik pin */}
                  <span
                    className={`absolute left-0 top-1.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white shadow-sm sm:left-auto ${
                      i % 2 ? 'sm:-left-5' : 'sm:-right-5'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>

                  <div className="pl-12 sm:pl-0">
                    <span className="tech-label">{m.year}</span>
                    <h3 className="font-display mt-1.5 text-xl font-medium sm:text-2xl">{m.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed text-ink2 ${i % 2 ? '' : 'sm:ml-auto'} max-w-sm`}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
