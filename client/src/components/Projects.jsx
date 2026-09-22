import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { fetchProjects } from '../api.js';
import { fallbackProjects } from '../data/fallbackProjects.js';
import { ArrowUpRight } from './Decor.jsx';

const GITHUB_URL = 'https://github.com/amroinnahdan-cyber';

/* Cover lokal per judul (gambar 3D abstrak yang digenerate) */
const COVERS = {
  'Studio Elevate': '/projects/studio-elevate.png',
  'BuildLight Studio': '/projects/buildlight.png',
  'OMEN Crypto Monitor': '/projects/omen-crypto.png',
  "God's Eye View": '/projects/gods-eye.png',
  'MARK-XLVI / JARVIS': '/projects/jarvis.png',
  'AI & Cybersecurity': '/projects/cyber.png',
};

/**
 * Proyek — daftar baris besar ala Snellenberg:
 * hover di desktop memunculkan gambar preview yang mengikuti kursor.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(true);
  const [active, setActive] = useState(null);
  const floatRef = useRef(null);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setFromApi(false);
        setLoading(false);
      });
  }, []);

  const onMove = (e) => {
    const el = floatRef.current;
    if (el) {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    }
  };

  return (
    <section id="proyek" className="border-t border-line px-5 py-24 sm:px-6 sm:py-32" onMouseMove={onMove}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="tech-label">PROYEK TERPILIH (06)</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Proyek &amp; <span className="font-serif font-light italic">eksperimen.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-ink3">Seru menjelajahi — klik untuk lihat kodenya ↴</p>
          </div>
        </Reveal>

        {/* gambar melayang mengikuti kursor (desktop) */}
        {active !== null && projects[active] && (
          <img
            ref={floatRef}
            src={COVERS[projects[active].title] || '/projects/studio-elevate.png'}
            alt=""
            aria-hidden="true"
            className="pointer-events-none fixed z-40 hidden h-56 w-56 -translate-x-1/2 -translate-y-[115%] rotate-3 rounded-[36px] object-cover shadow-2xl lg:block"
          />
        )}

        {loading ? (
          <div className="mt-14 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-[28px] bg-paper2" />
            ))}
          </div>
        ) : (
          <div className="mt-14">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 3) * 60}>
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line px-2 py-7 transition-colors duration-300 last:border-b hover:bg-paper2/70 sm:gap-7 sm:px-4 sm:py-9"
                >
                  <span className="w-8 shrink-0 font-serif text-lg font-light italic text-ink3 sm:w-12 sm:text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* thumbnail kecil (mobile/tablet) */}
                  <img
                    src={COVERS[p.title] || '/projects/studio-elevate.png'}
                    alt=""
                    aria-hidden="true"
                    className="hidden h-16 w-16 rounded-3xl object-cover sm:block lg:hidden"
                  />

                  <div className="min-w-0">
                    <h3 className="text-xl font-medium leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 max-w-xl text-[13px] leading-relaxed text-ink2 sm:text-sm">
                      {p.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tech-label rounded-full border border-line px-2.5 py-1 text-[9px]!">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2.5">
                    <a
                      href={p.repo_url || GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Kode ${p.title}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line transition duration-300 group-hover:bg-ink group-hover:text-paper"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      {p.demo_url && (
                        <a href={p.demo_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink3">
                          Live ↗
                        </a>
                      )}
                      <a href={p.repo_url || GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink3">
                        Kode ↗
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {!fromApi && !loading && (
          <p className="mt-8 text-center text-sm text-ink3">* data cadangan — backend belum terhubung</p>
        )}
      </div>
    </section>
  );
}
