const pool = require("../config/db");

const Todo = {
  async create(userId, title, description) {
    const result = await pool.query(
      "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, description]
    );
    return result.rows[0];
  },
  //   async findAll(userId) {
  //     const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
  //       userId,
  //     ]);
  //     return result.rows;
  //   },
  async findAll({ userId, offset, limit, search, sortBy, order }) {
    const query = `
      SELECT * FROM todos
      WHERE user_id = $1 AND (title ILIKE $2 OR description ILIKE $2)
      ORDER BY ${sortBy} ${order}
      LIMIT $3 OFFSET $4
    `;
    const values = [userId, `%${search}%`, limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
  },
  async findById(userId, todoId) {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1 AND id = $2",
      [userId, todoId]
    );
    return result.rows[0];
  },
  async update(userId, todoId, title, description) {
    const result = await pool.query(
      "UPDATE todos SET title = $1, description = $2 WHERE user_id = $3 AND id = $4 RETURNING *",
      [title, description, userId, todoId]
    );
    return result.rows[0];
  },
  async delete(userId, todoId) {
    await pool.query("DELETE FROM todos WHERE user_id = $1 AND id = $2", [
      userId,
      todoId,
    ]);
  },
};

module.exports = Todo;
