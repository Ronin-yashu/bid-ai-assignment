import pool from '../db/pool.js'

export const getJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, department } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    let conditions = ['is_active = true']
    const params = []
    if (department) { params.push(department); conditions.push(`department = $${params.length}`) }
    const where = `WHERE ${conditions.join(' AND ')}`
    params.push(parseInt(limit), offset)
    const result = await pool.query(
      `SELECT * FROM jobs ${where} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    const countResult = await pool.query(`SELECT COUNT(*) FROM jobs ${where}`, params.slice(0, -2))
    res.json({ success: true, jobs: result.rows, pagination: { page: parseInt(page), limit: parseInt(limit), total: parseInt(countResult.rows[0].count) } })
  } catch (err) { next(err) }
}

export const createJob = async (req, res, next) => {
  try {
    const { title, department, location, type = 'Full-time', description, requirements } = req.body
    const result = await pool.query(
      `INSERT INTO jobs (title, department, location, type, description, requirements)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [title, department, location, type, description || null, requirements || null]
    )
    res.status(201).json({ success: true, message: 'Job posted successfully', job: result.rows[0] })
  } catch (err) { next(err) }
}

export const deleteJob = async (req, res, next) => {
  try {
    const result = await pool.query(
      'UPDATE jobs SET is_active=false WHERE id=$1 RETURNING id',
      [req.params.id]
    )
    if (!result.rows[0]) return res.status(404).json({ success: false, message: 'Job not found' })
    res.json({ success: true, message: 'Job removed' })
  } catch (err) { next(err) }
}
