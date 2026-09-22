/**
 * index.js — Server Express untuk portofolio full-stack
 *
 * ENDPOINTS:
 *  PUBLIC
 *   GET  /api/projects              → daftar proyek
 *   POST /api/contact               → kirim pesan (rate limit 5/jam/IP)
 *   POST /api/admin/login           → login admin, dapat token
 *  PRIVATE (Header: Authorization: Bearer <token>)
 *   GET    /api/admin/messages
 *   PATCH  /api/admin/messages/:id/read
 *   DELETE /api/admin/messages/:id
 *   POST   /api/admin/projects
 *   PUT    /api/admin/projects/:id
 *   DELETE /api/admin/projects/:id
 *
 * Production: server juga menyajikan hasil build frontend dari ../client/dist
 */
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getProjects, getProject, createProject, updateProject, deleteProject,
  addMessage, getMessages, markMessageRead, deleteMessage, unreadCount,
} from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============ KONFIG ============
const PORT = process.env.PORT || 3001;
// ⚠️ Ganti di produksi! Set env: ADMIN_PASSWORD=... dan SECRET=...
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SECRET = process.env.SECRET || 'dev-secret-ganti-di-produksi';
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

const app = express();
app.use(cors());
app.use(express.json({ limit: '100kb' }));

// ============ AUTH (HMAC token sederhana) ============
function signToken(expiresAt) {
  const sig = crypto.createHmac('sha256', SECRET).update(`admin:${expiresAt}`).digest('hex');
  return `${expiresAt}.${sig}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false;
  const [expStr, sig] = token.split('.');
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = crypto.createHmac('sha256', SECRET).update(`admin:${exp}`).digest('hex');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!verifyToken(token)) {
    return res.status(401).json({ ok: false, error: 'Tidak punya akses. Login dulu.' });
  }
  next();
}

// ============ RATE LIMIT /api/contact ============
const contactHits = new Map(); // ip → [timestamps]

function contactRateLimit(req, res, next) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const hits = (contactHits.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= 5) {
    return res.status(429).json({ ok: false, error: 'Terlalu banyak pesan. Coba lagi dalam 1 jam.' });
  }
  hits.push(now);
  contactHits.set(ip, hits);
  next();
}

// ============ ROUTES: PROJECTS (PUBLIC) ============
app.get('/api/projects', (req, res) => {
  res.json({ ok: true, data: getProjects() });
});

app.get('/api/projects/:id', (req, res) => {
  const project = getProject(req.params.id);
  if (!project) return res.status(404).json({ ok: false, error: 'Proyek tidak ditemukan' });
  res.json({ ok: true, data: project });
});

// ============ ROUTES: CONTACT (PUBLIC) ============
app.post('/api/contact', contactRateLimit, (req, res) => {
  const { name, email, message } = req.body ?? {};

  const errors = {};
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Nama wajib diisi (2–100 karakter).';
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    errors.email = 'Format email tidak valid.';
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 2000) {
    errors.message = 'Pesan wajib diisi (5–2000 karakter).';
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const saved = addMessage({
    name: name.trim(),
    email: String(email).trim().toLowerCase(),
    message: message.trim(),
  });
  console.log(`[contact] Pesan baru #${saved.id} dari ${saved.name} <${saved.email}>`);
  res.status(201).json({ ok: true, message: 'Pesan terkirim! Terima kasih.' });
});

// ============ ROUTES: ADMIN ============
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body ?? {};
  if (typeof password !== 'string' || password !== ADMIN_PASSWORD) {
    return setTimeout(() => res.status(401).json({ ok: false, error: 'Password salah.' }), 400);
  }
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  res.json({ ok: true, token: signToken(expiresAt), expiresAt });
});

app.get('/api/admin/messages', requireAdmin, (req, res) => {
  res.json({ ok: true, data: getMessages(), unread: unreadCount() });
});

app.patch('/api/admin/messages/:id/read', requireAdmin, (req, res) => {
  if (!markMessageRead(req.params.id)) return res.status(404).json({ ok: false, error: 'Pesan tidak ditemukan' });
  res.json({ ok: true });
});

app.delete('/api/admin/messages/:id', requireAdmin, (req, res) => {
  if (!deleteMessage(req.params.id)) return res.status(404).json({ ok: false, error: 'Pesan tidak ditemukan' });
  res.json({ ok: true });
});

app.post('/api/admin/projects', requireAdmin, (req, res) => {
  const { title } = req.body ?? {};
  if (!title || typeof title !== 'string' || title.trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Judul proyek wajib diisi (min. 2 karakter).' });
  }
  const project = createProject({ ...req.body, title: title.trim() });
  res.status(201).json({ ok: true, data: project });
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const project = updateProject(req.params.id, req.body ?? {});
  if (!project) return res.status(404).json({ ok: false, error: 'Proyek tidak ditemukan' });
  res.json({ ok: true, data: project });
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  if (!deleteProject(req.params.id)) return res.status(404).json({ ok: false, error: 'Proyek tidak ditemukan' });
  res.json({ ok: true });
});

// ============ STATIC (production) ============
const clientDist = resolve(__dirname, '../client/dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // SPA fallback + no-store agar perubahan frontend langsung terlihat
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(join(clientDist, 'index.html'));
  });
}

// ============ 404 + ERROR HANDLER ============
app.use((req, res) => res.status(404).json({ ok: false, error: 'Endpoint tidak ditemukan' }));

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('[error]', err);
  res.status(500).json({ ok: false, error: 'Terjadi kesalahan di server.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API server berjalan di http://localhost:${PORT}`);
  console.log(`   Admin password: ${ADMIN_PASSWORD === 'admin123' ? 'admin123 (DEFAULT — ganti via env!)' : '(dari env) ✓'}`);
  if (existsSync(clientDist)) console.log(`   Menyajikan frontend dari ${clientDist}`);
});
