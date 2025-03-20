// db.js (use MYSQL_URL on Railway)
const mysql = require('mysql2/promise');
const { URL } = require('url');
require('dotenv').config();

let dbConfig;

if (process.env.MYSQL_URL) {
  const dbUrl = new URL(process.env.MYSQL_URL);
  dbConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    port: dbUrl.port,
    connectionLimit: 10
  };
} else {
  // Local Development
  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sibbap_management_system',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10
  };
}

const db = mysql.createPool(dbConfig);

db.getConnection()
  .then(connection => {
    console.log('Connected to the MySQL database.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = db;
