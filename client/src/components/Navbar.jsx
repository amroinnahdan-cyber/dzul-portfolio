import { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToHash } from '../utils.js';

const links = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#fokus', label: 'Fokus' },
  { href: '#proyek', label: 'Proyek' },
];

function go(e, href) {
  e.preventDefault();
  scrollToHash(href);
}

/**
 * Navbar ala Snellenberg: logo kiri, pil navigasi kanan,
 * menu mobile layar penuh dengan tautan raksasa.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-5 sm:p-6">
        <Link to="/" className="font-tech text-[14px] tracking-[.16em]">
          DZUL<span className="text-peach">✦</span>
        </Link>

        {/* pil navigasi (desktop) */}
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-paper/80 p-1.5 backdrop-blur-md md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="rounded-full px-4 py-2 text-sm text-ink2 transition hover:bg-paper2 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={(e) => go(e, '#kontak')}
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition hover:bg-black2"
          >
            Kontak ↗
          </a>
        </nav>

        <Link to="/admin" title="Halaman admin" className="hidden text-xs text-ink3 transition hover:text-ink md:block">
          /admin
        </Link>

        {/* tombol menu (mobile) */}
        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-paper/80 backdrop-blur md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`h-px w-5 bg-ink transition ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px w-5 bg-ink transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-5 bg-ink transition ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* menu mobile layar penuh */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 transition-all duration-500 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {[...links, { href: '#kontak', label: 'Kontak' }].map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              setOpen(false);
              go(e, l.href);
            }}
            className={`border-b border-line py-5 font-serif text-4xl font-light transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${100 + i * 70}ms` }}
          >
            {l.label}
          </a>
        ))}
        <Link to="/admin" className="mt-8 text-sm text-ink3">
          /admin
        </Link>
      </div>
    </>
  );
}
