const mongoose = require('mongoose');
const cors = require('cors');
const express= require("express");
const bodyParser = require('body-parser');
const authController = require('./controller/authorization');
const attendeeController = require('./controller/attendee');
const eventController= require('./controller/event');
const ticketController= require('./controller/ticket');
const notificationController= require('./controller/notification');


const app= express();
app.use(cors());
app.use(bodyParser.json());



app.use('/auth', authController);
app.use('/attendee', attendeeController);
app.use('/event', eventController);
app.use('/ticket', ticketController);
app.use('/notification', notificationController);

mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>{
    console.log("Connected to Mongo DB")
}).catch(err=>{
    console.log(err)
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });