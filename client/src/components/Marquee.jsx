/**
 * Marquee — pita teks besar berjalan, pemisah antar-section.
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
  return (
    <div className="overflow-hidden border-y border-line py-5 sm:py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
    </div>
  );
}
