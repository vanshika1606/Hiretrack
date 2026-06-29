import { useState } from 'react'

function AIMatch() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!resume || !jd) return
    setLoading(true)
    setResult(null)
    const prompt = `You are a resume analyzer. Compare this resume and job description and give:
1. A match score out of 100
2. 3 key strengths
3. 3 missing skills

Resume: ${resume}

Job Description: ${jd}

Reply in this exact format:
Score: [number]/100
Strengths: [strength1], [strength2], [strength3]
Missing: [skill1], [skill2], [skill3]`

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}` },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 500 })
      })
      const data = await response.json()
      if (data.choices && data.choices[0]) setResult(data.choices[0].message.content)
      else setResult('Error: ' + JSON.stringify(data))
    } catch (err) {
      setResult('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 pb-8">
      <div className="rounded-2xl p-6" style={{background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)'}}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>🤖</div>
          <div>
            <h2 className="text-sm font-bold text-white">AI Resume Matcher</h2>
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>Paste your resume and JD to get a match score</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs mb-2 block font-medium" style={{color: 'rgba(255,255,255,0.4)'}}>Your Resume</label>
            <textarea rows={8} value={resume} onChange={e => setResume(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full text-xs px-4 py-3 rounded-xl resize-none focus:outline-none text-white/80 placeholder-white/20"
              style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}} />
          </div>
          <div>
            <label className="text-xs mb-2 block font-medium" style={{color: 'rgba(255,255,255,0.4)'}}>Job Description</label>
            <textarea rows={8} value={jd} onChange={e => setJd(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full text-xs px-4 py-3 rounded-xl resize-none focus:outline-none text-white/80 placeholder-white/20"
              style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}} />
          </div>
        </div>
        <button onClick={handleAnalyze} disabled={loading}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
          {loading ? '⏳ Analyzing...' : '✨ Analyze Match'}
        </button>
        {result && (
          <div className="mt-4 rounded-xl p-4" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'}}>
            <p className="text-xs font-bold mb-2" style={{color: 'rgba(255,255,255,0.4)'}}>RESULTS</p>
            <pre className="text-xs whitespace-pre-wrap leading-relaxed" style={{color: 'rgba(255,255,255,0.8)'}}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIMatch