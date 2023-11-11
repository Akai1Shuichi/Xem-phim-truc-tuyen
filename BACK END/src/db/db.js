const mysql = require('mysql2');
// require('dotenv').config({ path: 'config/.env' });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
});
// truy van
const queryRow = async (sql, data = undefined) => {
  const [row] = await pool.promise().query(sql, data);
  if (row.length <= 1) return row[0];
  return row;
};

module.exports = queryRow;
