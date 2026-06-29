import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import KanbanBoard from './components/KanbanBoard'
import AddJobModal from './components/AddJobModal'
import StatsBar from './components/StatsBar'
import AIMatch from './components/AIMatch'
import Analytics from './components/Analytics'
import Tools from './components/Tools'

const particles = [...Array(50)].map((_, i) => ({
  id: i,
  left: `${Math.floor(Math.random() * 100)}%`,
  top: `${Math.floor(Math.random() * 100)}%`,
  duration: `${2 + Math.floor(Math.random() * 4)}s`,
  delay: `${Math.floor(Math.random() * 4)}s`,
  opacity: Math.random() * 0.3
}))

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs')
    return saved ? JSON.parse(saved) : [
      { id: 1, role: 'Frontend Developer', company: 'Google', status: 'applied', date: '2026-06-20', notes: '' },
      { id: 2, role: 'SDE Intern', company: 'Microsoft', status: 'interview', date: '2026-06-22', notes: '' },
      { id: 3, role: 'React Developer', company: 'Flipkart', status: 'offer', date: '2026-06-25', notes: '' },
    ]
  })
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('board')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])

  const handleAddJob = (newJob) => setJobs([...jobs, newJob])
  const handleDelete = (id) => setJobs(jobs.filter(job => job.id !== id))
  const handleStatusChange = (id, newStatus) => setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job))
  const handleNotesChange = (id, notes) => setJobs(jobs.map(job => job.id === id ? { ...job, notes } : job))

  const filteredJobs = jobs.filter(job =>
    job.role.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{background: 'linear-gradient(135deg, #060608 0%, #0a0a12 50%, #08080f 100%)'}}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{left: p.left, top: p.top, '--duration': p.duration, '--delay': p.delay, opacity: p.opacity}} />
      ))}
      <div className="orb1 fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)'}} />
      <div className="orb2 fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'}} />
      <div className="orb3 fixed top-[40%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)'}} />

      <Navbar onAddClick={() => setShowModal(true)} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'board' && (
        <>
          <StatsBar jobs={jobs} onSearch={setSearch} />
          <KanbanBoard jobs={filteredJobs} onDelete={handleDelete} onStatusChange={handleStatusChange} onNotesChange={handleNotesChange} />
        </>
      )}
      {activeTab === 'analytics' && <Analytics jobs={jobs} />}
      {activeTab === 'tools' && <Tools apiKey={import.meta.env.VITE_GEMINI_API_KEY} />}
      {activeTab === 'ai' && <AIMatch />}

      {showModal && (
        <AddJobModal onClose={() => setShowModal(false)} onAdd={handleAddJob} />
      )}
    </div>
  )
}

export default App