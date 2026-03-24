import { Router } from 'express'
import { body, param } from 'express-validator'
import { getJobs, getJobById, createJob, deleteJob } from '../controllers/jobsController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.get('/', getJobs)
router.get('/:id',
  [param('id').isUUID().withMessage('Invalid job ID'), validate],
  getJobById
)

router.post('/',
  [
    verifyToken,
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    validate
  ],
  createJob
)

router.delete('/:id',
  [
    verifyToken,
    requireAdmin,
    param('id').isUUID().withMessage('Invalid job ID'),
    validate
  ],
  deleteJob
)

export default router
