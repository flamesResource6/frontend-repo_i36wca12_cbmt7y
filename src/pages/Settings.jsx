import React from 'react'

export default function Settings({ theme }) {
  const { mode, setMode } = theme
  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-6 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow-xl`}>
        <h3 className="text-lg font-semibold">Settings</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Appearance</p>
              <p className="text-sm text-slate-500">Toggle Light and Dark mode</p>
            </div>
            <button onClick={()=>setMode(mode==='dark'?'light':'dark')} className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800">{mode==='dark'?'Switch to Light':'Switch to Dark'}</button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Security</p>
              <p className="text-sm text-slate-500">2FA, RBAC, and backups</p>
            </div>
            <button className="px-3 py-1.5 rounded-md bg-[#1E3A8A] text-white">Manage</button>
          </div>
        </div>
      </div>
    </div>
  )
}
