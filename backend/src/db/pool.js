import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg
const isProd = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // Render PostgreSQL requires SSL in production
  ssl: isProd ? { rejectUnauthorized: false } : false,
})

pool.on('error', (err) => {
  console.error('Unexpected DB pool error', err)
})

export default pool
