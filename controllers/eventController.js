const Event = require('./../models/eventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      status: 'success',
      result: events.length,
      data: {
        events
      }
    });
  } catch (err) {
    res.status(404).json({
      result: 'fail',
      message: err
    });
  }
};
//Get an event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    // Event.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
//Create event
exports.createEvent = async (req, res) => {
  try {
    // const newEvent = new Event({})
    // newEvent.save()
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        event: event //We can put just event if we have the same
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failt',
      message: err
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'failt',
      message: err
    });
  }
};
