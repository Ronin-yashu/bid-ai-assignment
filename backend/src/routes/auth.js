import { Router } from 'express'
import { body } from 'express-validator'
import { register, registerAdmin, login, getProfile } from '../controllers/authController.js'
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

// Secret admin registration — requires admin_secret in body
router.post('/register-admin',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('admin_secret').notEmpty().withMessage('Admin secret required'),
    validate
  ],
  registerAdmin
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
