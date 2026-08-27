import pool from '../config/db.js';

export async function createCategory({ name, userId }) {
  const query = `
    INSERT INTO categories (name, user_id)
    VALUES ($1, $2)
    RETURNING id, name, user_id, created_at
  `;
  const result = await pool.query(query, [name, userId]);
  return result.rows[0];
}

export async function getCategoriesByUser(userId) {
  const query = `
    SELECT id, name, user_id, created_at
    FROM categories
    WHERE user_id = $1
    ORDER BY name ASC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function getCategoryById(id, userId) {
  const query = `
    SELECT id, name, user_id, created_at
    FROM categories
    WHERE id = $1 AND user_id = $2
  `;
  const result = await pool.query(query, [id, userId]);
  return result.rows[0] || null;
}

export async function updateCategory(id, userId, name) {
  const query = `
    UPDATE categories
    SET name = $1
    WHERE id = $2 AND user_id = $3
    RETURNING id, name, user_id, created_at
  `;
  const result = await pool.query(query, [name, id, userId]);
  return result.rows[0] || null;
}

export async function deleteCategory(id, userId) {
  const query = `DELETE FROM categories WHERE id = $1 AND user_id = $2`;
  const result = await pool.query(query, [id, userId]);
  return result.rowCount > 0;
}

export async function categoryNameExists(name, userId) {
  const query = `SELECT 1 FROM categories WHERE name = $1 AND user_id = $2`;
  const result = await pool.query(query, [name, userId]);
  return result.rowCount > 0;
}