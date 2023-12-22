const express = require('express');
const Attendee = require('../models/attendeeSchema');
const authenticateUser = require('../authentication');

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

module.exports = router;
