import { useState } from 'react'

const CHECKLIST_ITEMS = [
  'Research the company thoroughly',
  'Review the job description again',
  'Prepare STAR method answers',
  'Practice common DSA questions',
  'Prepare questions to ask interviewer',
  'Test your audio/video setup',
  'Keep resume and portfolio ready',
  'Dress appropriately',
  'Arrive/join 5 minutes early',
  'Send thank you email after interview',
]

function Tools({ apiKey }) {
  const [activeToolTab, setActiveToolTab] = useState('cover')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [resume, setResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [loadingCover, setLoadingCover] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [companyInfo, setCompanyInfo] = useState('')
  const [loadingCompany, setLoadingCompany] = useState(false)
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS.map(item => ({ text: item, done: false })))

  const generateCoverLetter = async () => {
    if (!company || !role) return
    setLoadingCover(true)
    setCoverLetter('')
    const prompt = `Write a professional and concise cover letter for a ${role} position at ${company}. ${resume ? `Here is the candidate's background: ${resume}` : ''} Keep it under 200 words, professional tone, and make it compelling.`
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 500 })
      })
      const data = await response.json()
      if (data.choices) setCoverLetter(data.choices[0].message.content)
    } catch (err) { setCoverLetter('Something went wrong!') }
    finally { setLoadingCover(false) }
  }

  const researchCompany = async () => {
    if (!companyName) return
    setLoadingCompany(true)
    setCompanyInfo('')
    const prompt = `Give me a quick company overview for ${companyName} for a job interview preparation. Include: company size, what they do, tech stack if known, culture, recent news, and 3 smart questions to ask the interviewer. Keep it concise and formatted.`
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 600 })
      })
      const data = await response.json()
      if (data.choices) setCompanyInfo(data.choices[0].message.content)
    } catch (err) { setCompanyInfo('Something went wrong!') }
    finally { setLoadingCompany(false) }
  }

  const toggleChecklist = (i) => {
    setChecklist(checklist.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))
  }

  const toolTabs = [
    { id: 'cover', label: '✉️ Cover Letter' },
    { id: 'company', label: '🏢 Company Research' },
    { id: 'checklist', label: '✅ Interview Checklist' },
  ]

  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-black text-white mb-4">🛠️ Tools</h2>
      <div className="flex gap-2 mb-6">
        {toolTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveToolTab(tab.id)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={activeToolTab === tab.id
              ? {background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}
              : {background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.06)'}}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeToolTab === 'cover' && (
        <div className="rounded-2xl p-6 space-y-4" style={{background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)'}}>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">✉️ Cover Letter Generator</h3>
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>AI generates a professional cover letter for you</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name"
              className="text-xs px-4 py-3 rounded-xl text-white focus:outline-none placeholder-white/20"
              style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Job role"
              className="text-xs px-4 py-3 rounded-xl text-white focus:outline-none placeholder-white/20"
              style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
          </div>
          <textarea rows={3} value={resume} onChange={e => setResume(e.target.value)}
            placeholder="Paste your resume highlights (optional)..."
            className="w-full text-xs px-4 py-3 rounded-xl text-white resize-none focus:outline-none placeholder-white/20"
            style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
          <button onClick={generateCoverLetter} disabled={loadingCover}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 disabled:opacity-50"
            style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
            {loadingCover ? '⏳ Generating...' : '✨ Generate Cover Letter'}
          </button>
          {coverLetter && (
            <div className="rounded-xl p-4" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold" style={{color: 'rgba(255,255,255,0.4)'}}>GENERATED COVER LETTER</p>
                <button onClick={() => navigator.clipboard.writeText(coverLetter)}
                  className="text-[10px] px-2 py-1 rounded-lg"
                  style={{background: 'rgba(99,102,241,0.2)', color: '#a78bfa'}}>
                  📋 Copy
                </button>
              </div>
              <pre className="text-xs whitespace-pre-wrap leading-relaxed" style={{color: 'rgba(255,255,255,0.75)'}}>{coverLetter}</pre>
            </div>
          )}
        </div>
      )}

      {activeToolTab === 'company' && (
        <div className="rounded-2xl p-6 space-y-4" style={{background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)'}}>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">🏢 Company Research</h3>
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>Quick AI-powered company overview for interview prep</p>
          </div>
          <div className="flex gap-3">
            <input value={companyName} onChange={e => setCompanyName(e.target.value)}
              placeholder="Enter company name (e.g. Google, Infosys)"
              className="flex-1 text-xs px-4 py-3 rounded-xl text-white focus:outline-none placeholder-white/20"
              style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'}} />
            <button onClick={researchCompany} disabled={loadingCompany}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 disabled:opacity-50 shrink-0"
              style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
              {loadingCompany ? '⏳ Researching...' : '🔍 Research'}
            </button>
          </div>
          {companyInfo && (
            <div className="rounded-xl p-4" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}>
              <p className="text-xs font-bold mb-2" style={{color: 'rgba(255,255,255,0.4)'}}>COMPANY OVERVIEW</p>
              <pre className="text-xs whitespace-pre-wrap leading-relaxed" style={{color: 'rgba(255,255,255,0.75)'}}>{companyInfo}</pre>
            </div>
          )}
        </div>
      )}

      {activeToolTab === 'checklist' && (
        <div className="rounded-2xl p-6 space-y-4" style={{background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)'}}>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">✅ Interview Checklist</h3>
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>Complete these before every interview</p>
          </div>
          <div className="space-y-2">
            {checklist.map((item, i) => (
              <div key={i} onClick={() => toggleChecklist(i)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                style={{background: item.done ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${item.done ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)'}`}}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{background: item.done ? '#34d399' : 'rgba(255,255,255,0.08)', border: item.done ? 'none' : '1px solid rgba(255,255,255,0.15)'}}>
                  {item.done && <span className="text-[10px] text-white font-black">✓</span>}
                </div>
                <span className="text-xs" style={{color: item.done ? 'rgba(52,211,153,0.8)' : 'rgba(255,255,255,0.6)', textDecoration: item.done ? 'line-through' : 'none'}}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>
              {checklist.filter(i => i.done).length}/{checklist.length} completed
            </p>
            <button onClick={() => setChecklist(CHECKLIST_ITEMS.map(item => ({ text: item, done: false })))}
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)'}}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tools