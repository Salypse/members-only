const AppError = require("../errors/customErrors");

module.exports = {
  isAuth(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  },

  isAdmin(req, res, next) {
    if (!req.user.admin) {
      throw new AppError("You are not allowed to complete this action.", 403);
    }

    next();
  },
};
