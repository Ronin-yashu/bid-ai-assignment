import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'
import api from '../lib/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { User, Mail, Shield, Calendar, LogOut, Settings } from 'lucide-react'

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
  }, [isAuthenticated])

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/auth/profile').then(r => r.data),
    enabled: isAuthenticated,
  })

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const profile = data?.user || user

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="bg-[#1a1a2e] h-28 relative">
              <div className="absolute -bottom-10 left-8">
                <div className="w-20 h-20 bg-[#FF6B2B] rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white font-black text-2xl">{profile?.name?.[0]?.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div className="pt-14 px-8 pb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-black text-[#1a1a2e]">{profile?.name}</h1>
                  <p className="text-gray-500 text-sm">{profile?.email}</p>
                  {profile?.role === 'admin' && (
                    <span className="inline-block mt-2 bg-orange-100 text-[#FF6B2B] text-xs font-bold px-3 py-1 rounded-full">Admin</span>
                  )}
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm font-medium transition">
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h2 className="font-bold text-[#1a1a2e] mb-6 flex items-center gap-2"><User size={16} /> Account Details</h2>
            {isLoading ? (
              <div className="text-gray-400 text-sm">Loading...</div>
            ) : (
              <div className="space-y-4">
                {[
                  { icon: <User size={15} />, label: 'Full Name', value: profile?.name },
                  { icon: <Mail size={15} />, label: 'Email', value: profile?.email },
                  { icon: <Shield size={15} />, label: 'Role', value: profile?.role === 'admin' ? 'Administrator' : 'Member' },
                  { icon: <Calendar size={15} />, label: 'Member Since', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center text-[#FF6B2B] flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-[#1a1a2e]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-bold text-[#1a1a2e] mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'View Careers', path: '/careers', color: 'bg-orange-50 text-[#FF6B2B] hover:bg-orange-100' },
                { label: 'About YSP', path: '/about', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
                ...(profile?.role === 'admin' ? [{ label: 'Admin Dashboard', path: '/admin', color: 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e]' }] : []),
                { label: 'Transparency', path: '/transparency', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
              ].map(item => (
                <a key={item.label} href={item.path}
                  className={`${item.color} rounded-xl p-4 text-sm font-semibold text-center transition`}>{item.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
