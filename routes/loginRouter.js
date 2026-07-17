const express = require("express");
const loginRouter = express.Router();
const authController = require("../controllers/authController");
const passport = require("../config/passport");
const validateLogin = require("../validators/loginValidator");
const { isAuth } = require("../public/utils/authMiddleware");

loginRouter.get("/", authController.getLoginPage);
loginRouter.post(
  "/",
  validateLogin,
  authController.validateLoginForm,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    successRedirect: "/",
  }),
);
loginRouter.post("/log-out", isAuth, authController.logOut);

module.exports = loginRouter;
