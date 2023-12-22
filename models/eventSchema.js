const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventType: { type: String },
  dateTime: { type: Date },
  venue: { type: String },
  maxTicketsRegular: { type: Number },
  regularTicketsSold: { type: Number },
  maxTicketsVip: { type: Number },
  vipTicketsSold: { type: Number },
  priceOfRegularTicket:{ type: Number },
  priceOfVipTicket:{ type: Number },
  ticketAvailability: { type: Boolean },
  servicesType:[{type:String}],
  organizerEmail: { type: String},
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed','cancelled'], default: 'upcoming' },
  feedbackAndRatings: [
    {
      userEmail: { type: String },
      feedback: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  schedule: { type: String },
  attendeeList: [{ type: String }],
  eventUpdates: { type: String },
  totalrevenue: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


