import React, { useState } from 'react'
import { Mic, Send, Sparkles } from 'lucide-react'

export default function AIAssistant({ theme }) {
  const { mode } = theme
  const [input, setInput] = useState('Summarize "The Pragmatic Programmer" in 2 sentences')
  const [output, setOutput] = useState('')
  const [busy, setBusy] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const summarize = async () => {
    setBusy(true)
    try {
      const res = await fetch(`${backend}/api/ai/summary`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: input, max_sentences: 2 })})
      const data = await res.json()
      setOutput(data.summary || '')
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow-xl`}>
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <p className="mt-2 text-slate-500">Summaries, smart search, recommendations, and voice input.</p>
        <div className="mt-4 flex items-center gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} className={`flex-1 px-3 py-2 rounded-md border ${mode==='dark'?'bg-slate-800 border-slate-700':'bg-white border-slate-300'}`} />
          <button onClick={summarize} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#10B981] text-white"><Sparkles className="h-4 w-4"/> Summarize</button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800"><Mic className="h-4 w-4"/> Voice</button>
        </div>
        {output && (
          <div className={`mt-4 p-4 rounded-lg ${mode==='dark'?'bg-slate-800':'bg-slate-50'}`}>
            <p className="text-sm leading-relaxed">{output}</p>
          </div>
        )}
      </div>
    </div>
  )
}
