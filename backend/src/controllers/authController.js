import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db/pool.js'

const generateToken = (user) => jwt.sign(
  { id: user.id, email: user.email, role: user.role, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
)

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body
    const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email])
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }
    const hash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role, created_at',
      [name, email, hash, role]
    )
    const user = result.rows[0]
    const token = generateToken(user)
    res.status(201).json({ success: true, message: 'Registered successfully', token, user })
  } catch (err) { next(err) }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    const token = generateToken(user)
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) { next(err) }
}

export const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id=$1', [req.user.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, user: result.rows[0] })
  } catch (err) { next(err) }
}
