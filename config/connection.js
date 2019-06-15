const mysql = require('mysql');

var connection = mysql.createConnection({
  port: 3000,
  host: 'localhost',
  user: 'admin',
  password: 'abc123',
  database: 'prisma'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as ID: ' + connection.threadId);
});

module.exports = connection;