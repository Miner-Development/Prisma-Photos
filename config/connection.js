const mysql = require('mysql');

var connection = mysql.createConnection({
  port: 3000,
  host: 'localhost',
  user: 'dlosh',
  password: 'root',
  database: 'photos_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as ID: ' + connection.threadId);
});

module.exports = connection;