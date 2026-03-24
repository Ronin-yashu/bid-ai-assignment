import { Router } from 'express'
import { body, param, query } from 'express-validator'
import { submitApplication, getApplications, updateApplicationStatus, getApplicationStats } from '../controllers/applicationsController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.post('/submit',
  [
    body('full_name').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    validate
  ],
  submitApplication
)

router.get('/', verifyToken, requireAdmin, getApplications)
router.get('/stats', verifyToken, requireAdmin, getApplicationStats)

router.patch('/:id/status',
  [
    verifyToken,
    requireAdmin,
    param('id').isUUID().withMessage('Invalid application ID'),
    body('status').isIn(['pending', 'reviewed', 'shortlisted', 'rejected']).withMessage('Invalid status'),
    validate
  ],
  updateApplicationStatus
)

export default router
