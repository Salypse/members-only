const express = require("express");
const adminRouter = express.Router();
const userController = require("../controllers/userController");
const { isAuth } = require("../public/utils/authMiddleware");

adminRouter.get("/", isAuth, userController.getAdminPage);
adminRouter.post("/", isAuth, userController.updateAdmin);

module.exports = adminRouter;
