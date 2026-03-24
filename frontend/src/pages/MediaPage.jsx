import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Newspaper, Radio, ExternalLink, Calendar } from 'lucide-react'

const pressItems = [
  { outlet: 'The Hindu', title: 'YSP launches structured leadership training for youth in MP', date: 'Jan 12, 2026', category: 'Print Media' },
  { outlet: 'NDTV', title: 'Yuva Shakti Party — the new face of youth politics in India', date: 'Dec 5, 2025', category: 'TV' },
  { outlet: 'Indian Express', title: 'How YSP is changing how young Indians think about governance', date: 'Nov 20, 2025', category: 'Print Media' },
  { outlet: 'Scroll.in', title: 'YSP\'s policy research wing releases report on rural education', date: 'Oct 15, 2025', category: 'Digital' },
  { outlet: 'Republic World', title: 'Dr. Deepak Chaurasiya on the future of political leadership in India', date: 'Sep 8, 2025', category: 'TV' },
  { outlet: 'The Wire', title: 'YSP and the promise of evidence-based governance', date: 'Aug 22, 2025', category: 'Digital' },
]

const mediaKitItems = [
  { title: 'YSP Press Kit 2026', desc: 'Official press kit with logos, brand guidelines, and leadership bios.', type: 'PDF' },
  { title: 'Leadership Photos', desc: 'High-resolution photos of YSP leadership and events.', type: 'ZIP' },
  { title: 'Policy Briefs', desc: 'Latest policy research publications from YSP research wing.', type: 'PDF' },
  { title: 'Annual Report 2025', desc: 'Complete organizational report covering all activities and finances.', type: 'PDF' },
]

const catColors = {
  'Print Media': 'bg-blue-100 text-blue-600',
  'TV': 'bg-red-100 text-red-600',
  'Digital': 'bg-green-100 text-green-600',
}

export default function MediaPage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      {/* Hero */}
      <section className="bg-[#1a1a2e] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="bg-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-bold px-4 py-1.5 rounded-full">Media & Press</span>
          <h1 className="text-5xl font-black text-white mt-5 mb-5">YSP in the <span className="text-[#FF6B2B]">News</span></h1>
          <p className="text-gray-400 text-sm leading-relaxed">Press coverage, official statements, media resources and everything journalists need to cover Yuva Shakti Party.</p>
          <div className="flex gap-4 justify-center mt-8">
            <button className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition">Press Enquiry</button>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-semibold text-sm hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition">Download Media Kit</button>
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Press Coverage</h2>
          <p className="text-gray-500 text-sm mb-10">Recent mentions and features in national media</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pressItems.map(item => (
              <div key={item.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#FF6B2B]/30 transition group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${catColors[item.category]}`}>{item.category}</span>
                  </div>
                  <ExternalLink size={15} className="text-gray-300 group-hover:text-[#FF6B2B] transition" />
                </div>
                <p className="text-xs text-[#FF6B2B] font-bold mb-2">{item.outlet}</p>
                <h3 className="font-semibold text-[#1a1a2e] text-sm leading-snug mb-3">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={12} /><span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Media Resources</h2>
          <p className="text-gray-500 text-sm mb-10">Download official YSP materials for press and publication</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mediaKitItems.map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition cursor-pointer group">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <Newspaper size={18} className="text-[#FF6B2B]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{item.desc}</p>
                <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-semibold">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#1a1a2e] py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">Media Enquiries</h2>
          <p className="text-gray-400 text-sm mb-2">For press and media enquiries, please contact our communications team.</p>
          <p className="text-[#FF6B2B] font-semibold mb-8">media@ysp.in</p>
          <button className="bg-[#FF6B2B] text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition">Send Press Enquiry</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
