const { validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

module.exports = {
  getLoginPage(req, res, next) {
    res.render("login");
  },

  async validateLoginForm(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", { errors: errors.array() });
    }

    next();
  },

  getSignUpPage(req, res, next) {
    res.render("sign-up");
  },

  async postSignUp(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }

    try {
      const { email, firstName, lastName, password } = req.body;
      const fullName = firstName + " " + lastName;
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.createUser(email, fullName, hashedPassword);
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  },
};
