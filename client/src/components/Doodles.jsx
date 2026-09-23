/**
 * Doodles — ornamen coretan tangan (SVG, warna currentColor).
 */

export function Spark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2c.6 5.2 2 8.5 3.5 9.5 1.4 1 4.5 1.2 6.5 1-4 .8-6 1.6-7 3-1 1.5-1.7 4-2.5 8.5-.6-4.5-1.4-7-2.5-8.5-1-1.4-3-2.2-7-3 2 .2 5 0 6.5-1C11 10.5 11.4 7.2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 8c8-6 14-6 22-1s16 5 24-1 16-6 24-1 16 5 24-1 14-4 22-1"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Zigzag({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M22 2 8 22h9L14 38l16-22h-9L24 2Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowCurve({ className = '' }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 6c26 4 48 16 58 42"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path d="M54 40l8 10 3-13" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Asterisk({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
