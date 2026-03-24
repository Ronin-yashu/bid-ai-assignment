import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Membership', href: '#membership' },
    { label: 'YSP TV', href: '#ysp-tv' },
    { label: 'Media & Press', href: '#media' },
    { label: 'Transparency', href: '#transparency' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white font-bold text-sm">YSP</div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              className={`text-sm font-medium hover:text-[#FF6B2B] transition-colors ${
                location.pathname === link.href ? 'text-[#FF6B2B]' : 'text-gray-700'
              }`}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <select className="text-sm border border-gray-200 rounded px-2 py-1">
            <option>English</option>
          </select>
          <Link to="/login" className="text-sm text-gray-600 hover:text-[#FF6B2B] font-medium">Login</Link>
          <Link to="/signup" className="bg-[#FF6B2B] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition">
            Join Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="text-sm text-gray-700 hover:text-[#FF6B2B]">
              {link.label}
            </a>
          ))}
          <Link to="/login" className="text-sm text-gray-600">Login</Link>
          <Link to="/signup" className="bg-[#FF6B2B] text-white text-sm font-semibold px-4 py-2 rounded-full text-center">Join Us</Link>
        </div>
      )}
    </nav>
  )
}
