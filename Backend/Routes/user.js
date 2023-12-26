const express = require("express");
const router = express.Router();
const authenticateUser = require("../Authentication/Authentication");
const {
  login,
  signup,
  verifyAccount,
  RequestAcceptMessge,
  PendingRequest,
  getAllOrganizar,
  BlockUser,
  UnBlockUser,
  AcceptedRequest,
  DeclineRequest,
} = require("../Controller/user");
RequestAcceptMessge;
router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.put("/RequestAcceptMessge", authenticateUser, RequestAcceptMessge);
router.get("/PendingRequest", PendingRequest);
router.put("/AcceptedRequest", authenticateUser, AcceptedRequest);
router.put("/RejectRequest", authenticateUser, DeclineRequest);
router.get("/getAllOrganizar", getAllOrganizar);
router.put("/BlockUser", authenticateUser, BlockUser);
router.put("/UnBlockUser", authenticateUser, UnBlockUser);
module.exports = router;
