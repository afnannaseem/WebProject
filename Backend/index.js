const express = require("express");
const app = express();
require("dotenv").config();
const user = require("./Routes/user");
const jwt = require("jsonwebtoken");
const strip = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const cors = require("cors");
const User=require("./Models/user");
app.use(cors());
app.use(express.json());
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
app.use("/user", user);
app.listen(process.env.PORT, () => {
  console.log("Port " + process.env.PORT + " is running");
});
mongoose
  .connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineitems = products.map((product) => {
    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: product.id,
          images: [process.env.STRIPE_IMAGE],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });
  const session = await strip.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineitems,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/fail`,
  });
  res.json({ id: session.id });
});
app.get("/data",async(req,res)=>{
  const data = await User.find({});
  res.json(data);
})
const ios = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // replace with your frontend app URL
    methods: ["GET", "POST"],
  },
});
ios.on("connection", (socket) => {
  console.log("Client connected");
  setTimeout(() => {
    socket.emit("newNotification", "New Notification");
  }, 5000);
});
server.listen(4000, () => {
  console.log(`Server running on http://localhost:${4000}`);
});
