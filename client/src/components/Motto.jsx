import Reveal from './Reveal.jsx';
import { scrollToHash } from '../utils.js';

/**
 * Motto — pernyataan besar + tombol pil menuju kontak.
 */
export default function Motto() {
  return (
    <section className="px-5 py-28 text-center sm:px-6 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="tech-label">MOTTO</p>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8 font-sans text-4xl leading-[1.12] font-semibold tracking-tight sm:text-6xl">
            Masa depan <span className="text-ink3">tidak</span> kita tunggu —
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-3 font-sans text-4xl leading-[1.12] font-semibold tracking-tight sm:text-6xl">
            ia kita <span className="font-serif font-light italic">bangun.</span>
          </p>
        </Reveal>
        <Reveal delay={300}>
          <button
            onClick={() => scrollToHash('#kontak')}
            className="mt-12 rounded-full border border-ink px-8 py-4 text-sm font-medium transition hover:bg-ink hover:text-paper"
          >
            Mulai proyek ↗
          </button>
        </Reveal>
      </div>
    </section>
  );
}
