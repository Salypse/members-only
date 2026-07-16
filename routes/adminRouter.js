const express = require("express");
const adminRouter = express.Router();
const userController = require("../controllers/userController");

adminRouter.get("/", userController.getAdminPage);
adminRouter.post("/", userController.updateAdmin);

module.exports = adminRouter;
