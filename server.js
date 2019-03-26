'use strict';

const express = require('express');
// const errorHandler = require('./500.js');
const app = express();

const routes = require('./routes.js');

const PORT = process.env.PORT || 8080;

const requestTime = (req, res, next) => {
  let date = new Date().toLocaleString();
  req.body = {requestTime: date};
  console.log(req.method, req.path, req.body);
  next();
};

const squareIt = (number) => {
  let num = number*number;
  return (req, res, next) => {
    req.body.number = num;
    next();
  }
}

app.get('/a', requestTime, (req,res) => {
  res.status(200).send('Route A');
});

app.get('/b', requestTime, squareIt(5), (req,res) => {
  res.status(200).send(req.body.number.toString());
});

app.use(routes);

//Not found middleware w/ catchall
app.use('*', (req,res,next) => {
    res.status(404).send('Route not found!');
});

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
