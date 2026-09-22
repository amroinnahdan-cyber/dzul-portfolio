import { useEffect, useRef } from 'react';

/**
 * Marquee — pita teks besar. Kecepatan & kemiringan bereaksi
 * terhadap kecepatan scroll (ala Dennis Snellenberg).
 */
const items = ['web', 'design', 'ai', 'eksperimen'];

function Group() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((w) => (
        <span key={w} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-serif text-4xl font-light italic sm:px-10 sm:text-6xl">{w}</span>
          <span className="text-2xl text-peach sm:text-3xl">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let half = 0;
    let raf;
    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener('resize', measure);

    const loop = () => {
      const v = window.__lenis ? window.__lenis.velocity : 0;
      const speed = 1.1 + Math.min(Math.abs(v) * 0.45, 7);
      pos -= speed;
      if (half > 0) {
        if (pos <= -half) pos += half;
        if (pos > 0) pos -= half;
      }
      const skew = Math.max(-10, Math.min(10, v * 0.6));
      track.style.transform = `translate3d(${pos}px,0,0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="overflow-hidden border-y border-line py-5 sm:py-6" aria-hidden="true">
      <div ref={trackRef} className="flex w-max will-change-transform">
        <Group />
        <Group />
      </div>
    </div>
  );
}
