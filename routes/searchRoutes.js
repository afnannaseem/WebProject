const express = require('express');
const router = express.Router();
const authenticateUser = require('../authentication'); // Adjust the path as necessary
const Event = require('../models/event');

// Route to search for events
router.get('/events', authenticateUser, async (req, res) => {
  try {
      const { eventName, eventType, venue, serviceType } = req.query;
      let searchCriteria = {};

      if (eventName) searchCriteria.eventName = { $regex: eventName, $options: 'i' };
      if (eventType) searchCriteria.eventType = { $regex: eventType, $options: 'i' };
      if (venue) searchCriteria.venue = { $regex: venue, $options: 'i' };
      if (serviceType) searchCriteria.servicesType = { $regex: serviceType, $options: 'i' };

      const events = await Event.find(searchCriteria).select('eventName eventType dateTime venue servicesType status');

      res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ message: 'Error searching for events: ' + error.message });
  }
});


module.exports = router;
