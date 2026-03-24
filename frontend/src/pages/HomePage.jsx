import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#FF6B2B] font-semibold text-sm mb-2">Yuva Shakti Party</p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Leadership for a Thinking <span className="text-[#FF6B2B]">BHARAT</span>
            </h1>
            <p className="text-gray-600 text-sm mb-2">Yuva Shakti Party is India's first structured leadership development political platform — designed to train, certify, and empower the next generation of ethical leaders.</p>
            <div className="flex gap-4 mt-6">
              <button className="bg-[#FF6B2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">Join the Movement</button>
              <button className="border border-[#FF6B2B] text-[#FF6B2B] px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition">Volunteer</button>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Hero Image</span>
          </div>
        </div>
      </section>

      {/* Why YSP Exists */}
      <section className="bg-gray-50 py-16" id="about">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FF6B2B] mb-4">Why YSP Exists</h2>
          <p className="text-gray-700 text-lg font-semibold">India does not lack youth.</p>
          <p className="text-gray-700 text-lg font-semibold mb-4">India lacks structured leadership development</p>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm">For decades, political systems have mobilized young people through emotion, identity, and temporary campaigns. Yet very few institutions prepare them intellectually for governance. <span className="text-[#FF6B2B] font-semibold">Yuva Shakti Party</span> was founded to change this reality.</p>
          <div className="mt-6">
            <p className="font-bold text-gray-800">Our goal.</p>
            <p className="text-gray-600 text-sm mt-2">Our goal is simple. Transform politics from a system of visibility into a system of preparation — where leadership is trained, evaluated, and earned.</p>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800 rounded-2xl h-80 flex flex-col items-center justify-end p-4">
            <div className="w-24 h-24 bg-gray-600 rounded-full mb-2"></div>
            <p className="text-white font-semibold text-sm">Dr. Deepak Chaurasiya</p>
            <p className="text-gray-400 text-xs">Founder, Yuva Shakti Party</p>
          </div>
          <div>
            <span className="bg-orange-100 text-[#FF6B2B] text-xs font-semibold px-3 py-1 rounded-full">Bundelkhand</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-4">"From Barigarh to Bharat "</h2>
            <p className="text-gray-600 text-sm mb-3">Born in the Bundelkhand region of India, <span className="text-[#FF6B2B] font-semibold">Dr. Deepak Chaurasiya's</span> early life was shaped by economic uncertainty and social constraints.</p>
            <p className="text-gray-600 text-sm mb-3">Instead of entering the workforce early, he chose the path of education — pursuing engineering, <span className="text-[#FF6B2B] font-semibold">advanced research, and legal studies</span> to understand how institutions function.</p>
            <p className="text-gray-600 text-sm">Today his work <span className="text-[#FF6B2B] font-semibold">spans entrepreneurship, technology, rural development, and policy research.</span></p>
            <blockquote className="mt-4 border-l-4 border-[#FF6B2B] pl-4 italic text-gray-600 text-sm">
              "Governance should not be accidental. It must be prepared for."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Vision 2040 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FF6B2B] mb-2">Our Vision for 2040</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm mb-10">The future of Bharat depends not only on the policies, but on the quality of those who design and implement them.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Educated Leadership', desc: 'Public leadership must be grounded in constitutional literacy, economic understanding, and policy competence.' },
              { title: 'Evidence-Based Governance', desc: 'Decisions must be driven by research, data analysis, and measurable outcomes rather than rhetoric.' },
              { title: 'Youth as Decision Makers', desc: 'Young citizens must participate not as symbolic participants but as trained contributors to national policy and governance.' },
            ].map(v => (
              <div key={v.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#FF6B2B] rounded-full"></div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 border border-[#FF6B2B] text-[#FF6B2B] px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition">View Complete Vision Document</button>
        </div>
      </section>

      {/* Transparency */}
      <section className="bg-[#FF6B2B] py-16" id="transparency">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Transparency is <span className="underline">Non-Negotiable</span></h2>
          <p className="text-orange-100 max-w-2xl mx-auto text-sm mb-10">
            Trust in institutions is built through accountability. <span className="font-semibold text-white">Yuva Shakti Party</span> is committed to maintaining full transparency in its <span className="font-semibold text-white underline">organizational processes, financial disclosures, and governance decisions.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Financial disclosure', 'Governance oversight', 'Public accountability'].map(item => (
              <div key={item} className="bg-white/20 backdrop-blur rounded-xl p-6">
                <div className="w-12 h-12 bg-white/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl">👁</span>
                </div>
                <p className="text-white font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a2e] py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-2">Be Part of a Structured <span className="text-[#FF6B2B]">Political Future</span></h2>
          <p className="text-gray-400 text-sm mb-6">India's next generation of leadership must be prepared, ethical, and capable. If you believe politics should reward competence rather than inheritance, <span className="text-white font-semibold">YSP welcomes you.</span></p>
          <div className="flex gap-4 justify-center">
            <button className="bg-[#FF6B2B] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">Become a Member</button>
            <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">Volunteer</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
