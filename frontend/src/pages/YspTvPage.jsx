import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { Play, Users, Tv, Mic } from 'lucide-react'

const episodes = [
  { title: 'Youth Leadership in Modern India', duration: '42 min', category: 'Leadership', views: '12.4K', featured: true },
  { title: 'Understanding the Indian Constitution', duration: '38 min', category: 'Governance', views: '9.8K', featured: false },
  { title: 'Rural Development & Policy Making', duration: '31 min', category: 'Policy', views: '7.2K', featured: false },
  { title: 'Election Reforms — What India Needs', duration: '45 min', category: 'Reform', views: '15.1K', featured: false },
  { title: 'Women in Political Leadership', duration: '29 min', category: 'Leadership', views: '11.3K', featured: false },
  { title: 'Economic Policy for New India', duration: '52 min', category: 'Economy', views: '8.6K', featured: false },
]

const stats = [
  { icon: <Tv size={20} />, value: '50+', label: 'Episodes' },
  { icon: <Users size={20} />, value: '1L+', label: 'Viewers' },
  { icon: <Mic size={20} />, value: '25+', label: 'Speakers' },
  { icon: <Play size={20} />, value: '4.8★', label: 'Rating' },
]

const categoryColors = {
  Leadership: 'bg-orange-100 text-[#FF6B2B]',
  Governance: 'bg-blue-100 text-blue-600',
  Policy: 'bg-green-100 text-green-600',
  Reform: 'bg-purple-100 text-purple-600',
  Economy: 'bg-yellow-100 text-yellow-700',
}

export default function YspTvPage() {
  const handleWatch = (title) => {
    toast('🎬 Launching player...', {
      icon: '▶️',
      duration: 2500,
    })
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      {/* Hero */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-bold px-4 py-1.5 rounded-full">YSP TV</span>
            <h1 className="text-5xl font-black text-white mt-5 mb-5 leading-tight">Awaaz of <span className="text-[#FF6B2B]">New Bharat</span></h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">YSP TV is a platform dedicated to political literacy and thoughtful public dialogue. Through conversations with young leaders, policy explainers, and issue-focused discussions, YSP TV aims to make governance understandable and accessible to every citizen.</p>
            <ul className="space-y-2 mb-8">
              {['Highlight emerging youth voices', 'Simplify complex policy debates', 'Encourage informed civic participation'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B2B]"></span>{item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => handleWatch('Featured Episode')}
                className="bg-[#FF6B2B] text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-orange-600 transition">
                <Play size={16} fill="white" /> Watch Now
              </button>
              <a
                href="https://www.youtube.com/@yuvashaktiparty"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold text-sm hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition">Visit YSP TV Channel</a>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map(s => (
                <div key={s.label} className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-[#FF6B2B] flex justify-center mb-2">{s.icon}</div>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-700 rounded-xl p-4">
              <p className="text-xs text-[#FF6B2B] font-semibold mb-1">Featured Episode</p>
              <p className="text-white text-sm font-bold">Youth Leadership in Modern India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">Latest Episodes</h2>
          <p className="text-gray-500 text-sm mb-10">Watch, learn, and engage with India's most important conversations.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {episodes.map(ep => (
              <div
                key={ep.title}
                onClick={() => handleWatch(ep.title)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition group cursor-pointer">
                <div className="bg-[#1a1a2e] h-44 flex items-center justify-center relative">
                  {ep.featured && <span className="absolute top-3 left-3 bg-[#FF6B2B] text-white text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>}
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-[#FF6B2B] transition">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="p-5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[ep.category] || 'bg-gray-100 text-gray-600'}`}>{ep.category}</span>
                  <h3 className="font-bold text-[#1a1a2e] mt-3 mb-2 text-sm leading-snug">{ep.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{ep.duration}</span>
                    <span>{ep.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
