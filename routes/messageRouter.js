const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");
const validateMessage = require("../validators/messageValidator");
const { isAuth, isAdmin } = require("../public/utils/authMiddleware");

messageRouter.get("/", isAuth, messageController.getNewMessagePage);
messageRouter.post(
  "/",
  isAuth,
  validateMessage,
  messageController.postNewMessage,
);

messageRouter.post("/delete", isAuth, isAdmin, messageController.deleteMessage);

module.exports = messageRouter;
