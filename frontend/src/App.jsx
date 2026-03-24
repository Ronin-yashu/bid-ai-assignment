import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CareersPage from './pages/CareersPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PostJobPage from './pages/PostJobPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post-job" element={<PostJobPage />} />
    </Routes>
  )
}

export default App
