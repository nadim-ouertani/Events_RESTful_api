const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An event must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'An event must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'An event must have a group size']
  },
  difficulty: {
    type: String,
    require: [true, 'An event must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'An envent must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, 'An event must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'An event must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
