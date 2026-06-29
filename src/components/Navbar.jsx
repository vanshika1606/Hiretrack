function Navbar({ onAddClick, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'board', label: '📋 Board' },
    { id: 'analytics', label: '📊 Analytics' },
    { id: 'tools', label: '🛠️ Tools' },
    { id: 'ai', label: '🤖 AI Match' },
  ]

  return (
    <nav className="px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-2xl" style={{background: 'rgba(6,6,8,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)'}}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)'}}>
          🚀
        </div>
        <div>
          <h1 className="text-sm font-black text-white tracking-wide">HireTrack</h1>
          <p className="text-[10px]" style={{color: 'rgba(255,255,255,0.25)'}}>Your job journey, organized</p>
        </div>
      </div>
      <div className="flex items-center gap-1 px-1 py-1 rounded-xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={activeTab === tab.id ? {background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 0 15px rgba(99,102,241,0.3)'} : {color: 'rgba(255,255,255,0.4)'}}>
            {tab.label}
          </button>
        ))}
      </div>
      <button onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.3)'}}>
        + Add Job
      </button>
    </nav>
  )
}

export default Navbar