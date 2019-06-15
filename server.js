var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/prisma";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var PORT = process.env.PORT || 3000;

// app.use(express.static('public'));

mongoose.connect('mongodb://localhost/prisma');
// mongoose.connect

// Route for retrieving all Notes from the db
app.get("/reviews", function(req, res) {
  // Find all Notes
  db.reviews.find({})
    .then(function(dbNote) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});


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