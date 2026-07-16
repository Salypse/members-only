const pool = require("./pool");
const centralConversion = require("../public/utils/convertTime");

module.exports = {
  async findUserByUsername(username) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username ILIKE $1",
      [username],
    );
    return rows[0];
  },

  async findUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  },

  async createUser(username, fullName, hashedPassword) {
    await pool.query(
      "INSERT INTO users (username, full_name, password) VALUES ($1, $2, $3)",
      [username, fullName, hashedPassword],
    );
  },

  async updateMembership(id) {
    await pool.query("UPDATE users SET member = true WHERE id = $1", [id]);
  },

  async updateAdmin(id) {
    await pool.query("UPDATE users SET admin = true WHERE id = $1", [id]);
  },

  async createMessage(userId, title, message) {
    const timestamp = centralConversion(new Date());
    await pool.query(
      "INSERT INTO messages (user_id, title, message, timestamp) VALUES ($1, $2, $3, $4)",
      [userId, title, message, timestamp],
    );
  },

  async getMessages() {
    const { rows } = await pool.query(
      "SELECT messages.id as message_id, users.id as user_id, title, message, timestamp, full_name FROM messages JOIN users ON messages.user_id = users.id",
    );
    return rows;
  },

  async deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  },
};
