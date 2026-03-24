export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Address */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white font-bold text-sm">YSP</div>
            <span className="font-semibold text-sm">Yuva Shakti Party</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">📍 Address:</p>
          <p className="text-xs text-gray-400">Yuva Shakti Party, Complete address, New Delhi, India</p>
          <p className="text-xs text-gray-400 mt-2">📞 +91 000 000 0000</p>
        </div>

        {/* About */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-[#FF6B2B]">About</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Transparency</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">State 2026</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-[#FF6B2B]">Legal</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-[#FF6B2B]">Social Links</h4>
          <div className="flex gap-3">
            {['f', 'in', 'yt', 'tw'].map(s => (
              <a key={s} href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs hover:bg-[#FF6B2B] transition">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">Copyright © 2025 Yuva Shakti Party. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
