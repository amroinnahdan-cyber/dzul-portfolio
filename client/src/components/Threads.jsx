import Reveal from './Reveal.jsx';

/**
 * Keahlian — bento grid ala referensi SaaS: kartu rounded dengan
 * pastel lembut, satu kartu "sedang dipelajari" yang hidup.
 */
const BENTO = [
  {
    span: 'md:col-span-2',
    bg: 'bg-accentsoft',
    tag: 'UTAMA',
    icon: '⚡',
    title: 'Web Development',
    desc: 'Website modern & interaktif — cepat, responsif, di semua layar.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'REST API'],
  },
  {
    span: '',
    bg: 'bg-paper2',
    tag: 'VISUAL',
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Wireframe → prototype → final design yang berpusat pada pengguna.',
    stack: ['Figma', 'Canva'],
  },
  {
    span: '',
    bg: 'bg-lavender',
    tag: 'EKSPERIMEN',
    icon: '🤖',
    title: 'AI & Automation',
    desc: 'AI agents, LLM API, dan otomasi — dari crypto monitor sampai JARVIS.',
    stack: ['LLM API', 'Python'],
  },
  {
    span: 'md:col-span-2',
    bg: 'bg-paper2',
    tag: 'SEDANG DIPELAJARI',
    icon: '🌱',
    title: 'Currently Learning',
    desc: 'Area yang lagi saya gali minggu ini — terus bertambah.',
    stack: ['Cybersecurity', 'Computer Vision', 'IoT', 'Full-stack'],
    live: true,
  },
];

export default function Threads() {
  return (
    <section id="fokus" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="tech-label">KEAHLIAN</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Apa yang saya <span className="text-accent">kerjakan.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-ink2">
              Empat area utama — dari yang paling dikuasai sampai yang lagi dipelajari.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {BENTO.map((b, i) => (
            <Reveal key={b.title} delay={i * 70} className={b.span}>
              <div
                className={`group h-full rounded-[32px] border border-line p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,18,32,.08)] ${b.bg}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg shadow-sm">{b.icon}</span>
                  <span className="tech-label text-[9px]!">{b.tag}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{b.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {b.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink2"
                    >
                      {s}
                      {b.live && <span className="ml-1.5 inline-block h-1 w-1 animate-pulse rounded-full bg-accent align-middle" />}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
