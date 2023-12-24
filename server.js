require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const biddingRoutes = require('./routes/biddingRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const searchRoutes = require('./routes/searchRoutes'); // If you have this file
const bookingRoutes = require('./routes/bookingRoutes'); // If you have this file

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://webeng12345:Web12345*@cluster0.bvujju5.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Use the imported routes
app.use('/user', userRoutes);
app.use('/bidding', biddingRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/service', serviceRoutes);
app.use('/vendor', vendorRoutes);
app.use('/search', searchRoutes); // If you have this file
app.use('/booking', bookingRoutes); // If you have this file
