const db = require("../db/queries");
const { validationResult } = require("express-validator");

module.exports = {
  async getNewMessagePage(req, res, next) {
    res.render("newMessage");
  },

  async postNewMessage(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("newMessage", { errors: errors.array() });
    }

    const userId = req.user.id;
    const { title, messageText } = req.body;

    await db.createMessage(userId, title, messageText);
    res.redirect("/");
  },

  async deleteMessage(req, res, next) {
    const { messageId } = req.body;
    await db.deleteMessage(messageId);

    res.redirect("/");
  },
};
