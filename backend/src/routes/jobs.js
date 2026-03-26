import { Router } from 'express'
import { body } from 'express-validator'
import { getJobs, createJob, deleteJob } from '../controllers/jobsController.js'
import { verifyToken } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const jobValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  validate
]

// GET /api/get/jobs  — fetch all jobs for Careers page
router.get('/', getJobs)

// POST /api/job/create  — assignment spec route
router.post('/create', verifyToken, jobValidation, createJob)

// POST /api/job/  — fallback
router.post('/', verifyToken, jobValidation, createJob)

router.delete('/:id', verifyToken, deleteJob)

export default router
