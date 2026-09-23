import Reveal from './Reveal.jsx';
import Pin from './Pin.jsx';
import { Spark, Zigzag, Asterisk } from './Doodles.jsx';

/**
 * Keahlian — PAPAN PIN ala referensi moodboard:
 * 5 kartu miring tersemat pushpin, garis lengkung penghubung, doodle.
 */
const CARDS = [
  {
    icon: '⚡',
    label: 'Web Dev',
    title: 'Web Development',
    desc: 'Website modern & interaktif, cepat di semua layar.',
    stack: ['React', 'Vite', 'Tailwind'],
    pos: 'md:left-[1%] md:top-[7%]',
    rot: '-rotate-[5deg]',
  },
  {
    icon: '🎨',
    label: 'UI/UX Design',
    title: 'UI/UX Design',
    desc: 'Wireframe → prototype → desain final yang nyaman.',
    stack: ['Figma', 'Canva'],
    pos: 'md:left-[29%] md:top-[1%]',
    rot: 'rotate-[3.5deg]',
  },
  {
    icon: '🤖',
    label: 'AI & Automation',
    title: 'AI & Automation',
    desc: 'AI agents, LLM API & otomasi — sampai karya ala JARVIS.',
    stack: ['LLM API', 'Python'],
    pos: 'md:right-[1%] md:top-[6%]',
    rot: 'rotate-[5deg]',
  },
  {
    icon: '🛡️',
    label: 'Cyber & Riset',
    title: 'Cybersecurity',
    desc: 'OWASP, hardening Linux, computer vision & IoT.',
    stack: ['OWASP', 'Linux', 'CV'],
    pos: 'md:left-[9%] md:bottom-[5%]',
    rot: 'rotate-[3deg]',
  },
  {
    icon: '🌱',
    label: 'Lagi Dipelajari',
    title: 'Currently Learning',
    desc: 'Area yang terus bertambah minggu ini.',
    stack: ['Full-stack', 'IoT'],
    live: true,
    pos: 'md:right-[9%] md:bottom-[3%]',
    rot: '-rotate-[4deg]',
  },
];

/* garis penghubung antar pin (desktop) */
function Strings() {
  return (
    <svg
      viewBox="0 0 1000 640"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      aria-hidden="true"
    >
      {[
        'M115,105 C 240,20 300,15 400,80',
        'M400,80 C 610,5 760,25 880,110',
        'M400,80 C 320,300 260,380 215,485',
        'M215,485 C 440,615 620,600 760,535',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(11,18,32,.25)"
          strokeWidth="2"
          strokeDasharray="2 8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function Threads() {
  return (
    <section id="fokus" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        {/* judul ala referensi: bold + aksen script */}
        <Reveal>
          <div className="text-center">
            <p className="tech-label">KEAHLIAN — PAPAN PIN</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-.01em] sm:text-5xl">
              Apa yang bisa
              <br />
              saya <span className="font-script text-[1.15em] text-accent">bantu</span>?
            </h2>
          </div>
        </Reveal>

        {/* papan */}
        <Reveal delay={120}>
          <div className="relative mt-12 rounded-[44px] border border-line bg-paper2 p-6 pt-12 sm:p-10 md:h-[660px] md:pt-14">
            <div className="bg-grid pointer-events-none absolute inset-0 rounded-[44px]" aria-hidden="true" />

            {/* doodle sekeliling papan */}
            <Spark className="absolute right-8 top-7 hidden w-8 text-accent md:block" />
            <Zigzag className="absolute bottom-8 left-7 hidden w-7 text-ink/50 md:block" />
            <Asterisk className="absolute left-10 top-8 hidden w-6 text-accent/70 md:block" />

            <Strings />

            <div className="relative grid gap-10 sm:grid-cols-2 md:block md:h-full">
              {CARDS.map((c, i) => (
                <Reveal key={c.title} delay={i * 80} className={`${c.pos} md:absolute md:w-52 xl:w-56`}>
                  <div
                    className={`group relative ${c.rot} transition-transform duration-300 hover:rotate-0 hover:scale-[1.045]`}
                  >
                    <div className="relative rounded-[26px] bg-accent p-2.5 pb-2 shadow-[0_24px_50px_rgba(47,107,255,.32)]">
                      <Pin className="absolute -top-5 left-1/2 z-10 w-9 -translate-x-1/2" />
                      <div className="rounded-[19px] bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{c.icon}</span>
                          {c.live && (
                            <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wide text-emerald-600">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                              LIVE
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[13px] font-bold tracking-tight">{c.title}</p>
                        <p className="mt-1 text-[11px] leading-snug text-ink2">{c.desc}</p>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {c.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-accentsoft px-2 py-0.5 text-[9px] font-semibold text-accent"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="pb-1.5 pt-2 text-center text-[14px] font-bold italic tracking-wide text-white">
                        {c.label}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
