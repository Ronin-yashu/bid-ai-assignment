import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db/pool.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'ysp_secret_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const exists = await pool.query('SELECT id FROM users WHERE email=$1', [email])
    if (exists.rows.length > 0)
      return res.status(409).json({ success: false, message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
      [name, email, hashedPassword]
    )
    const user = result.rows[0]
    const token = signToken(user.id)
    res.status(201).json({ success: true, message: 'Account created successfully', user, token })
  } catch (err) { next(err) }
}

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, admin_secret } = req.body

    // Guard: must match ADMIN_SECRET env var
    const expectedSecret = process.env.ADMIN_SECRET || 'bidai_admin_2026'
    if (admin_secret !== expectedSecret)
      return res.status(403).json({ success: false, message: 'Invalid admin secret' })

    const exists = await pool.query('SELECT id FROM users WHERE email=$1', [email])
    if (exists.rows.length > 0)
      return res.status(409).json({ success: false, message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, 'admin') RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword]
    )
    const user = result.rows[0]
    const token = signToken(user.id)
    res.status(201).json({ success: true, message: 'Admin account created', user, token })
  } catch (err) { next(err) }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await pool.query(
      'SELECT id, name, email, role, password, created_at FROM users WHERE email=$1',
      [email]
    )
    const user = result.rows[0]
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password' })

    const { password: _, ...userWithoutPassword } = user
    const token = signToken(user.id)
    res.json({ success: true, message: 'Login successful', user: userWithoutPassword, token })
  } catch (err) { next(err) }
}

export const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id=$1',
      [req.user.id]
    )
    if (!result.rows[0]) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, user: result.rows[0] })
  } catch (err) { next(err) }
}
