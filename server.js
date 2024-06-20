const express = require("express");
const bodyParser = require("body-parser");
require("./config/dotenv");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const pool = require("./config/db");
const app = express();
const morgan = require("morgan");
app.use(bodyParser.json());
app.use(morgan());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    // Test the connection when the server starts
    //await pool.query("SELECT NOW()");
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }

  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
