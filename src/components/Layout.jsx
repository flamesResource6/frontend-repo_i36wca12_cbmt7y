import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Bot, CreditCard, Home, LineChart, Menu, Settings, Shield, Users } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/books', label: 'Books', icon: BookOpen },
  { to: '/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/reports', label: 'Reports', icon: LineChart },
  { to: '/ai', label: 'AI Assistant', icon: Bot },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout({ children, theme }) {
  const location = useLocation()
  const { mode, setMode } = theme

  return (
    <div className="min-h-screen">
      {/* Hero with Spline cover */}
      <div className="relative h-[280px] md:h-[360px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent pointer-events-none" />
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg" />
            <div>
              <p className="text-xs tracking-widest text-white/70 uppercase">LibVault</p>
              <h1 className="text-white text-xl md:text-2xl font-semibold">Library Management Suite</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} className="px-3 py-1.5 rounded-md text-sm bg-white/10 text-white backdrop-blur hover:bg-white/20 transition">{mode === 'dark' ? 'Light' : 'Dark'} Mode</button>
            <button className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition md:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </header>
        <div className="relative z-10 px-6 md:px-10 pt-8 pb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Cinematic, AI‑enhanced Library OS</h2>
          <p className="mt-3 md:mt-4 max-w-3xl text-white/80">Manage collections, circulate books, and unlock insights with summaries, smart search, and recommendations — crafted with modern motion and premium theming.</p>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800/60">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex gap-1 overflow-x-auto">
          {nav.map((item) => {
            const active = location.pathname === item.to
            const Icon = item.icon
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition whitespace-nowrap
                ${active ? 'bg-[#1E3A8A] text-white shadow' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'}`}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 mt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} LibVault by Flames</span>
          <span className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> RBAC • 2FA • Backups</span>
        </div>
      </footer>
    </div>
  )
}
