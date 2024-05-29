const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const User = {
  async create(email, hashedToken) {
    const result = await pool.query(
      "INSERT INTO users (email, token) VALUES ($1, $2) RETURNING *",
      [email, hashedToken]
    );
    return result.rows[0];
  },
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  async updateToken(email, hashedToken) {
    const result = await pool.query(
      "UPDATE users SET token = $1 WHERE email = $2 RETURNING *",
      [hashedToken, email]
    );
    return result.rows[0];
  },
  async findByToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Corrected logging syntax
      const query = "SELECT * FROM users WHERE id = $1";
      const values = [decoded.id];
      const { rows } = await pool.query(query, values);
      console.log("User found by token:", rows);
      return rows[0];
    } catch (err) {
      console.error("Error verifying token:", err);
      return null; // Return null on token verification failure
    }
  },
};

module.exports = User;
