import { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToHash } from '../utils.js';

const links = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#fokus', label: 'Keahlian' },
  { href: '#proyek', label: 'Proyek' },
];

function go(e, href) {
  e.preventDefault();
  scrollToHash(href);
}

/**
 * Navbar — pill melayang blur (ala topbar referensi) dengan avatar foto.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-line bg-white/80 py-2 pr-2 pl-3 shadow-[0_8px_30px_rgba(11,18,32,.06)] backdrop-blur-md">
          {/* avatar + nama */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/dzul.jpg" alt="Foto Dzul" className="h-8 w-8 rounded-full object-cover ring-2 ring-accentsoft" />
            <span className="text-[15px] font-semibold tracking-tight">
              Dzul<span className="text-accent">.</span>
            </span>
          </Link>

          {/* links (desktop) */}
          <div className="hidden items-center gap-1 md:flex">
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
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#kontak"
              onClick={(e) => go(e, '#kontak')}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_20px_rgba(47,107,255,.35)] transition hover:bg-accent2 sm:block"
            >
              Kontak
            </a>
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span className={`h-px w-4.5 bg-ink transition ${open ? 'translate-y-[5.5px] rotate-45' : ''}`} />
              <span className={`h-px w-4.5 bg-ink transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-px w-4.5 bg-ink transition ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* menu mobile */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-white px-8 transition-all duration-500 md:hidden ${
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
            className={`border-b border-line py-5 text-3xl font-semibold tracking-tight transition-all duration-500 ${
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
