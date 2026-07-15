const express = require("express");
const messageRouter = express.Router();
const messageController = require("../controllers/messageController");
const validateMessage = require("../validators/messageValidator");

messageRouter.get("/", messageController.getNewMessagePage);
messageRouter.post("/", validateMessage, messageController.postNewMessage);

module.exports = messageRouter;
