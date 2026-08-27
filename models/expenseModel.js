import pool from '../config/db.js';

export const createExpense = async (userId, categoryId, amount, description, date) => {
  const result = await pool.query(
    `INSERT INTO expenses (user_id, category_id, amount, description, date)
     VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))
     RETURNING *`,
    [userId, categoryId, amount, description, date]
  );
  return result.rows[0];
};

export const getAllExpenses = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
    [userId]
  );
  return result.rows;
};

export const getExpenseById = async (id, userId) => {
  const result = await pool.query(
    'SELECT * FROM expenses WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return result.rows[0];
};

export const updateExpense = async (id, userId, categoryId, amount, description, date) => {
  const result = await pool.query(
    `UPDATE expenses SET category_id = $1, amount = $2, description = $3, date = $4
     WHERE id = $5 AND user_id = $6
     RETURNING *`,
    [categoryId, amount, description, date, id, userId]
  );
  return result.rows[0];
};

export const deleteExpense = async (id, userId) => {
  const result = await pool.query(
    'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, userId]
  );
  return result.rows[0];
};

export const filterExpensesByDate = async (userId, startDate, endDate) => {
  const result = await pool.query(
    `SELECT * FROM expenses WHERE user_id = $1 AND date BETWEEN $2 AND $3 ORDER BY date DESC`,
    [userId, startDate, endDate]
  );
  return result.rows;
};

export const filterExpensesByCategory = async (userId, categoryId) => {
  const result = await pool.query(
    'SELECT * FROM expenses WHERE user_id = $1 AND category_id = $2 ORDER BY date DESC',
    [userId, categoryId]
  );
  return result.rows;
};