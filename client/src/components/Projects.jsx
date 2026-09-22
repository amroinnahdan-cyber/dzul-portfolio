import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import ProjectModal from './ProjectModal.jsx';
import { fetchProjects } from '../api.js';
import { fallbackProjects } from '../data/fallbackProjects.js';
import { ArrowUpRight } from './Decor.jsx';

const GITHUB_URL = 'https://github.com/amroinnahdan-cyber';

const COVERS = {
  'Studio Elevate': '/projects/studio-elevate.png',
  'BuildLight Studio': '/projects/buildlight.png',
  'OMEN Crypto Monitor': '/projects/omen-crypto.png',
  "God's Eye View": '/projects/gods-eye.png',
  'MARK-XLVI / JARVIS': '/projects/jarvis.png',
  'AI & Cybersecurity': '/projects/cyber.png',
};

/**
 * Proyek — grid kartu clean ala referensi SaaS.
 * Klik kartu → modal detail.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(true);
  const [open, setOpen] = useState(null);

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

  return (
    <section id="proyek" className="bg-paper2/60 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="tech-label">PROYEK TERPILIH (06)</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Proyek &amp; <span className="font-serif font-light italic">eksperimen.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-ink2">
              Klik kartunya untuk baca cerita di baliknya ↴
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-[28px] bg-white" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 70}>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpen(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(i)}
                  className="group flex h-full cursor-pointer flex-col rounded-[28px] border border-line bg-white p-3 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(11,18,32,.1)]"
                >
                  <div className="relative overflow-hidden rounded-[20px] bg-paper2">
                    <img
                      src={COVERS[p.title] || '/projects/studio-elevate.png'}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
                      <span className="shrink-0 font-serif text-sm font-light text-ink3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink2">{p.description}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-accentsoft px-2.5 py-1 text-[10px] font-medium text-accent">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-4 text-[13px] font-medium">
                      {p.demo_url && (
                        <a
                          href={p.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          Live ↗
                        </a>
                      )}
                      <a
                        href={p.repo_url || GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="underline underline-offset-4 hover:text-accent"
                      >
                        Kode ↗
                      </a>
                      <span className="ml-auto text-xs text-ink3 transition group-hover:text-accent">detail →</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {!fromApi && !loading && (
          <p className="mt-8 text-center text-sm text-ink3">* data cadangan — backend belum terhubung</p>
        )}
      </div>

      {open !== null && projects[open] && (
        <ProjectModal project={projects[open]} index={open} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
