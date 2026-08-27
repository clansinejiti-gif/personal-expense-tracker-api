export function errorHandler(err, req, res, next) {
  console.error(err);

  // Our own intentional errors (we throw these with .status)
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Postgres unique violation (duplicate email / username)
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Email or username already exists',
    });
  }

  // Postgres foreign-key violation
  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Referenced resource does not exist',
    });
  }

  // Fallback
  res.status(500).json({ error: 'Internal server error' });
}

/** Helper so controllers can throw clean HTTP errors */
export function httpError(status, message, details) {
  const error = new Error(message);
  error.status = status;
  if (details) error.details = details;
  return error;
}