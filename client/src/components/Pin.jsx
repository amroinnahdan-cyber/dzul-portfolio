import { useId } from 'react';

/**
 * Pin — pushpin biru ala papan moodboard (SVG).
 */
export default function Pin({ className = '', color = '#2f6bff' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 40 52" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      {/* jarum */}
      <line x1="20" y1="26" x2="20" y2="46" stroke="#1e3a8a" strokeWidth="2.6" strokeLinecap="round" />
      {/* kepala pin */}
      <circle cx="20" cy="16" r="12.5" fill={`url(#${id})`} stroke={color} strokeWidth="1" />
      <ellipse cx="15" cy="11" rx="4" ry="2.6" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
