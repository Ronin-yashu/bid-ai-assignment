import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Membership', path: '/membership' },
    { label: 'YSP TV', path: '/ysp-tv' },
    { label: 'Media & Press', path: '/media' },
    { label: 'Transparency', path: '/transparency' },
  ]

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setProfileOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6B2B] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-sm">YSP</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <Link key={l.path} to={l.path}
              className={`text-sm font-medium transition hover:text-[#FF6B2B] ${
                location.pathname === l.path ? 'text-[#FF6B2B]' : 'text-gray-700'
              }`}>{l.label}</Link>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5">
            <span className="text-xs text-gray-600">English</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>

          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200 transition">
                <div className="w-6 h-6 bg-[#FF6B2B] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <span className="text-gray-800 max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={12} className="text-gray-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-100 w-48 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    {user?.role === 'admin' && <span className="text-xs bg-orange-100 text-[#FF6B2B] px-2 py-0.5 rounded-full font-semibold">Admin</span>}
                  </div>
                  {isAdmin() && (
                    <Link to="/admin" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings size={14} /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={14} /> My Profile
                  </Link>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 font-medium hover:text-[#FF6B2B] transition">Login</Link>
              <Link to="/login" className="bg-[#FF6B2B] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition">Join Us</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 pb-4">
          {links.map(l => (
            <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm text-gray-700 border-b border-gray-50 hover:text-[#FF6B2B]">{l.label}</Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="w-full bg-red-50 text-red-500 py-2.5 rounded-full text-sm font-semibold">Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center border border-gray-200 py-2.5 rounded-full text-sm font-medium">Login</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center bg-[#FF6B2B] text-white py-2.5 rounded-full text-sm font-semibold">Join Us</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
