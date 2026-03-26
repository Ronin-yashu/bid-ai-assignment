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

// Public
router.post('/submit', submitApplication)

// Admin only
router.get('/stats', verifyToken, requireAdmin, getApplicationStats)
router.get('/', verifyToken, requireAdmin, getApplications)
router.get('/:id', verifyToken, requireAdmin, getApplicationById)
router.patch('/:id/status', verifyToken, requireAdmin, updateApplicationStatus)

export default router
