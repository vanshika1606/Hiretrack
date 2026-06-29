function AddJobModal({ onClose, onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const newJob = {
      id: Date.now(),
      role: form.role.value,
      company: form.company.value,
      status: form.status.value,
      date: form.date.value,
      notes: '',
    }
    onAdd(newJob)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)'}}>
      <div className="rounded-2xl p-6 w-full max-w-md" style={{background: 'rgba(15,15,20,0.95)', border: '1px solid rgba(255,255,255,0.08)'}}>
        <h2 className="text-white text-base font-bold mb-5">Add New Job 🚀</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="role" required placeholder="Job Role (e.g. SDE Intern)"
            className="w-full text-xs px-4 py-3 rounded-xl text-white focus:outline-none placeholder-white/20"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
          <input name="company" required placeholder="Company Name"
            className="w-full text-xs px-4 py-3 rounded-xl text-white focus:outline-none placeholder-white/20"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
          <input name="date" type="date"
            className="w-full text-xs px-4 py-3 rounded-xl text-white/60 focus:outline-none"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
          <select name="status"
            className="w-full text-xs px-4 py-3 rounded-xl text-white focus:outline-none"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white/50 transition-all hover:text-white"
              style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}}>
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
              style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
              Add Job ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJobModal