const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Attendee= require('../models/attendeeSchema');

const router = express.Router();

const jwtSecret = 'your-secret-key';

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { name, email, password, role, signIn } = req.body;
  if (signIn && password) {
    const user = await User.findOne({ email: email });
    if (user?.password != null) {
      return res.status(401).json({ message: "Account Already exist" });
    } else if (user) {
      user.password = password;
      await user.save();
      res.status(200).json({
        message: "Account created successfully",
      });
    }
  }
  const user = await User.find({ email: email });
  if (user.length > 0) {
    return res.status(401).json({ message: "Account Already exist" });
  }
  var verified = true;
  if (role === "admin") {
    verified = false;
  }
  User.create({
    name: name,
    email: email,
    password: password,
    role: role,
    signIn: signIn,
    verified: verified,
  })
    .then(() => {
      Attendee.create({
        name: name,
        email: email,
      })
      res.status(200).json({
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Account creation failed",
      });
    });
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password, signIn } = req.body;
  var user = await User.findOne({ email: email });
  if (!signIn) {
    user = await User.findOne({
      email: email,
      password: password,
    });
  }
  if (user?.verified === false) {
    return res.status(401).json({ message: "Your request is pending" });
  } else if (user?.status === true) {
    return res.status(401).json({ message: "Your account is blocked" });
  }
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (user) {
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    return res.json({ token });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;

