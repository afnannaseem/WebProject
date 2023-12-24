const express = require("express");
const router = express.Router();
const authenticateUser = require("../Authentication/Authentication");
const {
  login,
  signup,
  verifyAccount,
  RequestAcceptMessge,
  PendingRequest,
  AcceptedRequest,
  DeclineRequest,
} = require("../Controller/user");
router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.put("/RequestAcceptMessge", authenticateUser, RequestAcceptMessge);
router.get("/PendingRequest", PendingRequest);
router.put("/AcceptedRequest", authenticateUser, AcceptedRequest);
router.put("/RejectRequest", authenticateUser, DeclineRequest);
module.exports = router;
