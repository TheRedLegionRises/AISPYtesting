// Checking the amount of Api calls a user is making, which is capped at 20 calls
const User = require("../models/User");
const pool = require('../config/database');

const checkApiCallQuota = async (req, res, next) => {
  // Assuming user's ID is accessible, for example, from the request object
  try {
    const [rows] = await pool.query(
      "SELECT apiCallsCount FROM users WHERE id = ?",
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const { apiCallsCount } = rows[0];
    if (apiCallsCount >= 20) {
      res.set(
        "API Quota Limit Warning",
        "You have exceeded your free 20 API call quota."
      );
    }

    await pool.query(
      "UPDATE users SET apiCallsCount = apiCallsCount + 1 WHERE id = ?",
      [req.user.id]
    );
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).send("Server error");
  }
};

module.exports = checkApiCallQuota;
