import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowLeft } from 'lucide-react'

export default function PostJobPage() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (!isAuthenticated) { toast.error('Please login first'); navigate('/login'); return }
    setLoading(true)
    try {
      await api.post('/job/create', data)
      toast.success('Job posted successfully!')
      reset()
      setTimeout(() => navigate('/careers'), 1000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <Link to="/careers" className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-[#FF6B2B] transition">
            <ArrowLeft size={16} /> Back to Careers
          </Link>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-black text-[#1a1a2e] mb-1">Post a Job</h1>
            <p className="text-gray-500 text-sm mb-8">Add a new position to YSP Careers</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Job Title *</label>
                  <input {...register('title', { required: 'Title is required' })} placeholder="Policy Research Associate"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Department *</label>
                  <select {...register('department', { required: true })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                    <option value="Research">Research</option>
                    <option value="Media">Media</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Location *</label>
                  <input {...register('location', { required: 'Location required' })} placeholder="Delhi / Remote"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Type</label>
                  <select {...register('type')}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Description</label>
                <textarea {...register('description')} rows={4} placeholder="Describe the role and responsibilities..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Requirements</label>
                <textarea {...register('requirements')} rows={3} placeholder="List skills, qualifications..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] resize-none"></textarea>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#FF6B2B] text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50 text-sm">
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
