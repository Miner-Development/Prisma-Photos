var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PORT = 3000;

// Require all models
var db = require("./models");
// var Credentials = require("credentials.js")

// const prod = Credentials.mongo.production.connectionString
// const dev = credentials.development


// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// img path
var imgPath = 'public/assets/imgs/escc703.jpg';

// Connect to the Mongo DB

// const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://koltyn:XwfX8E6yP68oWOOJ@prisma-borzh.gcp.mongodb.net/prisma-photo?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected to Atlas...');
  //  const collection = client.db("prisma-photo").collection("photos");
   // perform actions on the collection object
  //  client.close();
});

// mongoose.connect("mongodb://localhost/prisma")
// mongoose.connect(uri, { useNewUrlParser: true },"mongodb+srv://koltyn:XwfX8E6yP68oWOOJ@prisma-borzh.gcp.mongodb.net/prisma-photo?retryWrites=true&w=majority")

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

// example schema
var schema = new Schema({
  img: { data: Buffer, contentType: String }
});

// our model
var Photo = mongoose.model('Photo', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');

  // empty the collection
  Photo.deleteOne(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var photo = new Photo;
    photo.img.data = fs.readFileSync(imgPath);
    photo.img.contentType = 'image/png';
    photo.save(function (err, photo) {
      if (err) throw err;

      console.error('saved img to mongo');

      app.get('/', function (req, res, next) {
        Photo.findByIdAndUpdate()(photo, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      app.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });


      ///////////////

      // When the server starts, create and save a new User document to the db
      // The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
      db.User.create({ name: "Koltyn Tester" })
        .then((dbUser) => {
          console.log(dbUser);
        })
        .catch((err) => {
          console.log(err.message);
        });

      ///////////////

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

      // Route for retrieving all Photos from the db
      app.get("/photos", (req, res) => {
        // Find all Photos
        db.Photo.find({})
          .then((dbPhoto) => {
            // If all Photos are successfully found, send them back to the client
            res.json(dbPhoto);
          })
          .catch((err) => {
            // If an error occurs, send the error back to the client
            res.json(err);
          });
      });      

      // Route for saving a new Photo to the db and associating it with a User
      app.post("/submit", (req, res) => {
        // Create a new Photo in the db
        db.Photo.create(req.body)
          .then((dbPhoto) => {
            // If a Photo was created successfully, find one User (there's only one) and push the new Photo's _id to the User's `notes` array
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.User.findByIdAndUpdate({}, { $push: { photos: dbPhoto._id } }, { new: true });
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

      // Route for saving a new Note to the db and associating it with a User
      app.post("/submit", (req, res) => {
        // Create a new Note in the db
        db.Note.create(req.body)
          .then((dbNote) => {
            // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.User.findByIdAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
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
    });
  });
});
