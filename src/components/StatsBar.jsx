function StatsBar({ jobs, onSearch }) {
  const total = jobs.length
  const applied = jobs.filter(j => j.status === 'applied').length
  const interview = jobs.filter(j => j.status === 'interview').length
  const offer = jobs.filter(j => j.status === 'offer').length
  const rejected = jobs.filter(j => j.status === 'rejected').length

  const stats = [
    { label: 'Total', value: total, color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
    { label: 'Applied', value: applied, color: '#60a5fa', glow: 'rgba(96,165,250,0.3)' },
    { label: 'Interview', value: interview, color: '#fbbf24', glow: 'rgba(251,191,36,0.3)' },
    { label: 'Offer', value: offer, color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
    { label: 'Rejected', value: rejected, color: '#f87171', glow: 'rgba(248,113,113,0.3)' },
  ]

  return (
    <div className="px-6 py-4 space-y-3">
      <div className="grid grid-cols-5 gap-3">
        {stats.map(stat => (
          <div key={stat.label}
            className="rounded-2xl p-4 text-center relative overflow-hidden group hover:scale-105 transition-all cursor-default"
            style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all" style={{background: `radial-gradient(circle at center, ${stat.glow.replace('0.3', '0.06')}, transparent 70%)`}} />
            <p className="text-3xl font-black relative z-10" style={{color: stat.color, textShadow: `0 0 20px ${stat.glow}`}}>{stat.value}</p>
            <p className="text-xs mt-1 font-medium relative z-10" style={{color: 'rgba(255,255,255,0.35)'}}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">🔍</span>
        <input
          onChange={e => onSearch(e.target.value)}
          placeholder="Search by role or company..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white/70 focus:outline-none transition-all placeholder-white/20"
          style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}}
        />
      </div>
    </div>
  )
}

export default StatsBar