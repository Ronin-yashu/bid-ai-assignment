import pool from '../db/index.js';

export const createJob = async (req, res) => {
  try {
    const { title, department, location, type, description, requirements, salary_range } = req.body;
    if (!title || !department || !location || !type || !description) {
      return res.status(400).json({ error: 'title, department, location, type and description are required' });
    }
    const result = await pool.query(
      `INSERT INTO jobs (title, department, location, type, description, requirements, salary_range)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, department, location, type, description, requirements || null, salary_range || null]
    );
    res.status(201).json({ message: 'Job created successfully', job: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json({ jobs: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
