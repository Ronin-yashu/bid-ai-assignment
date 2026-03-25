import pool from '../db/pool.js'

export const submitApplication = async (req, res, next) => {
  try {
    const { job_id, full_name, email, phone, city_state, education, area_of_interest, why_join } = req.body
    const duplicate = await pool.query(
      'SELECT id FROM applications WHERE email=$1 AND (job_id=$2 OR (job_id IS NULL AND $2::uuid IS NULL))',
      [email, job_id || null]
    )
    if (duplicate.rows.length > 0)
      return res.status(409).json({ success: false, message: 'You have already applied for this position' })

    const result = await pool.query(
      `INSERT INTO applications (job_id, full_name, email, phone, city_state, education, area_of_interest, why_join)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [job_id || null, full_name, email, phone || null, city_state || null, education || null, area_of_interest || null, why_join || null]
    )
    res.status(201).json({ success: true, message: 'Application submitted! We will get back to you soon.', application: result.rows[0] })
  } catch (err) { next(err) }
}

export const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    let conditions = []
    const params = []
    if (status) { params.push(status); conditions.push(`a.status=$${params.length}`) }
    if (search) { params.push(`%${search}%`); conditions.push(`(a.full_name ILIKE $${params.length} OR a.email ILIKE $${params.length})`) }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    params.push(parseInt(limit), offset)
    const result = await pool.query(
      `SELECT a.*, j.title as job_title, j.department FROM applications a LEFT JOIN jobs j ON a.job_id=j.id ${where} ORDER BY a.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    const countResult = await pool.query(`SELECT COUNT(*) FROM applications a ${where}`, params.slice(0, -2))
    res.json({ success: true, applications: result.rows, pagination: { page: parseInt(page), limit: parseInt(limit), total: parseInt(countResult.rows[0].count) } })
  } catch (err) { next(err) }
}

export const getApplicationStats = async (req, res, next) => {
  try {
    const stats = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status='pending') as pending,
        COUNT(*) FILTER (WHERE status='reviewed') as reviewed,
        COUNT(*) FILTER (WHERE status='shortlisted') as shortlisted,
        COUNT(*) FILTER (WHERE status='rejected') as rejected
      FROM applications
    `)
    res.json({ success: true, stats: stats.rows[0] })
  } catch (err) { next(err) }
}

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const result = await pool.query(
      'UPDATE applications SET status=$1 WHERE id=$2 RETURNING *',
      [req.body.status, req.params.id]
    )
    if (!result.rows[0]) return res.status(404).json({ success: false, message: 'Application not found' })
    res.json({ success: true, message: 'Status updated', application: result.rows[0] })
  } catch (err) { next(err) }
}
