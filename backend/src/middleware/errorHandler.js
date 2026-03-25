export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err.message)

  // PostgreSQL errors
  if (err.code === '23505') return res.status(409).json({ success: false, message: 'A record with this information already exists' })
  if (err.code === '23503') return res.status(400).json({ success: false, message: 'Referenced record does not exist' })
  if (err.code === '22P02') return res.status(400).json({ success: false, message: 'Invalid ID format' })

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
