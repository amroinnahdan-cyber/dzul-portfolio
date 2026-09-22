import { scrollToHash } from '../utils.js';

/**
 * Badge melingkar berputar (SVG textPath) — khas situs award.
 */
export default function RotatingBadge({ href = '#tentang', text = 'SCROLL KE BAWAH • LIHAT KARYA • ' }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToHash(href);
      }}
      aria-label="Gulir ke bawah"
      className="group relative grid h-32 w-32 place-items-center sm:h-36 sm:w-36"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
        </defs>
        <text className="fill-ink3" style={{ fontSize: '8px', letterSpacing: '2.1px', fontFamily: 'Bruno Ace SC, monospace' }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-xl transition group-hover:bg-ink group-hover:text-paper">
        ↓
      </span>
    </a>
  );
}
