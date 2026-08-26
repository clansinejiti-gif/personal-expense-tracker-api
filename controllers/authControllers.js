import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, password required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'password too short' });
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, created_at`,
    [username.trim(), email.toLowerCase().trim(), hash]
  );

  const user = result.rows[0];
  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: '7d' }
  );

  res.status(201).json({ user, token });
}

export async function login(req, res) {
  const { email, password } = req.body; 
  const result = await query(
    `SELECT id, username, email, password_hash, created_at
     FROM users WHERE email = $1`,
    [email.toLowerCase().trim()]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: '7d' }
  );

  const { password_hash, ...safe } = user;
  res.json({ user: safe, token });
}