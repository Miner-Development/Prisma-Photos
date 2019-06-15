const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
