import { useEffect, useState } from 'react';

/**
 * Preloader — layar pemuatan dengan persentase, ala Sutera/Snellenberg.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setHidden(true);
      return;
    }
    const start = Date.now();
    const DURATION = 1300;
    const tick = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / DURATION);
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t >= 1) {
        clearInterval(tick);
        setTimeout(() => setGone(true), 150);
        setTimeout(() => setHidden(true), 950);
      }
    }, 30);
    return () => clearInterval(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${gone ? '-translate-y-full' : ''}`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="tech-label">PORTOFOLIO — 2026</span>
        <span className="font-serif text-7xl font-light tabular-nums">{progress}%</span>
        <span className="mt-1 h-px w-44 bg-line">
          <span className="block h-full bg-ink transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </span>
      </div>
    </div>
  );
}
