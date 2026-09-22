import { wibGreeting } from '../utils.js';
import { useEffect, useRef, useState } from 'react';
import RotatingBadge from './RotatingBadge.jsx';

/* Nama dipecah per huruf biar bisa bereaksi terhadap kursor */
const LINE1 = [
  { c: 'D' }, { c: 'Z' }, { c: 'U' }, { c: 'L' }, { c: '✦', accent: true },
];
const LINE2 = [
  { c: 'A' }, { c: 'M' }, { c: 'R', muted: true }, { c: 'O', muted: true },
  { c: 'I', muted: true }, { c: 'N', muted: true },
];

function LetterSpan({ item, register }) {
  const [spinning, setSpinning] = useState(false);
  return (
    <span
      ref={register}
      className={`inline-block will-change-transform transition-colors duration-300 ${item.muted ? 'text-ink3' : ''}`}
      onClick={
        item.accent
          ? () => setSpinning(true)
          : undefined
      }
      onAnimationEnd={() => setSpinning(false)}
      title={item.accent ? 'klik aku ✦' : undefined}
      style={{ cursor: item.accent ? 'pointer' : undefined }}
    >
      <span className={spinning ? 'spin-pop inline-block' : 'inline-block'}>{item.c}</span>
    </span>
  );
}

/**
 * Hero — nama raksasa per huruf yang mengangkat mendekati kursor,
 * mask-reveal per baris, sapaan sesuai jam WIB.
 */
export default function Hero() {
  const letterRefs = useRef([]);
  const wrapRef = useRef(null);
  const [greet, setGreet] = useState('');

  useEffect(() => {
    setGreet(wibGreeting());
    const id = setInterval(() => setGreet(wibGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  // interaksi huruf ↔ kursor (desktop saja)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const letters = letterRefs.current.filter(Boolean);
    const state = letters.map(() => ({ t: 0, c: 0 }));

    let mx = -9999;
    let my = -9999;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    const loop = () => {
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(mx - cx, my - cy);
        const p = Math.max(0, 1 - d / 240);
        state[i].t = p;
        state[i].c += (state[i].t - state[i].c) * 0.14;
        const lift = state[i].c * -16;
        const scale = 1 + state[i].c * 0.1;
        el.style.transform = `translateY(${lift}px) scale(${scale})`;
      });
      raf = requestAnimationFrame(loop);
    };

    const wrap = wrapRef.current;
    window.addEventListener('mousemove', onMove, { passive: true });
    wrap?.addEventListener('mouseleave', onLeave);
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      wrap?.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  let idx = 0;
  const reg = (el) => letterRefs.current[idx++] = el;

  return (
    <section id="beranda" className="flex min-h-[100svh] flex-col justify-between px-5 pt-24 pb-6 sm:px-6">
      {/* baris atas */}
      <div className="flex items-center justify-between">
        <span className="tech-label">PORTOFOLIO /26</span>
        <span className="tech-label">INDONESIA, ID 🇮🇩</span>
      </div>

      {/* nama raksasa */}
      <div ref={wrapRef} className="mt-10">
        <h1 className="select-none font-sans text-[17.5vw] leading-[.94] font-semibold tracking-[-.02em] uppercase sm:text-[16vw]">
          <span className="mask-line d1">
            <span className="flex">
              {LINE1.map((item, i) => (
                <LetterSpan key={i} item={item} register={reg} />
              ))}
            </span>
          </span>
          <span className="mask-line d2">
            <span className="flex">
              {LINE2.map((item, i) => (
                <LetterSpan key={i} item={item} register={reg} />
              ))}
            </span>
          </span>
        </h1>

        {/* baris bawah: sapaan + intro + badge */}
        <div className="mask-line d3">
          <span className="block">
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 sm:mt-10">
              <div className="max-w-md">
                {greet && (
                  <p className="mb-2 inline-flex items-center gap-2 text-sm text-ink2">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-peach" />
                    {greet}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed text-ink2 sm:text-base">
                  Pelajar SMA yang membangun <b className="font-medium text-ink">web</b>, merancang{' '}
                  <b className="font-medium text-ink">pengalaman</b>, dan mengeksplorasi{' '}
                  <b className="font-medium text-ink">AI</b> — satu proyek kecil setiap minggu.
                </p>
              </div>
              <RotatingBadge />
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}
