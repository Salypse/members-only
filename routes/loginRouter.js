const express = require("express");
const loginRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("../config/passport");
const validateLogin = require("../validators/loginValidator");

loginRouter.get("/", authController.getLoginPage);
loginRouter.post(
  "/",
  validateLogin,
  authController.validateLoginForm,
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
);

module.exports = loginRouter;
