const User = require("../Models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req.body);
  var { email, password, signIn, name, role } = req.body;
  var user = await User.findOne({ email: email });
  if (!signIn) {
    user = await User.findOne({
      email: email,
      password: password,
    });
  }
  console.log(user);
  if (user?.verified === false) {
    return res
      .status(401)
      .json({ message: "Your request is pending", verified: false });
  } else if (user?.status === true) {
    return res.status(401).json({ message: "Your account is blocked" });
  }
  if (!user && !signIn) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (signIn && !user) {
    let verified = true;
    if (role?.toLowerCase() === "admin") {
      verified = false;
    }
    console.log(role?.toLowerCase());
    if (role == null) {
      role = "user"
    }
    User.create({
      name: name,
      email: email,
      password: password,
      role: role.toLowerCase(),
      signIn: signIn,
      verified: verified,
    });
    user = await User.findOne({ email: email });
  }
  if (user) {
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      token,
      verified: user.verified,
      showMessages: user.showMessages,
      role: user.role,
    });
  }
  if (password !== user?.password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(401).json({ message: "Account Already exist" });
  }
  var verified = true;
  var showMessages = true;
  if (role.toLowerCase() === "admin") {
    verified = false;
    showMessages = false;
  }
  User.create({
    name: name,
    email: email,
    password: password,
    role: role.toLowerCase(),
    verified: verified,
    showMessages: showMessages,
  })
    .then(() => {
      res.status(200).json({
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Account creation failed",
      });
    });
};
const verifyAccount = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(200).json({
      registered: true,
    });
  } else {
    res.status(200).json({
      registered: false,
    });
  }
};
const RequestAcceptMessge = async (req, res) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  user.showMessages = true;
  await user.save();
  res.status(200).json({
    message: "Message Accepted",
    name: user.name,
    email: user.email,
  });
};

const PendingRequest = async (req, res) => {
  const user = await User.find({ verified: false });
  let data = user.map((item) => ({
    name: item.name,
    email: item.email,
    role: item.role,
    id: item._id,
  }));
  res.status(200).json({
    data,
  });
};
const AcceptedRequest = async (req, res) => {
  try {
    const { idno } = req.body;
    const user = await User.findOne({ _id: idno });
    if (user) {
      user.verified = true;
      await user.save();
      return res.status(200).json({
        verified: user.verified,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in AcceptedRequest:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const DeclineRequest = async (req, res) => {
  try {
    const { idno } = req.body;
    const user = await User.findOneAndRemove({ _id: idno });
    if (user) {
      return res.status(200).json({
        verified: user.verified,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in AcceptedRequest:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  login,
  signup,
  verifyAccount,
  RequestAcceptMessge,
  PendingRequest,
  AcceptedRequest,
  DeclineRequest,
};
