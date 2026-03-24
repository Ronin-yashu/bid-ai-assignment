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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
            <span className="text-gray-400">Office Image</span>
          </div>
          <div>
            <div className="bg-[#FF6B2B] text-white px-3 py-1 rounded text-sm font-bold inline-block mb-3">YSP</div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">CAREERS AT</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Yuva Shakti Party</h2>
            <p className="text-[#FF6B2B] text-sm font-semibold mb-3">Build Your Career in Leadership, Policy, and Institutional Development</p>
            <p className="text-gray-600 text-sm mb-4">Yuva Shakti Party is building a new generation of leadership focused on governance, research, and ethical public service.</p>
            <p className="text-gray-600 text-sm mb-6">We welcome individuals who are passionate about policy, community development, media, research, and leadership training to join our mission of strengthening democratic institutions.</p>
            <Link to="#opportunities" className="bg-[#FF6B2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition inline-block">
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With YSP */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Work With YSP?</h2>
          <p className="text-gray-500 text-sm mb-10">A mission-driven environment for people who believe in responsible governance.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Meaningful Impact', desc: 'Contribute to initiatives focused on leadership development, governance issues, and contribute to research.' },
              { icon: '🎓', title: 'Intellectual Environment', desc: 'Work alongside individuals engaged in research, governance analysis, and institutional development.' },
              { icon: '📈', title: 'Leadership Growth', desc: 'Gain opportunities to participate in leadership programs, training initiatives, and policy forums.' },
            ].map(item => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 border border-gray-300 px-6 py-2 rounded-full text-sm text-gray-700 hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition">Learn About Our Vision</button>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="bg-white py-14" id="opportunities">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-2 text-center">Current Opportunities</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Explore roles across research, media, and organizational development.</p>

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
                  <div key={job.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                    <span className="bg-orange-100 text-[#FF6B2B] text-xs font-semibold px-3 py-1 rounded-full">{job.department}</span>
                    <h3 className="font-bold text-gray-900 mt-3 mb-1">{job.title}</h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <span>📍 {job.location}</span>
                      <span>• {job.type}</span>
                    </div>
                    <button className="w-full border border-[#FF6B2B] text-[#FF6B2B] text-xs font-semibold py-2 rounded-full hover:bg-orange-50 transition">
                      View Financial Reports
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4">
                <Link to="/post-job" className="bg-[#FF6B2B] text-white px-5 py-2 rounded-full text-sm font-semibold">+ Post a Job</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Internship Programs */}
      <section className="bg-[#1a1a2e] py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Internship Programs</h2>
            <p className="text-gray-400 text-sm mb-4">Learn and contribute through real-world leadership and governance experience.</p>
            <p className="text-gray-400 text-sm mb-6">YSP offers internship opportunities for students and young professionals interested in governance, research, communication, and civic engagement.</p>
            <ul className="space-y-2 mb-6">
              {['Policy research', 'Media & communications', 'Media & communications', 'Leadership academy support'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="w-2 h-2 bg-[#FF6B2B] rounded-full"></span>{item}
                </li>
              ))}
            </ul>
            <button className="bg-[#FF6B2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Apply for Internship →
            </button>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl font-black text-[#FF6B2B]">10+</span>
              <span className="text-sm text-gray-300">Internship spots</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Internship spots available this year</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✅ 6–12 weeks programs</li>
              <li>✅ Mentorship included</li>
              <li>✅ Certificate on completion</li>
              <li>✅ Remote-friendly options</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Work Culture */}
      <section className="bg-[#FF6B2B] py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Our Work Culture</h2>
          <p className="text-orange-100 text-sm mb-10">Values that guide our organization</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {['Integrity and ethical leadership', 'Research-driven discussions', 'Collaborative teamwork', 'Commitment to public service'].map(item => (
              <div key={item} className="bg-white/20 rounded-xl p-4">
                <div className="w-10 h-10 bg-white/30 rounded-full mx-auto mb-3"></div>
                <p className="text-white text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <blockquote className="text-white italic text-lg max-w-2xl mx-auto">
            "We believe institutions are strengthened when people work with purpose, discipline, and responsibility"
          </blockquote>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#FF6B2B] mb-10 text-center">How the Application Process Works</h2>
          <div className="max-w-lg mx-auto">
            {[
              { step: '01', title: 'Submit Application', desc: 'Fill out the online application form' },
              { step: '02', title: 'Review Process', desc: 'Applications are evaluated by the recruitment team' },
              { step: '03', title: 'Interview', desc: 'Selected candidates participate in discussions and interviews' },
              { step: '04', title: 'Onboarding', desc: 'Successful applicants join the YSP team and begin their work' },
            ].map((s, i) => (
              <div key={s.step} className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{s.step}</div>
                  {i < 3 && <div className="w-0.5 h-10 bg-orange-200 mt-1"></div>}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="#apply" className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition inline-block">Start Your Application</a>
          </div>
        </div>
      </section>

      {/* Submit General Application */}
      <section className="bg-gray-50 py-14" id="apply">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Submit a General Application</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Interested in working with YSP but don't see a listed role?</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <p className="text-green-600 font-semibold text-lg">✅ Application Submitted Successfully!</p>
              <p className="text-green-500 text-sm mt-2">We'll review your application and get back to you soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-[#FF6B2B] text-sm font-semibold underline">Submit another application</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name *</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} required
                    placeholder="name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="gmail" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Your number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">City / State</label>
                  <input name="city_state" value={form.city_state} onChange={handleChange}
                    placeholder="General Member" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Education / Profession</label>
                  <input name="education" value={form.education} onChange={handleChange}
                    placeholder="Btech" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Area of Interest</label>
                  <select name="area_of_interest" value={form.area_of_interest} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]">
                    <option>Policy Research</option>
                    <option>Media & Communications</option>
                    <option>Leadership</option>
                    <option>Internship</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Apply for a specific job */}
              {jobs.length > 0 && (
                <div className="mt-5">
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Apply for a specific job (optional)</label>
                  <select name="job_id" value={form.job_id} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B]">
                    <option value="">General Application</option>
                    {jobs.map(j => <option key={j.id} value={j.id}>{j.title} — {j.department}</option>)}
                  </select>
                </div>
              )}

              <div className="mt-5">
                <label className="text-xs font-semibold text-gray-600 block mb-1">Why do you want to join YSP?</label>
                <textarea name="why_join" value={form.why_join} onChange={handleChange} rows={4}
                  placeholder="Type here..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
              </div>

              <div className="mt-6 text-center">
                <button type="submit" disabled={submitting}
                  className="bg-[#FF6B2B] text-white px-10 py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50">
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
