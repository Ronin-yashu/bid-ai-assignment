import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function CareersPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', city_state: '',
    education: '', area_of_interest: 'Policy Research', why_join: '', job_id: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios.get('/api/get/jobs')
      .then(res => setJobs(res.data.jobs))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('/api/application/submit', form)
      setSubmitted(true)
      setForm({ full_name: '', email: '', phone: '', city_state: '', education: '', area_of_interest: 'Policy Research', why_join: '', job_id: '' })
    } catch (err) {
      alert('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B] w-full"></div>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center order-2 md:order-1">
            <span className="text-gray-400 text-sm">Office Image</span>
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-[#FF6B2B] text-white px-3 py-1 rounded text-xs font-bold inline-block mb-4">YSP</div>
            <h1 className="text-5xl font-black text-[#1a1a2e] mb-1">CAREERS AT</h1>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Yuva Shakti Party</h2>
            <p className="text-[#FF6B2B] text-sm font-bold mb-4">Build Your Career in Leadership, Policy, and Institutional Development</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">Yuva Shakti Party is building a new generation of leadership focused on governance, research, and ethical public service.</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">We welcome individuals who are passionate about policy, community development, media, research, and leadership training to join our mission of strengthening democratic institutions.</p>
            <a href="#opportunities" className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition inline-block">
              View Open Positions
            </a>
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
          <button className="mt-10 border border-gray-300 px-8 py-3 rounded-full text-sm text-gray-600 hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition">Learn About Our Vision</button>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="bg-white py-16" id="opportunities">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-2 text-center">Current Opportunities</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Explore roles across research, media, and organizational development.</p>

          {loading ? (
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
                  <div key={job.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
                    <span className="bg-orange-100 text-[#FF6B2B] text-xs font-bold px-3 py-1 rounded-full">{job.department}</span>
                    <h3 className="font-bold text-gray-900 mt-4 mb-2 text-base">{job.title}</h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{job.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                      <span>📁 File size: 4.2 MB</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-5">📍 {job.location} / {job.type}</div>
                    <button className="w-full border border-[#FF6B2B] text-[#FF6B2B] text-xs font-semibold py-2.5 rounded-full hover:bg-orange-50 transition">
                      View Financial Reports
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/post-job" className="bg-[#FF6B2B] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition inline-block">View All →</Link>
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
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Interns gain practical exposure to leadership development programs, research initiatives, and media projects.</p>
            <ul className="space-y-2 mb-8">
              {['Policy research', 'Media & communications', 'Media & communications', 'Leadership academy support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-2 h-2 bg-[#FF6B2B] rounded-full flex-shrink-0"></span>{item}
                </li>
              ))}
            </ul>
            <button className="bg-[#FF6B2B] text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition">
              Apply for Internship →
            </button>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8 relative">
            <div className="bg-[#FF6B2B] text-white rounded-xl p-5 mb-4 inline-block">
              <p className="text-4xl font-black">10+</p>
              <p className="text-xs">Internship</p>
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
            " We believe institutions are strengthened when people work with purpose, discipline, and responsibility "
          </blockquote>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-12 text-center">How the Application Process Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { step: '1', title: 'Submit Application', desc: 'Fill out the online application form', color: 'bg-[#FF6B2B]' },
                { step: '2', title: 'Review Process', desc: 'Applications are evaluated by the recruitment team', color: 'bg-[#1a1a2e]' },
              ].map(s => (
                <div key={s.step} className={`${s.color} rounded-2xl p-6 text-white`}>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mb-3">{s.step}</div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-white/80 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { step: '3', title: 'Interview', desc: 'Selected candidates participate in discussions and interviews', color: 'bg-[#FF6B2B]' },
                { step: '4', title: 'Onboarding', desc: 'Successful applicants join the YSP team and begin their work', color: 'bg-[#1a1a2e]' },
              ].map(s => (
                <div key={s.step} className={`${s.color} rounded-2xl p-6 text-white`}>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mb-3">{s.step}</div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-white/80 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <a href="#apply" className="bg-[#FF6B2B] text-white px-10 py-3 rounded-full font-semibold hover:bg-orange-600 transition inline-block">Start Your Application</a>
          </div>
        </div>
      </section>

      {/* Submit General Application */}
      <section className="bg-gray-50 py-16" id="apply">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Submit a General Application</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Interested in working with YSP but don't see a listed role?</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <p className="text-green-600 font-bold text-xl">✅ Application Submitted Successfully!</p>
              <p className="text-green-500 text-sm mt-2">We'll review your application and get back to you soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-5 text-[#FF6B2B] text-sm font-semibold underline">Submit another application</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} required placeholder="name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="gmail"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Your number"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">City / State</label>
                  <input name="city_state" value={form.city_state} onChange={handleChange} placeholder="General Member"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Education / Profession</label>
                  <input name="education" value={form.education} onChange={handleChange} placeholder="Btech"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
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

              <div className="mt-5">
                <label className="text-xs font-semibold text-gray-700 block mb-1">Upload Resume</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <div className="text-gray-300 text-3xl mb-2">☁️</div>
                  <p className="text-gray-400 text-xs">Click to upload resume</p>
                  <p className="text-gray-300 text-xs">PDF, DOC, up to 10MB</p>
                </div>
              </div>

              {jobs.length > 0 && (
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
                <textarea name="why_join" value={form.why_join} onChange={handleChange} rows={4} placeholder="Type here..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
              </div>

              <div className="mt-8 text-center">
                <button type="submit" disabled={submitting}
                  className="bg-[#FF6B2B] text-white px-12 py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50 text-sm">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
