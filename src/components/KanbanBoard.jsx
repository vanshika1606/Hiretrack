import { useState } from 'react'

const columns = [
  { id: 'applied', label: 'Applied', emoji: '📨', color: '#60a5fa', bg: 'rgba(96,165,250,0.05)', border: 'rgba(96,165,250,0.12)', glow: 'rgba(96,165,250,0.15)' },
  { id: 'interview', label: 'Interview', emoji: '🎯', color: '#fbbf24', bg: 'rgba(251,191,36,0.05)', border: 'rgba(251,191,36,0.12)', glow: 'rgba(251,191,36,0.15)' },
  { id: 'offer', label: 'Offer', emoji: '🎉', color: '#34d399', bg: 'rgba(52,211,153,0.05)', border: 'rgba(52,211,153,0.12)', glow: 'rgba(52,211,153,0.15)' },
  { id: 'rejected', label: 'Rejected', emoji: '❌', color: '#f87171', bg: 'rgba(248,113,113,0.05)', border: 'rgba(248,113,113,0.12)', glow: 'rgba(248,113,113,0.15)' },
]

function Avatar({ name }) {
  const initials = name.slice(0, 2).toUpperCase()
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0" style={{background: color}}>
      {initials}
    </div>
  )
}

function JobCard({ job, col, onDelete, onStatusChange, onNotesChange }) {
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className="rounded-xl p-4 flex flex-col gap-3 group transition-all duration-200 hover:scale-[1.02]"
      style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)'}}>
      <div className="flex items-start gap-3">
        <Avatar name={job.company} />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{job.role}</h3>
          <p className="text-xs mt-0.5 truncate" style={{color: 'rgba(255,255,255,0.4)'}}>{job.company}</p>
        </div>
        <button onClick={() => onDelete(job.id)}
          className="opacity-0 group-hover:opacity-100 transition-all text-xs shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
          style={{color: '#f87171', background: 'rgba(248,113,113,0.1)'}}>✕</button>
      </div>
      {job.date && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">📅</span>
          <span className="text-[10px]" style={{color: 'rgba(255,255,255,0.25)'}}>{job.date}</span>
        </div>
      )}
      <select value={job.status} onChange={(e) => onStatusChange(job.id, e.target.value)}
        className="w-full text-xs px-3 py-2 rounded-lg focus:outline-none font-medium"
        style={{background: 'rgba(255,255,255,0.05)', border: `1px solid ${col.border}`, color: col.color}}>
        <option value="applied">📨 Applied</option>
        <option value="interview">🎯 Interview</option>
        <option value="offer">🎉 Offer</option>
        <option value="rejected">❌ Rejected</option>
      </select>
      <button onClick={() => setShowNotes(!showNotes)}
        className="text-[10px] text-left flex items-center gap-1 transition-all"
        style={{color: 'rgba(255,255,255,0.25)'}}>
        <span>{showNotes ? '▲' : '▼'}</span>
        <span>{job.notes ? 'View notes' : 'Add notes'}</span>
        {job.notes && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 ml-1" />}
      </button>
      {showNotes && (
        <textarea rows={2} value={job.notes || ''} onChange={e => onNotesChange(job.id, e.target.value)}
          placeholder="Add notes, links, contacts..."
          className="w-full text-xs px-3 py-2 rounded-lg resize-none focus:outline-none text-white/60 placeholder-white/15"
          style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}} />
      )}
    </div>
  )
}

function KanbanBoard({ jobs, onDelete, onStatusChange, onNotesChange }) {
  return (
    <div className="grid grid-cols-4 gap-4 px-6 pb-6" style={{minHeight: 'calc(100vh - 280px)'}}>
      {columns.map(col => {
        const colJobs = jobs.filter(job => job.status === col.id)
        return (
          <div key={col.id} className="rounded-2xl p-4 flex flex-col gap-3"
            style={{background: col.bg, border: `1px solid ${col.border}`}}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span>{col.emoji}</span>
                <span className="text-sm font-bold" style={{color: col.color}}>{col.label}</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full" style={{background: col.glow, color: col.color}}>{colJobs.length}</span>
            </div>
            {colJobs.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-8 opacity-30">
                <span className="text-3xl mb-2">{col.emoji}</span>
                <p className="text-xs text-center" style={{color: col.color}}>No jobs here yet</p>
              </div>
            )}
            {colJobs.map(job => (
              <JobCard key={job.id} job={job} col={col} onDelete={onDelete} onStatusChange={onStatusChange} onNotesChange={onNotesChange} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard