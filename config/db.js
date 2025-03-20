const mysql = require('mysql2/promise');
const { URL } = require('url');

const dbUrl = new URL(process.env.MYSQL_URL);

const db = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  port: dbUrl.port,
  connectionLimit: 10
});

module.exports = db;
