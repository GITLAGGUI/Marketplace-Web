import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../services/apiClient'

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const [sort, setSort] = useState('new')
  const [loading, setLoading] = useState(false)
  const debounced = useDebouncedValue(query, 400)

  useEffect(() => {
    let aborted = false
    async function run() {
      setLoading(true)
      try {
        const res = await api.searchProjects({ q: debounced, tags: activeTags, sort, limit: 20 })
        if (!aborted) onResults(res)
      } finally {
        if (!aborted) setLoading(false)
      }
    }
    run()
    return () => { aborted = true }
  }, [debounced, activeTags, sort])

  function toggleTag(tag) {
    setActiveTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag])
  }

  const commonTags = useMemo(() => ['design', 'web', 'video', 'code', 'marketing', 'ai'], [])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 rounded-xl bg-neutral-900/70 border border-white/10 px-4 py-2"
          placeholder="Search projects by title or description"
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-xl bg-neutral-900/70 border border-white/10 px-3 py-2">
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {commonTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`rounded-full border px-3 py-1 text-sm ${activeTags.includes(tag) ? 'border-brand-400 bg-brand-500/20' : 'border-white/10 bg-white/5'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-neutral-400">
            Searching…
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
