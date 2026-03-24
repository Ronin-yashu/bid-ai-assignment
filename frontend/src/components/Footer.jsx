import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FF6B2B] rounded-full flex items-center justify-center">
              <span className="text-white font-black text-sm">YSP</span>
            </div>
            <span className="text-white font-bold text-base">Yuva Shakti Party</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-[#FF6B2B] mt-0.5 flex-shrink-0" />
              <span>Yuva Shakti Party, Complete address, New Delhi, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-[#FF6B2B] flex-shrink-0" />
              <span>+91 000 000 0000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#FF6B2B] flex-shrink-0" />
              <span>contact@ysp.in</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">About</h4>
          <ul className="space-y-2.5 text-xs">
            {['About Us','Transparency','Careers','State 2026'].map(l => (
              <li key={l}><Link to="#" className="hover:text-[#FF6B2B] transition">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
          <ul className="space-y-2.5 text-xs">
            {['Contact','Terms & Conditions','Privacy Policy'].map(l => (
              <li key={l}><Link to="#" className="hover:text-[#FF6B2B] transition">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Social Links</h4>
          <div className="flex gap-3">
            {[
              { icon: <Facebook size={15} />, href: '#' },
              { icon: <Linkedin size={15} />, href: '#' },
              { icon: <Youtube size={15} />, href: '#' },
              { icon: <Twitter size={15} />, href: '#' },
            ].map((s, i) => (
              <a key={i} href={s.href} className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF6B2B] transition text-white">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-xs">
        Copyright &copy; 2025 Yuva Shakti Party. All Rights Reserved.
      </div>
    </footer>
  )
}
