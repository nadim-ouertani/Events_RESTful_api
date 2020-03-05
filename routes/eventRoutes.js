const express = require('express');

const eventController = require('./../controllers/eventController');

const router = express.Router();

// router.param('id', eventController.checkID);

router
  .route('/top-5-cheap')
  .get(eventController.aliasTopEvents, eventController.getAllEvents);

router.route('/event-stats').get(eventController.getEventStats);

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
