import RotatingBadge from './RotatingBadge.jsx';

/**
 * Hero — nama raksasa fluid dengan mask-reveal per baris,
 * paragraf pendek + badge melingkar di bawah. (ala Snellenberg)
 */
export default function Hero() {
  return (
    <section id="beranda" className="flex min-h-[100svh] flex-col justify-between px-5 pt-24 pb-6 sm:px-6">
      {/* baris atas */}
      <div className="flex items-center justify-between">
        <span className="tech-label">PORTOFOLIO /26</span>
        <span className="tech-label">INDONESIA, ID 🇮🇩</span>
      </div>

      {/* nama raksasa */}
      <div className="mt-10">
        <h1 className="select-none font-sans text-[17.5vw] leading-[.94] font-semibold tracking-[-.02em] uppercase sm:text-[16vw]">
          <span className="mask-line d1">
            <span>
              Dzul<span className="text-peach">✦</span>
            </span>
          </span>
          <span className="mask-line d2">
            <span>
              Am<span className="text-ink3">roin</span>
            </span>
          </span>
        </h1>

        {/* baris bawah: intro + badge */}
        <div className="mask-line d3">
          <span className="block">
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 sm:mt-10">
              <p className="max-w-md text-[15px] leading-relaxed text-ink2 sm:text-base">
                Pelajar SMA yang membangun <b className="font-medium text-ink">web</b>, merancang{' '}
                <b className="font-medium text-ink">pengalaman</b>, dan mengeksplorasi{' '}
                <b className="font-medium text-ink">AI</b> — satu proyek kecil setiap minggu.
              </p>
              <RotatingBadge />
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}
