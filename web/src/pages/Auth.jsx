import { useState } from 'react'
import { api } from '../services/apiClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = mode === 'login' ? await api.login(email, password) : await api.signup(email, password)
      localStorage.setItem('access_token', res.access_token)
      window.location.href = '/projects'
    } catch (e) {
      setError('Authentication failed')
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h1>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input type="email" placeholder="Email" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="rounded-lg bg-brand-500 px-4 py-2">{mode === 'login' ? 'Login' : 'Sign up'}</button>
        <button type="button" className="text-sm text-neutral-300" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Login'}
        </button>
      </form>
    </div>
  )
}
