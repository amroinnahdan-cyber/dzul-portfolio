import Reveal from './Reveal.jsx';
import { scrollToHash } from '../utils.js';

/**
 * CTA — panel gradient biru rounded dengan pernyataan besar.
 */
export default function Motto() {
  return (
    <section className="px-5 py-10 sm:px-6 sm:py-16">
      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-gradient-to-br from-accent to-accent2 px-6 py-16 text-center text-white sm:px-14 sm:py-24">
          <p className="tech-label text-white/60!">MOTTO</p>
          <p className="mx-auto mt-6 max-w-2xl text-3xl leading-[1.15] font-semibold tracking-tight sm:text-5xl">
            Masa depan tidak kita tunggu — ia kita <span className="font-serif font-light italic">bangun.</span>
          </p>
          <button
            onClick={() => scrollToHash('#kontak')}
            className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-semibold text-accent shadow-[0_14px_40px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5"
          >
            Mulai proyek ↗
          </button>
        </div>
      </Reveal>
    </section>
  );
}
