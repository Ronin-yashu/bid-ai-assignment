import { Router } from 'express'
import { body } from 'express-validator'
import { getJobs, createJob, deleteJob } from '../controllers/jobsController.js'
import { verifyToken } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.get('/', getJobs)

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

router.delete('/:id', verifyToken, deleteJob)

export default router
