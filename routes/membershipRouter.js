require("dotenv").config();
const express = require("express");
const membershipRouter = express.Router();
const userController = require("../controllers/userController");
const { isAuth } = require("../public/utils/authMiddleware");

membershipRouter.get("/", isAuth, userController.getMembershipPage);
membershipRouter.post("/", isAuth, userController.updateMembership);

module.exports = membershipRouter;
