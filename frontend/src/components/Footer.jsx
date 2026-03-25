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
              <span>Yuva Shakti Party, New Delhi, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-[#FF6B2B] flex-shrink-0" />
              <span>+91 000 000 0000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#FF6B2B] flex-shrink-0" />
              <a href="mailto:contact@ysp.in" className="hover:text-[#FF6B2B] transition">contact@ysp.in</a>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">About</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/about" className="hover:text-[#FF6B2B] transition">About Us</Link></li>
            <li><Link to="/transparency" className="hover:text-[#FF6B2B] transition">Transparency</Link></li>
            <li><Link to="/careers" className="hover:text-[#FF6B2B] transition">Careers</Link></li>
            <li><Link to="/membership" className="hover:text-[#FF6B2B] transition">Membership</Link></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/ysp-tv" className="hover:text-[#FF6B2B] transition">YSP TV</Link></li>
            <li><Link to="/media" className="hover:text-[#FF6B2B] transition">Media & Press</Link></li>
            <li><Link to="/login" className="hover:text-[#FF6B2B] transition">Login / Sign Up</Link></li>
            <li><Link to="/profile" className="hover:text-[#FF6B2B] transition">My Profile</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
          <div className="flex gap-3 mb-5">
            {[
              { icon: <Facebook size={15} />, href: 'https://facebook.com' },
              { icon: <Linkedin size={15} />, href: 'https://linkedin.com' },
              { icon: <Youtube size={15} />, href: 'https://youtube.com' },
              { icon: <Twitter size={15} />, href: 'https://twitter.com' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF6B2B] transition text-white">
                {s.icon}
              </a>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-gray-500">Legal</p>
            <a href="#" className="block hover:text-[#FF6B2B] transition">Terms & Conditions</a>
            <a href="#" className="block hover:text-[#FF6B2B] transition">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-xs">
        Copyright &copy; 2026 Yuva Shakti Party. All Rights Reserved.
      </div>
    </footer>
  )
}
