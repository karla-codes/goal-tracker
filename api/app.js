const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// mongodb connection
mongoose.connect('mongodb://localhost:27017/goal-tracker');
const db = mongoose.connection;

// mongo error
db.on('error', err => {
  console.log(err);
});

// serve static files
app.use(express.static(__dirname + '/public'));

app.use('/api', router);

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.json('Welcome to the Goal Tracker API!');
});

// 404 error handler
app.use((req, res, next) => {
  const err = new Error('Uh oh! Looks like this page does not exist.');
  err.status = 404;
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.listen(port, () => {
  console.log(`App is running on localhost: ${port}`);
});
