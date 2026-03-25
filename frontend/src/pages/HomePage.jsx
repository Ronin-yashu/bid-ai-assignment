import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B] w-full"></div>

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#FF6B2B] font-semibold text-sm tracking-wide mb-3">Yuva Shakti Party</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] leading-tight mb-5">
              Leadership for a Thinking <span className="text-[#FF6B2B]">BHARAT</span>
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Yuva Shakti Party is India's first structured leadership development political platform — designed to train, certify, and empower the next generation of ethical leaders.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/membership" className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-600 transition flex items-center gap-2">
                Join the Movement <ChevronRight size={15} />
              </Link>
              <Link to="/about" className="text-gray-500 text-sm border border-gray-200 px-6 py-3 rounded-full hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition">
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF6B2B] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-black text-2xl">YSP</span>
              </div>
              <p className="text-white font-bold">Yuva Shakti Party</p>
              <p className="text-gray-400 text-xs mt-1">India's Leadership Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why YSP Exists */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#FF6B2B] mb-6">Why YSP Exists</h2>
          <p className="text-gray-900 text-lg font-bold">India does not lack youth.</p>
          <p className="text-gray-900 text-lg font-bold mb-5">India lacks structured leadership development</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            For decades, political systems have mobilized young people through emotion, identity, and temporary campaigns. Yet very few institutions prepare them intellectually for governance. <span className="text-[#FF6B2B] font-semibold">Yuva Shakti Party</span> was founded to change this reality.
          </p>
          <div className="mt-6">
            <p className="font-bold text-gray-900 mb-2">Our goal.</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform politics from a system of visibility into a system of preparation — where leadership is trained, evaluated, and earned.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-[#FF6B2B] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#1a1a2e] rounded-2xl h-96 flex flex-col items-center justify-end p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent z-10"></div>
            <div className="w-32 h-32 bg-gray-600 rounded-full mb-3 z-20 border-4 border-[#FF6B2B]/30"></div>
            <p className="text-white font-bold text-base z-20">Dr. Deepak Chaurasiya</p>
            <p className="text-gray-400 text-xs z-20">Founder, Yuva Shakti Party</p>
          </div>
          <div>
            <span className="bg-orange-100 text-[#FF6B2B] text-xs font-semibold px-3 py-1 rounded-full">Founder's Story</span>
            <h2 className="text-3xl font-black text-gray-900 mt-4 mb-5">"From Barigarh to Bharat"</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Born in the Bundelkhand region of India, <span className="text-[#FF6B2B] font-semibold">Dr. Deepak Chaurasiya's</span> early life was shaped by economic uncertainty. His family's migration during childhood exposed him to the realities faced by millions of young Indians navigating survival before opportunity.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Instead of entering the workforce early, he chose the path of education — pursuing engineering, <span className="text-[#FF6B2B] font-semibold">advanced research, and legal studies</span> to understand how institutions function.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Today his work <span className="text-[#FF6B2B] font-semibold">spans entrepreneurship, technology, rural development, and policy research.</span>
            </p>
            <blockquote className="border-l-4 border-[#FF6B2B] pl-4 italic text-gray-600 text-sm mb-6">
              "Governance should not be accidental. It must be prepared for."
            </blockquote>
            <Link to="/about" className="text-[#FF6B2B] text-sm font-semibold hover:underline flex items-center gap-1">
              Read Full Story <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision 2040 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#FF6B2B] mb-3">Our Vision for 2040</h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-3">The future of Bharat depends not only on the policies, but on the quality of those who design and implement them.</p>
          <p className="text-gray-500 text-xs max-w-2xl mx-auto mb-10">YSP's long-term vision focuses on building leadership capable of governing a complex and rapidly changing nation.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏛️', title: 'Educated Leadership', desc: 'Public leadership must be grounded in constitutional literacy, economic understanding, and policy competence.' },
              { icon: '📊', title: 'Evidence-Based Governance', desc: 'Decisions must be driven by research, data analysis, and measurable outcomes rather than rhetoric.' },
              { icon: '🌱', title: 'Youth as Decision Makers', desc: 'Young citizens must participate not as symbolic participants but as trained contributors to national policy and governance.' },
            ].map(v => (
              <div key={v.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-base">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-10 border border-[#FF6B2B] text-[#FF6B2B] px-8 py-3 rounded-full font-semibold text-sm hover:bg-orange-50 transition inline-block">
            View Complete Vision →
          </Link>
        </div>
      </section>

      {/* Transparency */}
      <section className="bg-[#FF6B2B] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Transparency is <span className="underline">Non-Negotiable</span></h2>
          <p className="text-orange-100 max-w-2xl mx-auto text-sm leading-relaxed mb-3">Trust in institutions is built through accountability.</p>
          <p className="text-orange-100 max-w-2xl mx-auto text-sm leading-relaxed mb-10">
            <span className="font-bold text-white">Yuva Shakti Party</span> is committed to maintaining full transparency in its <span className="font-bold text-white underline">organizational processes, financial disclosures, and governance decisions.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: '💰', label: 'Financial Disclosure', path: '/transparency' },
              { icon: '🔍', label: 'Governance Oversight', path: '/transparency' },
              { icon: '👁', label: 'Public Accountability', path: '/transparency' },
            ].map(item => (
              <Link to={item.path} key={item.label} className="bg-orange-400/50 rounded-2xl p-8 hover:bg-orange-400/70 transition cursor-pointer block">
                <div className="w-14 h-14 bg-orange-300/50 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">{item.icon}</div>
                <p className="text-white font-bold text-sm">{item.label}</p>
              </Link>
            ))}
          </div>
          <Link to="/transparency" className="bg-white text-[#FF6B2B] px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-50 transition inline-block">
            View All Reports →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a2e] py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white mb-4">Be Part of a Structured <span className="text-[#FF6B2B]">Political Future</span></h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            India's next generation of leadership must be prepared, ethical, and capable.<br />
            If you believe politics should reward competence rather than inheritance, <span className="text-white font-bold">YSP welcomes you.</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/membership" className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Become a Member
            </Link>
            <Link to="/careers" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              View Careers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
