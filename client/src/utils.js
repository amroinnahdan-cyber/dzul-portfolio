/**
 * util kecil bersama.
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
