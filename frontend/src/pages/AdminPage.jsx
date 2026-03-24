import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Users, Briefcase, FileText, CheckCircle, XCircle, Clock, Eye, Trash2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  shortlisted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function AdminPage() {
  const [tab, setTab] = useState('applications')
  const [statusFilter, setStatusFilter] = useState('')
  const qc = useQueryClient()

  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ['admin-applications', statusFilter],
    queryFn: () => api.get(`/application/?status=${statusFilter}`).then(r => r.data),
  })

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: () => api.get('/get/jobs').then(r => r.data),
  })

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/application/${id}/status`, { status }),
    onSuccess: () => { toast.success('Status updated!'); qc.invalidateQueries(['admin-applications']) },
    onError: () => toast.error('Failed to update status'),
  })

  const deleteJob = useMutation({
    mutationFn: (id) => api.delete(`/get/jobs/${id}`),
    onSuccess: () => { toast.success('Job removed!'); qc.invalidateQueries(['admin-jobs']) },
    onError: () => toast.error('Failed to delete job'),
  })

  const apps = appsData?.applications || []
  const jobs = jobsData?.jobs || []

  const stats = [
    { label: 'Total Applications', value: appsData?.pagination?.total || 0, icon: <FileText size={20} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Jobs', value: jobsData?.pagination?.total || 0, icon: <Briefcase size={20} />, color: 'bg-orange-50 text-[#FF6B2B]' },
    { label: 'Shortlisted', value: apps.filter(a => a.status === 'shortlisted').length, icon: <CheckCircle size={20} />, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Review', value: apps.filter(a => a.status === 'pending').length, icon: <Clock size={20} />, color: 'bg-yellow-50 text-yellow-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1a1a2e]">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage jobs and applications</p>
          </div>
          <Link to="/post-job" className="flex items-center gap-2 bg-[#FF6B2B] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition">
            <Plus size={16} /> Post New Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
              <p className="text-2xl font-black text-[#1a1a2e]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['applications', 'jobs'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition ${
                tab === t ? 'bg-[#FF6B2B] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B2B]'
              }`}>{t}</button>
          ))}
        </div>

        {/* Applications Tab */}
        {tab === 'applications' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Applications</h2>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B2B]">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {appsLoading ? (
              <div className="p-10 text-center text-gray-400">Loading...</div>
            ) : apps.length === 0 ? (
              <div className="p-10 text-center text-gray-400">No applications found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Name', 'Email', 'Job', 'Interest', 'Status', 'Date', 'Action'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {apps.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4 font-medium text-gray-900">{app.full_name}</td>
                        <td className="px-5 py-4 text-gray-500">{app.email}</td>
                        <td className="px-5 py-4 text-gray-500">{app.job_title || 'General'}</td>
                        <td className="px-5 py-4 text-gray-500">{app.area_of_interest}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs">{new Date(app.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-4">
                          <select
                            value={app.status}
                            onChange={e => updateStatus.mutate({ id: app.id, status: e.target.value })}
                            className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#FF6B2B]">
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Jobs Tab */}
        {tab === 'jobs' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Active Job Listings</h2>
            </div>
            {jobsLoading ? (
              <div className="p-10 text-center text-gray-400">Loading...</div>
            ) : jobs.length === 0 ? (
              <div className="p-10 text-center text-gray-400">No jobs posted yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Title', 'Department', 'Location', 'Type', 'Posted', 'Action'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {jobs.map(job => (
                      <tr key={job.id} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4 font-medium text-gray-900">{job.title}</td>
                        <td className="px-5 py-4">
                          <span className="bg-orange-100 text-[#FF6B2B] px-2.5 py-1 rounded-full text-xs font-semibold">{job.department}</span>
                        </td>
                        <td className="px-5 py-4 text-gray-500">{job.location}</td>
                        <td className="px-5 py-4 text-gray-500">{job.type}</td>
                        <td className="px-5 py-4 text-gray-400 text-xs">{new Date(job.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => {
                            if (confirm('Remove this job?')) deleteJob.mutate(job.id)
                          }} className="text-red-400 hover:text-red-600 transition">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
