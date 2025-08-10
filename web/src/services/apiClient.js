const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const AI_AGENT_BASE = import.meta.env.VITE_AI_AGENT_URL || 'http://localhost:8081'
const MEDIA_BASE = import.meta.env.VITE_MEDIA_SERVICE_URL || 'http://localhost:8082'

function getToken() {
  return localStorage.getItem('access_token')
}

async function request(base, path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const api = {
  health: () => request(API_BASE, '/health'),
  createProject: (payload) => request(API_BASE, '/api/v1/projects', { method: 'POST', body: JSON.stringify(payload) }),
  signup: (email, password) => request(API_BASE, '/api/v1/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email, password) => request(API_BASE, '/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  searchProjects: ({ q, tags = [], sort = 'new', limit = 20, offset = 0 } = {}) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (sort) params.set('sort', sort)
    params.set('limit', String(limit))
    params.set('offset', String(offset))
    tags.forEach(t => params.append('tags', t))
    return request(API_BASE, `/api/v1/projects?${params.toString()}`)
  },
}

export const ai = {
  generateDescription: (prompt) => request(AI_AGENT_BASE, '/api/v1/ai/generate-description', { method: 'POST', body: JSON.stringify({ prompt }) }),
}

export const media = {
  presign: () => request(MEDIA_BASE, '/api/v1/uploads/presign', { method: 'POST' }),
}
