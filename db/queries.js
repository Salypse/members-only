const pool = require("./pool");

module.exports = {
  async findUserByUsername(username) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username ILIKE $1",
      [username],
    );
    return rows[0];
  },

  async createUser(username, fullName, hashedPassword) {
    await pool.query(
      "INSERT INTO users (username, full_name, password) VALUES ($1, $2, $3)",
      [username, fullName, hashedPassword],
    );
  },
};
