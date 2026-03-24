import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const handleSubmit = e => {
    e.preventDefault()
    if (form.password !== form.confirm) return alert('Passwords do not match')
    alert('Signup functionality — connect to your auth backend!')
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white font-bold">YSP</div>
          <span className="text-white font-bold text-xl">Yuva Shakti Party</span>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h2>
          <p className="text-gray-500 text-sm mb-6">Join the movement today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name</label>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                placeholder="Your full name" required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                placeholder="you@example.com" required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))}
                placeholder="••••••••" required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={e => setForm(p => ({...p, confirm: e.target.value}))}
                placeholder="••••••••" required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2B]" />
            </div>
            <button type="submit"
              className="w-full bg-[#FF6B2B] text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-[#FF6B2B] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
