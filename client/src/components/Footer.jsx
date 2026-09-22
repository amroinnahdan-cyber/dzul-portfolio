import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToHash, wibGreeting } from '../utils.js';

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
 * Footer — kartu gelap rounded di atas halaman terang.
 */
export default function Footer() {
  const time = useJakartaTime();
  const [greet, setGreet] = useState('');
  useEffect(() => {
    setGreet(wibGreeting());
    const id = setInterval(() => setGreet(wibGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="px-4 pt-8 pb-4 sm:px-5">
      <div className="mx-auto max-w-6xl rounded-[40px] bg-black1 px-6 pt-16 pb-6 text-paper sm:px-12">
        <p className="tech-label text-white/40!">PUNYA PROYEK DI KEPALA?</p>

        <a
          href="mailto:amroin.nahdan@gmail.com"
          className="group mt-6 block text-4xl leading-[1.05] font-semibold tracking-tight transition-colors duration-300 hover:text-accent2 sm:text-6xl"
        >
          Mari bekerja sama{' '}
          <span className="inline-block transition-transform duration-300 group-hover:rotate-45">↗</span>
        </a>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-darkline pt-6 text-[13px] text-white/50">
          <span>© 2026 Dzul Amroin Nahdan</span>
          <span className="tabular-nums">
            {greet} <span className="text-white/25">·</span> JAKARTA — {time} WIB
          </span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/amroinnahdan-cyber" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              GitHub
            </a>
            <a href="https://instagram.com/dee.zull" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              Instagram
            </a>
            <button onClick={() => scrollToHash('#beranda')} className="transition hover:text-white">
              ke atas ↑
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[12px] text-white/30">
          <span>dibangun dengan React, Tailwind &amp; rasa penasaran.</span>
          <Link to="/admin" className="transition hover:text-white">
            /admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
