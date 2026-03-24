import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function PostJobPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', department: '', location: '', type: 'Full-time',
    description: '', requirements: '', salary_range: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('/api/job/create', form)
      alert('Job posted successfully!')
      navigate('/careers')
    } catch (err) {
      alert('Failed to post job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="bg-gray-50 py-14">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
            <p className="text-gray-500 text-sm">Add a new opportunity to the YSP Careers page</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                placeholder="e.g. Policy Research Associate"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Department *</label>
                <select name="department" value={form.department} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                  <option value="">Select...</option>
                  <option>Research</option>
                  <option>Media</option>
                  <option>Leadership</option>
                  <option>Operations</option>
                  <option>Technology</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Job Type *</label>
                <select name="type" value={form.type} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Location *</label>
                <input name="location" value={form.location} onChange={handleChange} required
                  placeholder="e.g. Delhi / Remote"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Salary Range</label>
                <input name="salary_range" value={form.salary_range} onChange={handleChange}
                  placeholder="e.g. ₹3-5 LPA"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Job Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                placeholder="Describe the role, responsibilities..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Requirements</label>
              <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3}
                placeholder="Skills, qualifications, experience..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-[#FF6B2B] text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50">
              {submitting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}
