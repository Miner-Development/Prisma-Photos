const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

const logger = require('morgan')
const mongoose = require('mongoose')

app.use(logger('dev'))

var db = require('./models')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/prisma";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/prisma');
// mongoose.connect


app.post('/reviews', (req, res) => {
  console.log( req.body );
});



// app.get('/reviews/:id', (req, res) => {
//   db.prism.reviews.getAll()
// });

// GET one photo
// app.get('/photos/:id', (req, res) => {
//   db.prism.Photo.findOne({_id: req.params.id})
//     .then(dbPhoto => {
//       res.json(dbPhoto);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// POST one photo
// app.post('/photos/:id', (req, res) => {
//   db.Photo.create(req.body)
//     .then(dbPhoto => {
//       return db.Photo.post({_id: req.params.id}, {photo: dbPhoto._id}, {new: true});
//     })
//     .then(dbPhoto => {
//       res.json(dbPhoto);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// DELETE one photo
// app.delete('/photos/:id', (req, res) => {
//   db.Photo.delete({_id: req.params.id}, {photo: dbPhoto._id})
//   .catch(err => {
//     res.json(err);
//   });
// });

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}!`);
});