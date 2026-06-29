import { useState } from 'react'

const columns = [
  { id: 'applied', label: 'Applied', emoji: '📨', color: '#60a5fa', bg: 'rgba(96,165,250,0.05)', border: 'rgba(96,165,250,0.12)' },
  { id: 'interview', label: 'Interview', emoji: '🎯', color: '#fbbf24', bg: 'rgba(251,191,36,0.05)', border: 'rgba(251,191,36,0.12)' },
  { id: 'offer', label: 'Offer', emoji: '🎉', color: '#34d399', bg: 'rgba(52,211,153,0.05)', border: 'rgba(52,211,153,0.12)' },
  { id: 'rejected', label: 'Rejected', emoji: '❌', color: '#f87171', bg: 'rgba(248,113,113,0.05)', border: 'rgba(248,113,113,0.12)' },
]

function JobCard({ job, col, onDelete, onStatusChange, onNotesChange }) {
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className="rounded-xl p-4 flex flex-col gap-3 group transition-all hover:scale-[1.02]"
      style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm">{job.role}</h3>
          <p className="text-xs mt-0.5" style={{color: 'rgba(255,255,255,0.4)'}}>{job.company}</p>
          {job.date && (
            <p className="text-[10px] mt-1" style={{color: 'rgba(255,255,255,0.25)'}}>📅 {job.date}</p>
          )}
        </div>
        <button onClick={() => onDelete(job.id)}
          className="opacity-0 group-hover:opacity-100 transition-all text-xs"
          style={{color: 'rgba(248,113,113,0.6)'}}>✕</button>
      </div>
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value)}
        className="w-full text-xs px-3 py-1.5 rounded-lg focus:outline-none"
        style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: col.color}}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <button onClick={() => setShowNotes(!showNotes)}
        className="text-[10px] text-left transition-all"
        style={{color: 'rgba(255,255,255,0.3)'}}>
        {showNotes ? '▲ Hide notes' : '▼ Add notes'}
      </button>
      {showNotes && (
        <textarea
          rows={2}
          value={job.notes || ''}
          onChange={e => onNotesChange(job.id, e.target.value)}
          placeholder="Add notes..."
          className="w-full text-xs px-3 py-2 rounded-lg resize-none focus:outline-none placeholder-white/20 text-white/60"
          style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}}
        />
      )}
    </div>
  )
}

function KanbanBoard({ jobs, onDelete, onStatusChange, onNotesChange }) {
  return (
    <div className="grid grid-cols-4 gap-4 px-6 pb-6">
      {columns.map(col => {
        const colJobs = jobs.filter(job => job.status === col.id)
        return (
          <div key={col.id} className="rounded-2xl p-4 flex flex-col gap-3"
            style={{background: col.bg, border: `1px solid ${col.border}`, minHeight: '200px'}}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span>{col.emoji}</span>
                <span className="text-sm font-bold" style={{color: col.color}}>{col.label}</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{background: col.border, color: col.color}}>{colJobs.length}</span>
            </div>
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