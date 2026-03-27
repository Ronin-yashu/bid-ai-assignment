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
const isProd = process.env.NODE_ENV === 'production'

// CORS — allow both production Vercel URL and localhost dev
const allowedOrigins = [
  'https://bid-ai-assignment.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
]
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL)

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true
}))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { success: false, message: 'Too many requests.' } })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, message: 'Too many login attempts.' } })
app.use('/api/', limiter)
app.use('/api/auth', authLimiter)

app.use(compression())
app.use(morgan(isProd ? 'combined' : 'dev'))
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

app.get('/health', (req, res) => res.json({
  success: true,
  status: 'ok',
  env: process.env.NODE_ENV || 'development',
  timestamp: new Date().toISOString()
}))

app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }))
app.use(errorHandler)

// Auto-init DB tables on startup
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running in ${isProd ? 'PRODUCTION' : 'DEV'} mode on port ${PORT}`))
})
