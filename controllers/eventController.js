//Read from file
const fs = require('fs');

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/event-simple.json`)
);

//Check if ID is valid
exports.checkID = (req, res, next, val) => {
  //Get the id of the event
  console.log(`Event id is: ${val}`);

  if (req.params.id * 1 > events.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

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
    requestedAt: req.requestTime,
    result: events.length,
    data: {
      events
    }
  });
};
//Get an event
exports.getEvent = (req, res) => {
  const id = req.params.id * 1;
  const newEvent = events.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      event: newEvent
    }
  });
};
//Create event
exports.createEvent = (req, res) => {
  const newID = events[events.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  const newEvent = Object.assign({ id: newID }, req.body);
  events.push(newEvent);
  fs.writeFile(
    `${__dirname}/../data/event-simple.json`,
    JSON.stringify(events),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          event: newEvent
        }
      });
    }
  );
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
