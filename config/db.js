const mysql = require('mysql2/promise');

let config;

// Use MYSQL_URL if defined (production) or fallback to local variables.
if (process.env.MYSQL_URL) {
  // Production: parse the provided URL.
  const { URL } = require('url');
  const dbUrl = new URL(process.env.MYSQL_URL);

  config = {
    host: dbUrl.hostname,              // Ensure this is not "host" but your actual hostname.
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    port: dbUrl.port || 3306,           // Default MySQL port if not specified.
    connectionLimit: 10
  };
} else {
  // Local development: use individual environment variables.
  config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sibbap_management_system',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10
  };
}

const db = mysql.createPool(config);
module.exports = db;
