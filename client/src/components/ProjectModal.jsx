import { useEffect } from 'react';
import { ArrowUpRight } from './Decor.jsx';

const GITHUB_URL = 'https://github.com/amroinnahdan-cyber';

/* Detail tambahan per proyek (diperkaya; DB tetap sumber judul/deskripsi/link) */
const DETAILS = {
  'Studio Elevate': {
    role: 'Desain + Development',
    year: '2025',
    stack: 'HTML · CSS · JavaScript',
    body: [
      'Landing page company-profile multi-section untuk Studio Elevate — dari hero sampai CTA dalam satu halaman yang mengalir.',
      'Fokus utama: tipografi yang rapi, kecepatan muat, dan tampilan konsisten dari layar HP sampai desktop (skor Lighthouse 95+).',
    ],
  },
  'BuildLight Studio': {
    role: 'UI/UX + Frontend',
    year: '2025',
    stack: 'Figma · React · Tailwind CSS',
    body: [
      'Redesign website agensi arsitektur BuildLight: wireframe di Figma, lalu dibangun dengan React + Tailwind.',
      'Fitur andalan: galeri proyek dengan filter kategori dan halaman studi kasus yang bersih — pengunjung bisa menyaring karya sesuai minat.',
    ],
  },
  'OMEN Crypto Monitor': {
    role: 'Full Development',
    year: '2025',
    stack: 'React · REST API · Charts',
    body: [
      'Dashboard pemantau harga crypto real-time yang menarik data dari API publik — chart interaktif, daftar koin, dan indikator pergerakan.',
      'Tantangan terbesar: mengelola state data yang terus berubah tanpa membuat UI tersendat. Di sini saya belajar throttling dan memoization.',
    ],
  },
  "God's Eye View": {
    role: 'Riset + Development',
    year: '2025',
    stack: 'Python · Computer Vision · React',
    body: [
      'Dashboard "mata burung": deteksi objek dari feed kamera memakai computer vision, hasilnya divisualkan di panel web.',
      'Proyek yang membuat saya jatuh cinta pada AI — melihat mesin "mengenali" dunia lewat kamera terasa seperti sulit aparatuh.', 
    ],
  },
  'MARK-XLVI / JARVIS': {
    role: 'Full Development',
    year: '2026',
    stack: 'Speech Recognition · LLM API · Automation',
    body: [
      'Asisten AI pribadi terinspirasi JARVIS-nya Iron Man: perintah suara → diproses LLM → eksekusi otomasi (buka app, jawab pertanyaan, ingat konteks).',
      'Masih terus dikembangkan. Target berikutnya: integrasi smart-home dan memori jangka panjang.',
    ],
  },
  'AI & Cybersecurity': {
    role: 'Eksperimen & Riset',
    year: '2026',
    stack: 'OWASP · Tooling · Linux',
    body: [
      'Kumpulan eksperimen keamanan: memahami OWASP Top 10 lewat praktik di lab virtual, hardening Linux, dan mencatat temuan ala write-up CTF.',
      'Belajar menyerang (di lingkungan legal) supaya tahu cara bertahan — mindset yang saya bawa ke setiap web yang saya bangun.',
    ],
  },
};

const FALLBACK = {
  role: 'Desain + Development',
  year: '2025',
  stack: 'React · Tailwind CSS',
  body: [],
};

/**
 * Modal detail proyek — bottom-sheet di HP, kartu di desktop.
 */
export default function ProjectModal({ project, index, onClose }) {
  const d = DETAILS[project.title] || FALLBACK;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div className="modal-backdrop absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detail ${project.title}`}
        className="modal-panel relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[44px] border border-line bg-paper sm:rounded-[44px]"
      >
        {/* cover */}
        <div className="relative m-3 overflow-hidden rounded-[32px] bg-paper2 sm:m-4">
          <img
            src={COVERS_SAFE[project.title] || '/projects/studio-elevate.png'}
            alt={project.title}
            className="aspect-[16/9] w-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Tutup detail"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-lg backdrop-blur transition hover:bg-ink hover:text-paper"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-10 sm:px-10 sm:pb-12">
          <p className="tech-label">PROYEK {String(index + 1).padStart(2, '0')} / 06</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            {project.title} <span className="font-serif font-light italic text-ink3">— detail.</span>
          </h3>

          {/* meta */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-5">
            {[
              ['PERAN', d.role],
              ['TAHUN', d.year],
              ['STACK', d.stack],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="tech-label text-[9px]!">{k}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink2 sm:text-sm">{v}</p>
              </div>
            ))}
          </div>

          {/* cerita */}
          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-ink2 sm:text-base">
            <p>{project.description}</p>
            {d.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={project.repo_url || GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,107,255,.3)] transition hover:bg-accent2"
            >
              Lihat Kode <ArrowUpRight size={14} />
            </a>
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-medium transition hover:bg-ink hover:text-paper"
              >
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* cover map — sama dengan Projects.jsx */
const COVERS_SAFE = {
  'Studio Elevate': '/projects/studio-elevate.png',
  'BuildLight Studio': '/projects/buildlight.png',
  'OMEN Crypto Monitor': '/projects/omen-crypto.png',
  "God's Eye View": '/projects/gods-eye.png',
  'MARK-XLVI / JARVIS': '/projects/jarvis.png',
  'AI & Cybersecurity': '/projects/cyber.png',
};
