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

const app = express()
const PORT = process.env.PORT || 5000

// Security
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { success: false, message: 'Too many requests, please try again later.' } })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, message: 'Too many login attempts, please try again later.' } })
app.use('/api/', limiter)
app.use('/api/auth', authLimiter)

// Middleware
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/get/jobs', jobRoutes)
app.use('/api/application', applicationRoutes)

// Health check
app.get('/health', (req, res) => res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() }))

// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }))

// Error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
