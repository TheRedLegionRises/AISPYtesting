// user schema/model for our database
const pool = require('../config/database'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const createUser = async (firstName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (firstName, email, password, apiCallsCount) VALUES (?, ?, ?, ?)',
    [firstName, email, hashedPassword, 0]
  );
  return result.insertId; // This will return the new user's id
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // This will return the user or undefined if not found
};

const incrementApiCallCount = async (userId) => {
  await pool.query('UPDATE users SET apiCallsCount = apiCallsCount + 1 WHERE id = ?', [userId]);
};

//Verifies password i think
const checkPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result
}

module.exports = {
  createUser,
  findUserByEmail,
  incrementApiCallCount,
  checkPassword
};