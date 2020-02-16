const express = require('express');

const eventController = require('./../controllers/eventController');

const router = express.Router();

router.param('id', eventController.checkID);

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.checkBody, eventController.createEvent);

router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(eventController.updateEvent);

module.exports = router;
