import React, { useEffect, useMemo, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'

export default function Books({ theme }) {
  const { mode } = theme
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(b => [b.title, b.author, ...(b.tags||[])].join(' ').toLowerCase().includes(q))
  }, [query, items])

  useEffect(() => {
    // try AI search demo
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch(`${backend}/api/ai/recommend`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ user_id: 'demo' }) })
        const data = await res.json()
        setItems(data.recommendations || [])
      } catch (e) {
      } finally { setLoading(false) }
    })()
  }, [])

  const aiSearch = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/ai/search`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ query })})
      const data = await res.json()
      setItems(data.results || [])
    } catch (e) {}
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow`}>
          <Search className="h-4 w-4 text-slate-500" />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books, authors, tags…" className="flex-1 bg-transparent outline-none" />
          <button onClick={aiSearch} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0EA5E9] text-white text-sm"><Sparkles className="h-4 w-4"/> AI Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? Array.from({length:6}).map((_,i)=> (
          <div key={i} className={`h-32 rounded-xl animate-pulse ${mode==='dark'?'bg-slate-800':'bg-slate-100'}`} />
        )) : filtered.map((b) => (
          <div key={b._id || b.title} className={`rounded-xl p-4 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow`}> 
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="text-sm text-slate-500">{b.author}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md ${b.available!==false? 'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700'}`}>{b.available!==false? 'Available':'Checked out'}</span>
            </div>
            {b.summary && <p className="text-sm mt-2 line-clamp-3 text-slate-600">{b.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
