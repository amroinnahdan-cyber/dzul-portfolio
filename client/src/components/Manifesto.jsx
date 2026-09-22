import { useInView } from './Reveal.jsx';

/**
 * WordReveal — paragraf muncul kata demi kata saat di-scroll.
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
 * Manifesto — panel biru lembut rounded berisi pernyataan besar.
 */
export default function Manifesto() {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl rounded-[40px] bg-accentsoft px-6 py-16 sm:px-14 sm:py-24">
        <p className="tech-label">SEBUAH PERNYATAAN</p>
        <WordReveal
          className="mt-8 text-3xl leading-[1.18] font-semibold tracking-tight sm:text-5xl"
          text="Saya bikin website yang seru — cepat, rapi, dan beneran kepakai orang."
        />
        <WordReveal
          className="mt-6 max-w-xl font-serif text-lg font-light italic text-ink2 sm:text-xl"
          text="bukan sekadar tampilan bagus, tapi ada maknanya."
        />
      </div>
    </section>
  );
}
