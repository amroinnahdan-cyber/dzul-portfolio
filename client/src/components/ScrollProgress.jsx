import { useEffect } from 'react';

/**
 * ScrollProgress — garis tipis di atas layar, menunjukkan
 * seberapa jauh halaman sudah di-scroll.
 */
export default function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.display = 'none';
      return;
    }
    let raf;
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left scale-x-0 bg-ink"
    />
  );
}
