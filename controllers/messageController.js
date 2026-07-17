const db = require("../db/queries");
const { validationResult } = require("express-validator");
const AppError = require("../public/errors/customErrors");

module.exports = {
  getNewMessagePage(req, res, next) {
    res.render("newMessage");
  },

  async postNewMessage(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("newMessage", { errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const { title, messageText } = req.body;

      await db.createMessage(userId, title, messageText);
      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  },

  async deleteMessage(req, res, next) {
    try {
      const { messageId } = req.body;
      const deletedMessage = await db.deleteMessage(messageId);

      //Check that given id goes to a message and deletes it
      if (!deletedMessage) {
        throw new AppError("Message not found.", 404);
      }

      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  },
};
