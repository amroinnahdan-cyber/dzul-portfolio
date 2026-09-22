import { useInView } from './Reveal.jsx';

/**
 * WordReveal — paragraf yang muncul kata demi kata saat di-scroll.
 */
function WordReveal({ text, className = '' }) {
  const [ref, seen] = useInView(0.3);
  return (
    <p ref={ref} className={`${className} ${seen ? 'is-visible' : ''}`}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="reveal-word" style={{ transitionDelay: `${i * 42}ms` }}>
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}

/**
 * Manifesto — satu pernyataan besar, kata-per-kata. (ala Sutera)
 */
export default function Manifesto() {
  return (
    <section className="px-5 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="tech-label">SEBUAH PERNYATAAN</p>
        <WordReveal
          className="mt-10 font-sans text-3xl leading-[1.18] font-semibold tracking-tight sm:text-6xl"
          text="Saya bikin website yang seru — cepat, rapi, dan beneran kepakai orang."
        />
        <WordReveal
          className="mt-8 max-w-xl font-serif text-xl font-light italic text-ink3 sm:text-2xl"
          text="bukan sekadar tampilan bagus, tapi ada maknanya."
        />
      </div>
    </section>
  );
}
