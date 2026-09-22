/**
 * api.js — helper memanggil backend.
 * Dev: Vite proxy /api → localhost:3001 · Prod satu domain · Vercel: set env VITE_API_URL.
 */
const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || 'Terjadi kesalahan. Coba lagi.');
    err.status = res.status;
    err.fields = json.errors || null;
    throw err;
  }
  return json;
}

// ---------- PUBLIC ----------
export const fetchProjects = () => request('/api/projects');

export function sendContact({ name, email, message }) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  });
}

// ---------- ADMIN ----------
export function adminLogin(password) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

const authed = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const fetchMessages = (token) =>
  request('/api/admin/messages', { headers: authed(token) });

export const markMessageRead = (token, id) =>
  request(`/api/admin/messages/${id}/read`, { method: 'PATCH', headers: authed(token) });

export const deleteMessage = (token, id) =>
  request(`/api/admin/messages/${id}`, { method: 'DELETE', headers: authed(token) });

export const createProject = (token, body) =>
  request('/api/admin/projects', { method: 'POST', headers: authed(token), body: JSON.stringify(body) });

export const updateProject = (token, id, body) =>
  request(`/api/admin/projects/${id}`, { method: 'PUT', headers: authed(token), body: JSON.stringify(body) });

export const deleteProject = (token, id) =>
  request(`/api/admin/projects/${id}`, { method: 'DELETE', headers: authed(token) });
