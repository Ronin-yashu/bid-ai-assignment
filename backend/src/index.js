import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import applicationRoutes from './routes/applications.js'
import { errorHandler } from './middleware/errorHandler.js'
import { initDB } from './db/init.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { success: false, message: 'Too many requests.' } })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, message: 'Too many login attempts.' } })
app.use('/api/', limiter)
app.use('/api/auth', authLimiter)

app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Auth routes
app.use('/api/auth', authRoutes)

// Job routes — assignment spec: POST /job/create, GET /get/jobs
app.use('/api/job', jobRoutes)             // POST /api/job/create
app.use('/api/get/jobs', jobRoutes)        // GET  /api/get/jobs

// Application routes — assignment spec: POST /application/submit, GET /get/applications, GET /applications/:id
app.use('/api/application', applicationRoutes)      // POST /api/application/submit, GET /api/application/:id
app.use('/api/get/applications', applicationRoutes) // GET  /api/get/applications

app.get('/health', (req, res) => res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() }))
app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }))
app.use(errorHandler)

// Auto-init DB tables on startup (safe for Render cold starts)
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
})
