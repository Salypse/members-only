const { body } = require("express-validator");
const db = require("../db/queries");

const validateSignUp = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail is required.")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error("E-mail is already registered.");
      }
    }),
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 50 })
    .withMessage("First name must be 50 characters or less."),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ max: 50 })
    .withMessage("Last name must be 50 characters or less."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 25 })
    .withMessage("Password must be between 8 and 25 characters."),
];

module.exports = {
  validateSignUp,
};
