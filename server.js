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

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populatedb");

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.User.create({ name: "Ernest Hemingway" })
  .then((dbUser) => {
    console.log(dbUser);
  })
  .catch((err) => {
    console.log(err.message);
  });

// Routes

// Route for retrieving all Notes from the db
app.get("/notes", (req, res) => {
  // Find all Notes
  db.Note.find({})
    .then((dbNote) => {
      // If all Notes are successfully found, send them back to the client
      res.json(dbNote);
    })
    .catch((err) => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/user", (req, res) => {
  // Find all Users
  db.User.find({})
    .then((dbUser) => {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch((err) => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving a new Note to the db and associating it with a User
app.post("/submit", (req, res) => {
  // Create a new Note in the db
  db.Note.create(req.body)
    .then((dbNote) => {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then((dbUser) => {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch((err) => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to get all User's and populate them with their notes
app.get("/populateduser", (req, res) => {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("notes")
    .then((dbUser) => {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch((err) => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
