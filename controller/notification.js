const express = require('express');
const authenticateUser = require('../authentication');
const Attendee = require('../models/attendeeSchema');

const router = express.Router();

router.get('/event-update', authenticateUser, async (req, res) => {
    const attendeeEmail = req.email;
  
    try {
      const attendee = await Attendee.findOne({ email: attendeeEmail });
  
      if (!attendee) {
        return res.status(404).json({ message: 'Attendee not found' });
      }
  
      const eventUpdateNotifications = attendee.notifications.filter(
        (notification) => notification.type === 'eventUpdate' 
      );
  
      res.status(200).json({ eventUpdateNotifications });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' + error });
    }
  });

  router.get('/event-cancellation', authenticateUser, async (req, res) => {
    const attendeeEmail = req.email;
  
    try {
      const attendee = await Attendee.findOne({ email: attendeeEmail });
  
      if (!attendee) {
        return res.status(404).json({ message: 'Attendee not found' });
      }
  
      const eventCancelNotifications = attendee.notifications.filter(
        (notification) => notification.type === 'cancellation'
      );
  
      res.status(200).json({ eventCancelNotifications });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' + error });
    }
  });

  router.get('/new-event', authenticateUser, async (req, res) => {
    const attendeeEmail = req.email;
  
    try {
      const attendee = await Attendee.findOne({ email: attendeeEmail });
  
      if (!attendee) {
        return res.status(404).json({ message: 'Attendee not found' });
      }
  
      const eventNewNotifications = attendee.notifications.filter(
        (notification) => notification.type === 'newEvent'
      );
  
      res.status(200).json({ eventNewNotifications });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' + error });
    }
  });


  router.post('/isReadByIndex', authenticateUser, async (req, res) => {
    const attendeeEmail = req.email;
    try {
      const {notificationIndex}= req.body;
      const update = {
        $set: {
          [`notifications.${notificationIndex}.isRead`]: true,
        },
      };
  
      await Attendee.updateOne({ email: attendeeEmail }, update);
  
      res.status(200).json({ message: 'Notification Updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' + error });
    }
  });
  module.exports = router;
  