const connection = require('./connection');

var tableName = 'photos';

var orm = {

  selectAll: callback => {
    var s = `SELECT * FROM ${tableName}`;

    connection.query(s, (err, res) => {
      callback(res);
    });
  },
  insertOne: (photo, callback) => {
    var s = `INSERT INTO ${tableName} (photo_name, downloaded) VALUES (?, ?)`;
    photo.downloaded = photo.downloaded || 0;

    connection.query(s, [photo.photo_name, photo.downloaded], (err, res) => {
      callback(res);
    });
  },
  updateOne: (photo, callback) => {
    var s = `UPDATE ${tableName} SET downloaded=? WHERE id=?`;

    connection.query(s, [photo.downloaded, photo.id], (err, res) => {
      callback(res);
    });
  }
  
};

module.exports = orm;
