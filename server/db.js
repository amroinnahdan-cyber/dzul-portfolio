/**
 * db.js — Lapisan database (SQLite via better-sqlite3)
 *
 * File database tersimpan di server/data/portfolio.db (dibuat otomatis,
 * berisi seed 6 proyek awal).
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(__dirname, 'data'), { recursive: true });

const db = new Database(join(__dirname, 'data', 'portfolio.db'));
db.pragma('journal_mode = WAL');

// ============ SKEMA ============
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    category    TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    year        TEXT NOT NULL DEFAULT '',
    tags        TEXT NOT NULL DEFAULT '[]',   -- JSON string
    repo_url    TEXT NOT NULL DEFAULT '',
    demo_url    TEXT NOT NULL DEFAULT '',
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL,
    read       INTEGER NOT NULL DEFAULT 0,     -- 0 = belum dibaca, 1 = sudah
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ============ SEED: proyek awal ============
const seedProjects = [
  {
    title: 'Studio Elevate',
    category: 'Branding & Web Concept',
    year: '2026',
    description:
      'Konsep brand dan company profile digital untuk creative agency yang berfokus pada content marketing, social media, dan visual content. Mencakup eksplorasi identitas visual serta konsep website premium, modern, dan interaktif — dikembangkan dari referensi lalu dimodifikasi untuk mengeksplorasi desain dan implementasi frontend.',
    tags: ['Branding', 'Company Profile', 'Visual Design', 'Frontend'],
  },
  {
    title: 'BuildLight Studio',
    category: 'Website Concept',
    year: '2026',
    description:
      'Konsep website untuk lighting studio dengan pendekatan visual premium dan elegan. Dibangun menggunakan React, Vite, Tailwind CSS, React Router, dan Framer Motion dengan fokus pada responsive design, user experience, animasi, dan visual storytelling.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'OMEN Crypto Monitor',
    category: 'AI Experiment',
    year: '2026',
    description:
      'Eksperimen konsep AI-powered crypto monitoring assistant untuk memantau aset cryptocurrency seperti BTC, ETH, BNB, dan SOL. Mengeksplorasi integrasi API, data monitoring, automated alerts, Telegram bot, dan penggunaan AI sebagai assistant untuk menganalisis informasi pasar.',
    tags: ['AI Assistant', 'API Integration', 'Telegram Bot', 'Automation'],
  },
  {
    title: "God's Eye View",
    category: '3D & Geospatial',
    year: '2026',
    description:
      'Eksperimen pengembangan aplikasi web berbasis visualisasi 3D dan geospatial technology. Menjadi media pembelajaran untuk memahami implementasi teknologi 3D pada web, konfigurasi API, serta modifikasi dan pengembangan dari proyek yang sudah tersedia.',
    tags: ['3D Visualization', 'Geospatial', 'Web API'],
  },
  {
    title: 'MARK-XLVI / JARVIS',
    category: 'AI Agent Experiment',
    year: '2026',
    description:
      'Eksperimen mempelajari konsep AI assistant, AI agents, memory system, planning, dan automation. Dikembangkan dengan memanfaatkan referensi serta komponen yang sudah tersedia, lalu dimodifikasi sebagai sarana memahami arsitektur AI assistant dan workflow automation.',
    tags: ['AI Agents', 'Memory System', 'Planning', 'Automation'],
  },
  {
    title: 'AI & Cybersecurity',
    category: 'Security Research',
    year: '2026',
    description:
      'Kumpulan eksperimen untuk mempelajari penggunaan AI dalam software analysis dan cybersecurity. Eksplorasi mencakup AI-assisted security testing, API, automation, serta pemahaman terhadap potensi kelemahan dan keamanan aplikasi web.',
    tags: ['Cybersecurity', 'AI Analysis', 'Security Testing'],
  },
];

const count = db.prepare('SELECT COUNT(*) AS n FROM projects').get().n;
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO projects (title, category, description, year, tags) VALUES (?, ?, ?, ?, ?)'
  );
  for (const p of seedProjects) {
    insert.run(p.title, p.category, p.description, p.year, JSON.stringify(p.tags));
  }
  console.log('[db] Seed 6 proyek awal ✓');
}

// ============ HELPERS ============
function rowToProject(row) {
  return { ...row, tags: JSON.parse(row.tags || '[]') };
}

export function getProjects() {
  return db.prepare('SELECT * FROM projects ORDER BY id ASC').all().map(rowToProject);
}

export function getProject(id) {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  return row ? rowToProject(row) : null;
}

export function createProject({ title, category, description, year, tags, repo_url, demo_url }) {
  const info = db
    .prepare(
      'INSERT INTO projects (title, category, description, year, tags, repo_url, demo_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(title, category ?? '', description ?? '', year ?? '', JSON.stringify(tags ?? []), repo_url ?? '', demo_url ?? '');
  return getProject(info.lastInsertRowid);
}

export function updateProject(id, data) {
  const existing = getProject(id);
  if (!existing) return null;
  const d = data ?? {};
  db.prepare(
    'UPDATE projects SET title = ?, category = ?, description = ?, year = ?, tags = ?, repo_url = ?, demo_url = ? WHERE id = ?'
  ).run(
    d.title ?? existing.title,
    d.category ?? existing.category,
    d.description ?? existing.description,
    d.year ?? existing.year,
    JSON.stringify(d.tags ?? existing.tags),
    d.repo_url ?? existing.repo_url,
    d.demo_url ?? existing.demo_url,
    id
  );
  return getProject(id);
}

export function deleteProject(id) {
  return db.prepare('DELETE FROM projects WHERE id = ?').run(id).changes > 0;
}

export function addMessage({ name, email, message }) {
  const info = db
    .prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)')
    .run(name, email, message);
  return db.prepare('SELECT * FROM messages WHERE id = ?').get(info.lastInsertRowid);
}

export function getMessages() {
  return db.prepare('SELECT * FROM messages ORDER BY read ASC, id DESC').all();
}

export function markMessageRead(id) {
  return db.prepare('UPDATE messages SET read = 1 WHERE id = ?').run(id).changes > 0;
}

export function deleteMessage(id) {
  return db.prepare('DELETE FROM messages WHERE id = ?').run(id).changes > 0;
}

export function unreadCount() {
  return db.prepare('SELECT COUNT(*) AS n FROM messages WHERE read = 0').get().n;
}
