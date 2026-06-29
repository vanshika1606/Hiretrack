function Analytics({ jobs }) {
  const total = jobs.length
  const applied = jobs.filter(j => j.status === 'applied').length
  const interview = jobs.filter(j => j.status === 'interview').length
  const offer = jobs.filter(j => j.status === 'offer').length
  const rejected = jobs.filter(j => j.status === 'rejected').length
  const responseRate = total > 0 ? Math.round(((interview + offer) / total) * 100) : 0
  const successRate = total > 0 ? Math.round((offer / total) * 100) : 0

  const bars = [
    { label: 'Applied', value: applied, color: '#60a5fa' },
    { label: 'Interview', value: interview, color: '#fbbf24' },
    { label: 'Offer', value: offer, color: '#34d399' },
    { label: 'Rejected', value: rejected, color: '#f87171' },
  ]

  const pieData = [
    { label: 'Applied', value: applied, color: '#60a5fa' },
    { label: 'Interview', value: interview, color: '#fbbf24' },
    { label: 'Offer', value: offer, color: '#34d399' },
    { label: 'Rejected', value: rejected, color: '#f87171' },
  ]

  let cumulative = 0
  const pieSlices = pieData.map(d => {
    const pct = total > 0 ? (d.value / total) * 100 : 0
    const slice = { ...d, pct, offset: cumulative }
    cumulative += pct
    return slice
  })

  return (
    <div className="px-6 py-4 space-y-6">
      <h2 className="text-lg font-black text-white">📊 Analytics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)'}}>
          <p className="text-4xl font-black text-indigo-400">{total}</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.4)'}}>Total Applications</p>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)'}}>
          <p className="text-4xl font-black text-yellow-400">{responseRate}%</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.4)'}}>Response Rate</p>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)'}}>
          <p className="text-4xl font-black text-green-400">{successRate}%</p>
          <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.4)'}}>Offer Rate</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <h3 className="text-sm font-bold text-white mb-4">Application Breakdown</h3>
          <div className="space-y-3">
            {bars.map(bar => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{color: bar.color}}>{bar.label}</span>
                  <span style={{color: 'rgba(255,255,255,0.4)'}}>{bar.value}</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{background: 'rgba(255,255,255,0.05)'}}>
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{width: `${total > 0 ? (bar.value / total) * 100 : 0}%`, background: bar.color}} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <h3 className="text-sm font-bold text-white mb-4">Distribution</h3>
          {total > 0 ? (
            <div className="flex items-center gap-6">
              <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                {pieSlices.map((slice, i) => {
                  if (slice.pct === 0) return null
                  const r = 40, cx = 50, cy = 50
                  const circumference = 2 * Math.PI * r
                  const dashArray = (slice.pct / 100) * circumference
                  const dashOffset = -((slice.offset / 100) * circumference)
                  return (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={slice.color} strokeWidth="20"
                      strokeDasharray={`${dashArray} ${circumference}`} strokeDashoffset={dashOffset} />
                  )
                })}
              </svg>
              <div className="space-y-2">
                {pieData.map(d => (
                  <div key={d.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{background: d.color}} />
                    <span className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>{d.label}: {d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-white/20 text-sm">No data yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics