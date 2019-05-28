const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

require('./controllers/photo_controller.js')(app);

app.listen(PORT, () => {
  console.log('Listening on Port ' + PORT);
});