import { useEffect, useState } from 'react'
import { api, ai } from '../services/apiClient'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'

export default function Projects() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.health().catch(() => {})
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const data = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/v1/projects').then(r => r.json())
      setItems(data)
    } catch {}
  }

  async function createProject(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.createProject({ title, description: desc, tags: [] })
      setTitle(''); setDesc('')
      await fetchProjects()
    } finally {
      setLoading(false)
    }
  }

  async function suggest() {
    const res = await ai.generateDescription(`Write a short, catchy project description for: ${title}`)
    setDesc(res.content)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-6">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <img src="/images/projects-empty.svg" alt="Empty projects illustration" className="h-20 opacity-80" />
      </div>

      <div className="mt-6">
        <SearchBar onResults={setItems} />
      </div>

      <form onSubmit={createProject} className="mt-6 grid gap-3">
        <input className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" rows="4" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <div className="flex gap-3">
          <button disabled={loading} className="rounded-lg bg-brand-500 px-4 py-2">Create</button>
          <button type="button" onClick={suggest} className="rounded-lg bg-white/5 border border-white/10 px-4 py-2">AI suggest</button>
        </div>
      </form>

      <div className="mt-6 grid gap-4">
        {items.map(p => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="font-semibold">{p.title}</div>
            <div className="text-neutral-300 text-sm">{p.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
