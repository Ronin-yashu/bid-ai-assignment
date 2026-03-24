import pool from '../db/pool.js'

export const submitApplication = async (req, res, next) => {
  try {
    const { job_id, full_name, email, phone, city_state, education, area_of_interest, why_join } = req.body
    const duplicate = await pool.query(
      'SELECT id FROM applications WHERE email=$1 AND job_id=$2',
      [email, job_id || null]
    )
    if (duplicate.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'You have already applied for this position' })
    }
    const result = await pool.query(
      `INSERT INTO applications (job_id, full_name, email, phone, city_state, education, area_of_interest, why_join)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [job_id || null, full_name, email, phone, city_state, education, area_of_interest, why_join]
    )
    res.status(201).json({ success: true, message: 'Application submitted successfully!', application: result.rows[0] })
  } catch (err) { next(err) }
}

export const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    let query = `SELECT a.*, j.title as job_title, j.department FROM applications a LEFT JOIN jobs j ON a.job_id = j.id`
    const params = []
    if (status) { params.push(status); query += ` WHERE a.status=$1` }
    query += ` ORDER BY a.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(parseInt(limit), offset)
    const result = await pool.query(query, params)
    const countResult = await pool.query('SELECT COUNT(*) FROM applications')
    res.json({
      success: true,
      applications: result.rows,
      pagination: { page: parseInt(page), limit: parseInt(limit), total: parseInt(countResult.rows[0].count) }
    })
  } catch (err) { next(err) }
}

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const result = await pool.query(
      'UPDATE applications SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Application not found' })
    res.json({ success: true, message: 'Status updated', application: result.rows[0] })
  } catch (err) { next(err) }
}
