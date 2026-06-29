import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import KanbanBoard from './components/KanbanBoard'
import AddJobModal from './components/AddJobModal'
import StatsBar from './components/StatsBar'
import AIMatch from './components/AIMatch'

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
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'}} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)'}} />

      <Navbar onAddClick={() => setShowModal(true)} activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatsBar jobs={jobs} onSearch={setSearch} />

      {activeTab === 'board' && (
        <KanbanBoard jobs={filteredJobs} onDelete={handleDelete} onStatusChange={handleStatusChange} onNotesChange={handleNotesChange} />
      )}
      {activeTab === 'ai' && <AIMatch />}

      {showModal && (
        <AddJobModal onClose={() => setShowModal(false)} onAdd={handleAddJob} />
      )}
    </div>
  )
}

export default App