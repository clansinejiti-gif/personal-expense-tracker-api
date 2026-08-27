import { body, validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}

/** Rules for POST /api/auth/register */
export const registerRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('username is required')
    .isLength({ min: 3, max: 50 }).withMessage('username must be 3–50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email must be valid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
];

/** Rules for POST /api/auth/login */
export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email must be valid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('password is required'),
];