import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { setAuth, isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  // Already logged in — redirect away immediately
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await api.post(isLogin ? '/auth/login' : '/auth/register', data)
      setAuth(res.data.user, res.data.token)
      toast.success(isLogin ? `Welcome back, ${res.data.user.name}! 👋` : `Account created! Welcome to YSP 🎉`)
      reset()
      setTimeout(() => navigate(res.data.user.role === 'admin' ? '/admin' : '/'), 800)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          {/* Toggle */}
          <div className="flex bg-white border border-gray-100 rounded-full p-1 mb-8 shadow-sm">
            <button onClick={() => { setIsLogin(true); reset() }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
                isLogin ? 'bg-[#FF6B2B] text-white shadow' : 'text-gray-500 hover:text-gray-700'
              }`}>Sign In</button>
            <button onClick={() => { setIsLogin(false); reset() }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
                !isLogin ? 'bg-[#FF6B2B] text-white shadow' : 'text-gray-500 hover:text-gray-700'
              }`}>Sign Up</button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#FF6B2B] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-black text-lg">YSP</span>
              </div>
              <h1 className="text-2xl font-black text-[#1a1a2e]">{isLogin ? 'Welcome Back' : 'Join YSP'}</h1>
              <p className="text-gray-500 text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Create your account today'}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name *</label>
                  <input {...register('name', { required: 'Name is required' })} placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] transition" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Email *</label>
                <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                  type="email" placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] transition" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Password *</label>
                <div className="relative">
                  <input {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })}
                    type={showPass ? 'text' : 'password'} placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B] transition pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#FF6B2B] text-white py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition disabled:opacity-50 mt-2">
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            {isLogin && (
              <p className="text-center text-xs text-gray-400 mt-4">
                <Link to="#" className="hover:text-[#FF6B2B] transition">Forgot your password?</Link>
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
