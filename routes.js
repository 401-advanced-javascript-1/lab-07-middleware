'use strict';

const express = require('express');
const router = express.Router();

const requestTime = (req, res, next) => {
  let date = new Date().toLocaleString();
  req.body = {requestTime: date};
  console.log(req.method, req.path, req.body);
  next();
};

const onlyC = (req, res, next) => {
  console.log(Math.floor(100*Math.random()));
  next();
};

const errorD = (req, data, next) => {
  next('There was an ERROR!');
};
router.get('/c', requestTime, onlyC, (req,res) => {
  res.status(200).send('Route C');
});
  
router.get('/d', requestTime, errorD, (req,res) => {
  res.status(200).send('Route D');
});

module.exports = router;