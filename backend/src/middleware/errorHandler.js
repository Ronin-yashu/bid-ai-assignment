export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)

  if (err.code === '23505') {
    return res.status(409).json({ success: false, message: 'Duplicate entry — resource already exists' })
  }
  if (err.code === '23503') {
    return res.status(400).json({ success: false, message: 'Referenced resource not found' })
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
}
