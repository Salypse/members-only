const { body } = require("express-validator");

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 50 })
    .withMessage("Title must be 50 characters or less")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Title can only contain alphanumeric characters and spaces."),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ max: 255 })
    .withMessage("Message must be 255 characters or less."),
];

module.exports = validateMessage;
