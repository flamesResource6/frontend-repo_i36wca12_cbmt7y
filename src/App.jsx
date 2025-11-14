import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'

function useTheme() {
  const [mode, setMode] = useState(() => localStorage.getItem('libvault-theme') || 'dark')
  useEffect(() => {
    localStorage.setItem('libvault-theme', mode)
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])
  return { mode, setMode }
}

function App() {
  const { mode, setMode } = useTheme()
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  const theme = useMemo(() => ({ mode, setMode }), [mode, setMode])

  return (
    <div className={`
      min-h-screen w-full transition-colors duration-300
      ${mode === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}
    `}>
      <React.Suspense fallback={
        <div className="min-h-screen grid place-items-center">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading LibVault…</span>
          </div>
        </div>
      }>
        {isAuthPage ? (
          <Login theme={theme} />
        ) : (
          <Layout theme={theme}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard theme={theme} />} />
              <Route path="/books" element={<Books theme={theme} />} />
              <Route path="/transactions" element={<Transactions theme={theme} />} />
              <Route path="/users" element={<Users theme={theme} />} />
              <Route path="/reports" element={<Reports theme={theme} />} />
              <Route path="/ai" element={<AIAssistant theme={theme} />} />
              <Route path="/settings" element={<Settings theme={theme} />} />
            </Routes>
          </Layout>
        )}
      </React.Suspense>
    </div>
  )
}

export default App
