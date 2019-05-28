const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
