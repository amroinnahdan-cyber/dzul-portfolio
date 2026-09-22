# Portofolio Dzul Amroin Nahdan ✦

Portofolio full-stack dalam **satu proyek**:

| Bagian   | Teknologi                              | Folder    |
| -------- | -------------------------------------- | --------- |
| Frontend | React 18 + Vite + Tailwind CSS v4      | `client/` |
| Backend  | Node.js + Express + SQLite (better-sqlite3) | `server/` |

Desain: **editorial ala situs award** (terinspirasi Sutéra × Dennis Snellenberg × Cuberto) —
warm off-white, tipografi raksasa (Instrument Sans + serif Bitter + label Bruno Ace SC),
preloader persen, smooth-scroll Lenis, kursor kustom, gambar proyek melayang mengikuti kursor,
footer gelap dengan jam Jakarta live.

---

## 👀 Cara MELIHAT Website

> ⚠️ Ini aplikasi React — **tidak ada file `index.html` yang bisa dibuka langsung**.

1. **Di workspace ini:** minta assistant menjalankan server → buka preview **"API + Website Portofolio"** (port 3001)
2. **Di komputermu:** jalankan perintah di bawah → buka `http://localhost:5173`

## 🚀 Menjalankan di Komputer

> Syarat: Node.js 20+ ([nodejs.org](https://nodejs.org))

```bash
npm run setup   # install root + client + server
npm run dev     # backend + frontend bersamaan
```

| URL                           | Apa                                    |
| ----------------------------- | -------------------------------------- |
| `http://localhost:5173`       | Website portofolio (frontend dev)      |
| `http://localhost:3001`       | API backend                            |
| `http://localhost:5173/admin` | Admin dashboard (password: `admin123`) |

### Build production

```bash
npm run build   # build frontend ke client/dist
npm start       # 1 server: API + frontend di port 3001
```

## ✨ Fitur

- **Halaman portofolio** — hero tipografi raksasa + mask reveal, preloader persen, marquee serif, manifesto word-reveal, fokus editorial bernomor, daftar proyek dengan preview gambar mengikuti kursor, tentang sticky, motto, kontak, footer gelap + jam WIB
- **Proyek dari database** via `GET /api/projects` (backend mati → data cadangan otomatis)
- **Form kontak nyata** — validasi server, simpan SQLite, rate limit 5 pesan/jam/IP, error per-field
- **Admin dashboard** `/admin` — baca/tandai/hapus pesan, tambah/edit/hapus proyek + link repo & demo
- **Font self-hosted** (Instrument Sans + Bitter + Bruno Ace SC di `client/public/fonts/`) — nol Google Fonts
- **Favicon + Open Graph** (`og-image.jpg`) — rapi saat link dibagikan

## 🔐 Konfigurasi (wajib sebelum produksi!)

Buat file `server/.env`:

```env
PORT=3001
ADMIN_PASSWORD=password-rahasia-kamu
SECRET=string-acak-panjang-untuk-token
```

Jalankan dengan env: `cd server && node --env-file=.env index.js`

## 📡 API

| Method | Endpoint                       | Akses  | Fungsi        |
| ------ | ------------------------------ | ------ | ------------- |
| GET    | `/api/projects`                | Publik | Daftar proyek |
| POST   | `/api/contact`                 | Publik | Kirim pesan   |
| POST   | `/api/admin/login`             | Publik | Login → token |
| GET    | `/api/admin/messages`          | Admin  | Semua pesan   |
| PATCH  | `/api/admin/messages/:id/read` | Admin  | Tandai dibaca |
| DELETE | `/api/admin/messages/:id`      | Admin  | Hapus pesan   |
| POST   | `/api/admin/projects`          | Admin  | Tambah proyek |
| PUT    | `/api/admin/projects/:id`      | Admin  | Edit proyek   |
| DELETE | `/api/admin/projects/:id`      | Admin  | Hapus proyek  |

## 🌍 Deploy ke GitHub + Vercel (+ Render untuk backend)

### 1️⃣ Push ke GitHub

**Opsi A — pakai git di komputer** (repo ini sudah berisi commit pertama):

```bash
# buat repo kosong "dzul-portfolio" di github.com/new (TANPA README), lalu:
git remote add origin https://github.com/USERNAME/dzul-portfolio.git
git push -u origin main
```

**Opsi B — tanpa git:** ekstrak `dzul-portfolio.zip` → buka [github.com/new](https://github.com/new)
→ beri nama repo → **drag & drop** seluruh isi folder → Commit.

### 2️⃣ Backend ke Render (agar form kontak & admin hidup online)

1. [render.com](https://render.com) → **New + → Blueprint** → pilih repo GitHub ini
   (file `render.yaml` sudah menyiapkan semuanya)
2. Isi `ADMIN_PASSWORD` → **Create**
3. Salin URL yang jadi, mis. `https://dzul-portfolio-api.onrender.com`

### 3️⃣ Frontend ke Vercel

1. [vercel.com/new](https://vercel.com/new) → **Import** repo GitHub yang sama
2. **Root Directory:** `client` (framework Vite terdeteksi otomatis)
3. **Environment Variables:** `VITE_API_URL` = URL Render dari langkah 2
   *(dikosongkan = frontend jalan tapi form kontak/admin offline, proyek pakai data cadangan)*
4. **Deploy** → selesai! 🎉

> ⚠️ Catatan: SQLite berbasis file — di free tier Render disknya ephemeral (data reset saat
> redeploy). Untuk data permanen, migrasi ke Postgres (Neon/Supabase free tier).

---

Dibuat dengan semangat belajar ✦
