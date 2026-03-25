import { Routes, Route, Link } from 'react-router-dom'
import NotificationToast from './components/NotificationToast'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import CareersPage from './pages/CareersPage'
import LoginPage from './pages/LoginPage'
import PostJobPage from './pages/PostJobPage'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import MembershipPage from './pages/MembershipPage'
import YspTvPage from './pages/YspTvPage'
import MediaPage from './pages/MediaPage'
import TransparencyPage from './pages/TransparencyPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <>
      <NotificationToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/ysp-tv" element={<YspTvPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute><PostJobPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center flex-col gap-4 font-sans">
            <div className="w-16 h-16 bg-[#FF6B2B] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-black text-2xl">!</span>
            </div>
            <h1 className="text-6xl font-black text-[#FF6B2B]">404</h1>
            <p className="text-gray-500 text-lg">Page not found</p>
            <Link to="/" className="bg-[#FF6B2B] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition mt-2">Go Home</Link>
          </div>
        } />
      </Routes>
    </>
  )
}
