const Sequelize = require('sequelize');

const sequelize = require('../config/connection.js');

var Photo = sequelize.define('photo', {
  photo_name: {
    type: Sequelize.NUMBER
  },
  downloaded: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

photo.sync();

module.exports = Photo;