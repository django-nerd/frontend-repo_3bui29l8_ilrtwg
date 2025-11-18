import { useEffect, useRef, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ChatUI() {
  const [sessions, setSessions] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/sessions`)
      .then(r => r.json())
      .then(setSessions)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!activeId) return
    fetch(`${API_BASE}/api/sessions/${activeId}/messages`)
      .then(r => r.json())
      .then(setMessages)
      .catch(() => {})
  }, [activeId])

  const makeSession = async () => {
    const title = input.trim() || 'New Session'
    const r = await fetch(`${API_BASE}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    const s = await r.json()
    setSessions(prev => [s, ...prev])
    setActiveId(s.id)
    setMessages([])
  }

  const send = async () => {
    const text = input.trim()
    if (!text || !activeId) return
    setLoading(true)

    const r = await fetch(`${API_BASE}/api/sessions/${activeId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text })
    })
    const data = await r.json()
    setMessages(prev => [...prev, ...data.messages])
    setInput('')
    setLoading(false)
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  return (
    <div className="h-full grid grid-cols-12">
      <aside className="col-span-3 border-r border-white/10 hidden md:block">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-white/80 font-medium">Sessions</span>
          <button onClick={makeSession} className="text-xs px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20">New</button>
        </div>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 52px)' }}>
          {sessions.map(s => (
            <button key={s.id} onClick={() => setActiveId(s.id)} className={`w-full text-left px-3 py-2 text-sm hover:bg-white/5 ${activeId===s.id? 'bg-white/10 text-white' : 'text-white/80'}`}>
              {s.title}
            </button>
          ))}
          {sessions.length===0 && (
            <div className="p-3 text-white/50 text-sm">No sessions yet. Create one to begin.</div>
          )}
        </div>
      </aside>
      <main className="col-span-12 md:col-span-9 flex flex-col h-full">
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <button onClick={makeSession} className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20">New session</button>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about any topic..." className="flex-1 bg-transparent text-white/90 placeholder-white/40 focus:outline-none" />
          <button onClick={activeId? send : makeSession} disabled={loading} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50">{activeId? (loading? 'Thinking...' : 'Send') : 'Start'}</button>
        </div>
        <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {!activeId && (
            <div className="text-white/50 text-sm">Start a session to begin chatting.</div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`w-full ${m.role==='user'? 'justify-end' : 'justify-start'} flex`}>
              <div className={`${m.role==='user'? 'bg-blue-500/80 text-white' : 'bg-white/5 text-white/90'} max-w-[80%] whitespace-pre-wrap px-4 py-3 rounded-lg border border-white/10`}> 
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ChatUI
