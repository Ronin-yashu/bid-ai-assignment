import { Router } from 'express'
import {
  submitApplication,
  getApplications,
  getApplicationStats,
  getApplicationById,
  updateApplicationStatus
} from '../controllers/applicationsController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'

const router = Router()

// Public routes
router.post('/submit', submitApplication)                              // POST /api/application/submit

// IMPORTANT: /stats MUST come before /:id — otherwise Express matches 'stats' as an id
router.get('/stats', verifyToken, requireAdmin, getApplicationStats)   // GET  /api/application/stats

// GET /api/get/applications — assignment spec (mounted at /api/get/applications)
router.get('/', getApplications)

// GET /api/application/:id — assignment spec
router.get('/:id', getApplicationById)

// Admin-only
router.patch('/:id/status', verifyToken, requireAdmin, updateApplicationStatus)

export default router
