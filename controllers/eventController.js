const fs = require('fs'); //Read from file

const events = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/event-simple.json`)
);

exports.checkID = (req, res, next, val) => { //Check if ID is valid
    console.log(`Event id is: ${val}`); //Get the id of the event

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

    res.status(200).json({ //Get events
        status: 'success',
        requestedAt: req.requestTime,
        result: events.length,
        data: {
            events
        }
    });
};

exports.getEvent = (req, res) => { //Get an event
    const id = req.params.id * 1;
    const newEvent = events.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            event: newEvent
        }
    });
};

exports.createEvent = (req, res) => { //Create event
    const newID = events[events.length - 1].id + 1;
    const newEvent = Object.assign({ id: newID }, req.body);
    events.push(newEvent);
    fs.writeFile(`${__dirname}/../data/event-simple.json`, JSON.stringify(events), err => {
        res.status(201).json({
            status: 'success',
            data: {
                event: newEvent
            }
        });
    });
};

exports.updateEvent = (req, res) => { //Update event
    res.status(200).json({
        status: 'success',
        data: {
            event: '<updated event here>'
        }
    })
};