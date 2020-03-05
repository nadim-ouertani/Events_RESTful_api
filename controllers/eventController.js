const Event = require('./../models/eventModel');
const APIFeatures = require('./../utils/apiFeatures');

//GET WITH ALIASING
exports.aliasTopEvents = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// GET ALL EVENT WITH FILTRING
exports.getAllEvents = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Event.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const events = await features.query;

    // SEND RESPONSE
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

// GET AN EVENT
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

// CREATE AN EVENT
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

// UPDATE AN EVENT
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

// DELETE AN EVENT
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    const stats = await Event.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numEvents: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
