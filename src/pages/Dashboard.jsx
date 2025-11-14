import React from 'react'
import { BookOpen, Bot, CreditCard, Download, LineChart, Users } from 'lucide-react'

export default function Dashboard({ theme }) {
  const { mode } = theme
  const cards = [
    { title: 'Books', value: '12,438', change: '+4.2%', icon: BookOpen, grad: 'from-sky-400 to-teal-300' },
    { title: 'Active Users', value: '1,204', change: '+1.8%', icon: Users, grad: 'from-emerald-400 to-teal-300' },
    { title: 'Monthly Revenue', value: '$18,920', change: '+9.1%', icon: CreditCard, grad: 'from-indigo-400 to-sky-300' },
    { title: 'AI Queries', value: '3,487', change: '+12.4%', icon: Bot, grad: 'from-cyan-400 to-blue-300' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className={`rounded-2xl p-5 border shadow-lg ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">{c.title}</p>
                  <h3 className="text-2xl font-semibold mt-2">{c.value}</h3>
                </div>
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.grad} grid place-items-center text-slate-900`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-3 text-sm text-emerald-500">{c.change} this month</p>
            </div>
          )
        })}
      </div>

      <div className={`rounded-2xl p-6 border ${mode==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'} shadow-xl`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reports snapshot</h3>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800"><Download className="h-4 w-4"/> Export</button>
        </div>
        <div className="mt-6 h-40 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900" />
        <p className="mt-4 text-sm text-slate-500">Your circulation and revenue performance for the last 30 days.</p>
      </div>
    </div>
  )
}
