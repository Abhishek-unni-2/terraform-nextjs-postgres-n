const { Pool } = require('pg');

const {
  DATABASE_URL,
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_NAME = 'taskdb',
} = process.env;

// Support either a single DATABASE_URL or individual pieces
const pool = new Pool(
  DATABASE_URL
    ? { connectionString: DATABASE_URL }
    : {
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      }
);

module.exports = pool;

