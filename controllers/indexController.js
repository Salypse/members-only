const db = require("../db/queries");

module.exports = {
  async indexGet(req, res, next) {
    try {
      const messages = await db.getMessages();

      res.render("index", { messages: messages });
    } catch (error) {
      return next(error);
    }
  },
};
