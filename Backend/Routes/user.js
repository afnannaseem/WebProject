const express = require("express");
const router = express.Router();
const authenticateUser = require("../Authentication/Authentication");
const { login, signup,verifyAccount,RequestAcceptMessge } = require("../Controller/user");
router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.put("/RequestAcceptMessge", authenticateUser, RequestAcceptMessge);
module.exports = router;
