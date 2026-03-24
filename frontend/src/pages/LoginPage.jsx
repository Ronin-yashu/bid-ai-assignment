import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const res = await api.post(endpoint, data)
      setAuth(res.data.user, res.data.token)
      toast.success(isLogin ? 'Welcome back!' : 'Account created!')
      reset()
      setTimeout(() => navigate('/'), 800)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#FF6B2B] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-black text-lg">YSP</span>
              </div>
              <h1 className="text-2xl font-black text-[#1a1a2e]">{ isLogin ? 'Welcome Back' : 'Create Account' }</h1>
              <p className="text-gray-500 text-sm mt-1">{ isLogin ? 'Sign in to your YSP account' : 'Join Yuva Shakti Party' }</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input {...register('name', { required: 'Name is required' })}
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Email</label>
                <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                  type="email" placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Password</label>
                <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type="password" placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#FF6B2B] text-white py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition disabled:opacity-50 mt-2">
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setIsLogin(!isLogin); reset() }} className="text-[#FF6B2B] font-semibold hover:underline">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
