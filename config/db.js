
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
    });

pool
  .connect()
  .then((client) => {
    console.log('PostgreSQL connected successfully');
    client.release();
  })
  .catch((err) => {
    console.error('PostgreSQL connection error:', err.message);
  });

export const query = (text, params) => pool.query(text, params);

export default pool;