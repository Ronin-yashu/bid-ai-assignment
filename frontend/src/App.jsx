import { Routes, Route } from 'react-router-dom'
import NotificationToast from './components/NotificationToast'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import CareersPage from './pages/CareersPage'
import LoginPage from './pages/LoginPage'
import PostJobPage from './pages/PostJobPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <>
      <NotificationToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post-job" element={<ProtectedRoute><PostJobPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-6xl font-black text-[#FF6B2B]">404</h1>
            <p className="text-gray-500">Page not found</p>
            <a href="/" className="bg-[#FF6B2B] text-white px-6 py-2.5 rounded-full text-sm font-semibold">Go Home</a>
          </div>
        } />
      </Routes>
    </>
  )
}
