const Event = require('./../models/eventModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllEvents = (req, res) => {
  console.log(req.requestTime); //Get the request time
  //Get events
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // result: events.length,
    // data: {
    //   events
    // }
  });
};
//Get an event
exports.getEvent = (req, res) => {
  const id = req.params.id * 1;
  // const newEvent = events.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     event: newEvent
  //   }
  // });
};
//Create event
exports.createEvent = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   event: newEvent
    // }
  });
};

exports.updateEvent = (req, res) => {
  //Update event
  res.status(200).json({
    status: 'success',
    data: {
      event: '<updated event here>'
    }
  });
};
