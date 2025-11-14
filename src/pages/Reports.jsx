import React from 'react'

export default function Reports({ theme }) {
  const { mode } = theme
  return (
    <div className={`rounded-2xl p-6 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow-xl`}>
      <h3 className="text-lg font-semibold">Reports</h3>
      <p className="mt-2 text-slate-500">Circulation, inventory health, member growth, and revenue reports with export options.</p>
      <div className="mt-6 h-64 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900" />
    </div>
  )
}
