import React from 'react'

export default function Transactions({ theme }) {
  const { mode } = theme
  return (
    <div className={`rounded-2xl p-6 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow-xl`}>
      <h3 className="text-lg font-semibold">Transactions</h3>
      <p className="mt-2 text-slate-500">Borrow, return, and renew records appear here. Integrates due dates, statuses, and fines.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({length:6}).map((_,i)=> (
          <div key={i} className={`h-24 rounded-xl ${mode==='dark'?'bg-slate-800':'bg-slate-100'}`} />
        ))}
      </div>
    </div>
  )
}
