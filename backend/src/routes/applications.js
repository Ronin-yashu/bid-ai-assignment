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
router.post('/submit', submitApplication)   // POST /api/application/submit

// GET /api/get/applications — assignment spec (mounted at /api/get/applications/)
router.get('/', getApplications)

// GET /api/application/:id — assignment spec
router.get('/:id', getApplicationById)

// Admin-only routes
router.get('/stats', verifyToken, requireAdmin, getApplicationStats)
router.patch('/:id/status', verifyToken, requireAdmin, updateApplicationStatus)

export default router
