const db = require("../db/queries");

module.exports = {
  async indexGet(req, res, next) {
    const messages = await db.getMessages();

    res.render("index", { messages: messages });
  },
};
