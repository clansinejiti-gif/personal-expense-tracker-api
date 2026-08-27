import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { httpError } from '../middleware/errorHandler.js';

function signToken(user) {
  return jwt.sign(
    { email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: '7d' }
  );
}

//POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Optional extra check before insert (clearer error message)
    const existing = await query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existing.rows.length > 0) {
      throw httpError(409, 'Email or username already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, email, password_hash]
    );

    const user = result.rows[0];
    const token = signToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await query(
      `SELECT id, username, email, password_hash, created_at
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      throw httpError(401, 'Invalid email or password');
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw httpError(401, 'Invalid email or password');
    }

    const token = signToken(user);
    const { password_hash, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
}