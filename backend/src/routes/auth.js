import { Router } from 'express'
import { body } from 'express-validator'
import { register, login, getProfile } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
  ],
  register
)

router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
  ],
  login
)

router.get('/profile', verifyToken, getProfile)

export default router
