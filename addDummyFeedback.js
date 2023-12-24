const mongoose = require('mongoose');
const Booking = require('./models/booking'); // Update the path to your Booking model
const { MONGO_URI } = process.env; // Ensure your MongoDB URI is loaded from the environment variables

// MongoDB Connection
mongoose.connect("mongodb+srv://webeng12345:Web12345*@cluster0.bvujju5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Dummy booking data
const dummyBooking = new Booking({
    eventId: '657d8e896b52c258a065f515',  // Replace with an actual ObjectId of an event
    serviceId: '657e05862e87e474756b12d4', // Replace with an actual ObjectId of a service
    vendorId: '657dd4bfc863f450f8bde459',  // Replace with an actual ObjectId of a vendor
    bookingDate: new Date(), // Current date and time
    status: 'pending' // Or 'confirmed', 'cancelled' as needed
});

// Save the dummy booking
dummyBooking.save()
    .then(booking => {
    console.log('Booking Added:', booking);
    mongoose.disconnect();  // Close the database connection
    })
    .catch(err => {
    console.error('Error Adding Booking:', err);
    mongoose.disconnect();
    });
