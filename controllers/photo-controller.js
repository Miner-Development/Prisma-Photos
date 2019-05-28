const express = require('express');
const photo = require('../models/photo');

module.exports = app => {
  app.get('/api/all'), (req, res) => {
    photo.selectAll({}).then(results => {
      res.json(results);
    });
  };

  app.post('/api/new', (req, res) => {
    console.log('photo Data:');
    console.log(req.body);

    photo.create({
      photo_name: req.body.photo_name,
      downloaded: req.body.downloaded
    }).then(results => {
      res.status(201).end();
    });
  });

  // Unsure of whether DELETE funtion below will be for client use

  // app.delete('/api/:id', (req, res) => {
  //   photo.delete({
  //     downloaded: req.body.downloaded,
  //     id: req.body.id
  //   }).then(results => {
  //     res.status(200).end();
  //   });
  // });
};