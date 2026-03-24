import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown } from 'lucide-react'

const tiers = [
  {
    icon: <Star size={24} />,
    name: 'General Member',
    price: 'Free',
    color: 'border-gray-200',
    badge: '',
    features: [
      'Access to YSP newsletters',
      'Invitation to public events',
      'YSP digital membership card',
      'Community forum access',
      'Monthly governance digest',
    ],
  },
  {
    icon: <Zap size={24} />,
    name: 'Active Cadre',
    price: '₹299/yr',
    color: 'border-[#FF6B2B]',
    badge: 'Most Popular',
    features: [
      'Everything in General',
      'Leadership training modules',
      'Policy research access',
      'YSP TV exclusive content',
      'State chapter participation',
      'Certificate of participation',
    ],
  },
  {
    icon: <Crown size={24} />,
    name: 'Leadership Circle',
    price: '₹999/yr',
    color: 'border-[#1a1a2e]',
    badge: 'Premium',
    features: [
      'Everything in Active Cadre',
      'Direct mentorship access',
      'Governance internship priority',
      'Policy paper co-authorship',
      'National convention access',
      'Leadership certification',
      'Direct line to YSP leadership',
    ],
  },
]

const steps = [
  { num: '01', title: 'Fill the Form', desc: 'Complete the online membership application with your details and area of interest.' },
  { num: '02', title: 'Verification', desc: 'Our team verifies your application within 48 hours and sends confirmation.' },
  { num: '03', title: 'Orientation', desc: 'Attend the online orientation session to understand YSP\'s mission and your role.' },
  { num: '04', title: 'Get Started', desc: 'Receive your membership card and access to all resources and programs.' },
]

export default function MembershipPage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <div className="h-1 bg-[#FF6B2B]"></div>

      {/* Hero */}
      <section className="bg-[#1a1a2e] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="bg-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-bold px-4 py-1.5 rounded-full">Membership</span>
          <h1 className="text-5xl font-black text-white mt-5 mb-5">Join the <span className="text-[#FF6B2B]">Movement</span></h1>
          <p className="text-gray-400 text-sm leading-relaxed">Become part of India's most structured youth leadership development platform. Choose the membership that fits your commitment level.</p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-3">Membership Plans</h2>
          <p className="text-gray-500 text-sm text-center mb-12">Choose the level of involvement that suits you</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(tier => (
              <div key={tier.name} className={`bg-white rounded-2xl border-2 ${tier.color} p-8 relative hover:shadow-lg transition`}>
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B2B] text-white text-xs font-bold px-4 py-1 rounded-full">{tier.badge}</span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  tier.name === 'Active Cadre' ? 'bg-[#FF6B2B] text-white' : 'bg-gray-100 text-gray-700'
                }`}>{tier.icon}</div>
                <h3 className="text-xl font-black text-[#1a1a2e] mb-1">{tier.name}</h3>
                <p className="text-3xl font-black text-[#FF6B2B] mb-6">{tier.price}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check size={14} className="text-[#FF6B2B] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login"
                  className={`block text-center py-3 rounded-full text-sm font-bold transition ${
                    tier.name === 'Active Cadre'
                      ? 'bg-[#FF6B2B] text-white hover:bg-orange-600'
                      : 'border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white'
                  }`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-3">How It Works</h2>
          <p className="text-gray-500 text-sm text-center mb-12">Simple steps to join YSP</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 bg-[#FF6B2B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black">{s.num}</span>
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a2e] py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Lead?</h2>
          <p className="text-gray-400 text-sm mb-8">Join 5,000+ young Indians already part of the YSP movement.</p>
          <Link to="/login" className="bg-[#FF6B2B] text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition inline-block">Join Now — It's Free</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
