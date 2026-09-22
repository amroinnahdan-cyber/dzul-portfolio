import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  adminLogin, fetchMessages, markMessageRead, deleteMessage,
  fetchProjects, createProject, updateProject, deleteProject,
} from '../api.js';

const TOKEN_KEY = 'portfolio_admin_token';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [authError, setAuthError] = useState('');

  function handleAuthError(err) {
    if (err.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setAuthError('Sesi habis. Silakan login ulang.');
      return true;
    }
    return false;
  }

  if (!token) {
    return (
      <Login
        onLogin={(t) => {
          sessionStorage.setItem(TOKEN_KEY, t);
          setToken(t);
          setAuthError('');
        }}
        authError={authError}
      />
    );
  }

  return (
    <Dashboard
      token={token}
      onAuthError={handleAuthError}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

/* ================= LOGIN ================= */
function Login({ onLogin, authError }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(password);
      onLogin(res.token);
    } catch (err) {
      setError(err.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper2 px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 block text-center font-head text-2xl font-semibold tracking-tight">
          Dzul Amroin<span className="text-goldbright">.</span>
        </Link>
        <form
          onSubmit={submit}
          className="rounded-3xl border border-line bg-paper p-8 shadow-[0_30px_70px_rgba(23,19,9,.08)]"
        >
          <h1 className="font-head text-xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1.5 text-sm text-ink2">Masukkan password admin untuk melanjutkan.</p>
          <input
            type="password"
            className="input mt-6"
            placeholder="Password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="mt-2.5 text-sm font-medium text-red-500">✕ {error}</p>}
          {authError && <p className="mt-2.5 text-sm font-medium text-amber-600">⚠ {authError}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 w-full rounded-full bg-ink py-3 font-semibold text-paper transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Memeriksa...' : 'Login'}
          </button>
          <p className="mt-4 text-center text-xs text-ink3">
            Default password dev: <code className="rounded bg-paper2 px-1.5 py-0.5">admin123</code>
          </p>
        </form>
        <Link to="/" className="mt-6 block text-center text-sm text-ink3 underline underline-offset-4 hover:text-gold">
          ← Kembali ke portofolio
        </Link>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */
function Dashboard({ token, onLogout, onAuthError }) {
  const [tab, setTab] = useState('messages'); // messages | projects
  const [unread, setUnread] = useState(0);

  return (
    <div className="min-h-screen bg-paper2">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="font-head text-lg font-semibold tracking-tight">
            Dzul Amroin<span className="text-goldbright">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink2 sm:block">
              Admin Mode
            </span>
            <button
              onClick={onLogout}
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex gap-2">
          <TabButton active={tab === 'messages'} onClick={() => setTab('messages')}>
            Pesan Masuk
          </TabButton>
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')}>
            Kelola Proyek
          </TabButton>
        </div>

        {tab === 'messages' ? (
          <MessagesTab token={token} onAuthError={onAuthError} setUnread={setUnread} />
        ) : (
          <ProjectsTab token={token} onAuthError={onAuthError} />
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
        active ? 'bg-ink text-paper' : 'border border-line bg-paper text-ink2 hover:border-goldbright'
      }`}
    >
      {children}
    </button>
  );
}

/* ================= TAB: PESAN ================= */
function MessagesTab({ token, onAuthError, setUnread }) {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await fetchMessages(token);
      setMessages(res.data);
      setUnread(res.unread);
    } catch (err) {
      if (!onAuthError(err)) setError(err.message);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function handleRead(id) {
    try {
      await markMessageRead(token, id);
      load();
    } catch (err) { onAuthError(err); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus pesan ini?')) return;
    try {
      await deleteMessage(token, id);
      load();
    } catch (err) { onAuthError(err); }
  }

  if (error) return <p className="text-sm font-medium text-red-500">✕ {error}</p>;
  if (!messages) return <Skeleton rows={3} />;

  if (messages.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-paper p-14 text-center">
        <p className="font-head text-lg font-semibold">Belum ada pesan</p>
        <p className="mt-2 text-sm text-ink2">
          Pesan dari form kontak di halaman utama akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {messages.map((m) => (
        <article
          key={m.id}
          className={`rounded-2xl border bg-paper p-6 ${m.read ? 'border-line' : 'border-goldbright shadow-[0_14px_36px_rgba(23,19,9,.08)]'}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {!m.read && <span className="h-2 w-2 rounded-full bg-goldbright" />}
              <b className="text-[15px] font-semibold">{m.name}</b>
              <a href={`mailto:${m.email}`} className="text-sm text-ink3 underline underline-offset-2">
                {m.email}
              </a>
            </div>
            <span className="text-xs text-ink3">
              {new Date(m.created_at + 'Z').toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-[14.5px] leading-relaxed text-ink2">{m.message}</p>
          <div className="mt-4 flex gap-2">
            {!m.read && (
              <button
                onClick={() => handleRead(m.id)}
                className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold transition hover:border-goldbright hover:text-gold"
              >
                Tandai dibaca
              </button>
            )}
            <button
              onClick={() => handleDelete(m.id)}
              className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
            >
              Hapus
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ================= TAB: PROYEK ================= */
const emptyForm = { title: '', category: '', year: '', description: '', tags: '', repo_url: '', demo_url: '' };

function ProjectsTab({ token, onAuthError }) {
  const [projects, setProjects] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      setError('Gagal memuat proyek: ' + err.message);
    }
  }

  useEffect(() => { load(); }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      title: p.title, category: p.category, year: p.year,
      description: p.description, tags: p.tags.join(', '),
      repo_url: p.repo_url || '', demo_url: p.demo_url || '',
    });
    setMsg(''); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(''); setError('');
    const body = {
      title: form.title,
      category: form.category,
      year: form.year,
      description: form.description,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      repo_url: form.repo_url.trim(),
      demo_url: form.demo_url.trim(),
    };
    try {
      if (editingId) {
        await updateProject(token, editingId, body);
        setMsg('✓ Proyek diperbarui.');
      } else {
        await createProject(token, body);
        setMsg('✓ Proyek baru ditambahkan.');
      }
      resetForm();
      load();
    } catch (err) {
      if (!onAuthError(err)) setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Hapus proyek ini dari database?')) return;
    try {
      await deleteProject(token, id);
      if (editingId === id) resetForm();
      load();
    } catch (err) { onAuthError(err); }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* Form tambah/edit */}
      <form onSubmit={submit} className="h-fit rounded-3xl border border-line bg-paper p-7 lg:sticky lg:top-6">
        <h2 className="font-head text-lg font-semibold tracking-tight">
          {editingId ? `Edit Proyek #${editingId}` : 'Tambah Proyek Baru'}
        </h2>

        <div className="mt-5 space-y-3.5">
          <input className="input" placeholder="Judul proyek *" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-3.5">
            <input className="input" placeholder="Kategori" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="input" placeholder="Tahun" value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <textarea className="input resize-none" rows={5} placeholder="Deskripsi singkat"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" placeholder="Tags — pisahkan dengan koma (React, Tailwind...)"
            value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <input className="input" placeholder="Link repo GitHub (opsional)"
            value={form.repo_url} onChange={(e) => setForm({ ...form, repo_url: e.target.value })} />
          <input className="input" placeholder="Link demo/live (opsional)"
            value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} />
        </div>

        {msg && <p className="mt-3 text-sm font-medium text-emerald-600">{msg}</p>}
        {error && <p className="mt-3 text-sm font-medium text-red-500">✕ {error}</p>}

        <div className="mt-5 flex gap-2">
          <button type="submit" disabled={saving || !form.title.trim()}
            className="flex-1 rounded-full bg-ink py-3 text-sm font-semibold text-paper transition hover:opacity-90 disabled:opacity-50">
            {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Proyek'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}
              className="rounded-full border border-line px-5 text-sm font-semibold text-ink2 transition hover:border-goldbright">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Daftar proyek */}
      <div>
        {!projects ? (
          <Skeleton rows={3} />
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-paper p-5">
                <div className="min-w-0">
                  <b className="font-head text-[15px] font-semibold">{p.title}</b>
                  <span className="ml-2 text-xs text-ink3">#{p.id} · {p.category} · {p.year}</span>
                  <p className="mt-1 line-clamp-2 text-sm text-ink2">{p.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink2">{t}</span>
                    ))}
                  </div>
                  {(p.repo_url || p.demo_url) && (
                    <p className="mt-1.5 text-[11px] text-ink3">
                      {p.demo_url && <span className="mr-3">↗ {p.demo_url}</span>}
                      {p.repo_url && <span>⌥ {p.repo_url}</span>}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <button onClick={() => startEdit(p)}
                    className="rounded-full border border-line px-3.5 py-1 text-xs font-semibold transition hover:border-goldbright hover:text-gold">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    className="rounded-full border border-red-200 px-3.5 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Skeleton({ rows = 3 }) {
  return (
    <div className="space-y-3.5">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-paper" />
      ))}
    </div>
  );
}
