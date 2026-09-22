/**
 * utils.js — util kecil bersama.
 */
export function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -84 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/** Jam sekarang di zona WIB (0–23). */
export function wibHour() {
  const h = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    hour12: false,
  }).format(new Date());
  return parseInt(h, 10) % 24;
}

/** Sapaan sesuai jam WIB. */
export function wibGreeting() {
  const h = wibHour();
  if (h < 4) return 'Masih melek? 😴';
  if (h < 11) return 'Selamat pagi ☀️';
  if (h < 15) return 'Selamat siang 👋';
  if (h < 18) return 'Selamat sore 🌤️';
  if (h < 23) return 'Selamat malam 🌙';
  return 'Jangan begadang, ya 😄';
}
