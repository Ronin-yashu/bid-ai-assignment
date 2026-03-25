import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import toast from 'react-hot-toast'
import { MapPin, Clock, Building2, ChevronRight } from 'lucide-react'

export default function CareersPage() {
  const applyRef = useRef(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', city_state: '',
    education: '', area_of_interest: 'Policy Research', why_join: '', job_id: ''
  })

  const { data, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.get('/get/jobs').then(r => r.data),
  })
  const jobs = data?.jobs || []

  const submitMutation = useMutation({
    mutationFn: (payload) => api.post('/application/submit', payload),
    onSuccess: () => {
      toast.success('Application submitted! We will get back to you soon. 🎉')
      setForm({ full_name: '', email: '', phone: '', city_state: '', education: '', area_of_interest: 'Policy Research', why_join: '', job_id: '' })
      setSelectedJob(null)
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Submission failed. Please try again.'),
  })

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleApplyClick = (job) => {
    setSelectedJob(job)
    setForm(prev => ({ ...prev, job_id: job.id }))
    applyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.full_name || !form.email) { toast.error('Name and email are required'); return }
    submitMutation.mutate(form)
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B] w-full"></div>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] rounded-2xl h-72 flex items-center justify-center order-2 md:order-1">
            <div className="text-center">
              <div className="text-5xl mb-3">🏛️</div>
              <p className="text-white font-bold">Build India's Future</p>
              <p className="text-gray-400 text-xs mt-1">Careers at YSP</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-[#FF6B2B] text-white px-3 py-1 rounded text-xs font-bold inline-block mb-4">YSP</div>
            <h1 className="text-5xl font-black text-[#1a1a2e] mb-1">CAREERS AT</h1>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Yuva Shakti Party</h2>
            <p className="text-[#FF6B2B] text-sm font-bold mb-4">Build Your Career in Leadership, Policy, and Institutional Development</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">We welcome individuals passionate about policy, community development, media, research, and leadership training to join our mission of strengthening democratic institutions.</p>
            <button onClick={() => applyRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition inline-block">
              View Open Positions
            </button>
          </div>
        </div>
      </section>

      {/* Why Work With YSP */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Work With YSP?</h2>
          <p className="text-gray-500 text-sm mb-12">A mission-driven environment for people who believe in responsible governance.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Meaningful Impact', desc: 'Contribute to initiatives focused on leadership development, analyze governance issues, and contribute to research publications.' },
              { icon: '🎓', title: 'Intellectual Environment', desc: 'Work alongside individuals engaged in research, governance analysis, and institutional development.' },
              { icon: '📈', title: 'Leadership Growth', desc: 'Gain opportunities to participate in leadership programs, training initiatives, and policy forums.' },
            ].map(item => (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-10 border border-gray-300 px-8 py-3 rounded-full text-sm text-gray-600 hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition inline-block">
            Learn About Our Vision
          </Link>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-2 text-center">Current Opportunities</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Explore roles across research, media, and organizational development.</p>
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No positions listed yet.</p>
              <Link to="/post-job" className="bg-[#FF6B2B] text-white px-6 py-2 rounded-full text-sm font-semibold">Post a Job</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-[#FF6B2B]/40 transition group">
                    <span className="bg-orange-100 text-[#FF6B2B] text-xs font-bold px-3 py-1 rounded-full">{job.department}</span>
                    <h3 className="font-bold text-gray-900 mt-4 mb-2 text-base">{job.title}</h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{job.description || 'Join YSP in building India\'s next generation of leaders.'}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{job.location}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} />{job.type}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Building2 size={11} />{job.department}</span>
                    </div>
                    <button onClick={() => handleApplyClick(job)}
                      className="w-full bg-[#FF6B2B] text-white text-xs font-semibold py-2.5 rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-1">
                      Apply Now <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/post-job" className="border border-[#FF6B2B] text-[#FF6B2B] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-50 transition inline-block">+ Post a Job</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Internship Programs */}
      <section className="bg-[#1a1a2e] py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-3">Internship Programs</h2>
            <p className="text-[#FF6B2B] text-sm font-semibold mb-4">Learn and contribute through real-world leadership and governance experience.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">YSP offers internship opportunities for students and young professionals interested in governance, research, communication, and civic engagement.</p>
            <ul className="space-y-2 mb-8">
              {['Policy research', 'Media & communications', 'Leadership academy support', 'Governance & legal research'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-2 h-2 bg-[#FF6B2B] rounded-full flex-shrink-0"></span>{item}
                </li>
              ))}
            </ul>
            <button onClick={() => applyRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF6B2B] text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition">
              Apply for Internship →
            </button>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="bg-[#FF6B2B] text-white rounded-xl p-5 mb-4 inline-block">
              <p className="text-4xl font-black">10+</p>
              <p className="text-xs">Internship spots</p>
            </div>
            <h3 className="text-xl font-bold text-white mb-5">Internship spots available this year</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-[#FF6B2B]">✓</span> 6–12 weeks programs</li>
              <li className="flex items-center gap-2"><span className="text-[#FF6B2B]">✓</span> Mentorship included</li>
              <li className="flex items-center gap-2"><span className="text-[#FF6B2B]">✓</span> Certificate on completion</li>
              <li className="flex items-center gap-2"><span className="text-[#FF6B2B]">✓</span> Remote-friendly options</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Work Culture */}
      <section className="bg-[#FF6B2B] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Our Work Culture</h2>
          <p className="text-orange-100 text-sm mb-12">Values that guide our organization</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { icon: '🛡️', label: 'Integrity and ethical leadership' },
              { icon: '🔬', label: 'Research-driven discussions' },
              { icon: '🤝', label: 'Collaborative teamwork' },
              { icon: '⚖️', label: 'Commitment to public service' },
            ].map(item => (
              <div key={item.label} className="bg-orange-500/50 rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-white font-semibold text-sm">{item.label}</p>
              </div>
            ))}
          </div>
          <blockquote className="text-white italic text-base max-w-2xl mx-auto border-t border-orange-400 pt-8">
            "We believe institutions are strengthened when people work with purpose, discipline, and responsibility."
          </blockquote>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-12 text-center">How the Application Process Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Submit Application', desc: 'Fill out the online application form', color: 'bg-[#FF6B2B]' },
              { step: '2', title: 'Review Process', desc: 'Applications are evaluated by the recruitment team', color: 'bg-[#1a1a2e]' },
              { step: '3', title: 'Interview', desc: 'Selected candidates participate in discussions', color: 'bg-[#FF6B2B]' },
              { step: '4', title: 'Onboarding', desc: 'Successful applicants join the YSP team', color: 'bg-[#1a1a2e]' },
            ].map(s => (
              <div key={s.step} className={`${s.color} rounded-2xl p-6 text-white`}>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mb-3">{s.step}</div>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-white/80 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => applyRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF6B2B] text-white px-10 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Start Your Application
            </button>
          </div>
        </div>
      </section>

      {/* Submit Application */}
      <section className="bg-gray-50 py-16" ref={applyRef}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Submit Your Application</h2>
          <p className="text-gray-500 text-sm text-center mb-2">
            {selectedJob ? <span>Applying for: <strong className="text-[#FF6B2B]">{selectedJob.title}</strong></span> : 'Interested in working with YSP? Submit a general application.'}
          </p>
          {selectedJob && (
            <div className="text-center mb-6">
              <button onClick={() => { setSelectedJob(null); setForm(p => ({ ...p, job_id: '' })) }} className="text-xs text-gray-400 underline hover:text-[#FF6B2B]">Clear — submit general application instead</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'Full Name *', name: 'full_name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone Number', name: 'phone', type: 'text', placeholder: '+91 00000 00000' },
                { label: 'City / State', name: 'city_state', type: 'text', placeholder: 'Delhi, India' },
                { label: 'Education / Profession', name: 'education', type: 'text', placeholder: 'B.Tech / MBA / etc.' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">{field.label}</label>
                  <input name={field.name} type={field.type} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] transition" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Area of Interest</label>
                <select name="area_of_interest" value={form.area_of_interest} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                  <option>Policy Research</option>
                  <option>Media & Communications</option>
                  <option>Leadership</option>
                  <option>Internship</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {jobs.length > 0 && !selectedJob && (
              <div className="mt-5">
                <label className="text-xs font-semibold text-gray-700 block mb-1">Apply for a specific job (optional)</label>
                <select name="job_id" value={form.job_id} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                  <option value="">General Application</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.title} — {j.department}</option>)}
                </select>
              </div>
            )}
            <div className="mt-5">
              <label className="text-xs font-semibold text-gray-700 block mb-1">Why do you want to join YSP?</label>
              <textarea name="why_join" value={form.why_join} onChange={handleChange} rows={4} placeholder="Share your motivation..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
            </div>
            <div className="mt-8 text-center">
              <button type="submit" disabled={submitMutation.isPending}
                className="bg-[#FF6B2B] text-white px-12 py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50 text-sm">
                {submitMutation.isPending ? 'Submitting...' : 'Submit Application →'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
