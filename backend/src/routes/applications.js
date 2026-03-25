import { Router } from 'express'
import { submitApplication, getApplications, getApplicationStats, updateApplicationStatus } from '../controllers/applicationsController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.post('/submit', submitApplication)
router.get('/stats', protect, adminOnly, getApplicationStats)
router.get('/', protect, adminOnly, getApplications)
router.patch('/:id/status', protect, adminOnly, updateApplicationStatus)

export default router
