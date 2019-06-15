const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

var db = require('./models');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/prismaPhotos";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/prisma');

// GET one photo
app.get('/photos/:id', (req, res) => {
  db.Photo.findOne({_id: req.params.id})
    .then(dbPhoto => {
      res.json(dbPhoto);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST one photo
app.post('/photos/:id', (req, res) => {
  db.Photo.create(req.body)
    .then(dbPhoto => {
      return db.Photo.post({_id: req.params.id}, {photo: dbPhoto._id}, {new: true});
    })
    .then(dbPhoto => {
      res.json(dbPhoto);
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE one photo
app.delete('/photos/:id', (req, res) => {
  db.Photo.delete({_id: req.params.id}, {photo: dbPhoto._id})
  .catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}!`);
});