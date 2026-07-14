require("dotenv").config();
const express = require("express");
const membershipRouter = express.Router();
const userController = require("../controllers/userController");

membershipRouter.get("/", userController.getMembershipPage);
membershipRouter.post("/", userController.updateMembership);

module.exports = membershipRouter;
