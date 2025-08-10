import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const wsRef = useRef(null)

  useEffect(() => {
    const url = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace('http', 'ws') + '/ws/chat'
    const ws = new WebSocket(url)
    wsRef.current = ws
    ws.onmessage = (e) => setMessages((m) => [...m, e.data])
    return () => ws.close()
  }, [])

  function send() {
    if (!input) return
    wsRef.current?.send(input)
    setInput('')
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="flex items-center gap-3 mb-4">
        <img src="/images/chat-illustration.svg" alt="Chat illustration" className="h-12" />
        <div className="text-2xl font-semibold">Realtime Chat (demo)</div>
      </div>
      <div className="h-64 overflow-y-auto rounded-lg bg-white/5 border border-white/10 p-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm text-neutral-200">{m}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Type a message" />
        <button onClick={send} className="rounded-lg bg-brand-500 px-4 py-2">Send</button>
      </div>
    </div>
  )
}
