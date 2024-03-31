// Database for the 
const mysql = require('mysql2/promise');

/**
 * Changed for testing on digitalocean
 */
const pool = mysql.createConnection({
  host: '127.0.0.1',
  user: 'aispy',
  password: 'COMP4537AISPY',
  database: 'aispy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'aispy',
  password: 'COMP4537AISPY',
  database: 'aispy'
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connection established');
});

module.exports = connection;


// This can be deleted, but it is what our example SQL schema
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     firstName VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     apiCallsCount INT DEFAULT 0
// );

