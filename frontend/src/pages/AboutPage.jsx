import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Target, Users, BookOpen, Award, ChevronRight } from 'lucide-react'

const timeline = [
  { year: '2018', title: 'Foundation', desc: 'YSP was founded by Dr. Deepak Chaurasiya in Bundelkhand with a vision to reform political leadership.' },
  { year: '2020', title: 'First Academy', desc: 'Launched the first YSP Leadership Academy with 50 students from across Madhya Pradesh.' },
  { year: '2022', title: 'National Expansion', desc: 'Expanded to 5 states with over 500 trained members participating in governance research.' },
  { year: '2024', title: 'Policy Research Wing', desc: 'Established dedicated policy research teams covering education, economy, and rural development.' },
  { year: '2026', title: 'YSP TV & Media', desc: 'Launched YSP TV — Awaaz of New Bharat — a platform for political literacy and civic dialogue.' },
]

const values = [
  { icon: <Target size={22} />, title: 'Mission-Driven', desc: 'Every action at YSP is guided by a clear mission: prepare ethical, competent leaders for India.' },
  { icon: <BookOpen size={22} />, title: 'Knowledge First', desc: 'We believe governance must be grounded in deep research, constitutional literacy, and policy understanding.' },
  { icon: <Users size={22} />, title: 'Inclusive Leadership', desc: 'YSP welcomes youth from all backgrounds to participate in structured leadership development.' },
  { icon: <Award size={22} />, title: 'Accountability', desc: 'Full transparency in finances, governance decisions and organizational processes — always.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      {/* Hero */}
      <section className="bg-[#1a1a2e] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="bg-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-bold px-4 py-1.5 rounded-full">About YSP</span>
          <h1 className="text-5xl font-black text-white mt-5 mb-5 leading-tight">India's First Structured<br /><span className="text-[#FF6B2B]">Political Leadership Platform</span></h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">Yuva Shakti Party was founded to bridge the gap between youth potential and governance readiness — creating leaders who are trained, certified, and accountable.</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-3">Our Core Values</h2>
          <p className="text-gray-500 text-sm text-center mb-12">The principles that guide everything we do</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:border-[#FF6B2B]/30 transition group">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6B2B] mb-4 group-hover:bg-[#FF6B2B] group-hover:text-white transition">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#1a1a2e] rounded-2xl h-96 flex flex-col items-center justify-end p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent z-10"></div>
            <div className="w-36 h-36 bg-gray-600 rounded-full mb-4 z-20 border-4 border-[#FF6B2B]/30"></div>
            <p className="text-white font-bold text-lg z-20">Dr. Deepak Chaurasiya</p>
            <p className="text-[#FF6B2B] text-sm z-20">Founder & President, Yuva Shakti Party</p>
          </div>
          <div>
            <span className="bg-orange-100 text-[#FF6B2B] text-xs font-bold px-3 py-1 rounded-full">Founder's Story</span>
            <h2 className="text-3xl font-black text-[#1a1a2e] mt-4 mb-5">"From Barigarh to Bharat"</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Born in the Bundelkhand region of India, <span className="text-[#FF6B2B] font-semibold">Dr. Deepak Chaurasiya's</span> early life was shaped by economic uncertainty. His family's migration during childhood exposed him to the realities faced by millions of young Indians navigating survival before opportunity.</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Instead of entering the workforce early, he chose the path of education — pursuing engineering, <span className="text-[#FF6B2B] font-semibold">advanced research, and legal studies</span> to understand how institutions function.</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Today his work <span className="text-[#FF6B2B] font-semibold">spans entrepreneurship, technology, rural development, and policy research.</span></p>
            <blockquote className="border-l-4 border-[#FF6B2B] pl-4 italic text-gray-500 text-sm">"Governance should not be accidental. It must be prepared for."</blockquote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-3">Our Journey</h2>
          <p className="text-gray-500 text-sm text-center mb-12">Key milestones in YSP's growth</p>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100"></div>
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-16 h-16 bg-[#FF6B2B] rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0 z-10">{item.year}</div>
                  <div className="bg-gray-50 rounded-2xl p-5 flex-1 border border-gray-100">
                    <h3 className="font-bold text-[#1a1a2e] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FF6B2B] py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">Be Part of the Movement</h2>
          <p className="text-orange-100 text-sm mb-8">Join thousands of young Indians committed to building a better, more accountable political future.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login" className="bg-white text-[#FF6B2B] px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-50 transition">Become a Member</Link>
            <Link to="/careers" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition">View Careers</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
