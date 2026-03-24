import pool from '../db/index.js';

export const submitApplication = async (req, res) => {
  try {
    const { job_id, full_name, email, phone, city_state, education, area_of_interest, resume_url, why_join } = req.body;
    if (!full_name || !email) {
      return res.status(400).json({ error: 'full_name and email are required' });
    }
    const result = await pool.query(
      `INSERT INTO applications (job_id, full_name, email, phone, city_state, education, area_of_interest, resume_url, why_join)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [job_id || null, full_name, email, phone || null, city_state || null, education || null, area_of_interest || null, resume_url || null, why_join || null]
    );
    res.status(201).json({ message: 'Application submitted successfully', application: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, j.title as job_title FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.created_at DESC`
    );
    res.json({ applications: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT a.*, j.title as job_title FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Application not found' });
    res.json({ application: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
