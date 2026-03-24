import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eye, FileText, DollarSign, Users, Download, CheckCircle } from 'lucide-react'

const reports = [
  { title: 'Annual Financial Report 2025', desc: 'Complete income and expenditure report for FY 2025.', type: 'Financial', date: 'Feb 2026' },
  { title: 'Governance Audit Report Q4 2025', desc: 'Internal governance audit conducted by independent auditors.', type: 'Audit', date: 'Jan 2026' },
  { title: 'Membership Fund Utilization', desc: 'Detailed breakdown of how membership fees are utilized.', type: 'Financial', date: 'Dec 2025' },
  { title: 'Leadership Elections Report', desc: 'Report on YSP internal leadership elections and process.', type: 'Governance', date: 'Nov 2025' },
  { title: 'Policy Research Funding', desc: 'Sources and utilization of policy research funding.', type: 'Financial', date: 'Oct 2025' },
  { title: 'State Chapter Activity Report', desc: 'Quarterly activity reports from all active state chapters.', type: 'Operations', date: 'Sep 2025' },
]

const typeColors = {
  Financial: 'bg-green-100 text-green-700',
  Audit: 'bg-blue-100 text-blue-700',
  Governance: 'bg-orange-100 text-[#FF6B2B]',
  Operations: 'bg-purple-100 text-purple-700',
}

const pillars = [
  { icon: <DollarSign size={22} />, title: 'Financial Disclosure', desc: 'All income sources, expenditures, and fund allocations are published quarterly and available for public review.' },
  { icon: <Eye size={22} />, title: 'Governance Oversight', desc: 'Independent auditors review YSP governance processes annually. Results are published without redaction.' },
  { icon: <Users size={22} />, title: 'Public Accountability', desc: 'Every major decision is subject to member review. YSP holds open town halls quarterly for questions.' },
  { icon: <FileText size={22} />, title: 'Policy Transparency', desc: 'All policy positions, research papers, and white papers are publicly available without subscription.' },
]

export default function TransparencyPage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      {/* Hero */}
      <section className="bg-[#FF6B2B] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-black text-white mb-5">Transparency is <span className="underline">Non-Negotiable</span></h1>
          <p className="text-orange-100 text-sm leading-relaxed max-w-2xl mx-auto">Trust in institutions is built through accountability. <strong className="text-white">Yuva Shakti Party</strong> is committed to maintaining full transparency in its organizational processes, financial disclosures, and governance decisions.</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-3">Our Transparency Framework</h2>
          <p className="text-gray-500 text-sm text-center mb-12">Four pillars of accountability that guide YSP's operations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(p => (
              <div key={p.title} className="p-6 rounded-2xl border border-gray-100 hover:border-[#FF6B2B]/30 hover:shadow-md transition group">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF6B2B] mb-4 group-hover:bg-[#FF6B2B] group-hover:text-white transition">{p.icon}</div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">Public Reports & Disclosures</h2>
          <p className="text-gray-500 text-sm mb-10">All reports are publicly available. No login required.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reports.map(r => (
              <div key={r.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B2B] transition">
                  <FileText size={18} className="text-[#FF6B2B] group-hover:text-white transition" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${typeColors[r.type]}`}>{r.type}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <h3 className="font-bold text-[#1a1a2e] text-sm mb-1">{r.title}</h3>
                  <p className="text-gray-500 text-xs">{r.desc}</p>
                </div>
                <Download size={16} className="text-gray-300 group-hover:text-[#FF6B2B] transition flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-[#1a1a2e] py-14">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Our Commitment to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Publish financial reports within 30 days of each quarter end',
              'Hold open town halls quarterly for member questions',
              'Conduct annual independent audits',
              'Respond to RTI-equivalent requests within 15 working days',
              'Publish all leadership election processes and results',
              'Maintain a public grievance redressal mechanism',
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <CheckCircle size={16} className="text-[#FF6B2B] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
