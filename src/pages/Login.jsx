import React, { useState } from 'react'
import { LogIn } from 'lucide-react'

export default function Login({ theme }) {
  const { mode, setMode } = theme
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('libvault-token', data.token)
      localStorage.setItem('libvault-user', JSON.stringify(data.user))
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen grid place-items-center ${mode === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      <div className={`w-full max-w-md rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-slate-900/70 border border-slate-800' : 'bg-white border border-slate-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg" />
            <div>
              <p className="text-xs tracking-widest uppercase text-slate-500">LibVault</p>
              <h1 className="text-xl font-semibold">Welcome back</h1>
            </div>
          </div>
          <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} className="px-3 py-1.5 rounded-md text-sm bg-slate-100 dark:bg-white/10 dark:text-white">{mode === 'dark' ? 'Light' : 'Dark'}</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@library.com" className="mt-1 w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] dark:bg-slate-800 dark:border-slate-700" />
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="••••••••" className="mt-1 w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] dark:bg-slate-800 dark:border-slate-700" />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-md hover:brightness-110 transition">
            <LogIn className="h-4 w-4" /> {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-xs text-slate-500">Demo: any email/password works</p>
        </form>
      </div>
    </div>
  )
}
