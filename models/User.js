// user schema/model for our database
const connection = require('../config/database'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const createUser = async (firstName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await connection.query(
    'INSERT INTO users (name, email, password, apiCount) VALUES (?, ?, ?, ?)',
    [firstName, email, hashedPassword, 0]
  );
  return result.insertId; // This will return the new user's id
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // If rows is empty, rows[0] will be undefined, which is perfectly fine
  } catch (error) {
    console.error('Error finding user by email:', error);
    return undefined; // Return undefined or handle the error appropriately
  }
};

const incrementApiCallCount = async (userId) => {
  await connection.query('UPDATE users SET apiCallsCount = apiCallsCount + 1 WHERE id = ?', [userId]);
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
