const express = require('express');
const Attendee = require('../models/attendeeSchema');
const authenticateUser = require('../authentication');
const Event= require('../models/eventSchema');
const Ticket= require('../models/ticketSchema');

const router = express.Router();

router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const attendee = await Attendee.findOne({ email: req.email });
    
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { name, email} = req.body;

    const attendee = await Attendee.findOne({ email: req.email });

    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    attendee.name = name;
    attendee.email = email;


    const updatedAttendee = await attendee.save();

    res.status(200).json({ name: updatedAttendee.name, email: updatedAttendee.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bookedEvents', authenticateUser, async (req, res) => {
  try {
    const attendee = await Attendee.findOne({ email: req.email });

    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    const bookedEventsSummary = [];

    for(let i=0; i<attendee.bookedEvents.length;i++){
      const event = await  Event.findById(attendee.bookedEvents[i].eventId.toString());
      const ticket = await Ticket.findById(attendee.bookedEvents[i].ticketId.toString());

      if (!event||!ticket) {
        continue; 
      }
    
      const eventId= event._id;
      const eventName= event.eventName;

      const existingEntry = bookedEventsSummary.find(entry => entry.eventId.toString() === event._id.toString());
      if (!existingEntry) {
        // If entry doesn't exist, create a new entry
        bookedEventsSummary.push({
          eventId,
          eventName,
          totalTickets: 1,
          regularTickets: ticket.type === 'regular' ? 1 : 0,
          vipTickets: ticket.type === 'vip' ? 1 : 0,
        });
      } else {
        existingEntry.totalTickets += 1;
        if (ticket.type === 'regular') {
          existingEntry.regularTickets += 1;
        } else if (ticket.type === 'vip') {
          existingEntry.vipTickets += 1;
        }
      }
      

    }

    res.json(bookedEventsSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
