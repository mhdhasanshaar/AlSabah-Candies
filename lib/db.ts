import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'alsabah_alsabah',
  password: process.env.DB_PASSWORD || 'Sbh@2025#',
  database: process.env.DB_NAME || 'alsabah_alsabahdata',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
