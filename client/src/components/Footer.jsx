import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToHash } from '../utils.js';

function useJakartaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Footer — blok gelap rounded dengan CTA raksasa + jam Jakarta live.
 */
export default function Footer() {
  const time = useJakartaTime();

  return (
    <footer className="rounded-t-[44px] bg-black1 px-5 pt-20 pb-7 text-paper sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="tech-label text-paper/40!">PUNYA PROYEK DI KEPALA?</p>

        <a
          href="mailto:amroin.nahdan@gmail.com"
          className="group mt-8 block font-sans text-[12.5vw] leading-[.95] font-semibold tracking-tight uppercase transition-colors duration-300 hover:text-peach sm:text-[7.5vw]"
        >
          Mari bekerja
          <br />
          sama <span className="inline-block transition-transform duration-300 group-hover:rotate-45">↗</span>
        </a>

        {/* baris bawah */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-darkline pt-6 text-[13px] text-paper/50">
          <span>© 2026 Dzul Amroin Nahdan</span>

          <span className="tabular-nums">
            JAKARTA — {time} WIB
          </span>

          <div className="flex items-center gap-4">
            <a href="https://github.com/amroinnahdan-cyber" target="_blank" rel="noopener noreferrer" className="transition hover:text-paper">
              GitHub
            </a>
            <a href="https://instagram.com/dee.zull" target="_blank" rel="noopener noreferrer" className="transition hover:text-paper">
              Instagram
            </a>
            <button onClick={() => scrollToHash('#beranda')} className="transition hover:text-paper">
              ke atas ↑
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-[12px] text-paper/30">
          <span>dibangun dengan React, Tailwind &amp; rasa penasaran.</span>
          <Link to="/admin" className="transition hover:text-paper">
            /admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
