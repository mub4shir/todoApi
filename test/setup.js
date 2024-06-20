const pool = require("../config/db");

// before(async () => {
//   await pool.query("TRUNCATE users, todos RESTART IDENTITY CASCADE");
// });

// after(async () => {
//   await pool.query("TRUNCATE users, todos RESTART IDENTITY CASCADE");
// });

module.exports = { pool };
