import { useInView } from './Reveal.jsx';
import { Spark } from './Doodles.jsx';

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
      <div className="relative mx-auto max-w-5xl rounded-[40px] bg-accentsoft px-6 py-16 sm:px-14 sm:py-24">
        <Spark className="absolute right-8 top-8 w-9 text-accent/70" />
        <p className="tech-label">SEBUAH PERNYATAAN</p>
        <WordReveal
          className="font-display mt-8 text-3xl leading-[1.12] font-medium sm:text-5xl"
          text="Saya bikin website yang seru — cepat, rapi, dan beneran kepakai orang."
        />
        <WordReveal
          className="mt-6 max-w-xl text-base font-medium text-ink2 sm:text-lg"
          text="bukan sekadar tampilan bagus, tapi ada maknanya."
        />

        {/* statistik — angka nyata */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
          {[
            ['6+', 'proyek dibangun'],
            ['10+', 'tools dikuasai'],
            ['3', 'tahun ngulik'],
            ['\u221e', 'rasa penasaran'],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{num}</p>
              <p className="tech-label mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
