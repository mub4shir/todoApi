const pool = require("./config/db");

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connection successful:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    pool.end();
  }
};

testConnection();
